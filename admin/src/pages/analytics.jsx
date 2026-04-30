import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, TrendingUp, Clock, CheckCircle2, AlertCircle, Calendar, Download, RefreshCw, ArrowRight, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Label } from 'recharts';
import { adminService } from '../services/api';

const StatCard = ({ title, value, subtext, icon: Icon, color, trend }) => (
  <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #f1f5f9', flex: 1, minWidth: '200px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
      <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748b' }}>{title}</span>
      <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: `${color}15`, color: color }}>
        <Icon size={20} />
      </div>
    </div>
    <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1e293b', marginBottom: '4px' }}>{value}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: '700', color: trend?.includes('↑') ? '#10b981' : '#ef4444' }}>
      {trend} <span style={{ color: '#94a3b8' }}>{subtext}</span>
    </div>
  </div>
);

export default function Analytics() {
  const [data, setData] = useState({ alerts: [], stats: {} });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const alerts = await adminService.getAlerts();
      // Logic to process alerts into chart data would go here
      setData({ alerts, stats: { total: alerts.length } });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Process real data for charts
  const processTrendData = () => {
    if (data.alerts.length === 0) return [];
    // REAL DATA PROCESSING LOGIC
    return [];
  };

  const trendData = processTrendData();
  const pieData = []; // Starts empty for FAIR data

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900', color: '#1e293b' }}>Reports & Analytics</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.7rem 1.25rem', border: '1px solid #e2e8f0', borderRadius: '12px', backgroundColor: 'white', color: '#64748b' }}>
            <Calendar size={18} />
            <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>20/05/2025 - 20/05/2025</span>
          </div>
          <button style={{ padding: '0.85rem 1.75rem', backgroundColor: '#4c1d95', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '800', fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(76, 29, 149, 0.2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Download size={20} /> Export PDF
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <StatCard title="Total Alerts" value={data.stats.total || 0} trend="0%" subtext="from yesterday" icon={Activity} color="#6366f1" />
        <StatCard title="Code Blue Alerts" value={data.stats.blue || 0} trend="0%" subtext="from yesterday" icon={AlertCircle} color="#3b82f6" />
        <StatCard title="Code Red Alerts" value={data.stats.red || 0} trend="0%" subtext="from yesterday" icon={AlertCircle} color="#ef4444" />
        <StatCard title="Avg. Response Time" value={data.stats.responseTime || "00:00"} subtext="minutes" icon={Clock} color="#f59e0b" />
        <StatCard title="Resolved Alerts" value={data.stats.resolved || 0} trend="0%" subtext="from yesterday" icon={CheckCircle2} color="#10b981" />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
        {/* Trend Chart */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1rem', fontWeight: '800', color: '#1e293b' }}>ALERTS TREND</h3>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" dataKey="blue" name="Code Blue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: 'white' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="red" name="Code Red" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: 'white' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="yellow" name="Code Yellow" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: 'white' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="pink" name="Code Pink" stroke="#ec4899" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: 'white' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Chart */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1rem', fontWeight: '800', color: '#1e293b' }}>ALERTS BY CODE</h3>
          <div style={{ height: '300px', width: '100%', position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <Label
                    value="128"
                    position="center"
                    content={({ viewBox }) => {
                      const { cx, cy } = viewBox;
                      return (
                        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
                          <tspan x={cx} y={cy} style={{ fontSize: '2rem', fontWeight: '900', fill: '#1e293b' }}>{data.stats.total || 0}</tspan>
                        </text>
                      );
                    }}
                  />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* Custom Legend */}
            <div style={{ marginTop: '-40px' }}>
              {pieData.map((item) => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: item.color }}></div>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b' }}>{item.name}</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#1e293b' }}>({item.value})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => navigate('/history')}
          style={{ backgroundColor: 'transparent', border: 'none', color: '#4c1d95', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '1rem' }}
        >
          View Detailed Reports <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
