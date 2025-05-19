// components/Filters.jsx
import React from 'react';
import './Filters.css';

export const Filters = ({ 
  searchTerm, 
  setSearchTerm, 
  filterStatus, 
  setFilterStatus, 
  filterTech, 
  setFilterTech, 
  filterVerification, 
  setFilterVerification, 
  teamMembers 
}) => {
  return (
    <div className="filters">
      <div className="filter-group search-group">
        <input
          type="text"
          placeholder="Search by AP ID, location, or serial numbers..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button 
            className="search-clear" 
            onClick={() => setSearchTerm('')}
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>
      
      <div className="filter-controls">
        <div className="filter-group">
          <label>Status</label>
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Technician</label>
          <select
            className="filter-select"
            value={filterTech}
            onChange={(e) => setFilterTech(e.target.value)}
          >
            <option value="All">All Technicians</option>
            {teamMembers.slice(1).map(member => (
              <option key={member} value={member}>{member}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label>Verification</label>
          <select
            className="filter-select"
            value={filterVerification}
            onChange={(e) => setFilterVerification(e.target.value)}
          >
            <option value="All">All Verification</option>
            <option value="Not Verified">Not Verified</option>
            <option value="Verified">Verified</option>
            <option value="Issues Found">Issues Found</option>
          </select>
        </div>
      </div>
      
      {(filterStatus !== "All" || filterTech !== "All" || filterVerification !== "All" || searchTerm) && (
        <div className="active-filters">
          <span>Active filters:</span>
          {filterStatus !== "All" && (
            <div className="filter-tag">
              Status: {filterStatus}
              <button 
                onClick={() => setFilterStatus("All")}
                aria-label="Remove status filter"
              >
                &times;
              </button>
            </div>
          )}
          {filterTech !== "All" && (
            <div className="filter-tag">
              Tech: {filterTech}
              <button 
                onClick={() => setFilterTech("All")}
                aria-label="Remove technician filter"
              >
                &times;
              </button>
            </div>
          )}
          {filterVerification !== "All" && (
            <div className="filter-tag">
              Verification: {filterVerification}
              <button 
                onClick={() => setFilterVerification("All")}
                aria-label="Remove verification filter"
              >
                &times;
              </button>
            </div>
          )}
          {searchTerm && (
            <div className="filter-tag">
              Search: {searchTerm}
              <button 
                onClick={() => setSearchTerm("")}
                aria-label="Remove search term"
              >
                &times;
              </button>
            </div>
          )}
          <button 
            className="clear-all-filters"
            onClick={() => {
              setFilterStatus("All");
              setFilterTech("All");
              setFilterVerification("All");
              setSearchTerm("");
            }}
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};