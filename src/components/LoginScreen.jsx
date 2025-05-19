// src/components/LoginScreen.jsx
import React, { useState } from 'react';
import './LoginScreen.css';

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if username matches one of your team members
    const validUsers = ['Abe', 'Walid', 'Zack', 'Shaady', 'Ibrahim'];
    
    if (validUsers.includes(username)) {
      // Store in localStorage to remember the login
      localStorage.setItem('apTrackerUser', username);
      onLogin(username);
    } else {
      setError('Invalid name. Please enter your correct name.');
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <h2>Kohl's AP Swap Tracker</h2>
        <p>Enter your name to access the tracker</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            className="login-input"
          />
          
          {error && <div className="login-error">{error}</div>}
          
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;