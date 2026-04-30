import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Icons = {
  User: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  Mail: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  Phone: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  Lock: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
  Eye: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
  IdCard: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" /><line x1="7" y1="8" x2="17" y2="8" /><line x1="7" y1="12" x2="17" y2="12" /><line x1="7" y1="16" x2="11" y2="16" /></svg>,
  Badge: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z" /></svg>,
  Calendar: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
  Heartbeat: () => <svg width="120" height="60" viewBox="0 0 120 60" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2"><path d="M0 30h20l5-15 10 45 10-60 10 30h65" /></svg>,
  Headset: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>,
  UserPlus: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></svg>,
  AdminReview: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><circle cx="18" cy="11" r="3" /><path d="M18 14v-3" /></svg>,
  CheckCircle: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
    staffId: '', license_no: '', designation: '', experience: ''
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
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isSubmitted) {
    return (
      <div style={{ height: '100vh', width: '100vw', backgroundColor: '#f5f7fb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Inter", sans-serif' }}>
        <div style={{ width: '100%', maxWidth: '700px', backgroundColor: 'white', padding: '60px', borderRadius: '25px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
          <h2 style={{ textAlign: 'center', color: '#003399', fontWeight: '800', fontSize: '24px', marginBottom: '50px', letterSpacing: '0.5px' }}>ACCESS REQUEST FLOW</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            <TimelineStep
              number="1"
              icon={<Icons.UserPlus />}
              title="Nurse Registration"
              desc="Nurse fills the registration form and submits the request."
              status="completed"
            />
            <TimelineStep
              number="2"
              icon={<Icons.Mail />}
              title="Request Submitted"
              desc="System stores the request and sends notification to Admin."
              status="active"
              isLast={false}
            />
            <TimelineStep
              number="3"
              icon={<Icons.AdminReview />}
              title="Admin Review"
              desc="Admin reviews the details and either approves or rejects."
              status="pending"
            />
            <TimelineStep
              number="4"
              icon={<Icons.CheckCircle />}
              title="Access Granted"
              desc="Nurse receives approval and can login to the system."
              status="pending"
              isLast={true}
              lastColor="#059669"
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button onClick={() => navigate('/login')} style={{ padding: '12px 30px', backgroundColor: '#003366', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: 'white', fontFamily: '"Inter", sans-serif', overflow: 'hidden' }}>
      {/* Sidebar (same as before) */}
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back to Login
          </button>
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '0', width: '100%', transform: 'translateY(-50%)', opacity: 0.5 }}><Icons.Heartbeat /></div>
        <div style={{ marginTop: 'auto', padding: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'white' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%', padding: '10px' }}><Icons.Headset /></div>
            <div><div style={{ fontSize: '12px', opacity: 0.8 }}>Need Help?</div><div style={{ fontSize: '13px', fontWeight: '700' }}>Contact Admin</div></div>
          </div>
        </div>
      </aside>

      {/* Main Form (same as before) */}
      <main style={{ flex: 1, height: '100vh', overflowY: 'auto', padding: '40px 60px', borderLeft: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ width: '60px', height: '60px', backgroundColor: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto' }}>
              <img src="https://img.icons8.com/color/48/nurse.png" alt="nurse" style={{ width: '32px' }} />
            </div>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>Nurse Registration</h2>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Create your account to request access to the system.</p>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
            {/* Form Fields... (Omitted for brevity in this scratch, but kept in final write) */}
            {/* I will keep the full form code below in the actual write_to_file */}
            {/* [REST OF FORM CODE] */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ backgroundColor: '#2563eb', borderRadius: '50%', width: '24px', height: '24px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>1</div>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#2563eb', textTransform: 'uppercase' }}>1. Basic Information</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <InputWithIcon label="Full Name" icon={<Icons.User />} placeholder="Enter full name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                  <InputWithIcon label="Email Address" icon={<Icons.Mail />} placeholder="Enter email address" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                  <InputWithIcon label="Phone Number" icon={<Icons.Phone />} placeholder="Enter phone number" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
                  <InputWithIcon label="Password" icon={<Icons.Lock />} placeholder="Enter password" type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required />
                </div>
              </section>
              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ backgroundColor: '#2563eb', borderRadius: '50%', width: '24px', height: '24px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>2</div>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#2563eb', textTransform: 'uppercase' }}>2. Professional Verification</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <InputWithIcon label="Employee ID" icon={<Icons.IdCard />} placeholder="Enter employee ID" value={formData.staffId} onChange={e => setFormData({ ...formData, staffId: e.target.value })} required />
                  <InputWithIcon label="License Number" icon={<Icons.Badge />} placeholder="Enter license number" value={formData.license_no} onChange={e => setFormData({ ...formData, license_no: e.target.value })} required />
                </div>
              </section>
              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ backgroundColor: '#2563eb', borderRadius: '50%', width: '24px', height: '24px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>3</div>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#2563eb', textTransform: 'uppercase' }}>3. Access Request</h3>
                </div>
                <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '15px 20px', fontSize: '13px', color: '#1e40af' }}>
                  Your account will be sent for admin approval. You will be notified once approved.
                </div>
              </section>
              <button type="submit" style={{ width: '100%', backgroundColor: '#0052cc', color: 'white', border: 'none', borderRadius: '10px', padding: '16px', fontWeight: '800', cursor: 'pointer' }}>
                Submit Registration Request
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

const TimelineStep = ({ number, icon, title, desc, status, isLast, lastColor }) => {
  const isActive = status === 'active';
  const isCompleted = status === 'completed';
  const circleColor = isCompleted ? '#2563eb' : isActive ? '#2563eb' : '#e2e8f0';
  const textColor = isCompleted || isActive ? '#003399' : '#94a3b8';
  const iconBg = isCompleted ? '#ebf8ff' : isActive ? '#ebf8ff' : '#f8fafc';

  return (
    <div style={{ display: 'flex', gap: '30px', position: 'relative', paddingBottom: isLast ? '0' : '40px' }}>
      {/* Connector Line */}
      {!isLast && (
        <div style={{ position: 'absolute', left: '16px', top: '35px', bottom: '0', width: '2px', borderLeft: '2px dashed #e2e8f0' }}></div>
      )}

      {/* Step Number Circle */}
      <div style={{
        width: '34px', height: '34px', borderRadius: '50%', backgroundColor: status === 'completed' || status === 'active' ? '#2563eb' : (lastColor && status === 'completed' ? lastColor : '#e2e8f0'),
        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px', zIndex: 2,
        backgroundColor: number === "4" && status === "completed" ? "#059669" : (status === "pending" ? "#e2e8f0" : "#2563eb")
      }}>
        {number}
      </div>

      {/* Icon Box */}
      <div style={{
        width: '60px', height: '60px', borderRadius: '12px', backgroundColor: iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        border: `1px solid ${isCompleted || isActive ? '#bfdbfe' : '#f1f5f9'}`
      }}>
        {icon}
      </div>

      {/* Text Info */}
      <div style={{ flex: 1, paddingTop: '4px' }}>
        <h4 style={{ margin: '0 0 6px 0', fontSize: '17px', fontWeight: '800', color: number === "4" && status === "completed" ? "#059669" : textColor }}>{title}</h4>
        <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: '1.4' }}>{desc}</p>
      </div>
    </div>
  );
};

const InputWithIcon = ({ label, icon, ...props }) => (
  <div style={{ flex: 1 }}>
    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>{label} *</label>
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>{icon}</div>
      <input {...props} style={{ width: '100%', padding: '12px 12px 12px 42px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', outline: 'none', fontSize: '14px' }} />
    </div>
  </div>
);
