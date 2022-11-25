import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import DashboardHeader from '../../shared/DashboardHeader/DashboardHeader';

const Seller = () => {
    return (
        <>
            <DashboardHeader />
            <div className="drawer drawer-mobile py-10 px-5 h-auto">
                <input id="sellerDrawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <div className='px-5 py-5'>
                        <Outlet />
                    </div>
                </div>
                <div className="drawer-side border rounded-md sticky top-0">
                    <label htmlFor="sellerDrawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        <li className='mb-2'><NavLink to='/seller/my-products'>All Products</NavLink></li>
                        <li className='mb-2'><NavLink to='/seller/add-product'>Add Product</NavLink></li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Seller;
