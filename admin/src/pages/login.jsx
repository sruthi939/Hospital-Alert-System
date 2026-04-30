import React, { useState } from 'react';
import { ShieldAlert, Heart, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { adminService } from '../services/api';

export default function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const data = await adminService.login(formData.email, formData.password);
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.user));
      onLoginSuccess();
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: '#f8fafc',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Left Side: Branding & Info */}
      <div style={{
        flex: 1,
        backgroundColor: '#4c1d95',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '4rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
            <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '15px' }}>
              <ShieldAlert size={40} color="#4c1d95" />
            </div>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '900', margin: 0, letterSpacing: '1px' }}>HOSPITAL</h1>
              <p style={{ fontSize: '1rem', margin: 0, opacity: 0.8 }}>Emergency Alert System</p>
            </div>
          </div>
          <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.1' }}>
            Secure Portal for <br /><span style={{ color: '#a78bfa' }}>Administrators</span>
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '500px', lineHeight: '1.6' }}>
            Access the central command center to manage emergency alerts, staff members, and hospital-wide response protocols.
          </p>
        </div>
        
        {/* Decorative background element */}
        <div style={{
          position: 'absolute', bottom: '-100px', right: '-100px',
          width: '500px', height: '500px', borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.05)'
        }}></div>
      </div>

      {/* Right Side: Login Form */}
      <div style={{
        width: '550px',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '5rem'
      }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem' }}>Welcome Back</h3>
          <p style={{ color: '#64748b', fontWeight: '500' }}>Please enter your administrative credentials</p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fff1f2', color: '#e11d48', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: '600', border: '1px solid #ffe4e6' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                placeholder="admin@hospital.com"
                style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem', backgroundColor: '#f8fafc' }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type={showPassword ? 'text' : 'password'} 
                required
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••"
                style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem', backgroundColor: '#f8fafc' }} 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <a href="#" style={{ fontSize: '0.85rem', color: '#6366f1', fontWeight: '600', textDecoration: 'none' }}>Forgot password?</a>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '1rem', 
              borderRadius: '12px', 
              border: 'none', 
              backgroundColor: '#4c1d95', 
              color: 'white', 
              fontWeight: '800', 
              fontSize: '1rem', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 4px 12px rgba(76, 29, 149, 0.2)',
              transition: 'all 0.2s ease',
              marginTop: '1rem'
            }}
          >
            {loading ? 'Authenticating...' : (
              <>
                Sign In to Dashboard <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <p style={{ marginTop: '3rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
          &copy; 2024 Hospital Emergency Alert System. <br /> All rights reserved.
        </p>
      </div>
    </div>
  );
}
