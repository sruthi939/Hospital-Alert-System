import React from 'react';
import Header from '../../components/Header';
import AlertForm from '../../components/AlertForm';
import AlertCard from '../../components/AlertCard';
import RecentAlertsTable from '../../components/RecentAlertsTable';
import { useAlerts } from '../../context/AlertContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const NurseDashboard = () => {
  const [activeTab, setActiveTab] = React.useState('Dashboard');
  const { activeAlerts, recentAlerts } = useAlerts();
  const { user, logout } = useAuth();
  const [patients, setPatients] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (activeTab === 'Patients') {
      fetch('http://localhost:5001/api/patients')
        .then(res => res.json())
        .then(setPatients)
        .catch(err => console.error(err));
    }
  }, [activeTab]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'History':
        return (
          <div className="bg-white p-[30px] rounded-[20px] border border-[#e2e8f0]">
            <h3 className="m-0 mb-[20px] text-[#001a3d]">Alert History</h3>
            <RecentAlertsTable alerts={recentAlerts} />
          </div>
        );
      case 'Patients':
        return (
          <div className="bg-white p-[30px] rounded-[20px] border border-[#e2e8f0]">
            <h3 className="m-0 mb-[20px] text-[#001a3d]">Patient Directory</h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[20px]">
              {Array.isArray(patients) && patients.length > 0 ? patients.map(p => (
                <div key={p.id} className="p-[20px] border border-[#f1f5f9] rounded-[15px] bg-[#f8fafc]">
                  <div className="font-[800] text-[#1e293b] text-[16px] mb-[5px]">{p.name}</div>
                  <div className="text-[13px] text-[#64748b]">Age: {p.age} | Room: <span className="font-[700] text-[#3b82f6]">{p.room}</span></div>
                  <div className="mt-[10px] text-[13px] text-[#475569]">{p.condition_summary}</div>
                </div>
              )) : (
                <div className="text-[#64748b] text-[14px]">No patients found or error loading data.</div>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-[1fr_380px] gap-[30px]">
            <div className="flex flex-col gap-[30px]">
              <AlertForm onAlertTriggered={() => setActiveTab('Dashboard')} />
              <RecentAlertsTable alerts={recentAlerts.slice(0, 5)} />
            </div>
            <div className="flex flex-col gap-[20px]">
              <div className="flex items-center gap-[10px] mb-[10px]">
                <div className="w-[8px] h-[8px] bg-[#ef4444] rounded-full animate-[pulse_2s_infinite]"></div>
                <h3 className="m-0 text-[15px] font-[800] text-[#1e293b] uppercase">Active Alerts</h3>
              </div>
              {activeAlerts.length === 0 ? (
                <div className="p-[40px] text-center bg-white rounded-[20px] border border-[#e2e8f0] text-[#64748b] text-[14px]">
                  <img src="https://img.icons8.com/color/48/checked-checkbox.png" alt="no alerts" className="w-[40px] opacity-30 mb-[15px] inline-block" />
                  <div>All clear. No active alerts.</div>
                </div>
              ) : (
                activeAlerts.map(alert => (
                  <AlertCard key={alert.id} alert={alert} />
                ))
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-[#f0f4f8] min-h-screen font-sans">
      <nav className="bg-[#001a3d] px-[40px] py-[15px] text-white flex justify-between items-center shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-[12px]">
          <div className="bg-white rounded-[8px] p-[6px]"><img src="https://img.icons8.com/color/48/hospital.png" alt="logo" className="w-[24px]" /></div>
          <div><div className="font-[800] text-[15px] tracking-[0.5px]">HOSPITAL</div><div className="text-[10px] opacity-70">Emergency Alert System</div></div>
        </div>
        <div className="flex items-center gap-[25px]">
          <div className="flex gap-[20px] text-[14px] font-[600]">
            {['Dashboard', 'History', 'Patients'].map(tab => (
              <span 
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{ borderBottom: activeTab === tab ? '2px solid #3b82f6' : 'none', opacity: activeTab === tab ? 1 : 0.7 }}
                className="pb-[4px] cursor-pointer transition-all duration-200"
              >
                {tab}
              </span>
            ))}
          </div>
          <button onClick={handleLogout} className="bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] text-white px-[18px] py-[8px] rounded-[8px] text-[13px] font-[700] cursor-pointer">Logout</button>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-[40px] py-[30px] flex flex-col gap-[30px]">
        <Header user={user} />
        {renderContent()}
      </main>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
      `}</style>
    </div>
  );
};

export default NurseDashboard;
