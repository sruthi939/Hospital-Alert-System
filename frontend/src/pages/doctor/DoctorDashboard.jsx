import { useState, useEffect } from 'react';
import { Home, BadgeAlert, ClipboardList, User, Users, Bell, LogOut, HeartPulse, Flame, ShieldPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAlerts } from '../../context/AlertContext';

const DoctorDashboard = () => {
  const { user, logout } = useAuth();
  const { activeAlerts, recentAlerts } = useAlerts();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const doctorName = user?.name || "Doctor";
  const doctorDept = user?.department || "General";
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(doctorName)}&backgroundColor=0A432F&textColor=ffffff`;

  const getCodeColor = (code) => {
    const codeLower = (code || '').toLowerCase();
    if (codeLower.includes('blue')) return 'bg-[#0F52BA]';
    if (codeLower.includes('red')) return 'bg-[#DA2C38]';
    return 'bg-[#0F52BA]';
  };

  const getCodeIcon = (code) => {
    const codeLower = (code || '').toLowerCase();
    if (codeLower.includes('blue')) return <HeartPulse size={20} />;
    if (codeLower.includes('red')) return <Flame size={20} />;
    return <BadgeAlert size={20} />;
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return '--:--';
    const d = new Date(dateStr);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const calculateElapsed = (startTime) => {
    if (!startTime) return "00:00:00";
    const start = new Date(startTime).getTime();
    const now = new Date().getTime();
    const diff = Math.max(0, now - start);

    const hrs = Math.floor(diff / 3600000).toString().padStart(2, '0');
    const mins = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
    const secs = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');

    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="flex flex-col h-screen w-full bg-hospital-bg font-['Inter'] m-0 p-0 box-border text-gray-800">
      <div className="hidden">DOCTOR DASHBOARD</div>

      <div className="flex w-full h-full bg-white overflow-hidden">
        {/* SIDEBAR */}
        <aside className="w-[250px] bg-hospital-dark text-white flex flex-col shrink-0">
          <div className="flex items-center p-[30px_20px] gap-3">
            <ShieldPlus size={36} className="text-white" />
            <div>
              <h2 className="m-0 text-[18px] font-bold tracking-[0.5px]">HOSPITAL</h2>
              <p className="m-0 text-[10px] text-[#a0d8c0] font-medium">Emergency Alert System</p>
            </div>
          </div>

          <nav className="flex flex-col py-2.5 grow">
            <div className="flex items-center p-[16px_24px] gap-4 cursor-pointer transition-all text-sm font-medium hover:bg-white/5 bg-hospital-light rounded-r-lg mr-4">
              <Home size={20} />
              <span>Dashboard</span>
            </div>
            <div className="flex items-center p-[16px_24px] gap-4 cursor-pointer transition-all text-sm font-medium hover:bg-white/5 relative">
              <BadgeAlert size={20} />
              <span>Active Alerts</span>
              {activeAlerts?.length > 0 && <span className="bg-red-500 text-white text-[11px] font-bold py-0.5 px-1.5 rounded-[10px] ml-auto">{activeAlerts.length}</span>}
            </div>
            <div className="flex items-center p-[16px_24px] gap-4 cursor-pointer transition-all text-sm font-medium hover:bg-white/5">
              <ClipboardList size={20} />
              <span>My Responses</span>
            </div>
            <div className="flex items-center p-[16px_24px] gap-4 cursor-pointer transition-all text-sm font-medium hover:bg-white/5">
              <User size={20} />
              <span>Patient Details</span>
            </div>
            <div className="flex items-center p-[16px_24px] gap-4 cursor-pointer transition-all text-sm font-medium hover:bg-white/5">
              <Users size={20} />
              <span>Team Directory</span>
            </div>
            <div className="flex items-center p-[16px_24px] gap-4 cursor-pointer transition-all text-sm font-medium hover:bg-white/5 relative">
              <Bell size={20} />
              <span>Notifications</span>
              {recentAlerts?.length > 0 && <span className="bg-red-500 text-white text-[11px] font-bold py-0.5 px-1.5 rounded-[10px] ml-auto">{recentAlerts.length}</span>}
            </div>
            <div className="flex items-center p-[16px_24px] gap-4 cursor-pointer transition-all text-sm font-medium hover:bg-white/5">
              <User size={20} />
              <span>Profile</span>
            </div>
            <div className="flex items-center p-[16px_24px] gap-4 cursor-pointer transition-all text-sm font-medium hover:bg-white/5 mt-auto" onClick={logout}>
              <LogOut size={20} />
              <span>Logout</span>
            </div>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="grow p-[30px_40px] flex flex-col bg-hospital-bg overflow-y-auto">
          <header className="flex justify-between items-start mb-[30px]">
            <div className="flex items-center gap-4">
              <div>
                <img src={avatarUrl} alt="Doctor Avatar" className="w-[50px] h-[50px] rounded-full border-2 border-hospital-border bg-white" />
              </div>
              <div>
                <h1 className="m-0 mb-1 text-[18px] font-bold">Welcome, Dr. {doctorName}</h1>
                <p className="m-0 text-[13px] text-gray-500">{doctorDept}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-[14px] font-bold">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                <div className="text-[11px] text-gray-500 mt-0.5">{currentTime.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
              </div>
              <div className="relative text-gray-800 cursor-pointer">
                <Bell size={24} />
                {(activeAlerts?.length || recentAlerts?.length) > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-hospital-bg">{(activeAlerts?.length || 0) + (recentAlerts?.length || 0)}</span>}
              </div>
            </div>
          </header>

          <div className="flex flex-col gap-[30px] bg-white p-6 rounded-lg border border-hospital-border">
            <section className="flex flex-col gap-4">
              <h2 className="text-[13px] font-bold text-gray-600 m-0 mb-1 tracking-[0.5px]">ACTIVE EMERGENCY ALERTS</h2>

              {!activeAlerts || activeAlerts.length === 0 ? (
                <div className="p-5 text-center text-gray-500 bg-hospital-bg rounded-lg border border-hospital-border">
                  No active emergency alerts at this time.
                </div>
              ) : (
                activeAlerts.map(alert => (
                  <div key={alert.id || Math.random()} className="border border-hospital-border rounded-lg overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                    <div className={`flex items-center gap-3 p-[12px_20px] text-white ${getCodeColor(alert.code_type)}`}>
                      {getCodeIcon(alert.code_type)}
                      <h3 className="m-0 text-[14px] font-semibold tracking-[0.5px]">{alert.code_type} - {alert.notes || 'Emergency Alert'}</h3>
                    </div>
                    <div className="flex justify-between p-5 bg-white">
                      <div className="flex flex-col gap-2.5 min-w-[280px]">
                        <div className="flex text-[13px]">
                          <span className="text-gray-500 w-[90px] shrink-0">Location</span>
                          <span className="text-gray-500 mr-4">:</span>
                          <span className="font-semibold text-gray-800">{alert.floor || '-'}, {alert.ward || 'General'}</span>
                        </div>
                        <div className="flex text-[13px]">
                          <span className="text-gray-500 w-[90px] shrink-0">Room / Bed</span>
                          <span className="text-gray-500 mr-4">:</span>
                          <span className="font-semibold text-gray-800">{alert.room || '-'}</span>
                        </div>
                        <div className="flex text-[13px]">
                          <span className="text-gray-500 w-[90px] shrink-0">Triggered By</span>
                          <span className="text-gray-500 mr-4">:</span>
                          <span className="font-semibold text-gray-800">{alert.triggered_by || 'System'}</span>
                        </div>
                        <div className="flex text-[13px]">
                          <span className="text-gray-500 w-[90px] shrink-0">Time</span>
                          <span className="text-gray-500 mr-4">:</span>
                          <span className="font-semibold text-gray-800">{formatTime(alert.created_at)}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-center gap-4">
                        <div className="text-center">
                          <h4 className="m-0 mb-1 text-[22px] font-bold tracking-[1px]">{calculateElapsed(alert.created_at)}</h4>
                          <p className="m-0 text-[11px] text-gray-500">Time Elapsed</p>
                        </div>
                        <div className="flex gap-3">
                          <button className="px-5 py-2.5 rounded text-[12px] font-semibold cursor-pointer transition-colors tracking-[0.5px] bg-[#0a9351] text-white border-none hover:bg-[#087d44]">ACCEPT</button>
                          <button className="px-5 py-2.5 rounded text-[12px] font-semibold cursor-pointer transition-colors tracking-[0.5px] bg-white text-blue-500 border border-blue-500 hover:bg-blue-50">VIEW DETAILS</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}

            </section>

            <section>
              <h2 className="text-[13px] font-bold text-gray-600 m-0 mb-4 tracking-[0.5px]">MY RESPONSES</h2>
              <div className="border border-hospital-border rounded-lg overflow-hidden bg-white">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="bg-hospital-bg text-left p-[14px_20px] text-[12px] font-semibold text-gray-800 border-b border-hospital-border">Code</th>
                      <th className="bg-hospital-bg text-left p-[14px_20px] text-[12px] font-semibold text-gray-800 border-b border-hospital-border">Location</th>
                      <th className="bg-hospital-bg text-left p-[14px_20px] text-[12px] font-semibold text-gray-800 border-b border-hospital-border">Room / Bed</th>
                      <th className="bg-hospital-bg text-left p-[14px_20px] text-[12px] font-semibold text-gray-800 border-b border-hospital-border">Status</th>
                      <th className="bg-hospital-bg text-left p-[14px_20px] text-[12px] font-semibold text-gray-800 border-b border-hospital-border">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!recentAlerts || recentAlerts.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center text-gray-500 p-[16px_20px]">No recent responses recorded.</td>
                      </tr>
                    ) : (
                      recentAlerts.map(alert => (
                        <tr key={alert.id || Math.random()} className="border-b border-gray-100 last:border-b-0">
                          <td className={`p-[16px_20px] text-[13px] font-medium ${alert.code_type?.toLowerCase().includes('blue') ? 'text-blue-600' : alert.code_type?.toLowerCase().includes('pink') ? 'text-pink-600' : ''}`}>
                            {alert.code_type || 'ALERT'}
                          </td>
                          <td className="p-[16px_20px] text-[13px]">{alert.ward || 'General'}</td>
                          <td className="p-[16px_20px] text-[13px]">{alert.room || '-'}</td>
                          <td className={`p-[16px_20px] text-[13px] font-medium ${alert.status === 'Resolved' ? 'text-green-500' : 'text-amber-500'}`}>
                            {alert.status || 'In Progress'}
                          </td>
                          <td className="p-[16px_20px] text-[13px]">{formatTime(alert.created_at)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <div className="p-[14px_20px] text-right border-t border-gray-100 bg-hospital-bg">
                  <a href="#" className="text-blue-500 no-underline text-[12px] font-semibold hover:underline">View All Responses &rarr;</a>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
