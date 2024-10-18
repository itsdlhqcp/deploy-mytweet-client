import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const profile = false;  

  return profile ? <Navigate to="/"/> : children;
};

export default PublicRoute;