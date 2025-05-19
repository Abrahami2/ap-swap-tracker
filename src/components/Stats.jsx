// components/Stats.jsx
import React from 'react';
import './Stats.css';

export const Stats = ({ stats }) => {
  return (
    <div className="stats">
      <div className="stats-card progress-card">
        <h3>Total Progress</h3>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${stats.completionPercentage}%` }}
            ></div>
          </div>
          <span className="progress-percentage">{stats.completionPercentage}%</span>
        </div>
        <div className="progress-text">
          <span className="progress-numbers">{stats.completedAPs}/{stats.totalAPs}</span> APs completed
        </div>
      </div>
      
      <div className="stats-card verification-card">
        <h3>Verification</h3>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div 
              className="progress-bar-fill verification-fill" 
              style={{ width: `${stats.verificationPercentage}%` }}
            ></div>
          </div>
          <span className="progress-percentage">{stats.verificationPercentage}%</span>
        </div>
        <div className="progress-text">
          <span className="progress-numbers">{stats.verifiedAPs}/{stats.totalAPs}</span> APs verified
        </div>
      </div>
      
      <div className="stats-card breakdown-card">
        <h3>Status Breakdown</h3>
        <div className="status-breakdown">
          <div className="status-item">
            <div className="status-dot status-dot-completed"></div>
            <span>{stats.completedAPs} Completed</span>
          </div>
          <div className="status-item">
            <div className="status-dot status-dot-in-progress"></div>
            <span>{stats.inProgressAPs} In Progress</span>
          </div>
          <div className="status-item">
            <div className="status-dot status-dot-not-started"></div>
            <span>{stats.notStartedAPs} Not Started</span>
          </div>
        </div>
      </div>
      
      <div className="stats-card actions-card">
        <h3>Quick Actions</h3>
        <div className="quick-actions">
          <button className="quick-action-button not-started-button">
            Show Not Started
          </button>
          <button className="quick-action-button in-progress-button">
            Show In Progress
          </button>
          <button className="quick-action-button need-verification-button">
            Need Verification
          </button>
        </div>
      </div>
    </div>
  );
};