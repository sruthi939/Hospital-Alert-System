import React, { useState, useEffect } from 'react';
import { 
  DoorOpen, Search, Plus, Edit2, Trash2, LayoutGrid, 
  ArrowRight, X, Save, RefreshCw, Building2
} from 'lucide-react';
import { adminService } from '../services/api';

const WardModal = ({ isOpen, onClose, onSave, ward, mode }) => {
  const [formData, setFormData] = useState({ name: '', department: '', rooms: 0, beds: 0 });

  useEffect(() => {
    if (ward && mode === 'edit') {
      setFormData({
        name: ward.name || '',
        department: ward.department || '',
        rooms: ward.room_count || 0,
        beds: ward.bed_count || 0
      });
    } else {
      setFormData({ name: '', department: '', rooms: 0, beds: 0 });
    }
  }, [ward, mode, isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
      <div style={{ backgroundColor: 'white', width: '450px', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#1e293b' }}>{mode === 'edit' ? 'Edit Ward' : 'Add New Ward'}</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={24} /></button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', display: 'block' }}>Ward Name</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})}
              style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }}
              placeholder="e.g. ICU"
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', display: 'block' }}>Department</label>
            <input 
              type="text" 
              value={formData.department} 
              onChange={e => setFormData({...formData, department: e.target.value})}
              style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }}
              placeholder="e.g. Intensive Care (ICU)"
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', display: 'block' }}>Room Count</label>
              <input 
                type="number" 
                value={formData.rooms} 
                onChange={e => setFormData({...formData, rooms: parseInt(e.target.value) || 0})}
                style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', display: 'block' }}>Bed Count</label>
              <input 
                type="number" 
                value={formData.beds} 
                onChange={e => setFormData({...formData, beds: parseInt(e.target.value) || 0})}
                style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }}
              />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: 'white', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
          <button onClick={() => onSave(formData)} style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', border: 'none', backgroundColor: '#4c1d95', color: 'white', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Save size={18} /> Save</button>
        </div>
      </div>
    </div>
  );
};

export default function Wards() {
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('By Ward');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedWard, setSelectedWard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchWards = async () => {
    setLoading(true);
    try {
      const data = await adminService.getWards();
      setWards(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWards();
  }, []);

  const handleSave = async (formData) => {
    try {
      if (modalMode === 'add') {
        await adminService.addWard(formData);
      } else {
        await adminService.updateWard(selectedWard.id, formData);
      }
      setIsModalOpen(false);
      fetchWards();
    } catch (err) {
      alert('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this ward?')) {
      try {
        await adminService.deleteWard(id);
        fetchWards();
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  const filteredWards = wards.filter(ward => 
    ward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ward.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem 0' }}>
      <WardModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave} 
        ward={selectedWard} 
        mode={modalMode} 
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900', color: '#1e293b' }}>Ward / Room Management</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={fetchWards}
            style={{ 
              padding: '0.85rem', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <RefreshCw size={20} className={loading ? "spin" : ""} />
          </button>
          <button 
            onClick={() => { setModalMode('add'); setSelectedWard(null); setIsModalOpen(true); }}
            style={{ padding: '0.85rem 1.75rem', backgroundColor: '#4c1d95', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '800', fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(76, 29, 149, 0.2)', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Plus size={20} /> Add Ward
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '24px', border: '1px solid #f1f5f9', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '4px', backgroundColor: '#f8fafc', padding: '6px', borderRadius: '14px' }}>
            <button 
              onClick={() => setActiveTab('By Ward')}
              style={{ padding: '0.6rem 1.5rem', borderRadius: '10px', border: 'none', backgroundColor: activeTab === 'By Ward' ? 'white' : 'transparent', color: activeTab === 'By Ward' ? '#4c1d95' : '#64748b', fontWeight: '800', fontSize: '0.9rem', cursor: 'pointer', boxShadow: activeTab === 'By Ward' ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none' }}
            >
              By Ward
            </button>
            <button 
              onClick={() => setActiveTab('By Room')}
              style={{ padding: '0.6rem 1.5rem', borderRadius: '10px', border: 'none', backgroundColor: activeTab === 'By Room' ? 'white' : 'transparent', color: activeTab === 'By Room' ? '#4c1d95' : '#64748b', fontWeight: '800', fontSize: '0.9rem', cursor: 'pointer', boxShadow: activeTab === 'By Room' ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none' }}
            >
              By Room
            </button>
          </div>
          
          <div style={{ position: 'relative', width: '350px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder={`Search ${activeTab.toLowerCase()}...`} 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.7rem 1rem 0.7rem 2.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', outline: 'none', fontSize: '0.9rem' }}
            />
          </div>
        </div>

        {activeTab === 'By Ward' ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
              <thead>
                <tr style={{ textAlign: 'left' }}>
                  <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>#</th>
                  <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Ward Name</th>
                  <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Department</th>
                  <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Rooms</th>
                  <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Bed Count</th>
                  <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWards.length > 0 ? filteredWards.map((ward, index) => (
                  <tr key={ward.id} style={{ backgroundColor: '#ffffff', transition: 'all 0.2s ease' }} className="hover-row">
                    <td style={{ padding: '1.25rem 1rem', fontSize: '0.9rem', fontWeight: '700', color: '#64748b', borderBottom: '1px solid #f8fafc' }}>
                      {String(index + 1).padStart(2, '0')}
                    </td>
                    <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f8fafc' }}>
                      <div style={{ fontSize: '1rem', fontWeight: '800', color: '#1e293b' }}>{ward.name}</div>
                    </td>
                    <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f8fafc' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: '600', color: '#64748b' }}>{ward.department}</span>
                    </td>
                    <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f8fafc' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#475569' }}>{ward.room_count}</span>
                    </td>
                    <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f8fafc' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#475569' }}>{ward.bed_count}</span>
                    </td>
                    <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f8fafc' }}>
                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        <button 
                          onClick={() => { setSelectedWard(ward); setModalMode('edit'); setIsModalOpen(true); }}
                          style={{ padding: '8px', borderRadius: '10px', border: 'none', backgroundColor: '#f5f3ff', color: '#7c3aed', cursor: 'pointer' }}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(ward.id)}
                          style={{ padding: '8px', borderRadius: '10px', border: 'none', backgroundColor: '#fff1f2', color: '#e11d48', cursor: 'pointer' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                      No wards found. Click "Add Ward" to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '5rem', color: '#94a3b8' }}>
             <LayoutGrid size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
             <p style={{ fontWeight: '700' }}>Room management coming soon.</p>
             <p style={{ fontSize: '0.8rem' }}>Please manage by Ward for now.</p>
          </div>
        )}

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
          <button style={{ backgroundColor: 'transparent', border: 'none', color: '#4c1d95', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
            View All Wards <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
