import React, { useContext } from 'react';
import Loader from './components/Loader/Loader';
import { UserContext } from './contexts/UserContextProvider/UserContextProvider';
import Routes from './Router/Routes/Routes';

const App = () => {
  const { loading } = useContext(UserContext);
  if (loading) {
    return <div className='h-screen w-full'><Loader /></div>
  }
  return (
    <>
      <Routes />
    </>
  );
}

export default App;
