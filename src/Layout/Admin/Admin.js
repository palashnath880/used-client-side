import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import DashboardHeader from '../../shared/DashboardHeader/DashboardHeader';

const Admin = () => {

    return (
        <>
            <DashboardHeader />
            <div className="drawer drawer-mobile py-10 px-5">
                <input id="adminDrawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="adminDrawer" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    <div className='px-5 py-5'>
                        <Outlet />
                    </div>
                </div>
                <div className="drawer-side border rounded-md">
                    <label htmlFor="adminDrawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        <li><NavLink to='/admin/users'>All Users</NavLink></li>
                        <li><NavLink to='/admin/category'>Category</NavLink></li>
                        <li><NavLink to='/admin/brand'>Brand</NavLink></li>
                        <li><NavLink to='/admin/products'>All Product</NavLink></li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Admin;
