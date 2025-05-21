// src/APSwapTracker.jsx - NEW FILE
import React, { useState, useEffect } from 'react';
import './APSwapTracker.css';
import { APList } from './components/APList';
import { APDetail } from './components/APDetail';
import { Stats } from './components/Stats';
import { Filters } from './components/Filters';
import { ExportButton } from './components/ExportButton';
import { initializeDatabase, saveAP, fetchAPs, uploadImage } from './supabase';

export const APSwapTracker = () => {
  // Initialize Supabase on component mount
  useEffect(() => {
    initializeDatabase();
    loadAPs();
  }, []);

  // Initial state
  const [apData, setAPData] = useState([]);
  const [selectedAP, setSelectedAP] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterTech, setFilterTech] = useState("All");
  const [filterVerification, setFilterVerification] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
  const [loading, setLoading] = useState(true);

  // Custom team members list with your actual names
  const teamMembers = [
    "Select Member",
    "Abe",  // Tech 1
    "Walid", // Tech 2
    "Zack",  // Tech 3
    "Shaady", // Tech 4
    "Ibrahim" // Tech 5
  ];

  // Load APs from Supabase
  const loadAPs = async () => {
    setLoading(true);
    try {
      const data = await fetchAPs();
      setAPData(data);
    } catch (error) {
      console.error("Error loading APs: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Sort handler
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to data
  const sortedData = React.useMemo(() => {
    let sortableItems = [...apData];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [apData, sortConfig]);

  // Filter handler
  const filteredData = React.useMemo(() => {
    return sortedData.filter(ap => {
      const matchesStatus = filterStatus === "All" || ap.status === filterStatus;
      const matchesTech = filterTech === "All" || ap.assignedTo === filterTech;
      const matchesVerification = filterVerification === "All" || ap.verificationStatus === filterVerification;
      const matchesSearch = ap.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           ap.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (ap.oldAPSerial && ap.oldAPSerial.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (ap.newAPSerial && ap.newAPSerial.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesStatus && matchesTech && matchesVerification && matchesSearch;
    });
  }, [sortedData, filterStatus, filterTech, filterVerification, searchTerm]);

  // Update AP data
  const updateAP = async (id, field, value) => {
    const updatedData = apData.map(ap => {
      if (ap.id === id) {
        return { ...ap, [field]: value };
      }
      return ap;
    });
    
    setAPData(updatedData);
    
    // Find the updated AP
    const updatedAP = updatedData.find(ap => ap.id === id);
    
    // Save to Supabase
    try {
      await saveAP(updatedAP);
    } catch (error) {
      console.error("Error saving AP update: ", error);
      // Revert changes on error
      setAPData(apData);
    }
  };

  // Handle AP selection for details view
  const handleAPSelect = (ap) => {
    setSelectedAP(ap);
  };

  // Handle status change with automatic timestamp
  const handleStatusChange = async (id, status) => {
    const timestamp = status === "Completed" ? new Date().toLocaleString() : "";
    const updatedData = apData.map(ap => {
      if (ap.id === id) {
        return { ...ap, status, timestamp };
      }
      return ap;
    });
    
    setAPData(updatedData);
    
    // Find the updated AP
    const updatedAP = updatedData.find(ap => ap.id === id);
    
    // Save to Supabase
    try {
      await saveAP(updatedAP);
    } catch (error) {
      console.error("Error saving status change: ", error);
      // Revert changes on error
      setAPData(apData);
    }
  };

  // Handle image upload
  const handleImageUpload = async (id, event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
      // Show loading state
      const updatedData = apData.map(ap => {
        if (ap.id === id) {
          return { ...ap, uploadingImage: true };
        }
        return ap;
      });
      setAPData(updatedData);
      
      // Upload to Supabase Storage
      const imageUrl = await uploadImage(id, file);
      
      // Update local state with image URL
      const newUpdatedData = apData.map(ap => {
        if (ap.id === id) {
          return { ...ap, imageUrl, uploadingImage: false };
        }
        return ap;
      });
      setAPData(newUpdatedData);
      
      // Save to Supabase
      const updatedAP = newUpdatedData.find(ap => ap.id === id);
      await saveAP(updatedAP);
      
    } catch (error) {
      console.error("Error uploading image: ", error);
      // Clear loading state on error
      const revertData = apData.map(ap => {
        if (ap.id === id) {
          return { ...ap, uploadingImage: false };
        }
        return ap;
      });
      setAPData(revertData);
    }
  };

  // Calculate statistics
  const stats = {
    totalAPs: apData.length,
    completedAPs: apData.filter(ap => ap.status === "Completed").length,
    inProgressAPs: apData.filter(ap => ap.status === "In Progress").length,
    notStartedAPs: apData.filter(ap => ap.status === "Not Started").length,
    verifiedAPs: apData.filter(ap => ap.verificationStatus === "Verified").length
  };
  
  stats.completionPercentage = Math.round((stats.completedAPs / stats.totalAPs) * 100) || 0;
  stats.verificationPercentage = Math.round((stats.verifiedAPs / stats.totalAPs) * 100) || 0;

  // Main render
  return (
    <div className="ap-tracker">
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading AP data...</p>
        </div>
      ) : selectedAP ? (
        <APDetail 
          ap={selectedAP}
          teamMembers={teamMembers}
          onUpdateAP={updateAP}
          onStatusChange={handleStatusChange}
          onImageUpload={handleImageUpload}
          onBack={() => setSelectedAP(null)}
        />
      ) : (
        <div className="tracker-container">
          <header className="tracker-header">
            <h1>Kohl's Plantation AP Swap Tracker</h1>
          </header>
          
          <Stats stats={stats} />
          
          <ExportButton />
          
          <Filters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterTech={filterTech}
            setFilterTech={setFilterTech}
            filterVerification={filterVerification}
            setFilterVerification={setFilterVerification}
            teamMembers={teamMembers}
          />
          
          <APList 
            data={filteredData}
            teamMembers={teamMembers}
            onSelectAP={handleAPSelect}
            onUpdateAP={updateAP}
            onStatusChange={handleStatusChange}
            sortConfig={sortConfig}
            requestSort={requestSort}
          />
        </div>
      )}
    </div>
  );
};

export default APSwapTracker;