import React from 'react';
import SideNavBar from './SideNavBar';
import TopNavBar from './TopNavBar';
import { Outlet } from 'react-router-dom';

const LayoutA = ({ userRole }) => {
  return (
  
    <div className="flex min-h-screen">
      <SideNavBar userRole={userRole} />
   
   
      </div>
  );
};

export default LayoutA;
