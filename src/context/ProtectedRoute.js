// src/components/ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the import path as necessary

function ProtectedRoute({ component: Component, ...rest }) {
 const { currentUser } = useAuth();

 return (
    <Route
      {...rest}
      render={props =>
        currentUser ? <Component {...props} /> : <Navigate to="/loginPage" />
      }
    />
 );
}

export default ProtectedRoute;