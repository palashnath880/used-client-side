import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { UserContext } from '../UserContextProvider/UserContextProvider';

export const UsedContext = createContext();

const UsedContextProvider = ({ children }) => {

    const { user } = useContext(UserContext);

    const { data: wishListProducts = [], refetch: wishListRefetch } = useQuery({
        queryKey: ['wishListProducts', user],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/wishlist/${user?.uid}`);
            const data = await res.json();
            return data;
        }
    });

    const usedInfo = { wishListProducts, wishListRefetch };

    return (
        <UsedContext.Provider value={usedInfo}>
            {children}
        </UsedContext.Provider>
    );
}

export default UsedContextProvider;
