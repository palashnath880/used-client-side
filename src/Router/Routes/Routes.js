import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Admin from '../../Layout/Admin/Admin';
import Main from '../../Layout/Main/Main';
import Seller from '../../Layout/Seller/Seller';
import AllUsers from '../../pages/AdminDashboard/AllUsers/AllUsers';
import Category from '../../pages/Category/Category';
import Advertise from '../../pages/Advertise/Advertise/Advertise';
import Blogs from '../../pages/Blogs/Blogs';
import CheckOut from '../../pages/CheckOut/CheckOut';
import Contact from '../../pages/Contact/Contact';
import FAQ from '../../pages/FAQ/FAQ';
import Home from '../../pages/Home/Home/Home';
import Login from '../../pages/Login/Login';
import MyOrders from '../../pages/MyOrders/MyOrders';
import NotFound from '../../pages/NotFound/NotFound';
import PrivacyPolicy from '../../pages/PrivacyPolicy/PrivacyPolicy';
import AddProduct from '../../pages/sellerDashboard/AddProduct/AddProduct';
import MyProducts from '../../pages/sellerDashboard/MyProducts/MyProducts';
import SignUp from '../../pages/Signup/SignUp';
import WishList from '../../pages/WishList/WishList';
import AdminRoutes from '../AdminRoutes/AdminRoutes';
import AuthRoutes from '../AuthRoutes/AuthRoutes';
import PrivateRoutes from '../PrivateRoutes/PrivateRoutes';
import SellerRoutes from '../SellerRoutes/SellerRoutes';
import Brand from '../../pages/AdminDashboard/Brand/Brand';
import AdminCategory from '../../pages/AdminDashboard/AdminCategory/AdminCategory';
import SellerDashboard from '../../pages/sellerDashboard/SellerDashboard/SellerDashboard';
import ReportProducts from '../../pages/AdminDashboard/ReportProducts/ReportProducts';
import Cars from '../../pages/Cars/Cars';

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
                },
                {
                    path: '/my-orders',
                    element: <PrivateRoutes><MyOrders /></PrivateRoutes>
                },
                {
                    path: '/blogs',
                    element: <Blogs />
                },
                {
                    path: '/faq',
                    element: <FAQ />
                },
                {
                    path: '/contact-us',
                    element: <Contact />
                },
                {
                    path: '/privacy-policy',
                    element: <PrivacyPolicy />

                },
                {
                    path: '/category/:categoryName',
                    element: <Category />

                },
                {
                    path: '/cars',
                    element: <Cars />

                }
            ]
        },
        {
            path: '/seller',
            element: <SellerRoutes><Seller /></SellerRoutes>,
            children: [
                {
                    path: '/seller/dashboard',
                    element: <SellerRoutes><SellerDashboard /></SellerRoutes>
                },
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
                    path: '/admin/users',
                    element: <AdminRoutes><AllUsers /></AdminRoutes>,
                },
                {
                    path: '/admin/category',
                    element: <AdminRoutes><AdminCategory /></AdminRoutes>,
                },
                {
                    path: '/admin/brand',
                    element: <AdminRoutes><Brand /></AdminRoutes>,
                },
                {
                    path: '/admin/report-products',
                    element: <AdminRoutes><ReportProducts /></AdminRoutes>,
                }
            ]
        },
        {
            path: '*',
            element: <NotFound />
        }
    ]);

    return (
        <RouterProvider router={router}></RouterProvider>
    );
}

export default Routes;
