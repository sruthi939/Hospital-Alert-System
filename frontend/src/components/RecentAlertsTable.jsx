import React from 'react';

const RecentAlertsTable = ({ alerts }) => {
  return (
    <div className="bg-white rounded-[15px] p-[25px] shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
      <h3 className="m-0 mb-[20px] text-[14px] font-[800]">MY RECENT ALERTS</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b border-[#edf2f7]">
            <th className="p-[10px] text-[13px] text-[#718096]">Code</th>
            <th className="p-[10px] text-[13px] text-[#718096]">Location</th>
            <th className="p-[10px] text-[13px] text-[#718096]">Time</th>
            <th className="p-[10px] text-[13px] text-[#718096]">Status</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map(alert => (
            <tr key={alert.id} className="border-b border-[#f7fafc]">
              <td className="px-[10px] py-[15px] font-[800] text-[14px]">{alert.code_type}</td>
              <td className="px-[10px] py-[15px] text-[13px]">{alert.floor}, {alert.ward} - {alert.room}</td>
              <td className="px-[10px] py-[15px] text-[14px]">{new Date(alert.created_at).toLocaleTimeString()}</td>
              <td className="px-[10px] py-[15px]">
                <span className={`px-[10px] py-[5px] rounded-[5px] text-[12px] font-[800] ${alert.status === 'ACTIVE' ? 'bg-[#ebf8ff] text-[#3182ce]' : 'bg-[#f0fff4] text-[#38a169]'}`}>
                  {alert.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentAlertsTable;
