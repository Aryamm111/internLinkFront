import React from 'react';
import { useUser } from '../UseContext.jsx';

const TopNavBar = () => {
  const { userName } = useUser();

  return (
    <header className="bg-white shadow p-4 border-b border-gray-200 w-full fixed top-0 z-10">
      <div className="max-w-screen-xl mx-auto flex  pr-6">
       
          <div >
            <span className="text-gray-700 text-sm font-medium">{userName}</span>
            <span className="text-gray-500 text-sm">Aryam@gmail.com</span>
          </div>
       
      </div>
    </header>
  );
};

export default TopNavBar;
