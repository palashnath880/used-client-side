import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import app from '../../firebase/__firebase.config';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const UserContext = createContext();

const auth = getAuth(app);

const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cookies, setCookie] = useCookies(['used_access_token']);

    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        return signOut(auth);
    }

    const createJWT = (uid) => {
        axios.post('https://used-server.vercel.app/used-jwt', { uid })
            .then(res => {
                if (res.data?.token) {
                    setCookie('used_access_token', res.data?.token);
                    setLoading(false);
                }
            })
    }

    const { data, refetch } = useQuery({
        queryKey: ['loadUser', user],
        queryFn: async () => {
            if (user === null) {
                return null;
            }
            const res = await fetch(`https://used-server.vercel.app/users/${user?.uid}`);
            const data = await res.json();
            setUser({ ...user, ...data });
            return data;
        }
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser !== null) {
                createJWT(currentUser?.uid);
                refetch();
            } else {
                setUser(currentUser);
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, [auth]);

    const userInfo = { user, loading, signInWithGoogle, createUser, loginUser, logOut };
    return (
        <UserContext.Provider value={userInfo}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
