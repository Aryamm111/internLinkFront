import "./App.css";
import React from 'react';
import LayoutA from './components/LayoutA';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <LayoutA userRole="companySupervisor"> 
      <Outlet />
    </LayoutA>
  );
}

export default App;
