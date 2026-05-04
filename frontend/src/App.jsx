import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';
import NurseDashboard from './pages/nurse/NurseDashboard';
import LoginPage from './pages/nurse/LoginPage';
import RegisterPage from './pages/nurse/RegisterPage';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorLogin from './pages/doctor/Login';
import DoctorRegistration from './pages/doctor/Registration';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/doctor/login" />;
};

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/doctor/login" element={<DoctorLogin />} />
            <Route path="/doctor/register" element={<DoctorRegistration />} />
            <Route path="/nurse" element={<ProtectedRoute><NurseDashboard /></ProtectedRoute>} />
            <Route path="/doctor" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/doctor/login" />} />
          </Routes>
        </Router>
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;
