import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldPlus, User, Mail, Phone, Contact, EyeOff, ChevronDown, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    staffId: '',
    department: '',
    specialization: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: formData.name,
          email: formData.email,
          password: formData.password,
          staffId: formData.staffId,
          phone: formData.phone,
          department: formData.department,
          designation: formData.specialization,
          role: 'Doctor' 
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
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
    <div className="min-h-screen flex items-center justify-center bg-hospital-bg p-5 font-['Inter']">
      <div className="flex w-full max-w-[960px] bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-hospital-border">
        
        {/* LEFT PANEL */}
        <div className="w-[38%] bg-hospital-panel flex flex-col items-center pt-[60px] border-r border-hospital-border relative">
          <div className="text-center mb-[30px] z-10">
            <ShieldPlus size={64} className="mx-auto text-hospital-dark fill-[#e6f0eb]" strokeWidth={1.5} />
            <h2 className="mt-3 mb-1 text-2xl font-extrabold text-hospital-dark tracking-wide">HOSPITAL</h2>
            <p className="m-0 text-[11px] text-gray-600 font-bold tracking-wide">EMERGENCY ALERT SYSTEM</p>
          </div>
          <div className="flex-1 w-full flex items-end justify-center overflow-hidden z-0">
            {/* Generic smiling doctor image to match design */}
            <img 
              src="https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?w=400&h=500&fit=crop" 
              alt="Doctor" 
              className="w-full object-cover mix-blend-multiply opacity-90 object-top"
            />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-[62%] py-[60px] px-[50px] bg-white">
          <h1 className="m-0 mb-2 text-[28px] font-bold text-gray-900">Doctor Registration</h1>
          <p className="m-0 mb-9 text-sm text-gray-500 font-medium">Create your account to access the Emergency Alert System</p>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-6 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              
              {/* Full Name */}
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    name="name" value={formData.name} onChange={handleChange} required
                    placeholder="Enter your full name" 
                    className="w-full rounded-md border border-gray-300 text-[13px] outline-none box-border text-gray-900 py-3 pr-3.5 pl-10 focus:border-hospital-dark focus:ring-1 focus:ring-hospital-dark" 
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    name="email" type="email" value={formData.email} onChange={handleChange} required
                    placeholder="Enter your email address" 
                    className="w-full rounded-md border border-gray-300 text-[13px] outline-none box-border text-gray-900 py-3 pr-3.5 pl-10 focus:border-hospital-dark focus:ring-1 focus:ring-hospital-dark" 
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    name="phone" type="tel" value={formData.phone} onChange={handleChange} required
                    placeholder="Enter your phone number" 
                    className="w-full rounded-md border border-gray-300 text-[13px] outline-none box-border text-gray-900 py-3 pr-3.5 pl-10 focus:border-hospital-dark focus:ring-1 focus:ring-hospital-dark" 
                  />
                </div>
              </div>

              {/* Employee ID */}
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">Employee ID</label>
                <div className="relative">
                  <Contact size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    name="staffId" value={formData.staffId} onChange={handleChange} required
                    placeholder="Enter your employee ID" 
                    className="w-full rounded-md border border-gray-300 text-[13px] outline-none box-border text-gray-900 py-3 pr-3.5 pl-10 focus:border-hospital-dark focus:ring-1 focus:ring-hospital-dark" 
                  />
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">Department</label>
                <div className="relative">
                  <select 
                    name="department" value={formData.department} onChange={handleChange} required
                    className={`w-full rounded-md border border-gray-300 text-[13px] outline-none box-border py-3 pl-3.5 pr-9 appearance-none bg-white focus:border-hospital-dark focus:ring-1 focus:ring-hospital-dark ${formData.department ? 'text-gray-900' : 'text-gray-400'}`}
                  >
                    <option value="" disabled>Select Department</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Emergency">Emergency</option>
                    <option value="General">General</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Specialization */}
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">Specialization</label>
                <div className="relative">
                  <select 
                    name="specialization" value={formData.specialization} onChange={handleChange} required
                    className={`w-full rounded-md border border-gray-300 text-[13px] outline-none box-border py-3 pl-3.5 pr-9 appearance-none bg-white focus:border-hospital-dark focus:ring-1 focus:ring-hospital-dark ${formData.specialization ? 'text-gray-900' : 'text-gray-400'}`}
                  >
                    <option value="" disabled>Select Specialization</option>
                    <option value="Surgeon">Surgeon</option>
                    <option value="Consultant">Consultant</option>
                    <option value="Physician">Physician</option>
                    <option value="Resident">Resident</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input 
                    name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} required
                    placeholder="Create a password" 
                    className="w-full rounded-md border border-gray-300 text-[13px] outline-none box-border text-gray-900 py-3 pl-3.5 pr-10 focus:border-hospital-dark focus:ring-1 focus:ring-hospital-dark" 
                  />
                  <div onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer flex text-gray-400 hover:text-gray-600 transition-colors">
                    {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <input 
                    name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} required
                    placeholder="Confirm your password" 
                    className="w-full rounded-md border border-gray-300 text-[13px] outline-none box-border text-gray-900 py-3 pl-3.5 pr-10 focus:border-hospital-dark focus:ring-1 focus:ring-hospital-dark" 
                  />
                  <div onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer flex text-gray-400 hover:text-gray-600 transition-colors">
                    {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                  </div>
                </div>
              </div>

            </div>

            <button type="submit" disabled={loading} className={`w-full py-4 text-white rounded-md border-none font-semibold text-base mt-6 cursor-pointer transition-colors ${loading ? 'bg-[#0d6342]' : 'bg-hospital-dark hover:bg-hospital-light'}`}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <div className="text-center text-sm text-gray-600 mt-6 font-medium">
            Already have an account? <Link to="/doctor/login" className="text-hospital-dark font-bold no-underline hover:underline">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
