import React from 'react';
import { useUser } from '../context/UserContext.jsx';


const TopNavBar = () => {
  const { userName, userEmail } = useUser(); 
  return (
    <header className="bg-white shadow p-4 border-b border-gray-200 w-full fixed top-0 z-10">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center pr-6">
  
        <div className="flex items-center space-x-6 ml-50">
          <img src="/assets/profileicon.png" alt="Profile Icon" className="w-8 h-8 rounded-full" />
          <div className="flex flex-col items-start">
            <span className="text-gray-700 text-sm font-medium">{userName}</span>
            <span className="text-gray-500 text-sm">{userEmail}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;

