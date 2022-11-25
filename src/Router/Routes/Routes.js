import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Admin from '../../Layout/Admin/Admin';
import Main from '../../Layout/Main/Main';
import Seller from '../../Layout/Seller/Seller';
import AllUsers from '../../pages/AdminDashboard/AllUsers/AllUsers';
import Category from '../../pages/AdminDashboard/Category/Category';
import Advertise from '../../pages/Advertise/Advertise/Advertise';
import CheckOut from '../../pages/CheckOut/CheckOut';
import Home from '../../pages/Home/Home/Home';
import Login from '../../pages/Login/Login';
import AddProduct from '../../pages/sellerDashboard/AddProduct/AddProduct';
import MyProducts from '../../pages/sellerDashboard/MyProducts/MyProducts';
import SignUp from '../../pages/Signup/SignUp';
import WishList from '../../pages/WishList/WishList';
import AdminRoutes from '../AdminRoutes/AdminRoutes';
import AuthRoutes from '../AuthRoutes/AuthRoutes';
import PrivateRoutes from '../PrivateRoutes/PrivateRoutes';
import SellerRoutes from '../SellerRoutes/SellerRoutes';

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
                },
                {
                    path: '/advertise',
                    element: <Advertise />
                },
                {
                    path: '/wishlist',
                    element: <PrivateRoutes><WishList /></PrivateRoutes>
                },
                {
                    path: '/checkout/:id',
                    element: <PrivateRoutes><CheckOut /></PrivateRoutes>
                }
            ]
        },
        {
            path: '/seller',
            element: <Seller />,
            children: [
                {
                    path: '/seller/my-products',
                    element: <SellerRoutes><MyProducts /></SellerRoutes>
                },
                {
                    path: '/seller/add-product',
                    element: <SellerRoutes><AddProduct /></SellerRoutes>
                }
            ]
        },
        {
            path: '/admin',
            element: <AdminRoutes><Admin /></AdminRoutes>,
            children: [
                {
                    path: '/admin/dashboard',
                    element: '',
                },
                {
                    path: '/admin/all-users',
                    element: <AdminRoutes><AllUsers /></AdminRoutes>,
                },
                {
                    path: '/admin/category',
                    element: <AdminRoutes><Category /></AdminRoutes>,
                }
            ]
        }
    ]);

    return (
        <RouterProvider router={router}></RouterProvider>
    );
}

export default Routes;
