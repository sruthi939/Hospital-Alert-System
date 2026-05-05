import React from 'react';

const AlertCard = ({ alert }) => {
  const getStyle = (code) => {
    switch(code) {
      case 'CODE BLUE': return { color: 'text-[#0052cc]', bg: 'bg-[#eff6ff]', border: 'border-[#bfdbfe]' };
      case 'CODE RED': return { color: 'text-[#d73a49]', bg: 'bg-[#fef2f2]', border: 'border-[#fecaca]' };
      default: return { color: 'text-[#374151]', bg: 'bg-[#f3f4f6]', border: 'border-[#e5e7eb]' };
    }
  };

  const style = getStyle(alert.code_type);

  return (
    <div className={`${style.bg} border ${style.border} rounded-[12px] p-[15px] flex gap-[15px] items-center`}>
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <div className={`font-[800] text-[13px] ${style.color}`}>{alert.code_type}</div>
            <div className={`text-[11px] ${style.color}`}>{alert.notes || 'Emergency'}</div>
          </div>
          <div className="text-[#e53e3e] text-[10px] font-[800] flex items-center gap-[5px]">
            <div className="w-[6px] h-[6px] bg-[#e53e3e] rounded-full"></div>
            ACTIVE
          </div>
        </div>
        <div className="text-[11px] text-[#718096] mt-[8px]">{alert.floor}, {alert.ward} - {alert.room}</div>
        <div className="text-[10px] text-[#a0aec0] mt-[3px]">{new Date(alert.created_at).toLocaleTimeString()}</div>
      </div>
    </div>
  );
};

export default AlertCard;
