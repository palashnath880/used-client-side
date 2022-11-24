import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContextProvider/UserContextProvider';

const AdminRoutes = ({ children }) => {
    const { user } = useContext(UserContext);

    if (user && user?.role === 'Admin') {
        return <>{children}</>
    }

    return <Navigate to={'/'} replace={true} />;
}

export default AdminRoutes;
