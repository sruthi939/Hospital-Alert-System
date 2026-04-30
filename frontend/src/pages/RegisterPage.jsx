import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '', dob: '', gender: '', address: '',
    staffId: '', department: '', designation: '', shift: '', experience: '', license_no: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Registration Request Submitted! Please wait for admin approval.');
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f4f8', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar Info */}
      <div style={{ width: '350px', backgroundColor: '#003366', color: 'white', padding: '40px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
          <img src="https://img.icons8.com/color/48/hospital.png" alt="logo" style={{ width: '40px', backgroundColor: 'white', borderRadius: '8px', padding: '5px' }} />
          <div>
            <div style={{ fontWeight: '800', fontSize: '18px' }}>HOSPITAL</div>
            <div style={{ fontSize: '10px', opacity: 0.7 }}>Emergency Alert System</div>
          </div>
        </div>
        <Link to="/login" style={{ color: '#cbd5e0', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
          ← Back to Login
        </Link>
        <div style={{ marginTop: 'auto', fontSize: '13px', color: '#cbd5e0' }}>
          Need Help? <br/> Contact Admin
        </div>
      </div>

      {/* Registration Form */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ margin: 0, color: '#003366', fontWeight: '800' }}>Nurse Registration</h2>
            <p style={{ color: '#718096', fontSize: '14px' }}>Create your account to request access to the system</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <h4 style={{ color: '#2d3748', borderBottom: '1px solid #edf2f7', paddingBottom: '10px', marginBottom: '20px', fontSize: '14px', fontWeight: '800' }}>PERSONAL INFORMATION</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
              <Input label="Full Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <Input label="Email Address" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              <Input label="Phone Number" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              <Input label="Date of Birth" type="date" required value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
              <Select label="Gender" options={['Male', 'Female', 'Other']} value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} />
              <Input label="Address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              <Input label="Password" type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
            </div>

            {/* Professional Information */}
            <h4 style={{ color: '#2d3748', borderBottom: '1px solid #edf2f7', paddingBottom: '10px', marginBottom: '20px', fontSize: '14px', fontWeight: '800' }}>PROFESSIONAL INFORMATION</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
              <Input label="Employee ID" required value={formData.staffId} onChange={e => setFormData({...formData, staffId: e.target.value})} />
              <Select label="Department" options={['ICU', 'Emergency', 'General Ward', 'Pediatrics']} value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} />
              <Input label="Designation" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} />
              <Select label="Shift" options={['Morning', 'Evening', 'Night']} value={formData.shift} onChange={e => setFormData({...formData, shift: e.target.value})} />
              <Input label="Experience (Years)" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} />
              <Input label="License/Registration No." value={formData.license_no} onChange={e => setFormData({...formData, license_no: e.target.value})} />
            </div>

            <div style={{ backgroundColor: '#ebf8ff', padding: '15px', borderRadius: '10px', marginBottom: '20px', fontSize: '13px', color: '#2b6cb0' }}>
              ℹ Your account will be sent for admin approval. You will be notified once your access is approved.
            </div>

            <button type="submit" style={{ width: '100%', padding: '15px', backgroundColor: '#3182ce', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '800', fontSize: '16px', cursor: 'pointer' }}>
              Submit Registration Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#4a5568', marginBottom: '8px' }}>{label} *</label>
    <input {...props} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', outline: 'none' }} />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#4a5568', marginBottom: '8px' }}>{label} *</label>
    <select {...props} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', outline: 'none' }}>
      <option value="">Select {label.toLowerCase()}</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default RegisterPage;
