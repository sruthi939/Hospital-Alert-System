import React, { useState, useEffect } from 'react';
import { 
  Users as UsersIcon, UserPlus, Eye, Edit2, Trash2, Mail, Phone, Shield, 
  Stethoscope, User, CheckCircle2, XCircle, Clock, ChevronRight, PlusCircle, 
  Activity, X, Save, RefreshCw
} from 'lucide-react';
import { adminService } from '../services/api';

const CategoryCard = ({ title, count, icon: Icon, color, isActive, onClick }) => (
  <div 
    onClick={onClick}
    style={{ 
      backgroundColor: 'white', padding: '1.25rem 1.5rem', borderRadius: '16px', flex: 1,
      boxShadow: isActive ? '0 4px 12px rgba(76, 29, 149, 0.1)' : '0 1px 3px rgba(0,0,0,0.05)',
      border: isActive ? '2px solid #4c1d95' : '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      cursor: 'pointer', transition: 'all 0.2s ease', minWidth: '220px'
    }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ color: color, display: 'flex' }}><Icon size={24} /></div>
      <span style={{ fontSize: '1rem', fontWeight: '700', color: '#475569' }}>{title}</span>
    </div>
    <span style={{ backgroundColor: '#eff6ff', padding: '6px 12px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '800', color: '#1e293b' }}>{count}</span>
  </div>
);

const UserModal = ({ isOpen, onClose, onSave, user, mode }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'Nurse', department: '', staffId: '', phone: '', status: 'Active'
  });

  useEffect(() => {
    if (user && mode === 'edit') {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        role: user.role || 'Nurse',
        department: user.department || '',
        staffId: user.staffId || '',
        phone: user.phone || '',
        status: user.status || 'Active'
      });
    } else {
      setFormData({ name: '', email: '', password: '', role: 'Nurse', department: '', staffId: '', phone: '', status: 'Active' });
    }
  }, [user, mode, isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
      <div style={{ backgroundColor: 'white', width: '500px', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#1e293b' }}>{mode === 'edit' ? 'Edit Staff Member' : 'Add New Staff Member'}</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={24} /></button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <InputField label="Full Name" value={formData.name} onChange={v => setFormData({...formData, name: v})} />
            <InputField label="Staff ID" value={formData.staffId} onChange={v => setFormData({...formData, staffId: v})} />
          </div>
          <InputField label="Email Address" type="email" value={formData.email} onChange={v => setFormData({...formData, email: v})} />
          {mode === 'add' && <InputField label="Password" type="password" value={formData.password} onChange={v => setFormData({...formData, password: v})} />}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', display: 'block' }}>Role</label>
              <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }}>
                <option value="Nurse">Nurse</option><option value="Doctor">Doctor</option><option value="EMT">Emergency Team</option><option value="Admin">System Manager</option>
              </select>
            </div>
            <InputField label="Department" value={formData.department} onChange={v => setFormData({...formData, department: v})} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <InputField label="Phone Number" value={formData.phone} onChange={v => setFormData({...formData, phone: v})} />
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', display: 'block' }}>Status</label>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }}>
                <option value="Active">Active</option><option value="APPROVED">Approved</option><option value="Pending">Pending Approval</option><option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: 'white', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
          <button onClick={() => onSave(formData)} style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', border: 'none', backgroundColor: '#4c1d95', color: 'white', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Save size={18} /> Save Changes</button>
        </div>
      </div>
    </div>
  );
};

const UserDetailsModal = ({ isOpen, onClose, user, onApprove, onReject }) => {
  if (!isOpen || !user) return null;
  const isPending = (user.status || '').toUpperCase() === 'PENDING';
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, backdropFilter: 'blur(10px)' }}>
      <div style={{ backgroundColor: 'white', width: '550px', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '80px', backgroundColor: '#4c1d95' }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}><button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'white' }}><X size={24} /></button></div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} style={{ width: '110px', height: '110px', borderRadius: '24px', border: '4px solid white', backgroundColor: '#f8fafc' }} />
            <div style={{ paddingBottom: '10px' }}>
              <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800', color: '#1e293b' }}>{user.name}</h2>
              <span style={{ display: 'inline-block', marginTop: '8px', padding: '4px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '800', backgroundColor: isPending ? '#fffbeb' : '#f0fdf4', color: isPending ? '#d97706' : '#16a34a', border: `1px solid ${isPending ? '#fef3c7' : '#dcfce7'}` }}>{(user.status || 'Active').toUpperCase()}</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
            <div>
              <DetailField label="STAFF ID" value={user.staffId} icon={Shield} />
              <DetailField label="EMAIL ADDRESS" value={user.email} icon={Mail} />
              <DetailField label="PHONE NUMBER" value={user.phone} icon={Phone} />
            </div>
            <div>
              <DetailField label="ASSIGNED ROLE" value={user.role} icon={User} />
              <DetailField label="DEPARTMENT" value={user.department} icon={Activity} />
              <DetailField label="JOINED DATE" value={user.created_at ? new Date(user.created_at).toLocaleDateString() : 'New User'} icon={Clock} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            {isPending ? (
              <>
                <button onClick={() => onApprove(user)} style={{ flex: 1, padding: '1rem', borderRadius: '14px', border: 'none', backgroundColor: '#16a34a', color: 'white', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}><CheckCircle2 size={20} /> Approve Account</button>
                <button onClick={() => onReject(user)} style={{ flex: 1, padding: '1rem', borderRadius: '14px', border: '2px solid #ef4444', backgroundColor: 'white', color: '#ef4444', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}><XCircle size={20} /> Reject Account</button>
              </>
            ) : <button onClick={onClose} style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: 'none', backgroundColor: '#f1f5f9', color: '#475569', fontWeight: '800', cursor: 'pointer' }}>Close Profile</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', display: 'block' }}>{label}</label>
    <input type={type} value={value || ''} onChange={e => onChange(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }} />
  </div>
);

const DetailField = ({ label, value, icon: Icon }) => (
  <div style={{ marginBottom: '1.5rem' }}>
    <label style={{ fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>{label}</label>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#1e293b' }}><Icon size={18} style={{ color: '#6366f1' }} /><span style={{ fontSize: '1rem', fontWeight: '700' }}>{value || 'Not Provided'}</span></div>
  </div>
);

const UserTableSection = ({ title, count, icon: Icon, color, users, onAdd, onEdit, onDelete, onToggleStatus, onView }) => (
  <div style={{ backgroundColor: 'white', borderRadius: '20px', border: '1px solid #f1f5f9', padding: '2rem', marginBottom: '2.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ color }}><Icon size={22} /></div><h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title} ({count})</h3></div>
      <button onClick={onAdd} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6366f1', backgroundColor: 'transparent', border: 'none', fontWeight: '800', fontSize: '0.9rem', cursor: 'pointer' }}><PlusCircle size={20} /> Add New</button>
    </div>
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid #f1f5f9' }}>
            <th style={{ padding: '1rem 0', fontSize: '0.8rem', fontWeight: '700', color: '#94a3b8' }}>Name</th>
            <th style={{ padding: '1rem 0', fontSize: '0.8rem', fontWeight: '700', color: '#94a3b8' }}>Staff ID</th>
            <th style={{ padding: '1rem 0', fontSize: '0.8rem', fontWeight: '700', color: '#94a3b8' }}>Status</th>
            <th style={{ padding: '1rem 0', fontSize: '0.8rem', fontWeight: '700', color: '#94a3b8', textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => {
            const statusUpper = (user.status || 'Active').toUpperCase();
            return (
              <tr key={user.id || i} style={{ borderBottom: '1px solid #f8fafc' }}>
                <td style={{ padding: '1.25rem 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#f1f5f9' }} />
                    <div><div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1e293b' }}>{user.name}</div><div style={{ fontSize: '0.8rem', color: '#64748b' }}>{user.email}</div></div>
                  </div>
                </td>
                <td style={{ fontSize: '0.95rem', fontWeight: '700', color: '#475569' }}>{user.staffId}</td>
                <td>
                  <span style={{ 
                    padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '800',
                    backgroundColor: (statusUpper === 'ACTIVE' || statusUpper === 'APPROVED') ? '#f0fdf4' : statusUpper === 'PENDING' ? '#fffbeb' : '#fff1f2',
                    color: (statusUpper === 'ACTIVE' || statusUpper === 'APPROVED') ? '#16a34a' : statusUpper === 'PENDING' ? '#d97706' : '#e11d48'
                  }}>{statusUpper}</span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <button title="View Details" onClick={() => onView(user)} style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: '#eff6ff', color: '#3b82f6', cursor: 'pointer' }}><Eye size={16} /></button>
                    <button title="Edit Staff" onClick={() => onEdit(user)} style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: '#f0f9ff', color: '#0ea5e9', cursor: 'pointer' }}><Edit2 size={16} /></button>
                    <button 
                      title={statusUpper === 'PENDING' ? 'Approve' : (statusUpper === 'ACTIVE' || statusUpper === 'APPROVED' ? 'Deactivate' : 'Activate')}
                      onClick={() => onToggleStatus(user)} 
                      style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: statusUpper === 'PENDING' ? '#f0fdf4' : '#f8fafc', color: statusUpper === 'PENDING' ? '#16a34a' : '#64748b', cursor: 'pointer' }}
                    >
                      {(statusUpper === 'ACTIVE' || statusUpper === 'APPROVED') ? <XCircle size={16} /> : <CheckCircle2 size={16} />}
                    </button>
                    <button title="Delete" onClick={() => onDelete(user.id)} style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: '#fff1f2', color: '#e11d48', cursor: 'pointer' }}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All Users');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try { const data = await adminService.getUsers(); setUsers(data); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleSaveUser = async (data) => {
    try {
      if (modalMode === 'add') await adminService.addUser(data);
      else await adminService.updateUser(selectedUser.id, data);
      setIsModalOpen(false); fetchUsers();
    } catch (err) { alert('Operation failed'); }
  };

  const handleToggleStatus = async (user) => {
    const currentStatus = (user.status || 'Active').toUpperCase();
    let newStatus = 'Active';
    if (currentStatus === 'ACTIVE' || currentStatus === 'APPROVED') newStatus = 'Inactive';
    else if (currentStatus === 'PENDING') newStatus = 'Active';
    else newStatus = 'Active';

    try { await adminService.updateUser(user.id, { ...user, status: newStatus }); fetchUsers(); }
    catch (err) { alert('Status update failed'); }
  };

  const handleApprove = async (user) => {
    try { await adminService.updateUser(user.id, { ...user, status: 'Active' }); setIsDetailOpen(false); fetchUsers(); }
    catch (err) { alert('Approval failed'); }
  };

  const handleReject = async (user) => {
    try { await adminService.updateUser(user.id, { ...user, status: 'Inactive' }); setIsDetailOpen(false); fetchUsers(); }
    catch (err) { alert('Rejection failed'); }
  };

  const nurses = users.filter(u => (u.role || '').toLowerCase() === 'nurse');
  const doctors = users.filter(u => (u.role || '').toLowerCase() === 'doctor');
  const emergencyTeam = users.filter(u => ['emt', 'emergency team', 'emergency'].includes((u.role || '').toLowerCase()));
  const managers = users.filter(u => ['admin', 'manager', 'system manager'].includes((u.role || '').toLowerCase()));

  return (
    <div style={{ padding: '2rem 0' }}>
      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveUser} user={selectedUser} mode={modalMode} />
      <UserDetailsModal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} user={selectedUser} onApprove={handleApprove} onReject={handleReject} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900', color: '#1e293b' }}>User Management</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={fetchUsers}
            style={{ 
              padding: '0.85rem', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
            title="Refresh Data"
          >
            <RefreshCw size={20} className={loading ? "spin" : ""} />
          </button>
          <button onClick={() => { setModalMode('add'); setSelectedUser(null); setIsModalOpen(true); }} style={{ padding: '0.85rem 1.75rem', backgroundColor: '#4c1d95', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '800', fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(76, 29, 149, 0.2)' }}>Add Staff Member</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '3rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        <CategoryCard title="All Users" count={users.length} icon={UsersIcon} color="#6366f1" isActive={activeTab === 'All Users'} onClick={() => setActiveTab('All Users')} />
        <CategoryCard title="Nurses" count={nurses.length} icon={User} color="#3b82f6" isActive={activeTab === 'Nurses'} onClick={() => setActiveTab('Nurses')} />
        <CategoryCard title="Doctors" count={doctors.length} icon={Stethoscope} color="#10b981" isActive={activeTab === 'Doctors'} onClick={() => setActiveTab('Doctors')} />
        <CategoryCard title="Emergency Team" count={emergencyTeam.length} icon={Activity} color="#f59e0b" isActive={activeTab === 'Emergency Team'} onClick={() => setActiveTab('Emergency Team')} />
        <CategoryCard title="System Managers" count={managers.length} icon={Shield} color="#a855f7" isActive={activeTab === 'System Managers'} onClick={() => setActiveTab('System Managers')} />
      </div>

      {(activeTab === 'All Users' || activeTab === 'Nurses') && (
        <UserTableSection title="NURSES" count={nurses.length} icon={User} color="#3b82f6" users={nurses} onAdd={() => { setModalMode('add'); setIsModalOpen(true); }} onEdit={u => { setSelectedUser(u); setModalMode('edit'); setIsModalOpen(true); }} onDelete={id => window.confirm('Delete this user?') && adminService.deleteUser(id).then(fetchUsers)} onToggleStatus={handleToggleStatus} onView={u => { setSelectedUser(u); setIsDetailOpen(true); }} />
      )}
      
      {(activeTab === 'All Users' || activeTab === 'Doctors') && (
        <UserTableSection title="DOCTORS" count={doctors.length} icon={Stethoscope} color="#10b981" users={doctors} onAdd={() => { setModalMode('add'); setIsModalOpen(true); }} onEdit={u => { setSelectedUser(u); setModalMode('edit'); setIsModalOpen(true); }} onDelete={id => window.confirm('Delete this user?') && adminService.deleteUser(id).then(fetchUsers)} onToggleStatus={handleToggleStatus} onView={u => { setSelectedUser(u); setIsDetailOpen(true); }} />
      )}

      {(activeTab === 'All Users' || activeTab === 'Emergency Team') && (
        <UserTableSection title="EMERGENCY TEAM" count={emergencyTeam.length} icon={Activity} color="#f59e0b" users={emergencyTeam} onAdd={() => { setModalMode('add'); setIsModalOpen(true); }} onEdit={u => { setSelectedUser(u); setModalMode('edit'); setIsModalOpen(true); }} onDelete={id => window.confirm('Delete this user?') && adminService.deleteUser(id).then(fetchUsers)} onToggleStatus={handleToggleStatus} onView={u => { setSelectedUser(u); setIsDetailOpen(true); }} />
      )}

      {(activeTab === 'All Users' || activeTab === 'System Managers') && (
        <UserTableSection title="SYSTEM MANAGERS" count={managers.length} icon={Shield} color="#a855f7" users={managers} onAdd={() => { setModalMode('add'); setIsModalOpen(true); }} onEdit={u => { setSelectedUser(u); setModalMode('edit'); setIsModalOpen(true); }} onDelete={id => window.confirm('Delete this user?') && adminService.deleteUser(id).then(fetchUsers)} onToggleStatus={handleToggleStatus} onView={u => { setSelectedUser(u); setIsDetailOpen(true); }} />
      )}
    </div>
  );
}
