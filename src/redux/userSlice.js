import { createSlice } from '@reduxjs/toolkit';
import { signOut, getAuth } from 'firebase/auth';
import app from '../firebase/__firebase.config';

// firebase auth
const auth = getAuth(app);

// initial state 
const initialState = { user: null, loading: true };

// create user slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            return { ...state, user: action.payload };
        },
        loading: (state, action) => {
            return { ...state, loading: action.payload };
        },
    }
});

// export actions
export const { login, loading } = userSlice.actions;

// export reducer
export default userSlice.reducer;