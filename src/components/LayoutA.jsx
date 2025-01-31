import React from 'react';
import SideNavBar from './SideNavBar';
import TopNavBar from './TopNavBar';
import { Outlet } from 'react-router-dom';

const LayoutA = ({ userRole }) => {
  return (
  
    <div className="flex min-h-screen">
      <SideNavBar userRole={userRole} />
   
    <div className="bg-red ml-[240px] pt-[64px] ">
    <TopNavBar  />
    <main className="p-8">

      <Outlet/> 
    </main>
      </div>
      </div>
  );
};

export default LayoutA;
