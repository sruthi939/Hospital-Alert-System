import React, { createContext, useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { alertService } from '../services/alertService';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [recentAlerts, setRecentAlerts] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('new_alert', (newAlert) => {
      setActiveAlerts(prev => [newAlert, ...prev]);
      setRecentAlerts(prev => [newAlert, ...prev].slice(0, 10));
    });

    // Initial load
    alertService.getRecentAlerts().then(setRecentAlerts);

    return () => socket.disconnect();
  }, []);

  return (
    <AlertContext.Provider value={{ activeAlerts, recentAlerts, setActiveAlerts }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlerts = () => useContext(AlertContext);
