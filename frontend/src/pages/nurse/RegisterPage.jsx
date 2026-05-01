import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Icons = {
  User: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  Mail: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  Phone: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  Lock: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
  IdCard: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" /><line x1="7" y1="8" x2="17" y2="8" /><line x1="7" y1="12" x2="17" y2="12" /><line x1="7" y1="16" x2="11" y2="16" /></svg>,
  Badge: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z" /></svg>,
  Headset: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>,
  UserPlus: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></svg>,
  AdminReview: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><circle cx="18" cy="11" r="3" /><path d="M18 14v-3" /></svg>,
  CheckCircle: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
  ArrowLeft: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>,
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(localStorage.getItem('registration_pending') === 'true');
  const [currentStatus, setCurrentStatus] = useState('PENDING');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '',
    staffId: '', license_no: ''
  });


  // POLLING LOGIC: Check for approval automatically
  useEffect(() => {
    let interval;
    if (isSubmitted) {
      const email = localStorage.getItem('pending_email');
      if (email) {
        interval = setInterval(async () => {
          try {
            const response = await fetch(`http://localhost:5000/api/auth/status/${email}`);
            if (response.ok) {
              const data = await response.json();
              setCurrentStatus(data.status);
              const status = (data.status || '').toUpperCase();
              if (status === 'APPROVED' || status === 'ACTIVE') {
                setTimeout(() => {
                  localStorage.removeItem('registration_pending');
                  localStorage.removeItem('pending_email');
                  navigate('/login');
                }, 2000); // Give 2 seconds to see the green check
              }
            }
          } catch (err) {
            console.error("Polling error:", err);
          }
        }, 5000); 
      }
    }
    return () => clearInterval(interval);
  }, [isSubmitted, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: 'Nurse' }),
      });
      if (response.ok) {
        localStorage.setItem('registration_pending', 'true');
        localStorage.setItem('pending_email', formData.email);
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isSubmitted) {
    return (
      <div style={{ height: '100vh', width: '100vw', backgroundColor: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Inter", sans-serif' }}>
        <div style={{ width: '100%', maxWidth: '700px', backgroundColor: 'white', padding: '60px', borderRadius: '25px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
          <h2 style={{ textAlign: 'center', color: '#003399', fontWeight: '800', fontSize: '24px', marginBottom: '50px', letterSpacing: '0.5px' }}>ACCESS REQUEST FLOW</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            <TimelineStep number="1" icon={<Icons.UserPlus />} title="Nurse Registration" desc="Nurse fills the registration form and submits the request." status="completed" />
            <TimelineStep number="2" icon={<Icons.Mail />} title="Request Submitted" desc="System stores the request and sends notification to Admin." status="completed" />
            <TimelineStep number="3" icon={<Icons.AdminReview />} title="Admin Review" desc="Admin reviews the details and either approves or rejects." status={(currentStatus || '').toUpperCase() === 'ACTIVE' || (currentStatus || '').toUpperCase() === 'APPROVED' ? 'completed' : 'active'} />
            <TimelineStep number="4" icon={<Icons.CheckCircle />} title="Access Granted" desc="Nurse receives approval and can login to the system." status={(currentStatus || '').toUpperCase() === 'ACTIVE' || (currentStatus || '').toUpperCase() === 'APPROVED' ? 'completed' : 'pending'} isLast={true} lastColor="#059669" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', width: '100vw', backgroundColor: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '900px', backgroundColor: 'white', borderRadius: '25px', boxShadow: '0 15px 50px rgba(0,0,0,0.05)', overflow: 'hidden' }}>

        {/* Header with Navigation */}
        <div style={{ padding: '30px 40px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ backgroundColor: '#eff6ff', borderRadius: '8px', padding: '6px' }}>
              <img src="https://img.icons8.com/color/48/hospital.png" alt="logo" style={{ width: '28px' }} />
            </div>
            <div>
              <div style={{ fontWeight: '800', fontSize: '16px', color: '#001a3d', letterSpacing: '0.5px' }}>HOSPITAL</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Emergency Alert System</div>
            </div>
          </div>
          <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
            <Icons.ArrowLeft /> Back to Login
          </button>
        </div>

        <div style={{ padding: '50px 60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
              <img src="https://img.icons8.com/color/48/nurse.png" alt="nurse" style={{ width: '36px' }} />
            </div>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '32px', fontWeight: '800', color: '#0f172a' }}>Nurse Registration</h2>
            <p style={{ margin: 0, fontSize: '15px', color: '#64748b' }}>Create your account to request access to the system.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
                <div style={{ backgroundColor: '#2563eb', borderRadius: '50%', width: '26px', height: '26px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 'bold' }}>1</div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#2563eb', textTransform: 'uppercase' }}>1. Basic Information</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                <InputWithIcon label="Full Name" icon={<Icons.User />}
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <InputWithIcon label="Email Address" icon={<Icons.Mail />}
                  placeholder="Enter your email address"
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <InputWithIcon label="Phone Number" icon={<Icons.Phone />}
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <InputWithIcon label="Password" icon={<Icons.Lock />}
                  placeholder="Enter your password"
                  type="password" value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </section>

            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
                <div style={{ backgroundColor: '#2563eb', borderRadius: '50%', width: '26px', height: '26px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 'bold' }}>2</div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#2563eb', textTransform: 'uppercase' }}>2. Professional Verification</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                <InputWithIcon label="Employee ID" icon={<Icons.IdCard />}
                  placeholder="Enter Employee ID"
                  value={formData.staffId}
                  onChange={e => setFormData({ ...formData, staffId: e.target.value })}
                  required
                />
                <InputWithIcon label="License Number" icon={<Icons.Badge />}
                  placeholder="Enter Medical License No."
                  value={formData.license_no}
                  onChange={e => setFormData({ ...formData, license_no: e.target.value })}
                  required
                />
              </div>
            </section>

            <section>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ backgroundColor: '#2563eb', borderRadius: '50%', width: '26px', height: '26px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 'bold' }}>3</div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#2563eb', textTransform: 'uppercase' }}>3. Access Request</h3>
              </div>
              <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '20px', fontSize: '14px', color: '#1e40af', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ color: '#2563eb' }}><Icons.AdminReview /></div>
                <span>Your account will be sent for admin approval. You will be notified once approved.</span>
              </div>
            </section>

            <button type="submit" style={{ width: '100%', backgroundColor: '#003366', color: 'white', border: 'none', borderRadius: '12px', padding: '18px', fontWeight: '800', fontSize: '16px', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 15px rgba(0, 51, 102, 0.2)' }}>
              Submit Registration Request
            </button>
          </form>

          {/* Footer Help */}
          <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#64748b' }}>
              <Icons.Headset />
              <span style={{ fontSize: '14px' }}>Need assistance? <strong>Contact Admin</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TimelineStep = ({ number, icon, title, desc, status, isLast }) => {
  const isCompleted = status === 'completed';
  const isActive = status === 'active';
  const textColor = isCompleted || isActive ? '#003399' : '#94a3b8';

  return (
    <div style={{ display: 'flex', gap: '30px', position: 'relative', paddingBottom: isLast ? '0' : '40px' }}>
      {!isLast && (
        <div style={{ position: 'absolute', left: '16px', top: '35px', bottom: '0', width: '2px', borderLeft: '2px dashed #e2e8f0' }}></div>
      )}
      <div style={{
        width: '34px', height: '34px', borderRadius: '50%',
        backgroundColor: number === "4" && isCompleted ? "#059669" : (status === "pending" ? "#e2e8f0" : "#2563eb"),
        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px', zIndex: 2
      }}>{number}</div>
      <div style={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: isCompleted || isActive ? '#eff6ff' : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1px solid ${isCompleted || isActive ? '#bfdbfe' : '#f1f5f9'}` }}>{icon}</div>
      <div style={{ flex: 1, paddingTop: '4px' }}>
        <h4 style={{ margin: '0 0 6px 0', fontSize: '17px', fontWeight: '800', color: number === "4" && isCompleted ? "#059669" : textColor }}>{title}</h4>
        <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: '1.4' }}>{desc}</p>
      </div>
    </div>
  );
};

const InputWithIcon = ({ label, icon, ...props }) => (
  <div style={{ flex: 1 }}>
    <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>{label} *</label>
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>{icon}</div>
      <input {...props} style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', outline: 'none', fontSize: '14px', transition: 'border-color 0.2s' }} />
    </div>
  </div>
);
