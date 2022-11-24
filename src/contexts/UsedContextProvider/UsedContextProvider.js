import React, { createContext } from 'react';

export const UsedContext = createContext();

const UsedContextProvider = ({ children }) => {
    const usedInfo = {};
    return (
        <UsedContext.Provider value={usedInfo}>
            {children}
        </UsedContext.Provider>
    );
}

export default UsedContextProvider;
