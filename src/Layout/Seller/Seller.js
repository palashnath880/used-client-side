import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import DashboardHeader from '../../shared/DashboardHeader/DashboardHeader';

const Seller = () => {
    return (
        <>
            <DashboardHeader />
            <div className='relative lg:static'>
                <div className="drawer drawer-mobile py-10 lg:px-5 min-h-screen">
                    <input id="dashboard" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <div className='px-5 py-5'>
                            <Outlet />
                        </div>
                    </div>
                    <div className="drawer-side border rounded-md">
                        <label htmlFor="dashboard" className="drawer-overlay"></label>
                        <ul className="menu p-4 lg:w-56 w-full top-0 z-auto text-base-content absolute lg:static bg-base-100 lg:bg-transparent">
                            <li className='mb-2'><NavLink to='/seller/my-products'>All Products</NavLink></li>
                            <li className='mb-2'><NavLink to='/seller/add-product'>Add Product</NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Seller;
