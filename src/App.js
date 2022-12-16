import React, { useContext, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Loader from './components/Loader/Loader';
import Routes from './Router/Routes/Routes';
import { useDispatch, useSelector } from 'react-redux';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from './firebase/__firebase.config';
import { loading, login } from './redux/userSlice';

const App = () => {

  const auth = getAuth(app);

  // loading state from redux
  const loadingState = useSelector(state => state.loading);

  // dispatch 
  const dispatch = useDispatch();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch(login(currentUser));
      dispatch(loading(false));
    });
    return () => unsubscribe();
  }, []);

  // if loadingState = true return loading spinner 
  if (loadingState) {
    return <div className='h-screen w-full'><Loader /></div>
  }

  // loading = false return routes
  return (
    <>
      <Routes />
      <Toaster />
    </>
  );
}

export default App;
