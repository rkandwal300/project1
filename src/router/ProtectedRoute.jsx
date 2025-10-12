import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../store/slice/userSlice';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { RoutePaths } from './routePaths';

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { user, status } = useSelector((state) => state.user);

    useEffect(() => {
        const jwtToken = Cookies.get('jwt_token');
        if (jwtToken && !user) {
            dispatch(fetchUser());
        }
    }, [dispatch, user]);

    const jwtToken = Cookies.get('jwt_token');

    if (!jwtToken) {
        return <Navigate to={RoutePaths.LOG_IN} />;
    }

    if (status === 'loading') {
        return <div>Loading...</div>; 
    }

    if (status === 'failed') {
        return <Navigate to={RoutePaths.LOG_IN} />;
    }

    if (user) {
        return children;
    }

    return null; 
};

export default ProtectedRoute;
