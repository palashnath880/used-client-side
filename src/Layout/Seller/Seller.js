import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Seller = () => {
    return (
        <>
            <div className="drawer drawer-mobile">
                <input id="sellerDrawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="sellerDrawer" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    <div className='px-5 py-5'>
                        <Outlet />
                    </div>
                </div>
                <div className="drawer-side border rounded-md">
                    <label htmlFor="sellerDrawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        <li><Link to='/seller/my-products'>All Products</Link></li>
                        <li><Link to='/seller/add-product'>Add Product</Link></li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Seller;
