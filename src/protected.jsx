// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth';

const ProtectedRoute = ({ element: Element, ...rest }) => {
    return (
        <Route
            {...rest}
            element={isAuthenticated() ? <Element {...rest} /> : <Navigate to="/login" />}
        />
    );
};

export default ProtectedRoute;
