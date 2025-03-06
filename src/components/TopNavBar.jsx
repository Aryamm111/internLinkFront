import React from 'react';
import { useUser } from '../UserContext.jsx';

const TopNavBar = () => {
  const { userName } = useUser();

};

export default TopNavBar;
