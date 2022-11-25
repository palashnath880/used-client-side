import React, { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import Loader from './components/Loader/Loader';
import { UserContext } from './contexts/UserContextProvider/UserContextProvider';
import Routes from './Router/Routes/Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App = () => {

  const { loading } = useContext(UserContext);
  const queryClient = new QueryClient();

  if (loading) {
    return <div className='h-screen w-full'><Loader /></div>
  }
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes />
        <Toaster />
      </QueryClientProvider>
    </>
  );
}

export default App;
