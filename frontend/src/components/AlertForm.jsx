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
        const response = await fetch('http://localhost:5001/api/wards');
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
    <div className="bg-white rounded-[20px] p-[30px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#f1f5f9]">
      <div className="flex items-center gap-[10px] mb-[25px]">
        <div className="w-[4px] h-[18px] bg-[#3b82f6] rounded-[2px]"></div>
        <h3 className="m-0 text-[15px] font-[800] text-[#1e293b]">TRIGGER EMERGENCY ALERT</h3>
      </div>
      
      {/* Code Selection */}
      <div className="grid grid-cols-4 gap-[12px] mb-[30px]">
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
              border: selectedCode === item.code ? `3px solid ${item.color}` : '1px solid transparent', 
              backgroundColor: item.color,
              boxShadow: selectedCode === item.code ? `0 8px 20px ${item.color}40` : 'none',
              transform: selectedCode === item.code ? 'translateY(-2px)' : 'none'
            }}
            className="p-[16px_10px] rounded-[12px] text-white font-[800] text-[11px] cursor-pointer transition-all duration-200 ease-in-out"
          >
            {item.code}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-[20px] mb-[25px]">
        <div>
          <label className="block text-[12px] font-[800] text-[#64748b] mb-[8px]">FLOOR</label>
          <select value={location.floor} onChange={e => setLocation({...location, floor: e.target.value})} className="w-full p-[12px] rounded-[10px] border border-[#e2e8f0] bg-[#f8fafc] font-[600]">
            <option value="">Select Floor</option>
            <option>Ground Floor</option>
            <option>1st Floor</option>
            <option>2nd Floor</option>
            <option>3rd Floor</option>
          </select>
        </div>
        <div>
          <label className="block text-[12px] font-[800] text-[#64748b] mb-[8px]">WARD</label>
          <select value={location.wardId} onChange={e => setLocation({...location, wardId: e.target.value})} className="w-full p-[12px] rounded-[10px] border border-[#e2e8f0] bg-[#f8fafc] font-[600]">
            {wards.length === 0 ? <option>No Wards Found</option> : wards.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[12px] font-[800] text-[#64748b] mb-[8px]">ROOM NO</label>
          <input type="text" placeholder="e.g. 205" value={location.room} onChange={e => setLocation({...location, room: e.target.value})} className="w-full p-[12px] rounded-[10px] border border-[#e2e8f0] bg-[#f8fafc] font-[600]" />
        </div>
      </div>

      <div className="mb-[30px]">
        <label className="block text-[12px] font-[800] text-[#64748b] mb-[8px]">SITUATION NOTES</label>
        <textarea 
          placeholder="Briefly describe the situation..." 
          value={notes} 
          onChange={e => setNotes(e.target.value)}
          className="w-full p-[15px] rounded-[12px] border border-[#e2e8f0] bg-[#f8fafc] h-[100px] resize-none font-[500]"
        />
      </div>

      <button onClick={handleTrigger} className="w-full p-[20px] bg-[#001a3d] text-white border-none rounded-[15px] font-[800] text-[16px] cursor-pointer transition-all duration-200 ease-in-out shadow-[0_4px_15px_rgba(0,26,61,0.2)]">
        SEND EMERGENCY SIGNAL
      </button>
    </div>
  );
};

export default AlertForm;
