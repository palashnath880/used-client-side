import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { UserContext } from '../UserContextProvider/UserContextProvider';
import { useCookies } from 'react-cookie';

export const UsedContext = createContext();

const UsedContextProvider = ({ children }) => {

    const { user } = useContext(UserContext);
    const [cookies] = useCookies(['used_access_token']);

    const { data: wishListProducts = [], refetch: wishListRefetch } = useQuery({
        queryKey: ['wishListProducts', user],
        queryFn: async () => {
            if (!user?.uid || !cookies?.used_access_token) {
                return [];
            }
            const res = await fetch(`https://used-server.vercel.app/wishlist/${user?.uid}`, {
                headers: {
                    authorization: `bearer ${cookies?.used_access_token}`,
                }
            });
            const data = await res.json();
            return data;
        }
    });

    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch(`https://used-server.vercel.app/categories`);
            const data = await res.json();
            return data;
        }
    });

    const usedInfo = { wishListProducts, wishListRefetch, categories };

    return (
        <UsedContext.Provider value={usedInfo}>
            {children}
        </UsedContext.Provider>
    );
}

export default UsedContextProvider;
