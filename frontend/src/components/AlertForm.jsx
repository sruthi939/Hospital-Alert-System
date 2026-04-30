import React, { useState } from 'react';
import { alertService } from '../services/alertService';

const AlertForm = ({ onAlertTriggered }) => {
  const [selectedCode, setSelectedCode] = useState('CODE BLUE');
  const [location, setLocation] = useState({ floor: '2nd Floor', ward: 'ICU', room: '205' });
  const [notes, setNotes] = useState('');

  const handleTrigger = async () => {
    try {
      const alertData = {
        code_type: selectedCode,
        ...location,
        notes
      };
      await alertService.triggerAlert(alertData);
      if (onAlertTriggered) onAlertTriggered();
      alert('Alert Triggered Successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to trigger alert');
    }
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <h3 style={{ margin: '0 0 20px 0', fontSize: '14px', fontWeight: '800' }}>CREATE NEW EMERGENCY ALERT</h3>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {['CODE BLUE', 'CODE RED', 'CODE YELLOW', 'CODE PINK'].map(code => (
          <button 
            key={code}
            onClick={() => setSelectedCode(code)}
            style={{ flex: 1, padding: '15px', borderRadius: '10px', border: selectedCode === code ? '3px solid black' : 'none', color: 'white', fontWeight: '800', backgroundColor: code === 'CODE BLUE' ? '#0052cc' : code === 'CODE RED' ? '#d73a49' : code === 'CODE YELLOW' ? '#f6ad55' : '#d53f8c' }}
          >
            {code}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '5px' }}>Floor</label>
          <select value={location.floor} onChange={e => setLocation({...location, floor: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <option>1st Floor</option><option>2nd Floor</option><option>3rd Floor</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '5px' }}>Ward</label>
          <select value={location.ward} onChange={e => setLocation({...location, ward: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <option>ICU</option><option>ER</option><option>NICU</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '5px' }}>Room</label>
          <input type="text" value={location.room} onChange={e => setLocation({...location, room: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
        </div>
      </div>

      <textarea 
        placeholder="Additional Notes..." 
        value={notes} 
        onChange={e => setNotes(e.target.value)}
        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', height: '80px', marginBottom: '20px' }}
      />

      <button onClick={handleTrigger} style={{ width: '100%', padding: '15px', backgroundColor: '#3182ce', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '800' }}>
        TRIGGER ALERT
      </button>
    </div>
  );
};

export default AlertForm;
