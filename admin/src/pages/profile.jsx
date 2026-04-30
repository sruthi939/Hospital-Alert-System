import React, { useState, useEffect } from 'react';
import { 
  UserCircle, Mail, Phone, Shield, User, Key,
  Building2, DoorOpen, LayoutGrid, Users, Activity,
  Clock, ArrowRight, Camera, CheckCircle2
} from 'lucide-react';
import { adminService } from '../services/api';

const StatRow = ({ icon: Icon, label, value, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #f1f5f9' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ padding: '8px', backgroundColor: `${color}15`, color: color, borderRadius: '10px' }}>
        <Icon size={20} />
      </div>
      <span style={{ fontWeight: '700', color: '#475569', fontSize: '0.9rem' }}>{label}</span>
    </div>
    <span style={{ fontSize: '1.1rem', fontWeight: '900', color: '#1e293b' }}>{value}</span>
  </div>
);

const ActivityItem = ({ icon: Icon, label, time, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid #f8fafc' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ color: color }}>
        <Icon size={18} />
      </div>
      <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e293b' }}>{label}</span>
    </div>
    <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '600' }}>{time}</span>
  </div>
);

export default function Profile() {
  const [stats, setStats] = useState({ depts: 0, wards: 0, rooms: 0, staff: 0, active: 0 });
  const [loading, setLoading] = useState(true);
  const [adminInfo, setAdminInfo] = useState({
    name: 'Sruthi Alex',
    email: 'admin@hospital.com',
    phone: '9876543210',
    role: 'System Administrator',
    username: 'admin'
  });

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [depts, wards, users] = await Promise.all([
        adminService.getDepartments(),
        adminService.getWards(),
        adminService.getUsers()
      ]);
      
      const totalRooms = wards.reduce((acc, w) => acc + (w.room_count || 0), 0);
      
      setStats({
        depts: depts.length,
        wards: wards.length,
        rooms: totalRooms,
        staff: users.length,
        active: users.filter(u => u.status === 'APPROVED').length
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 1fr', gap: '1.5rem' }}>
        
        {/* Profile Card */}
        <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
            <UserCircle size={24} color="#4c1d95" />
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '900', color: '#1e293b', textTransform: 'uppercase' }}>Profile</h2>
          </div>

          <div style={{ display: 'flex', gap: '2rem' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#f1f5f9', overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                <img src={`https://ui-avatars.com/api/?name=${adminInfo.name}&background=4c1d95&color=fff&size=150`} alt="Admin" style={{ width: '100%', height: '100%' }} />
              </div>
              <button style={{ position: 'absolute', bottom: '5px', right: '5px', padding: '8px', backgroundColor: '#4c1d95', color: 'white', border: 'none', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <Camera size={16} />
              </button>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Full Name</label>
                <input type="text" readOnly value={adminInfo.name} style={{ width: '100%', padding: '0.7rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '0.95rem', fontWeight: '700', color: '#1e293b' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Email</label>
                <input type="text" readOnly value={adminInfo.email} style={{ width: '100%', padding: '0.7rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '0.95rem', fontWeight: '700', color: '#1e293b' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Phone</label>
                <input type="text" readOnly value={adminInfo.phone} style={{ width: '100%', padding: '0.7rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '0.95rem', fontWeight: '700', color: '#1e293b' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Role</label>
                <select disabled style={{ width: '100%', padding: '0.7rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '0.95rem', fontWeight: '700', color: '#1e293b', appearance: 'none' }}>
                  <option>{adminInfo.role}</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Username</label>
                <input type="text" readOnly value={adminInfo.username} style={{ width: '100%', padding: '0.7rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '0.95rem', fontWeight: '700', color: '#1e293b' }} />
              </div>
              <button style={{ marginTop: '1rem', padding: '0.85rem', backgroundColor: '#4c1d95', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '800', fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(76, 29, 149, 0.2)' }}>
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1rem', fontWeight: '800', color: '#1e293b' }}>Quick Stats</h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <StatRow icon={Building2} label="Departments" value={stats.depts} color="#6366f1" />
            <StatRow icon={DoorOpen} label="Wards" value={stats.wards} color="#10b981" />
            <StatRow icon={LayoutGrid} label="Rooms" value={stats.rooms} color="#7c3aed" />
            <StatRow icon={Users} label="Staff Members" value={stats.staff} color="#3b82f6" />
            <StatRow icon={Activity} label="Active Users" value={stats.active} color="#f59e0b" />
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1rem', fontWeight: '800', color: '#1e293b' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ActivityItem icon={User} label="New user Dr. Amit Verma added" time="10:20 AM" color="#7c3aed" />
            <ActivityItem icon={Shield} label='Alert Code "Code Orange" added' time="09:45 AM" color="#f59e0b" />
            <ActivityItem icon={DoorOpen} label='Ward "Emergency Ward" updated' time="09:30 AM" color="#3b82f6" />
            <ActivityItem icon={CheckCircle2} label="System backup completed" time="08:15 AM" color="#10b981" />
            <ActivityItem icon={Activity} label="New alert triggered: Code Blue" time="07:50 AM" color="#ef4444" />
          </div>
          <button style={{ width: '100%', marginTop: '2rem', padding: '1rem', backgroundColor: 'transparent', border: 'none', color: '#4c1d95', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
            View All Activity <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
