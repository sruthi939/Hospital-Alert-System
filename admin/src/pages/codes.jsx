import React, { useState, useEffect } from 'react';
import { ShieldPlus, Search, Plus, Edit2, Trash2, Palette, ArrowRight, X, Save, RefreshCw, Hash } from 'lucide-react';
import { adminService } from '../services/api';

const AlertCodeModal = ({ isOpen, onClose, onSave, alertCode, mode }) => {
  const [formData, setFormData] = useState({ name: '', code: '', color: '#3b82f6', description: '', status: 'Active' });

  useEffect(() => {
    if (alertCode && mode === 'edit') {
      setFormData({
        name: alertCode.name || '',
        code: alertCode.code || '',
        color: alertCode.color || '#3b82f6',
        description: alertCode.description || '',
        status: alertCode.status || 'Active'
      });
    } else {
      setFormData({ name: '', code: '', color: '#3b82f6', description: '', status: 'Active' });
    }
  }, [alertCode, mode, isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
      <div style={{ backgroundColor: 'white', width: '450px', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#1e293b' }}>{mode === 'edit' ? 'Edit Alert Code' : 'Add New Alert Code'}</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={24} /></button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', display: 'block' }}>Code Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }}
              placeholder="e.g. Code Blue"
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', display: 'block' }}>Code (Short Identifier)</label>
            <input
              type="text"
              value={formData.code}
              onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }}
              placeholder="e.g. CODE BLUE"
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', display: 'block' }}>Identify Color</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="color"
                  value={formData.color}
                  onChange={e => setFormData({ ...formData, color: e.target.value })}
                  style={{ width: '40px', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer', backgroundColor: 'transparent' }}
                />
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#475569' }}>{formData.color.toUpperCase()}</span>
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', display: 'block' }}>Status</label>
              <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', display: 'block' }}>Description</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none', minHeight: '80px', resize: 'vertical' }}
              placeholder="Describe the emergency protocol..."
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: 'white', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
          <button onClick={() => onSave(formData)} style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', border: 'none', backgroundColor: '#4c1d95', color: 'white', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Save size={18} /> Save Protocol</button>
        </div>
      </div>
    </div>
  );
};

export default function AlertCodes() {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedCode, setSelectedCode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCodes = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAlertCodes();
      setCodes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  const handleSave = async (formData) => {
    try {
      if (modalMode === 'add') {
        await adminService.addAlertCode(formData);
      } else {
        await adminService.updateAlertCode(selectedCode.id, formData);
      }
      setIsModalOpen(false);
      fetchCodes();
    } catch (err) {
      alert('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this alert code?')) {
      try {
        await adminService.deleteAlertCode(id);
        fetchCodes();
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  const filteredCodes = codes.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem 0' }}>
      <AlertCodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        alertCode={selectedCode}
        mode={modalMode}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900', color: '#1e293b' }}>Alert Code Management</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={fetchCodes}
            style={{
              padding: '0.85rem', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <RefreshCw size={20} className={loading ? "spin" : ""} />
          </button>
          <button
            onClick={() => { setModalMode('add'); setSelectedCode(null); setIsModalOpen(true); }}
            style={{ padding: '0.85rem 1.75rem', backgroundColor: '#4c1d95', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '800', fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(76, 29, 149, 0.2)', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Plus size={20} /> Add Alert Code
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '24px', border: '1px solid #f1f5f9', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ color: '#4c1d95', backgroundColor: '#f5f3ff', padding: '10px', borderRadius: '12px' }}><ShieldPlus size={24} /></div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#1e293b' }}>ALERT CODES</h3>
          </div>
          <div style={{ position: 'relative', width: '350px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search alert codes..."
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
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Code Name</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Code</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Color</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Description</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCodes.map((item, index) => (
                <tr key={item.id} style={{ backgroundColor: '#ffffff', transition: 'all 0.2s ease' }} className="hover-row">
                  <td style={{ padding: '1.25rem 1rem', fontSize: '0.9rem', fontWeight: '700', color: '#64748b', borderBottom: '1px solid #f8fafc' }}>
                    {String(index + 1).padStart(2, '0')}
                  </td>
                  <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f8fafc' }}>
                    <div style={{ fontSize: '1rem', fontWeight: '800', color: '#1e293b' }}>{item.name}</div>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f8fafc' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#475569', backgroundColor: '#f1f5f9', padding: '4px 10px', borderRadius: '6px' }}>{item.code}</span>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f8fafc' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: item.color, border: '2px solid white', boxShadow: '0 0 0 1px #e2e8f0' }}></div>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f8fafc', maxWidth: '250px' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: '600', color: '#64748b' }}>{item.description}</span>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f8fafc' }}>
                    <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800', backgroundColor: item.status === 'Active' ? '#f0fdf4' : '#fff1f2', color: item.status === 'Active' ? '#16a34a' : '#e11d48' }}>{item.status}</span>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f8fafc' }}>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                      <button
                        onClick={() => { setSelectedCode(item); setModalMode('edit'); setIsModalOpen(true); }}
                        style={{ padding: '8px', borderRadius: '10px', border: 'none', backgroundColor: '#f5f3ff', color: '#7c3aed', cursor: 'pointer' }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{ padding: '8px', borderRadius: '10px', border: 'none', backgroundColor: '#fff1f2', color: '#e11d48', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
          <button style={{ backgroundColor: 'transparent', border: 'none', color: '#4c1d95', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
            View All Alert Codes <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
