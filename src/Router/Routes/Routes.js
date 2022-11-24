import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from '../../Layout/Main/Main';
import Home from '../../pages/Home/Home/Home';
import Login from '../../pages/Login/Login';
import SignUp from '../../pages/Signup/SignUp';
import AuthRoutes from '../AuthRoutes/AuthRoutes';

const Routes = () => {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Main />,
            children: [
                {
                    path: '/',
                    element: <Home />
                },
                {
                    path: '/login',
                    element: <AuthRoutes><Login /></AuthRoutes>
                },
                {
                    path: '/signup',
                    element: <AuthRoutes><SignUp /></AuthRoutes>
                }
            ]
        }
    ]);

    return (
        <RouterProvider router={router}></RouterProvider>
    );
}

export default Routes;
