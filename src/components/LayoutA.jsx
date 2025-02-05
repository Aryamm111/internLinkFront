import React from 'react';
import TopNavBar from './TopNavBar';
import SideNavBar from './SideNavBar';
import { Outlet } from 'react-router-dom';
import { useUser } from '../UseContext';

const LayoutA = () => {
  return (
    <div className="flex min-h-screen">
      <SideNavBar />
      <div className="flex-1 ml-[240px] pt-[64px]">
        <TopNavBar />
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};


export default LayoutA;
