import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoutes = ({ children }) => {

    const user = useSelector(state => state.user);

    if (user && user?.role === 'Admin') {
        return <>{children}</>
    }

    return <Navigate to={'/'} replace={true} />;
}

export default AdminRoutes;
