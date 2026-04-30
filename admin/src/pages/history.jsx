import React, { useState, useEffect } from 'react';
import { 
  History as HistoryIcon, Search, Calendar, Filter, 
  ChevronDown, ArrowRight, Download, RefreshCw, FileText
} from 'lucide-react';
import { adminService } from '../services/api';

const FilterBadge = ({ label, value, onClear }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', backgroundColor: '#f5f3ff', color: '#7c3aed', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700' }}>
    {label}: {value}
  </div>
);

export default function AlertHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ code: 'All Codes', department: 'All Departments' });

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAlerts();
      setHistory(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.code_type.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (item.triggered_by || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCode = filters.code === 'All Codes' || item.code_type === filters.code;
    const matchesDept = filters.department === 'All Departments' || item.department === filters.department;
    return matchesSearch && matchesCode && matchesDept;
  });

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900', color: '#1e293b' }}>Alert History Log</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={fetchHistory}
            style={{ 
              padding: '0.85rem', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <RefreshCw size={20} className={loading ? "spin" : ""} />
          </button>
          <button style={{ padding: '0.85rem 1.75rem', backgroundColor: 'white', color: '#475569', border: '1px solid #e2e8f0', borderRadius: '12px', fontWeight: '800', fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Download size={20} /> Export Report
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '24px', border: '1px solid #f1f5f9', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
        {/* Filters Header */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.7rem 1.25rem', border: '1px solid #e2e8f0', borderRadius: '12px', backgroundColor: '#f8fafc', color: '#64748b' }}>
            <Calendar size={18} />
            <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>20/05/2025 - 20/05/2025</span>
          </div>

          <select 
            value={filters.code}
            onChange={e => setFilters({...filters, code: e.target.value})}
            style={{ padding: '0.7rem 1.25rem', border: '1px solid #e2e8f0', borderRadius: '12px', backgroundColor: '#f8fafc', outline: 'none', fontWeight: '700', color: '#475569' }}
          >
            <option>All Codes</option>
            <option>CODE BLUE</option>
            <option>CODE RED</option>
            <option>CODE YELLOW</option>
            <option>CODE PINK</option>
          </select>

          <select 
            value={filters.department}
            onChange={e => setFilters({...filters, department: e.target.value})}
            style={{ padding: '0.7rem 1.25rem', border: '1px solid #e2e8f0', borderRadius: '12px', backgroundColor: '#f8fafc', outline: 'none', fontWeight: '700', color: '#475569' }}
          >
            <option>All Departments</option>
            <option>Cardiology</option>
            <option>General Medicine</option>
            <option>Emergency</option>
            <option>Pediatrics</option>
          </select>

          <button style={{ padding: '0.7rem 1.5rem', border: '1px solid #e2e8f0', borderRadius: '12px', backgroundColor: 'white', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', color: '#64748b', cursor: 'pointer' }}>
            <Filter size={18} /> Filter
          </button>

          <div style={{ flex: 1, position: 'relative', minWidth: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search by code or nurse..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.7rem 1rem 0.7rem 2.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', outline: 'none', fontSize: '0.9rem' }}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
            <thead>
              <tr style={{ textAlign: 'left' }}>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>#</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Code</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Location</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Triggered By</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Time</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Action Taken</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((item, index) => (
                <tr key={item.id} style={{ backgroundColor: '#ffffff', transition: 'all 0.2s ease' }} className="hover-row">
                  <td style={{ padding: '1.25rem 1rem', fontSize: '0.9rem', fontWeight: '700', color: '#64748b', borderBottom: '1px solid #f8fafc' }}>
                    {index + 1}
                  </td>
                  <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f8fafc' }}>
                    <span style={{ 
                      fontSize: '0.9rem', 
                      fontWeight: '800', 
                      color: item.code_type.includes('RED') ? '#ef4444' : 
                             item.code_type.includes('BLUE') ? '#3b82f6' : 
                             item.code_type.includes('YELLOW') ? '#f59e0b' : '#ec4899' 
                    }}>{item.code_type}</span>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f8fafc', fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>
                    {item.location || `${item.ward}, Room ${item.room}`}
                  </td>
                  <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f8fafc', fontSize: '0.9rem', fontWeight: '700', color: '#1e293b' }}>
                    {item.triggered_by || 'Unknown'}
                  </td>
                  <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f8fafc', fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>
                    {new Date(item.created_at).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}
                  </td>
                  <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f8fafc' }}>
                    <span style={{ 
                      padding: '4px 12px', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      fontWeight: '800', 
                      backgroundColor: item.status === 'Resolved' ? '#f0fdf4' : '#fff7ed', 
                      color: item.status === 'Resolved' ? '#16a34a' : '#f97316' 
                    }}>{item.status}</span>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f8fafc', fontSize: '0.9rem', fontWeight: '700', color: '#4c1d95' }}>
                    {item.action_taken || 'Awaiting response'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
          <button style={{ backgroundColor: 'transparent', border: 'none', color: '#4c1d95', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
            View Full History <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
