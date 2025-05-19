// components/ExportButton.jsx
import React, { useState } from 'react';
import './ExportButton.css';
import { exportToExcel } from '../supabase';

export const ExportButton = () => {
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState(null);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    setExportError(null);
    setExportSuccess(false);
    
    try {
      await exportToExcel();
      setExportSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setExportSuccess(false);
      }, 3000);
    } catch (error) {
      setExportError('Failed to export data. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="export-container">
      <button 
        className="export-button"
        onClick={handleExport}
        disabled={exporting}
      >
        {exporting ? (
          <span className="export-spinner"></span>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export to Excel
          </>
        )}
      </button>
      
      {exportError && (
        <div className="export-message error">
          {exportError}
        </div>
      )}
      
      {exportSuccess && (
        <div className="export-message success">
          Excel file downloaded successfully!
        </div>
      )}
    </div>
  );
};