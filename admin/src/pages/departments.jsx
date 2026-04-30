import React, { useState, useEffect } from 'react';
import { 
  Building2, Search, Plus, Edit2, Trash2, Users, 
  ChevronRight, ArrowRight, X, Save, RefreshCw
} from 'lucide-react';
import { adminService } from '../services/api';

const DepartmentModal = ({ isOpen, onClose, onSave, department, mode }) => {
  const [formData, setFormData] = useState({ name: '', head: '', staffCount: 0 });

  useEffect(() => {
    if (department && mode === 'edit') {
      setFormData({
        name: department.name || '',
        head: department.head || '',
        staffCount: department.staff_count || 0
      });
    } else {
      setFormData({ name: '', head: '', staffCount: 0 });
    }
  }, [department, mode, isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
      <div style={{ backgroundColor: 'white', width: '450px', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#1e293b' }}>{mode === 'edit' ? 'Edit Department' : 'Add New Department'}</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={24} /></button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', display: 'block' }}>Department Name</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})}
              style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }}
              placeholder="e.g. Cardiology"
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', display: 'block' }}>Head of Department</label>
            <input 
              type="text" 
              value={formData.head} 
              onChange={e => setFormData({...formData, head: e.target.value})}
              style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }}
              placeholder="e.g. Dr. Rahul Mehta"
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748b', marginBottom: '6px', display: 'block' }}>Staff Count</label>
            <input 
              type="number" 
              value={formData.staffCount} 
              onChange={e => setFormData({...formData, staffCount: parseInt(e.target.value) || 0})}
              style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }}
            />
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

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedDept, setSelectedDept] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const data = await adminService.getDepartments();
      setDepartments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSave = async (formData) => {
    try {
      if (modalMode === 'add') {
        await adminService.addDepartment(formData);
      } else {
        await adminService.updateDepartment(selectedDept.id, formData);
      }
      setIsModalOpen(false);
      fetchDepartments();
    } catch (err) {
      alert('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await adminService.deleteDepartment(id);
        fetchDepartments();
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  const filteredDepts = departments.filter(dept => 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem 0' }}>
      <DepartmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave} 
        department={selectedDept} 
        mode={modalMode} 
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900', color: '#1e293b' }}>Hospital Departments</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={fetchDepartments}
            style={{ 
              padding: '0.85rem', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <RefreshCw size={20} className={loading ? "spin" : ""} />
          </button>
          <button 
            onClick={() => { setModalMode('add'); setSelectedDept(null); setIsModalOpen(true); }}
            style={{ padding: '0.85rem 1.75rem', backgroundColor: '#4c1d95', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '800', fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(76, 29, 149, 0.2)', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Plus size={20} /> Add Department
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '24px', border: '1px solid #f1f5f9', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ color: '#4c1d95', backgroundColor: '#f5f3ff', padding: '10px', borderRadius: '12px' }}><Building2 size={24} /></div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#1e293b' }}>DEPARTMENTS</h3>
          </div>
          <div style={{ position: 'relative', width: '350px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search departments..." 
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
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Department Name</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Head of Department</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Staff Count</th>
                <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepts.map((dept, index) => (
                <tr key={dept.id} style={{ backgroundColor: '#ffffff', transition: 'all 0.2s ease' }} className="hover-row">
                  <td style={{ padding: '1.25rem 1rem', fontSize: '0.9rem', fontWeight: '700', color: '#64748b', borderBottom: '1px solid #f8fafc' }}>
                    {String(index + 1).padStart(2, '0')}
                  </td>
                  <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f8fafc' }}>
                    <div style={{ fontSize: '1rem', fontWeight: '800', color: '#1e293b' }}>{dept.name}</div>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f8fafc' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${dept.head}`} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                      </div>
                      <span style={{ fontSize: '0.95rem', fontWeight: '600', color: '#475569' }}>{dept.head}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f8fafc' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                      <Users size={16} />
                      <span style={{ fontSize: '0.95rem', fontWeight: '700' }}>{dept.staff_count}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f8fafc' }}>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                      <button 
                        onClick={() => { setSelectedDept(dept); setModalMode('edit'); setIsModalOpen(true); }}
                        style={{ padding: '8px', borderRadius: '10px', border: 'none', backgroundColor: '#f5f3ff', color: '#7c3aed', cursor: 'pointer' }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(dept.id)}
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
            View All Departments <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
