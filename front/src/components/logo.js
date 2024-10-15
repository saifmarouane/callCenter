import { useTheme } from '@mui/material/styles';
import React from 'react';

export const Logo = ({ src }) => {
  return <img src={src} alt="Logo" style={{ height: '100%', width: '100%' }} />;
};

