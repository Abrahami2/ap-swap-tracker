// Updated App.js - replace Firebase with Supabase
import React, { useState, useEffect } from 'react';
import './App.css';
import APSwapTracker from './APSwapTracker';
import { isOnline } from './supabase'; // Changed from './firebase' to './supabase'

function App() {
  const [online, setOnline] = useState(isOnline());

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

  return (
    <div className="app">
      <APSwapTracker />
      
      {/* Offline indicator */}
      {!online && (
        <div className="offline-indicator">
          You are offline. Changes will be saved when you reconnect.
        </div>
      )}
    </div>
  );
}

export default App;