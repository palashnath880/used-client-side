import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContextProvider/UserContextProvider';

const AuthRoutes = ({ children }) => {
    const { user } = useContext(UserContext);

    if (user) {
        return <Navigate to={'/'} replace={true} />
    }

    return <>{children}</>;
}

export default AuthRoutes;
