import React from 'react';
import { useUser } from '../context/UserContext.jsx';

const TopNavBar = () => {
  const { userName } = useUser();

};

export default TopNavBar;
