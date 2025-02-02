import React from 'react';
import { useUser } from '../UseContext.jsx';

const TopNavBar = () => {
  const { userName } = useUser();

};

export default TopNavBar;
