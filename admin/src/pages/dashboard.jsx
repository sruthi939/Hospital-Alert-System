import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Clock, CheckCircle2, AlertCircle, UserPlus, PlusSquare, Settings, FileText, Search, ChevronRight, TrendingUp, MapPin, RefreshCw } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { initiateSocketConnection, subscribeToAlerts, disconnectSocket, joinAdminRoom } from '../services/socket';
import { adminService } from '../services/api';

const StatCard = ({ title, value, subtitle, color }) => (
  <div className="bg-white p-[1.5rem] rounded-[16px] flex-1 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#f1f5f9] hover-card transition-all">
    <p className="m-0 text-[0.875rem] text-[#64748b] font-[500]">{title}</p>
    <h3 className="my-[0.5rem] text-[2rem] font-[800]" style={{ color: color }}>{value}</h3>
    <p className="m-0 text-[0.75rem] text-[#94a3b8]">{subtitle}</p>
  </div>
);

const ActiveAlertItem = ({ alert, onResolve }) => {
  const { id, code, location, time, status } = alert;

  const colors = {
    'CODE RED': { bg: 'bg-[#fff1f2]', text: 'text-[#e11d48]', border: 'border-[#fecdd3]', icon: <AlertCircle size={18} /> },
    'CODE BLUE': { bg: 'bg-[#eff6ff]', text: 'text-[#2563eb]', border: 'border-[#dbeafe]', icon: <Bell size={18} /> },
    'CODE YELLOW': { bg: 'bg-[#fffbeb]', text: 'text-[#d97706]', border: 'border-[#fef3c7]', icon: <AlertCircle size={18} /> },
    'CODE PINK': { bg: 'bg-[#fdf2f8]', text: 'text-[#db2777]', border: 'border-[#fbcfe8]', icon: <Heart size={18} /> }
  };

  const style = colors[code.toUpperCase()] || colors['CODE BLUE'];

  return (
    <div className={`flex items-center p-[1rem] ${style.bg} rounded-[12px] border ${style.border} mb-[0.75rem] justify-between`}>
      <div className="flex items-center gap-[12px]">
        <div className={`bg-white p-[8px] rounded-full ${style.text} flex`}>
          {style.icon}
        </div>
        <div>
          <h4 className={`m-0 text-[0.9rem] font-[700] ${style.text}`}>{code}</h4>
          <p className="m-0 text-[0.75rem] text-[#64748b]">{location || `${alert.floor}F, ${alert.ward}`}</p>
        </div>
      </div>

      <div className="flex items-center gap-[12px]">
        <span className="text-[0.75rem] font-[600] text-[#94a3b8]">{time}</span>
        <button
          onClick={() => onResolve(id)}
          className={`px-[12px] py-[4px] rounded-[6px] bg-white border ${style.border} ${style.text} text-[0.7rem] font-[700] cursor-pointer transition-all duration-200 hover:bg-transparent`}
        >
          Resolve
        </button>
      </div>
    </div>
  );
};

const QuickAction = ({ icon: Icon, label, onClick }) => (
  <button 
    className="flex items-center gap-[12px] w-full py-[0.875rem] px-[1rem] bg-white border border-[#f1f5f9] rounded-[12px] cursor-pointer mb-[0.5rem] transition-all duration-200 text-left hover:bg-[#f8fafc]"
    onClick={onClick}
  >
    <div className="text-[#6366f1]"><Icon size={18} /></div>
    <span className="text-[0.85rem] font-[600] text-[#475569]">{label}</span>
  </button>
);

const Heart = ({ size, fill, color, style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill || "none"}
    stroke={color || "currentColor"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    fetchAlerts();

    initiateSocketConnection();
    joinAdminRoom();

    subscribeToAlerts((err, newAlert) => {
      if (err) return;
      setAlerts(prev => {
        const exists = prev.find(a => a.id === newAlert.id);
        if (exists) {
          return prev.map(a => a.id === newAlert.id ? { ...a, ...newAlert } : a);
        }
        return [{ ...newAlert, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }, ...prev];
      });
    });

    const timer = setInterval(() => setCurrentTime(new Date()), 60000);

    return () => {
      disconnectSocket();
      clearInterval(timer);
    };
  }, []);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllAlerts();
      setAlerts(data);
    } catch (err) {
      console.error("Error in fetchAlerts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResolveAlert = async (alertId) => {
    try {
      await adminService.updateSystemAlert(alertId, { status: 'Resolved' });
      await fetchAlerts();
    } catch (err) {
      console.error("Failed to resolve alert:", err);
    }
  };

  const activeAlerts = alerts.filter(a => (a.status || '').toUpperCase() === 'ACTIVE');
  const resolvedAlertsCount = alerts.filter(a => (a.status || '').toUpperCase() === 'RESOLVED').length;
  const totalAlerts = alerts.length;

  const chartData = [
    { name: 'Code Blue', value: alerts.filter(a => (a.code_type || a.code || '').toUpperCase() === 'CODE BLUE').length, color: '#3b82f6' },
    { name: 'Code Red', value: alerts.filter(a => (a.code_type || a.code || '').toUpperCase() === 'CODE RED').length, color: '#ef4444' },
    { name: 'Code Yellow', value: alerts.filter(a => (a.code_type || a.code || '').toUpperCase() === 'CODE YELLOW').length, color: '#f59e0b' },
    { name: 'Code Pink', value: alerts.filter(a => (a.code_type || a.code || '').toUpperCase() === 'CODE PINK').length, color: '#ec4899' },
  ];

  const visualChartData = chartData;

  return (
    <div className="pb-[2rem]">
      <div className="text-center pt-[1.5rem] pb-[0.5rem]">
        <h1 className="text-[1.25rem] font-[800] text-[#4c1d95] m-0 tracking-[1px] uppercase">
          Admin Dashboard
        </h1>
      </div>

      <header className="flex justify-between items-center py-[1.5rem] mb-[1rem]">
        <div className="flex items-center gap-[1rem]">
          <div className="w-[48px] h-[48px] rounded-full bg-[#e2e8f0] overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin Avatar" />
          </div>
          <div>
            <h2 className="m-0 text-[1.25rem] font-[800]">Welcome, Admin</h2>
            <p className="m-0 text-[0.875rem] text-[#64748b]">System Administrator</p>
          </div>
        </div>

        <div className="flex items-center gap-[1.5rem]">
          <div className="text-right">
            <h3 className="m-0 text-[1rem] font-[700]">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </h3>
            <p className="m-0 text-[0.75rem] text-[#64748b]">
              {currentTime.toLocaleDateString([], { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <button
            onClick={fetchAlerts}
            title="Refresh Data"
            className="w-[40px] h-[40px] rounded-[10px] bg-white flex items-center justify-center text-[#64748b] border border-[#e2e8f0] cursor-pointer"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>

          <button
            onClick={fetchAlerts}
            className="py-[0.5rem] px-[1rem] rounded-[10px] bg-[#4c1d95] text-white border-none font-[700] text-[0.8rem] cursor-pointer shadow-[0_4px_10px_rgba(76,29,149,0.2)]"
          >
            Manual Sync
          </button>
        </div>
      </header>

      <div className="flex gap-[1.5rem] mb-[2rem]">
        <StatCard title="Total Alerts" value={totalAlerts} subtitle="Overall History" color="#3b82f6" />
        <StatCard title="Active Alerts" value={activeAlerts.length} subtitle="Live Tracking" color="#ef4444" />
        <StatCard title="Resolved Alerts" value={resolvedAlertsCount} subtitle="Successfully Handled" color="#10b981" />
        <StatCard title="Avg. Response Time" value="--" subtitle="Calculating..." color="#f59e0b" />
      </div>

      <div className="grid grid-cols-[1.5fr_1fr] gap-[1.5rem] mb-[2rem]">
        <div className="bg-white p-[1.5rem] rounded-[16px] border border-[#f1f5f9]">
          <div className="flex justify-between items-center mb-[1.5rem]">
            <h3 className="m-0 text-[1rem] font-[800] text-[#1e293b]">ACTIVE ALERTS ({activeAlerts.length})</h3>
          </div>

          {activeAlerts.length > 0 ? (
            activeAlerts.slice(0, 3).map(alert => (
              <ActiveAlertItem
                key={alert.id}
                alert={alert}
                onResolve={handleResolveAlert}
              />
            ))
          ) : (
            <div className="text-center p-[2rem] text-[#94a3b8]">
              No active alerts at the moment.
            </div>
          )}

          <button
            onClick={() => navigate('/history')}
            className="w-full p-[0.75rem] mt-[0.5rem] bg-transparent border-none text-[#6366f1] text-[0.85rem] font-[700] cursor-pointer flex items-center justify-center gap-[4px]"
          >
            View All Alerts <ChevronRight size={16} />
          </button>
        </div>

        <div className="bg-white p-[1.5rem] rounded-[16px] border border-[#f1f5f9]">
          <h3 className="m-0 mb-[1rem] text-[1rem] font-[800] text-[#1e293b]">ALERTS OVERVIEW (This Month)</h3>
          <div className="flex items-center justify-center h-[240px] w-full">
            <div className="relative w-[240px] h-[240px]">
              <PieChart width={240} height={240}>
                <Pie
                  data={visualChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {visualChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <Label
                    value={totalAlerts}
                    position="center"
                    content={({ viewBox }) => {
                      const { cx, cy } = viewBox;
                      return (
                        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
                          <tspan x={cx} y={cy - 5} className="text-[1.5rem] font-[800] fill-[#1e293b]">{totalAlerts}</tspan>
                          <tspan x={cx} y={cy + 20} className="text-[0.7rem] font-[700] fill-[#94a3b8] uppercase">Total</tspan>
                        </text>
                      );
                    }}
                  />
                </Pie>
              </PieChart>
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
              {visualChartData.map((item) => (
                <div key={item.name} className="flex items-center gap-[8px]">
                  <div className="w-[12px] h-[12px] rounded-[3px]" style={{ backgroundColor: item.color }}></div>
                  <span className="text-[0.75rem] text-[#64748b] font-[600]">
                    {item.name} ({item.value})
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-[1.5rem]">
        <div className="bg-white p-[1.5rem] rounded-[16px] border border-[#f1f5f9]">
          <h3 className="m-0 mb-[1.5rem] text-[1rem] font-[800] text-[#1e293b]">RECENT ALERTS</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-b border-[#f1f5f9]">
                <th className="py-[0.75rem] px-0 text-[0.75rem] font-[700] text-[#94a3b8]">Code</th>
                <th className="py-[0.75rem] px-0 text-[0.75rem] font-[700] text-[#94a3b8]">Location</th>
                <th className="py-[0.75rem] px-0 text-[0.75rem] font-[700] text-[#94a3b8]">Time</th>
                <th className="py-[0.75rem] px-0 text-[0.75rem] font-[700] text-[#94a3b8]">Status</th>
              </tr>
            </thead>
            <tbody>
              {alerts.length > 0 ? (
                alerts.slice(0, 5).map((alert, i) => (
                  <tr key={alert.id || i} className={i === Math.min(alerts.length, 5) - 1 ? '' : 'border-b border-[#f8fafc]'}>
                    <td className={`py-[1rem] px-0 text-[0.85rem] font-[700] ${(alert.code_type || alert.code || '').toUpperCase() === 'CODE RED' ? 'text-[#ef4444]' : (alert.code_type || alert.code || '').toUpperCase() === 'CODE BLUE' ? 'text-[#3b82f6]' : (alert.code_type || alert.code || '').toUpperCase() === 'CODE YELLOW' ? 'text-[#f59e0b]' : 'text-[#ec4899]'}`}>
                      {alert.code_type || alert.code}
                    </td>
                    <td className="py-[1rem] px-0 text-[0.85rem] text-[#475569]">{alert.location || `${alert.floor}F, ${alert.ward}`}</td>
                    <td className="py-[1rem] px-0 text-[0.85rem] text-[#475569]">{alert.time}</td>
                    <td className="py-[1rem] px-0">
                      <span className={`text-[0.75rem] font-[700] ${(alert.status === 'Active' || alert.status === 'ACTIVE') ? 'text-[#ef4444]' : 'text-[#10b981]'}`}>
                        {alert.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-[2rem] text-[#94a3b8]">No recent alerts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-[1.5rem] rounded-[16px] border border-[#f1f5f9]">
          <h3 className="m-0 mb-[1.5rem] text-[1rem] font-[800] text-[#1e293b]">QUICK ACTIONS</h3>
          <QuickAction icon={UserPlus} label="Add New User" onClick={() => navigate('/users')} />
          <QuickAction icon={PlusSquare} label="Add Department" onClick={() => navigate('/departments')} />
          <QuickAction icon={FileText} label="Manage Alert Codes" onClick={() => navigate('/codes')} />
          <QuickAction icon={Settings} label="System Settings" onClick={() => navigate('/settings')} />
        </div>
      </div>
    </div>
  );
}
