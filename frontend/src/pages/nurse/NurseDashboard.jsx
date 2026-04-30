import React, { useState } from 'react';

// Enhanced SVG Icons for a more professional look
const Icons = {
  Dashboard: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>,
  Bell: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  MyAlerts: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  Patients: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Ward: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>,
  Profile: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Logout: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Trigger: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3l14 9-14 9V3z"/></svg>,
};

export default function NurseDashboard() {
  const [selectedCode, setSelectedCode] = useState('CODE BLUE');

  return (
    <div style={{ backgroundColor: '#f5f7fb', minHeight: '100vh', width: '100vw', fontFamily: '"Inter", sans-serif' }}>
      {/* Centered Top Title */}
      <div style={{ textAlign: 'center', padding: '10px 0', color: '#003399', fontWeight: '800', fontSize: '18px', letterSpacing: '1px' }}>
        NURSE DASHBOARD
      </div>

      <div style={{ display: 'flex', padding: '0 20px 20px 20px', height: 'calc(100vh - 44px)' }}>
        {/* Sidebar */}
        <aside style={{ 
          width: '240px', 
          backgroundColor: '#003366', 
          borderRadius: '15px', 
          marginRight: '20px', 
          display: 'flex', 
          flexDirection: 'column',
          color: 'white',
          overflow: 'hidden'
        }}>
          {/* Sidebar Header */}
          <div style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '5px' }}>
              <img src="https://img.icons8.com/color/48/hospital.png" alt="logo" style={{ width: '30px' }} />
            </div>
            <div>
              <div style={{ fontWeight: '800', fontSize: '14px' }}>HOSPITAL</div>
              <div style={{ fontSize: '9px', opacity: 0.7 }}>Emergency Alert System</div>
            </div>
          </div>

          {/* Sidebar Menu */}
          <nav style={{ padding: '10px' }}>
            <MenuItem icon={<Icons.Dashboard />} label="Dashboard" active />
            <MenuItem icon={<Icons.Bell />} label="New Alert" />
            <MenuItem icon={<Icons.MyAlerts />} label="My Alerts" />
            <MenuItem icon={<Icons.Patients />} label="Patients" />
            <MenuItem icon={<Icons.Ward />} label="Ward / Room" />
            <MenuItem icon={<Icons.Bell />} label="Notifications" />
            <MenuItem icon={<Icons.Profile />} label="Profile" />
          </nav>

          <div style={{ marginTop: 'auto', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#a0aec0', cursor: 'pointer' }}>
              <Icons.Logout />
              <span style={{ fontWeight: '600', fontSize: '14px' }}>Logout</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Top Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '15px 25px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img src="https://i.pravatar.cc/150?u=nurse" alt="nurse" style={{ width: '45px', borderRadius: '50%', border: '2px solid #e2e8f0' }} />
              <div>
                <div style={{ fontWeight: '800', fontSize: '16px', color: '#2d3748' }}>Welcome, Nurse Anjali</div>
                <div style={{ fontSize: '12px', color: '#718096' }}>Staff ID: NUR12345</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: '800', fontSize: '16px', color: '#2d3748' }}>10:24 AM</div>
              <div style={{ fontSize: '12px', color: '#718096' }}>20 May 2025</div>
            </div>
          </div>

          {/* Middle Row */}
          <div style={{ display: 'flex', gap: '20px', flex: 1 }}>
            {/* Create Alert Card */}
            <div style={{ flex: 2, backgroundColor: 'white', borderRadius: '15px', padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '14px', fontWeight: '800', color: '#2d3748' }}>CREATE NEW EMERGENCY ALERT</h3>
              
              <div style={{ marginBottom: '20px' }}>
                <p style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: '700', color: '#4a5568' }}>Select: Code</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <CodeButton label="CODE BLUE" sub="Cardiac Arrest" color="#0052cc" active={selectedCode === 'CODE BLUE'} onClick={() => setSelectedCode('CODE BLUE')} />
                  <CodeButton label="CODE RED" sub="Fire" color="#d73a49" active={selectedCode === 'CODE RED'} onClick={() => setSelectedCode('CODE RED')} />
                  <CodeButton label="CODE YELLOW" sub="Disaster" color="#f6ad55" active={selectedCode === 'CODE YELLOW'} onClick={() => setSelectedCode('CODE YELLOW')} />
                  <CodeButton label="CODE PINK" sub="Infant Emergency" color="#d53f8c" active={selectedCode === 'CODE PINK'} onClick={() => setSelectedCode('CODE PINK')} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                <InputGroup label="Floor" select options={['1st Floor', '2nd Floor', '3rd Floor']} />
                <InputGroup label="Ward" select options={['ICU', 'ER', 'General']} />
                <InputGroup label="Room / Bed No." placeholder="205" />
              </div>

              <div style={{ marginBottom: '25px' }}>
                <p style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: '700', color: '#4a5568' }}>Additional Notes (Optional)</p>
                <textarea placeholder="Enter details..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', height: '80px', resize: 'none', outline: 'none' }} />
              </div>

              <button style={{ width: '100%', backgroundColor: '#3182ce', color: 'white', border: 'none', borderRadius: '10px', padding: '15px', fontWeight: '800', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}>
                <Icons.Trigger />
                TRIGGER ALERT
              </button>
            </div>

            {/* Active Alerts Card */}
            <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '15px', padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '14px', fontWeight: '800', color: '#2d3748' }}>ACTIVE ALERTS</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', flex: 1 }}>
                <ActiveAlertCard code="CODE RED" type="Fire" location="2nd Floor, Main Building" time="10:18 AM" color="#fff5f5" borderColor="#feb2b2" iconColor="#f56565" />
                <ActiveAlertCard code="CODE BLUE" type="Cardiac Arrest" location="ICU, Room 205" time="10:17 AM" color="#ebf8ff" borderColor="#bee3f8" iconColor="#4299e1" />
                <ActiveAlertCard code="CODE YELLOW" type="Disaster" location="Ground Floor" time="10:05 AM" color="#fffaf0" borderColor="#fbd38d" iconColor="#ed8936" />
              </div>
              <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <span style={{ color: '#3182ce', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>View All Alerts &rarr;</span>
              </div>
            </div>
          </div>

          {/* Bottom Table */}
          <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '14px', fontWeight: '800', color: '#2d3748' }}>MY RECENT ALERTS</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #edf2f7', textAlign: 'left' }}>
                  <th style={{ padding: '10px', fontSize: '13px', color: '#718096', fontWeight: '700' }}>Code</th>
                  <th style={{ padding: '10px', fontSize: '13px', color: '#718096', fontWeight: '700' }}>Location</th>
                  <th style={{ padding: '10px', fontSize: '13px', color: '#718096', fontWeight: '700' }}>Room / Bed</th>
                  <th style={{ padding: '10px', fontSize: '13px', color: '#718096', fontWeight: '700' }}>Time</th>
                  <th style={{ padding: '10px', fontSize: '13px', color: '#718096', fontWeight: '700' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                <TableRow code="CODE BLUE" location="ICU" room="205" time="10:17 AM" status="Active" color="#3182ce" />
                <TableRow code="CODE PINK" location="NICU" room="12" time="09:48 AM" status="Resolved" color="#d53f8c" />
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

function MenuItem({ icon, label, active }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 20px', borderRadius: '10px',
      backgroundColor: active ? '#1a4e8d' : 'transparent',
      color: active ? 'white' : '#cbd5e0',
      cursor: 'pointer', marginBottom: '5px', transition: '0.2s'
    }}>
      {icon}
      <span style={{ fontWeight: '600', fontSize: '14px' }}>{label}</span>
    </div>
  );
}

function CodeButton({ label, sub, color, active, onClick }) {
  return (
    <div onClick={onClick} style={{
      flex: 1, backgroundColor: color, borderRadius: '10px', padding: '15px 10px', textAlign: 'center', cursor: 'pointer',
      border: active ? '3px solid #2d3748' : 'none', opacity: active ? 1 : 0.8, color: 'white', transition: '0.2s'
    }}>
      <div style={{ fontWeight: '800', fontSize: '13px' }}>{label}</div>
      <div style={{ fontSize: '10px', opacity: 0.8 }}>{sub}</div>
    </div>
  );
}

function InputGroup({ label, placeholder, select, options }) {
  return (
    <div style={{ flex: 1 }}>
      <p style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: '700', color: '#4a5568' }}>{label}</p>
      {select ? (
        <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', outline: 'none' }}>
          {options.map(opt => <option key={opt}>{opt}</option>)}
        </select>
      ) : (
        <input type="text" placeholder={placeholder} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', outline: 'none' }} />
      )}
    </div>
  );
}

function ActiveAlertCard({ code, type, location, time, color, borderColor, iconColor }) {
  return (
    <div style={{ backgroundColor: color, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '15px', display: 'flex', gap: '15px', alignItems: 'center' }}>
      <div style={{ backgroundColor: iconColor, borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icons.Bell />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: '800', fontSize: '13px', color: iconColor }}>{code}</div>
            <div style={{ fontSize: '11px', color: iconColor }}>{type}</div>
          </div>
          <div style={{ color: '#e53e3e', fontSize: '10px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '6px', height: '6px', backgroundColor: '#e53e3e', borderRadius: '50%' }}></div>
            ACTIVE
          </div>
        </div>
        <div style={{ fontSize: '11px', color: '#718096', marginTop: '8px' }}>{location}</div>
        <div style={{ fontSize: '10px', color: '#a0aec0', marginTop: '3px' }}>{time}</div>
      </div>
    </div>
  );
}

function TableRow({ code, location, room, time, status, color }) {
  return (
    <tr style={{ borderBottom: '1px solid #f7fafc' }}>
      <td style={{ padding: '15px 10px', fontWeight: '800', fontSize: '14px', color }}>{code}</td>
      <td style={{ padding: '15px 10px', fontSize: '13px', color: '#4a5568' }}>{location}</td>
      <td style={{ padding: '15px 10px', fontSize: '13px', color: '#4a5568' }}>{room}</td>
      <td style={{ padding: '15px 10px', fontSize: '14px', color: '#2d3748', fontWeight: '700' }}>{time}</td>
      <td style={{ padding: '15px 10px' }}>
        <div style={{ 
          backgroundColor: status === 'Active' ? '#ebf8ff' : '#f0fff4',
          color: status === 'Active' ? '#3182ce' : '#38a169',
          borderRadius: '5px', padding: '5px 10px', fontSize: '12px', fontWeight: '800', display: 'inline-block'
        }}>{status}</div>
      </td>
    </tr>
  );
}
