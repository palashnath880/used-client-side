import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthRoutes = ({ children }) => {
    const user = useSelector(state => state.user);
    if (user) {
        return <Navigate to={'/'} replace={true} />
    }

    return <>{children}</>;
}

export default AuthRoutes;
