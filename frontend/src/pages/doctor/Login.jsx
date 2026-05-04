import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldPlus, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      login(data.user);
      navigate('/doctor');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full font-['Inter']">
      
      {/* LEFT PANEL */}
      <div className="flex-1 bg-hospital-dark flex flex-col justify-center p-[60px] text-white relative overflow-hidden hidden md:flex">
        <div className="z-10">
          <div className="flex items-center gap-3 mb-10">
            <ShieldPlus size={48} className="text-hospital-light" />
            <div>
              <h2 className="m-0 text-[28px] font-bold tracking-[1px]">HOSPITAL</h2>
              <p className="m-0 text-[14px] text-[#a0d8c0] font-medium">Emergency Alert System</p>
            </div>
          </div>
          <h1 className="text-[48px] font-bold leading-[1.2] mb-5">Doctor<br/>Portal</h1>
          <p className="text-[18px] text-[#a0d8c0] max-w-[400px] leading-[1.6]">Secure access to patient details, active emergency alerts, and response management.</p>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute -top-[10%] -right-[10%] w-[400px] h-[400px] rounded-full bg-[rgba(13,143,79,0.2)] blur-[60px] z-0"></div>
        <div className="absolute -bottom-[10%] -left-[10%] w-[300px] h-[300px] rounded-full bg-[rgba(13,143,79,0.2)] blur-[40px] z-0"></div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 bg-hospital-bg flex flex-col justify-center items-center p-10">
        <div className="w-full max-w-[420px] bg-white p-10 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.05)] border border-hospital-border">
          
          <div className="text-center mb-8">
            <h2 className="m-0 mb-2 text-2xl font-bold text-gray-800">Welcome back</h2>
            <p className="m-0 text-gray-500 text-sm">Please enter your credentials to log in.</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-6 text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="block mb-2 text-[13px] font-semibold text-gray-600">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@hospital.com"
                  required
                  className="w-full py-3 pr-3 pl-10 rounded-md border border-gray-300 text-sm outline-none box-border focus:border-hospital-dark focus:ring-1 focus:ring-hospital-dark transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-[13px] font-semibold text-gray-600">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full py-3 pr-3 pl-10 rounded-md border border-gray-300 text-sm outline-none box-border focus:border-hospital-dark focus:ring-1 focus:ring-hospital-dark transition-all"
                />
              </div>
              <div className="text-right mt-2">
                <a href="#" className="text-hospital-light text-xs font-medium no-underline hover:underline">Forgot password?</a>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`mt-2.5 w-full text-white py-3.5 rounded-md text-[15px] font-semibold flex justify-center items-center gap-2 transition-colors ${loading ? 'bg-[#0d6342] cursor-not-allowed' : 'bg-hospital-dark hover:bg-hospital-light cursor-pointer'}`}
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <>Log In <ArrowRight size={18} /></>}
            </button>
          </form>

          <div className="mt-[30px] text-center text-sm text-gray-500">
            Don't have an account? <Link to="/doctor/register" className="text-hospital-light font-semibold no-underline hover:underline">Register here</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;