import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AlertProvider } from './context/AlertContext';
import NurseDashboard from './pages/NurseDashboard';
import './App.css';

function App() {
  return (
    <AlertProvider>
      <Router>
        <Routes>
          <Route path="/nurse" element={<NurseDashboard />} />
          <Route path="/" element={<NurseDashboard />} />
        </Routes>
      </Router>
    </AlertProvider>
  );
}

export default App;
