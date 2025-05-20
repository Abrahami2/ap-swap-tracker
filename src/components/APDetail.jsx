// Complete Updated APDetail.jsx with Uncontrolled Inputs
import React, { useState } from 'react';
import './APDetail.css';

export const APDetail = ({ 
  ap, 
  teamMembers, 
  onUpdateAP, 
  onStatusChange, 
  onImageUpload, 
  onBack 
}) => {
  const [uploadStats, setUploadStats] = useState(null);
  const [imagePreview, setImagePreview] = useState(ap.imageUrl);
  
  // Handle image selection and preview
  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Show image preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
    };
    reader.readAsDataURL(file);
    
    // Reset upload stats
    setUploadStats({
      status: 'selected',
      originalSize: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      filename: file.name
    });
    
    // Pass to parent for upload
    try {
      await onImageUpload(ap.id, e);
      setUploadStats(prev => ({
        ...prev,
        status: 'uploaded'
      }));
    } catch (error) {
      setUploadStats(prev => ({
        ...prev,
        status: 'failed',
        error: error.message
      }));
    }
  };

  if (!ap) return null;

  return (
    <div className="ap-detail">
      <div className="ap-detail-header">
        <button className="ap-detail-back" onClick={onBack}>
          ← Back to List
        </button>
        <h2>{ap.id} Details</h2>
      </div>

      <div className="ap-detail-card">
        <div className="ap-detail-section">
          <div className="ap-detail-field">
            <label>Location</label>
            <div className="ap-detail-value">{ap.location}</div>
          </div>
        </div>

        <div className="ap-detail-section ap-detail-grid">
          <div className="ap-detail-field">
            <label>Assigned To</label>
            <select 
              className="ap-detail-select"
              value={ap.assignedTo}
              onChange={(e) => onUpdateAP(ap.id, 'assignedTo', e.target.value)}
            >
              {teamMembers.map(member => (
                <option key={member} value={member}>{member}</option>
              ))}
            </select>
          </div>

          <div className="ap-detail-field">
            <label>Status</label>
            <select 
              className="ap-detail-select"
              value={ap.status}
              onChange={(e) => onStatusChange(ap.id, e.target.value)}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="ap-detail-field">
            <label>Verification Status</label>
            <select 
              className="ap-detail-select"
              value={ap.verificationStatus}
              onChange={(e) => onUpdateAP(ap.id, 'verificationStatus', e.target.value)}
            >
              <option value="Not Verified">Not Verified</option>
              <option value="Verified">Verified</option>
              <option value="Issues Found">Issues Found</option>
            </select>
          </div>
        </div>

        <div className="ap-detail-section ap-detail-grid">
          <div className="ap-detail-field">
            <label>Old AP Serial/Tag</label>
            <input
              type="text"
              className="ap-detail-input"
              defaultValue={ap.oldAPSerial || ''}
              onBlur={(e) => onUpdateAP(ap.id, 'oldAPSerial', e.target.value)}
              placeholder="Enter old AP serial/tag number"
              autoComplete="off"
            />
          </div>

          <div className="ap-detail-field">
            <label>New AP Serial/Tag</label>
            <input
              type="text"
              className="ap-detail-input"
              defaultValue={ap.newAPSerial || ''}
              onBlur={(e) => onUpdateAP(ap.id, 'newAPSerial', e.target.value)}
              placeholder="Enter new AP serial/tag number"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="ap-detail-section">
          <div className="ap-detail-field">
            <label>Notes</label>
            <textarea 
              className="ap-detail-textarea"
              defaultValue={ap.notes || ''}
              onBlur={(e) => onUpdateAP(ap.id, 'notes', e.target.value)}
              placeholder="Add notes about the swap process..."
              rows={4}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="ap-detail-section">
          <div className="ap-detail-field">
            <label>Completion Timestamp</label>
            <div className="ap-detail-value">
              {ap.timestamp || "Not completed"}
            </div>
          </div>
        </div>

        <div className="ap-detail-section">
          <div className="ap-detail-field">
            <label>Verification Image</label>
            <div className="ap-detail-image-container">
              {imagePreview ? (
                <div className="ap-detail-image">
                  <img src={imagePreview} alt="Verification" />
                  {uploadStats && (
                    <div className="image-stats">
                      {uploadStats.status === 'selected' && <p>Preparing to upload: {uploadStats.filename}</p>}
                      {uploadStats.status === 'uploaded' && <p>Upload complete! Original size: {uploadStats.originalSize}</p>}
                      {uploadStats.status === 'failed' && <p>Upload failed: {uploadStats.error}</p>}
                    </div>
                  )}
                </div>
              ) : (
                <div className="ap-detail-no-image">
                  No image uploaded
                </div>
              )}
              
              <div className="ap-detail-image-upload">
                <input 
                  type="file" 
                  id="image-upload"
                  accept="image/*" 
                  capture="environment"
                  className="ap-detail-image-input"
                  onChange={handleImageSelect}
                />
                <label htmlFor="image-upload" className="ap-detail-image-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                  {ap.uploadingImage ? 'Uploading...' : 'Take Photo'}
                </label>
                {imagePreview && (
                  <p className="compression-note">Images are automatically compressed to save storage</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};