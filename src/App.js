// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import APSwapTracker from './APSwapTracker';
import LoginScreen from './components/LoginScreen';
import { isOnline } from './supabase';

function App() {
  const [online, setOnline] = useState(isOnline());
  const [user, setUser] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('apTrackerUser');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnlineStatus = () => {
      setOnline(isOnline());
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('apTrackerUser');
    setUser(null);
  };

  return (
    <div className="app">
      {!user ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <>
          <div className="user-bar">
            <span>Logged in as: {user}</span>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
          
          <APSwapTracker />
          
          {!online && (
            <div className="offline-indicator">
              You are offline. Changes will be saved when you reconnect.
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;