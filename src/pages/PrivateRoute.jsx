// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRoute Component
const PrivateRoute = ({ element, isAuthenticated, ...rest }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return element;
};

export default PrivateRoute;
