import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from './__firebase.config';

// firebase auth
export const auth = getAuth(app);

// google provider
const googleProvider = new GoogleAuthProvider();

//login handler 
export const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

// update user info 
export const updateUser = (updatedInfo) => {
    return updateProfile(auth.currentUser, updatedInfo);
}

// signup user with email and password
export const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

// social media login handler
export const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
}

// logout handler
export const logOut = () => {
    return signOut(auth);
}
