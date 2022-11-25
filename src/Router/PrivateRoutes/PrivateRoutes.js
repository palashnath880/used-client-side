import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContextProvider/UserContextProvider';

const PrivateRoutes = ({ children }) => {
    const { user } = useContext(UserContext);

    if (user && user?.uid) {
        return <>{children}</>;
    }

    return <Navigate to={'/login'} replace={true} />;
}

export default PrivateRoutes;
