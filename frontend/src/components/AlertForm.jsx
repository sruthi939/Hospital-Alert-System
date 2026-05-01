import React, { useState, useEffect } from 'react';
import { alertService } from '../services/alertService';
import { useAuth } from '../context/AuthContext';

const AlertForm = ({ onAlertTriggered }) => {
  const { user } = useAuth();
  const [selectedCode, setSelectedCode] = useState('CODE BLUE');
  const [location, setLocation] = useState({ floor: '', wardId: '', room: '' });
  const [notes, setNotes] = useState('');
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/wards');
        if (response.ok) {
          const data = await response.json();
          setWards(data);
          if (data.length > 0) {
            setLocation(prev => ({ ...prev, wardId: data[0].id, wardName: data[0].name }));
          }
        }
      } catch (err) {
        console.error("Failed to fetch wards:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMetadata();
  }, []);

  const handleTrigger = async () => {
    if (!location.wardId || !location.room) {
      alert("Please select a ward and enter a room number");
      return;
    }

    try {
      const selectedWard = wards.find(w => w.id === parseInt(location.wardId));
      const alertData = {
        code_type: selectedCode,
        floor: location.floor || 'G Floor',
        ward: selectedWard?.name || 'Unknown',
        room: location.room,
        notes,
        triggered_by: user?.name || 'Unknown Nurse'
      };
      await alertService.triggerAlert(alertData);
      if (onAlertTriggered) onAlertTriggered();
      alert('Alert Triggered Successfully!');
      setNotes('');
    } catch (err) {
      console.error(err);
      alert('Failed to trigger alert');
    }
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
        <div style={{ width: '4px', height: '18px', backgroundColor: '#3b82f6', borderRadius: '2px' }}></div>
        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#1e293b' }}>TRIGGER EMERGENCY ALERT</h3>
      </div>
      
      {/* Code Selection */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '30px' }}>
        {[
          { code: 'CODE BLUE', color: '#0052cc' },
          { code: 'CODE RED', color: '#d73a49' },
          { code: 'CODE YELLOW', color: '#f6ad55' },
          { code: 'CODE PINK', color: '#d53f8c' }
        ].map(item => (
          <button 
            key={item.code}
            onClick={() => setSelectedCode(item.code)}
            style={{ 
              padding: '16px 10px', borderRadius: '12px', border: selectedCode === item.code ? `3px solid ${item.color}` : '1px solid transparent', 
              color: 'white', fontWeight: '800', backgroundColor: item.color, fontSize: '11px', cursor: 'pointer',
              boxShadow: selectedCode === item.code ? `0 8px 20px ${item.color}40` : 'none',
              transform: selectedCode === item.code ? 'translateY(-2px)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            {item.code}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '25px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '8px' }}>FLOOR</label>
          <select value={location.floor} onChange={e => setLocation({...location, floor: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontWeight: '600' }}>
            <option value="">Select Floor</option>
            <option>Ground Floor</option>
            <option>1st Floor</option>
            <option>2nd Floor</option>
            <option>3rd Floor</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '8px' }}>WARD</label>
          <select value={location.wardId} onChange={e => setLocation({...location, wardId: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontWeight: '600' }}>
            {wards.length === 0 ? <option>No Wards Found</option> : wards.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
          </select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '8px' }}>ROOM NO</label>
          <input type="text" placeholder="e.g. 205" value={location.room} onChange={e => setLocation({...location, room: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontWeight: '600' }} />
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '8px' }}>SITUATION NOTES</label>
        <textarea 
          placeholder="Briefly describe the situation..." 
          value={notes} 
          onChange={e => setNotes(e.target.value)}
          style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', height: '100px', resize: 'none', fontWeight: '500' }}
        />
      </div>

      <button onClick={handleTrigger} style={{ width: '100%', padding: '20px', backgroundColor: '#001a3d', color: 'white', border: 'none', borderRadius: '15px', fontWeight: '800', fontSize: '16px', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 15px rgba(0,26,61,0.2)' }}>
        SEND EMERGENCY SIGNAL
      </button>
    </div>
  );
};

export default AlertForm;
