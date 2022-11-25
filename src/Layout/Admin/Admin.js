import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import AdminHeader from '../../shared/AdminHeader/AdminHeader';

const Admin = () => {

    return (
        <>
            <AdminHeader />
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
                        <li><Link to='/admin/all-users'>All Users</Link></li>
                        <li><Link to='/admin/category'>Category</Link></li>
                        <li><Link to='/admin/all-product'>All Product</Link></li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Admin;
