import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import app from '../../firebase/__firebase.config';
import { useCookies } from 'react-cookie';
import axios from 'axios';

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
        axios.post('http://localhost:5000/used-jwt', { uid })
            .then(res => {
                if (res.data?.token) {
                    setCookie('used_access_token', res.data?.token);
                    setLoading(false);
                }
            })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser !== null) {
                const res = await fetch(`http://localhost:5000/users/${currentUser?.uid}`);
                const data = await res.json();
                setUser({ ...currentUser, ...data });
                createJWT(currentUser?.uid);
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
