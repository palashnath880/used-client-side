import React, { createContext } from 'react';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const userInfo = {};
    return (
        <UserContext.Provider value={userInfo}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
