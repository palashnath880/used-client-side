import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {

    const user = useSelector(state => state.user);

    if (user && user?.uid) {
        return <>{children}</>;
    }

    return <Navigate to={'/login'} replace={true} />;
}

export default PrivateRoutes;
