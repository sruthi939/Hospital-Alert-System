import React, { useState, useEffect } from 'react';
import { 
  Users as UsersIcon, 
  UserPlus, 
  Search, 
  Filter, 
  Eye, 
  Edit2, 
  Trash2, 
  Mail, 
  Phone, 
  Shield, 
  Stethoscope, 
  User,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronRight,
  PlusCircle,
  Activity
} from 'lucide-react';
import { adminService } from '../services/api';

const CategoryCard = ({ title, count, icon: Icon, color, isActive, onClick }) => (
  <div 
    onClick={onClick}
    style={{ 
      backgroundColor: 'white', 
      padding: '1.25rem 1.5rem', 
      borderRadius: '12px', 
      flex: 1,
      boxShadow: isActive ? '0 0 0 2px #4c1d95, 0 4px 6px -1px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.05)',
      border: '1px solid #f1f5f9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      minWidth: '180px'
    }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ color: color, display: 'flex' }}>
        <Icon size={24} />
      </div>
      <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>{title}</span>
    </div>
    <span style={{ 
      backgroundColor: '#f1f5f9', 
      padding: '4px 10px', 
      borderRadius: '6px', 
      fontSize: '0.85rem', 
      fontWeight: '700', 
      color: '#1e293b' 
    }}>{count}</span>
  </div>
);

const UserTableSection = ({ title, count, icon: Icon, color, users, addButtonLabel, onViewAll }) => (
  <div style={{ 
    backgroundColor: 'white', 
    borderRadius: '16px', 
    border: '1px solid #f1f5f9', 
    padding: '1.5rem',
    marginBottom: '2rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ color: color }}><Icon size={20} /></div>
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '800', color: '#1e293b', textTransform: 'uppercase' }}>
          {title} ({count})
        </h3>
      </div>
      <button style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '6px', 
        color: color, 
        backgroundColor: 'transparent', 
        border: 'none', 
        fontWeight: '700', 
        fontSize: '0.85rem', 
        cursor: 'pointer' 
      }}>
        <PlusCircle size={18} /> {addButtonLabel}
      </button>
    </div>

    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid #f1f5f9' }}>
            <th style={{ padding: '0.75rem 0', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', width: '40px' }}>#</th>
            <th style={{ padding: '0.75rem 0', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8' }}>Name</th>
            <th style={{ padding: '0.75rem 0', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8' }}>Employee ID</th>
            <th style={{ padding: '0.75rem 0', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8' }}>Department</th>
            <th style={{ padding: '0.75rem 0', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8' }}>Contact</th>
            <th style={{ padding: '0.75rem 0', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8' }}>Status</th>
            <th style={{ padding: '0.75rem 0', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? users.map((user, index) => (
            <tr key={user.id || index} style={{ borderBottom: index === users.length - 1 ? 'none' : '1px solid #f8fafc' }}>
              <td style={{ padding: '1rem 0', fontSize: '0.85rem', color: '#94a3b8' }}>{index + 1}</td>
              <td style={{ padding: '1rem 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                    alt={user.name} 
                    style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#f1f5f9' }} 
                  />
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1e293b' }}>{user.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{user.email || 'N/A'}</div>
                  </div>
                </div>
              </td>
              <td style={{ padding: '1rem 0', fontSize: '0.85rem', fontWeight: '600', color: '#475569' }}>{user.employeeId || 'EMP-' + user.id}</td>
              <td style={{ padding: '1rem 0', fontSize: '0.85rem', color: '#475569' }}>{user.department || 'N/A'}</td>
              <td style={{ padding: '1rem 0' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ color: '#6366f1', display: 'flex', gap: '5px', alignItems: 'center' }}>
                    <Phone size={14} />
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{user.phone || 'N/A'}</span>
                  </div>
                </div>
              </td>
              <td style={{ padding: '1rem 0' }}>
                <span style={{ 
                  padding: '4px 10px', 
                  borderRadius: '6px', 
                  fontSize: '0.75rem', 
                  fontWeight: '700',
                  backgroundColor: user.status === 'Active' ? '#f0fdf4' : '#fff1f2',
                  color: user.status === 'Active' ? '#16a34a' : '#e11d48'
                }}>
                  {user.status || 'Active'}
                </span>
              </td>
              <td style={{ padding: '1rem 0' }}>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  <button style={{ padding: '6px', borderRadius: '6px', border: 'none', backgroundColor: '#eff6ff', color: '#3b82f6', cursor: 'pointer' }}><Eye size={14} /></button>
                  <button style={{ padding: '6px', borderRadius: '6px', border: 'none', backgroundColor: '#f0f9ff', color: '#0ea5e9', cursor: 'pointer' }}><Edit2 size={14} /></button>
                  <button style={{ padding: '6px', borderRadius: '6px', border: 'none', backgroundColor: '#fff1f2', color: '#e11d48', cursor: 'pointer' }}><Trash2 size={14} /></button>
                </div>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>No records found in this category.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <button 
      onClick={onViewAll}
      style={{ 
        width: '100%', 
        padding: '0.75rem', 
        marginTop: '0.5rem',
        backgroundColor: 'transparent', 
        border: 'none', 
        color: '#6366f1', 
        fontSize: '0.85rem', 
        fontWeight: '700',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px'
      }}>
      View All {title} <ChevronRight size={16} />
    </button>
  </div>
);

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All Users');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await adminService.getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Categorize users from database
  const nurses = users.filter(u => u.role?.toLowerCase() === 'nurse');
  const doctors = users.filter(u => u.role?.toLowerCase() === 'doctor');
  const emergencyTeam = users.filter(u => u.role?.toLowerCase() === 'emergency team' || u.role?.toLowerCase() === 'emt');
  const managers = users.filter(u => u.role?.toLowerCase() === 'admin' || u.role?.toLowerCase() === 'manager');

  // Fallback mock data if database is empty (for demo/fairness)
  const displayNurses = nurses.length > 0 ? nurses : [
    { id: 1, name: 'Anjali Sharma', email: 'anjali.sharma@hospital.com', employeeId: 'NUR1245', department: 'ICU', phone: '9876543210', status: 'Active' },
    { id: 2, name: 'Priya Patel', email: 'priya.patel@hospital.com', employeeId: 'NUR1246', department: 'General Ward', phone: '9876543211', status: 'Active' },
  ];

  const displayDoctors = doctors.length > 0 ? doctors : [
    { id: 4, name: 'Dr. Rahul Mehta', email: 'rahul.mehta@hospital.com', employeeId: 'DOC1001', department: 'Cardiology', phone: '9876500001', status: 'Active' },
  ];

  return (
    <div style={{ paddingBottom: '3rem' }}>
      {/* Header Section */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1.5rem 0 2rem 0',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800', color: '#1e293b' }}>User Management</h1>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>Home &gt; Users Management</span>
          </div>
        </div>
        
        <button style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '0.75rem 1.5rem', 
          backgroundColor: '#4c1d95', 
          border: 'none', 
          borderRadius: '10px',
          color: 'white',
          fontWeight: '700',
          fontSize: '0.9rem',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(76, 29, 149, 0.2)'
        }}>
          <UserPlus size={18} /> Add New User
        </button>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        <CategoryCard 
          title="All Users" count={users.length || 125} icon={UsersIcon} color="#6366f1" 
          isActive={activeTab === 'All Users'} onClick={() => setActiveTab('All Users')} 
        />
        <CategoryCard 
          title="Nurses" count={nurses.length || 42} icon={User} color="#3b82f6" 
          isActive={activeTab === 'Nurses'} onClick={() => setActiveTab('Nurses')} 
        />
        <CategoryCard 
          title="Doctors" count={doctors.length || 38} icon={Stethoscope} color="#10b981" 
          isActive={activeTab === 'Doctors'} onClick={() => setActiveTab('Doctors')} 
        />
        <CategoryCard 
          title="Emergency Team" count={emergencyTeam.length || 28} icon={Activity} color="#f59e0b" 
          isActive={activeTab === 'Emergency Team'} onClick={() => setActiveTab('Emergency Team')} 
        />
        <CategoryCard 
          title="System Managers" count={managers.length || 17} icon={Shield} color="#a855f7" 
          isActive={activeTab === 'System Managers'} onClick={() => setActiveTab('System Managers')} 
        />
      </div>

      {/* Categorized Tables */}
      <UserTableSection 
        title="NURSES" count={nurses.length || 42} icon={User} color="#3b82f6" 
        users={displayNurses} addButtonLabel="Add Nurse" 
        onViewAll={() => console.log('View all nurses')} 
      />

      <UserTableSection 
        title="DOCTORS" count={doctors.length || 38} icon={Stethoscope} color="#10b981" 
        users={displayDoctors} addButtonLabel="Add Doctor" 
        onViewAll={() => console.log('View all doctors')} 
      />

      <UserTableSection 
        title="EMERGENCY TEAM" count={emergencyTeam.length || 28} icon={Activity} color="#f59e0b" 
        users={emergencyTeam.length > 0 ? emergencyTeam : []} addButtonLabel="Add Team Member" 
        onViewAll={() => console.log('View all emergency team')} 
      />

      <UserTableSection 
        title="SYSTEM MANAGERS" count={managers.length || 17} icon={Shield} color="#a855f7" 
        users={managers.length > 0 ? managers : []} addButtonLabel="Add System Manager" 
        onViewAll={() => console.log('View all system managers')} 
      />
    </div>
  );
}
