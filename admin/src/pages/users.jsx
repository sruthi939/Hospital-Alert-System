import React, { useState, useEffect } from 'react';
import { Users as UsersIcon, UserPlus, Search, Filter, MoreVertical, Mail, Shield, Stethoscope, User, CheckCircle2, XCircle, Clock, ChevronRight, Download } from 'lucide-react';
import { adminService } from '../services/api';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div style={{
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '16px',
    flex: 1,
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    border: '1px solid #f1f5f9',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  }}>
    <div style={{
      backgroundColor: `${color}10`,
      padding: '0.75rem',
      borderRadius: '12px',
      color: color,
      display: 'flex'
    }}>
      <Icon size={24} />
    </div>
    <div>
      <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b', fontWeight: '500' }}>{title}</p>
      <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', color: '#1e293b' }}>{value}</h3>
    </div>
  </div>
);

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminService.getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to load personnel records from server.");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleIcon = (role) => {
    switch (role.toLowerCase()) {
      case 'doctor': return <Stethoscope size={16} />;
      case 'nurse': return <User size={16} />;
      case 'admin': return <Shield size={16} />;
      default: return <User size={16} />;
    }
  };

  return (
    <div style={{ paddingBottom: '2rem' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2rem 0',
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.875rem', fontWeight: '800', color: '#1e293b' }}>User Management</h1>
          <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.95rem' }}>Manage hospital staff, roles, and system access.</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.625rem 1.25rem',
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            color: '#475569',
            fontWeight: '600',
            fontSize: '0.9rem',
            cursor: 'pointer'
          }}>
            <Download size={18} /> Export
          </button>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.625rem 1.25rem',
            backgroundColor: '#4c1d95',
            border: 'none',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '600',
            fontSize: '0.9rem',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(76, 29, 149, 0.2)'
          }}>
            <UserPlus size={18} /> Add New User
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
        <StatCard title="Total Staff" value={users.length} icon={UsersIcon} color="#6366f1" />
        <StatCard title="Doctors" value={users.filter(u => u.role === 'Doctor').length} icon={Stethoscope} color="#3b82f6" />
        <StatCard title="Nurses" value={users.filter(u => u.role === 'Nurse').length} icon={User} color="#10b981" />
        <StatCard title="Active Now" value={users.filter(u => u.status === 'Active').length} icon={CheckCircle2} color="#f59e0b" />
      </div>

      {/* Controls Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '12px',
        border: '1px solid #f1f5f9'
      }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
          <input
            type="text"
            placeholder="Search by name, email, or dept..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.625rem 1rem 0.625rem 2.5rem',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '0.5rem 1rem',
            backgroundColor: 'transparent',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            color: '#64748b',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        border: '1px solid #f1f5f9',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', backgroundColor: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
              <th style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>User</th>
              <th style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Role</th>
              <th style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Department</th>
              <th style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{ padding: '4rem', textAlign: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div className="animate-spin" style={{ width: '24px', height: '24px', border: '3px solid #f3f3f3', borderTop: '3px solid #4c1d95', borderRadius: '50%' }}></div>
                    <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Loading personnel records...</span>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" style={{ padding: '4rem', textAlign: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <XCircle size={32} color="#ef4444" />
                    <span style={{ color: '#ef4444', fontSize: '0.95rem', fontWeight: '600' }}>{error}</span>
                    <button
                      onClick={fetchUsers}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#f1f5f9',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}>
                      Try Again
                    </button>
                  </div>
                </td>
              </tr>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #f8fafc' }} className="transition-all hover:bg-slate-50">
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        color: '#475569',
                        fontSize: '0.85rem'
                      }}>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1e293b' }}>{user.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Mail size={12} /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.9rem',
                      color: '#475569',
                      fontWeight: '500'
                    }}>
                      <div style={{ color: '#6366f1' }}>{getRoleIcon(user.role)}</div>
                      {user.role}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#f1f5f9',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      color: '#475569',
                      fontWeight: '600'
                    }}>
                      {user.department}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      color: user.status === 'Active' ? '#10b981' : '#94a3b8'
                    }}>
                      {user.status === 'Active' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                      {user.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <button style={{
                      background: 'none',
                      border: 'none',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      padding: '4px',
                      borderRadius: '4px'
                    }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>
                  No users match your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
