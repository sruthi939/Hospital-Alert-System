import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.login(email, password);
      login(data.user);
      navigate('/nurse');
    } catch (err) {
      if (err.message.includes('pending admin approval')) {
        localStorage.setItem('registration_pending', 'true');
        navigate('/register');
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#f0f4f8]">
      <div className="w-full max-w-[400px] bg-white p-[40px] rounded-[15px] shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
        <div className="text-center mb-[30px]">
          <img src="https://img.icons8.com/color/96/hospital.png" alt="logo" className="w-[60px] mb-[10px]" />
          <h2 className="m-0 text-[#003366] font-[800]">Hospital Portal</h2>
          <p className="text-[#718096] text-[14px]">Please login to your account</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-[15px]">
          <div>
            <label className="block text-[13px] font-[700] text-[#4a5568] mb-[5px]">Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-[12px] rounded-[8px] border border-[#e2e8f0] outline-none" />
          </div>
          <div>
            <label className="block text-[13px] font-[700] text-[#4a5568] mb-[5px]">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-[12px] rounded-[8px] border border-[#e2e8f0] outline-none" />
          </div>

          {error && <p className="text-[#e53e3e] text-[13px] m-0">{error}</p>}

          <button type="submit" className="w-full p-[15px] bg-[#003366] text-white border-none rounded-[10px] font-[800] cursor-pointer mt-[10px]">
            LOGIN
          </button>
        </form>

        <div className="text-center mt-[20px]">
          <p className="text-[14px] text-[#718096]">
            Don't have an account? <span onClick={() => navigate('/register')} className="text-[#003366] font-[800] cursor-pointer">Register here</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
