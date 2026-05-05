import React from 'react';

const Header = ({ user }) => {
  return (
    <header className="bg-white px-[25px] py-[15px] rounded-[15px] flex justify-between items-center shadow-[0_2px_10px_rgba(0,0,0,0.05)] mb-[20px]">
      <div className="flex items-center gap-[15px]">
        <img src="https://i.pravatar.cc/150?u=nurse" alt="profile" className="w-[45px] rounded-full" />
        <div>
          <div className="font-[800] text-[16px]">Welcome, {user?.name || 'Nurse'}</div>
          <div className="text-[12px] text-[#718096]">Staff ID: {user?.staffId || 'NUR12345'}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-[800] text-[16px]">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        <div className="text-[12px] text-[#718096]">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
      </div>
    </header>
  );
};

export default Header;
