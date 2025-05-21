// Complete APList.jsx with Mobile Fixes
import React from 'react';
import './APList.css';

export const APList = ({ 
  data, 
  teamMembers, 
  onSelectAP, 
  onUpdateAP, 
  onStatusChange,
  sortConfig,
  requestSort
}) => {
  // Color coding for status indicators
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "status-dot status-dot-completed";
      case "In Progress": return "status-dot status-dot-in-progress";
      case "Not Started": return "status-dot status-dot-not-started";
      default: return "status-dot status-dot-not-started";
    }
  };

  const getVerificationColor = (status) => {
    switch (status) {
      case "Verified": return "status-dot status-dot-verified";
      case "Issues Found": return "status-dot status-dot-issues";
      case "Not Verified": return "status-dot status-dot-not-started";
      default: return "status-dot status-dot-not-started";
    }
  };

  // Handle mobile select changes
  const handleMobileStatusChange = (id, event) => {
    const value = event.target.value;
    
    // Force blur to ensure iOS registers the change
    event.target.blur();
    
    // Use timeout to ensure state updates properly
    setTimeout(() => {
      onStatusChange(id, value);
    }, 50);
  };

  // Handle mobile assignment change
  const handleMobileAssignChange = (id, event) => {
    const value = event.target.value;
    
    // Force blur to ensure iOS registers the change
    event.target.blur();
    
    // Use timeout to ensure state updates properly
    setTimeout(() => {
      onUpdateAP(id, 'assignedTo', value);
    }, 50);
  };

  // Mobile card view
  const renderMobileCards = () => {
    return (
      <div className="ap-cards">
        {data.length > 0 ? (
          data.map((ap) => (
            <div key={ap.id} className="ap-card">
              <div className="ap-card-header">
                <span className="ap-card-id">{ap.id}</span>
                <span className={`ap-card-status ${ap.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {ap.status}
                </span>
              </div>
              
              <div className="ap-card-location">{ap.location}</div>
              
              <div className="ap-card-details">
                <div className="ap-card-assigned">
                  <label>Tech:</label>
                  <select 
                    value={ap.assignedTo}
                    onChange={(e) => handleMobileAssignChange(ap.id, e)}
                    className="mobile-friendly-select"
                  >
                    {teamMembers.map((member) => (
                      <option key={member} value={member}>
                        {member}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="ap-card-verification">
                  <div className={getVerificationColor(ap.verificationStatus)}></div>
                  <span>{ap.verificationStatus}</span>
                  {ap.imageUrl && <span className="ap-card-has-image">📷</span>}
                </div>
              </div>
              
              <div className="ap-card-footer">
                <button 
                  className="ap-card-details-btn"
                  onClick={() => onSelectAP(ap)}
                >
                  View Details
                </button>
                
                <select 
                  className={`ap-card-status-select ${ap.status.toLowerCase().replace(/\s+/g, '-')} mobile-friendly-select`}
                  value={ap.status}
                  onChange={(e) => handleMobileStatusChange(ap.id, e)}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              
              {ap.oldAPSerial && ap.newAPSerial && (
                <div className="ap-card-serials">
                  <div><span>Old:</span> {ap.oldAPSerial}</div>
                  <div><span>New:</span> {ap.newAPSerial}</div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="ap-cards-empty">
            No APs match your current filters
          </div>
        )}
      </div>
    );
  };

  // Desktop table view
  const renderDesktopTable = () => {
    return (
      <div className="ap-table-wrapper">
        <table className="ap-table">
          <thead>
            <tr>
              <th onClick={() => requestSort('id')}>
                AP ID {sortConfig.key === 'id' && (
                  sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
                )}
              </th>
              <th onClick={() => requestSort('location')}>
                Location {sortConfig.key === 'location' && (
                  sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
                )}
              </th>
              <th onClick={() => requestSort('assignedTo')}>
                Assigned To {sortConfig.key === 'assignedTo' && (
                  sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
                )}
              </th>
              <th onClick={() => requestSort('status')}>
                Status {sortConfig.key === 'status' && (
                  sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
                )}
              </th>
              <th onClick={() => requestSort('verificationStatus')}>
                Verification {sortConfig.key === 'verificationStatus' && (
                  sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
                )}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((ap) => (
                <tr key={ap.id}>
                  <td>{ap.id}</td>
                  <td>{ap.location}</td>
                  <td>
                    <select 
                      value={ap.assignedTo}
                      onChange={(e) => handleMobileAssignChange(ap.id, e)}
                      className="mobile-friendly-select"
                    >
                      {teamMembers.map((member) => (
                        <option key={member} value={member}>
                          {member}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <div className="ap-table-status">
                      <div className={getStatusColor(ap.status)}></div>
                      <select 
                        value={ap.status}
                        onChange={(e) => handleMobileStatusChange(ap.id, e)}
                        className="mobile-friendly-select"
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <div className="ap-table-verification">
                      <div className={getVerificationColor(ap.verificationStatus)}></div>
                      <span>{ap.verificationStatus}</span>
                      {ap.imageUrl && <span className="ap-table-has-image">📷</span>}
                    </div>
                  </td>
                  <td>
                    <button 
                      className="ap-table-details-btn"
                      onClick={() => onSelectAP(ap)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="ap-table-empty">
                  No APs match your current filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="ap-list">
      {/* Mobile view */}
      <div className="ap-list-mobile">
        {renderMobileCards()}
      </div>
      
      {/* Desktop view */}
      <div className="ap-list-desktop">
        {renderDesktopTable()}
      </div>
    </div>
  );
};