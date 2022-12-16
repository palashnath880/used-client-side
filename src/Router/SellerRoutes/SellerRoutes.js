import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const SellerRoutes = ({ children }) => {

    const user = useSelector(state => state.user);

    if (user && user?.role === 'Seller') {
        return <>{children}</>
    }

    return <Navigate to={'/'} replace={true} />;
}

export default SellerRoutes;
