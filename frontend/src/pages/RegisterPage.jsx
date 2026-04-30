import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Professional SVG Icons for the form
const Icons = {
  User: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Mail: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Phone: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Lock: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Eye: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  IdCard: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="16" x2="11" y2="16"/></svg>,
  Badge: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z"/></svg>,
  Calendar: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Heartbeat: () => <svg width="120" height="60" viewBox="0 0 120 60" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2"><path d="M0 30h20l5-15 10 45 10-60 10 30h65"/></svg>,
  Headset: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>,
  Step1: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="#2563eb"><circle cx="12" cy="12" r="10" fill="#2563eb"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="1.5"/><circle cx="12" cy="7" r="3" stroke="white" strokeWidth="1.5"/></svg>,
  Step2: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="#2563eb"><circle cx="12" cy="12" r="10" fill="#2563eb"/><rect x="7" y="7" width="10" height="10" rx="1" stroke="white" strokeWidth="1.5"/><path d="M10 10h4" stroke="white" strokeWidth="1.5"/></svg>,
  Step3: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="#2563eb"><circle cx="12" cy="12" r="10" fill="#2563eb"/><path d="M9 11l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Step4: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="#2563eb"><circle cx="12" cy="12" r="10" fill="#2563eb"/><path d="M12 7v5l3 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
    staffId: '', license_no: '', designation: '', experience: ''
  });

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: 'white', fontFamily: '"Inter", sans-serif', overflow: 'hidden' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '280px', backgroundColor: '#001a3d', color: 'white', display: 'flex', flexDirection: 'column', position: 'relative', flexShrink: 0 }}>
        <div style={{ padding: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '6px' }}>
               <img src="https://img.icons8.com/color/48/hospital.png" alt="logo" style={{ width: '24px' }} />
            </div>
            <div>
              <div style={{ fontWeight: '800', fontSize: '15px', letterSpacing: '0.5px' }}>HOSPITAL</div>
              <div style={{ fontSize: '10px', opacity: 0.7 }}>Emergency Alert System</div>
            </div>
          </div>
          
          <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer', padding: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Login
          </button>
        </div>

        {/* Heartbeat Graphic */}
        <div style={{ position: 'absolute', top: '50%', left: '0', width: '100%', transform: 'translateY(-50%)', opacity: 0.5 }}>
          <Icons.Heartbeat />
        </div>

        {/* Footer Help */}
        <div style={{ marginTop: 'auto', padding: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'white' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%', padding: '10px' }}>
              <Icons.Headset />
            </div>
            <div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>Need Help?</div>
              <div style={{ fontSize: '13px', fontWeight: '700' }}>Contact Admin</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Registration Content */}
      <main style={{ flex: 1, height: '100vh', overflowY: 'auto', padding: '40px 60px', borderLeft: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ width: '60px', height: '60px', backgroundColor: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto' }}>
               <img src="https://img.icons8.com/color/48/nurse.png" alt="nurse" style={{ width: '32px' }} />
            </div>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>Nurse Registration</h2>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Create your account to request access to the system.</p>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Your request will be reviewed by the admin.</p>
          </div>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
            
            {/* Step 1: Basic Info */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <Icons.Step1 />
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.5px' }}>1. Basic Information</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <InputWithIcon label="Full Name" icon={<Icons.User />} placeholder="Enter full name" required />
                <InputWithIcon label="Email Address" icon={<Icons.Mail />} placeholder="Enter email address" type="email" required />
                <InputWithIcon label="Phone Number" icon={<Icons.Phone />} placeholder="Enter phone number" required />
                <InputWithIcon label="Password" icon={<Icons.Lock />} placeholder="Enter password" type="password" rightIcon={<Icons.Eye />} required />
              </div>
              <div style={{ marginTop: '20px' }}>
                <InputWithIcon label="Confirm Password" icon={<Icons.Lock />} placeholder="Confirm your password" type="password" rightIcon={<Icons.Eye />} required />
              </div>
            </section>

            {/* Step 2: Professional Verification */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <Icons.Step2 />
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.5px' }}>2. Professional Verification</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <InputWithIcon label="Employee ID" icon={<Icons.IdCard />} placeholder="Enter employee ID" required />
                <InputWithIcon label="License / Registration Number" icon={<Icons.Badge />} placeholder="Enter license or registration number" required />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>Designation *</label>
                <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', outline: 'none', color: '#64748b' }}>
                  <option>Select your designation</option>
                  <option>Senior Nurse</option>
                  <option>Staff Nurse</option>
                </select>
              </div>
              <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '12px 15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ backgroundColor: 'white', borderRadius: '50%', padding: '4px', display: 'flex' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                </div>
                <span style={{ fontSize: '13px', color: '#1e40af', fontWeight: '500' }}>
                  <b>Note:</b> Please enter your valid license/registration number as issued by the Nursing Council.
                </span>
              </div>
            </section>

            {/* Step 3: Additional Info */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <Icons.Step3 />
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.5px' }}>3. Additional Information (Optional)</h3>
              </div>
              <InputWithIcon label="Years of Experience" icon={<Icons.Calendar />} placeholder="Enter years of experience" />
            </section>

            {/* Step 4: Access Request */}
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <Icons.Step4 />
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.5px' }}>4. Access Request</h3>
              </div>
              <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '15px 20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ backgroundColor: 'white', borderRadius: '50%', padding: '6px', display: 'flex' }}>
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                </div>
                <div style={{ fontSize: '13px', color: '#1e40af', lineHeight: '1.5' }}>
                  Your account will be sent for admin approval.<br/>
                  You will be notified once your access is approved.
                </div>
              </div>
            </section>

            {/* Footer */}
            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
                <input type="checkbox" style={{ width: '18px', height: '18px' }} required />
                <span style={{ fontSize: '14px', color: '#475569' }}>
                  I agree to the <span style={{ color: '#2563eb', fontWeight: '700' }}>Terms & Conditions</span> and <span style={{ color: '#2563eb', fontWeight: '700' }}>Privacy Policy</span> *
                </span>
              </div>

              <button type="submit" style={{ 
                width: '100%', backgroundColor: '#0052cc', color: 'white', border: 'none', borderRadius: '10px', 
                padding: '16px', fontWeight: '800', fontSize: '16px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                boxShadow: '0 4px 6px -1px rgba(0, 82, 204, 0.3)'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                Submit Registration Request
              </button>

              <div style={{ textAlign: 'center', marginTop: '25px', fontSize: '15px', color: '#64748b' }}>
                Already have an account? <span onClick={() => navigate('/login')} style={{ color: '#2563eb', fontWeight: '800', cursor: 'pointer' }}>Login here</span>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

const InputWithIcon = ({ label, icon, rightIcon, required, ...props }) => (
  <div style={{ flex: 1 }}>
    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
      {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
    </label>
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
        {icon}
      </div>
      <input 
        {...props} 
        style={{ 
          width: '100%', padding: '12px 12px 12px 42px', borderRadius: '8px', border: '1px solid #e2e8f0', 
          backgroundColor: '#f8fafc', outline: 'none', color: '#334155', fontSize: '14px' 
        }} 
      />
      {rightIcon && (
        <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', display: 'flex', cursor: 'pointer' }}>
          {rightIcon}
        </div>
      )}
    </div>
  </div>
);
