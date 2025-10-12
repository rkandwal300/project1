import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { RoutePaths } from './routePaths';

const PublicRoute = ({ children }) => {
    const jwtToken = Cookies.get('jwt_token');

    if (jwtToken) {
        return <Navigate to={RoutePaths.HOME} />;
    }

    return children;
};

export default PublicRoute;
