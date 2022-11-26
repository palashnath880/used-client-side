import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContextProvider/UserContextProvider';
import { useCookies } from 'react-cookie';
import avatar from '../../images/avatar.png';
import { HeartIcon } from '@heroicons/react/24/outline';
import { UsedContext } from '../../contexts/UsedContextProvider/UsedContextProvider';

const Header = () => {
    const { user, logOut } = useContext(UserContext);
    const { wishListProducts } = useContext(UsedContext);
    const [cookies, b, removeCookie] = useCookies(['used_access_token']);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                removeCookie('used_access_token');
            })
            .catch(err => console.error(err));
    }

    const totalAmount = Array.isArray(wishListProducts) ? wishListProducts.reduce((prev, next) => prev + parseInt(next?.product?.price), 0) : 0;

    return (
        <header className='shadow-lg '>
            <div className="navbar">
                <div className="flex-1">
                    <Link className="btn btn-ghost normal-case text-xl" to={'/'}>Used</Link>
                </div>
                <div className="flex-none">
                    <div className="">
                        <ul tabIndex={0} className="menu menu-horizontal px-2">
                            <li className='mr-1'><NavLink to='/'>Home</NavLink></li>
                            <li className='mr-1'><NavLink to='/advertise'>Advertised</NavLink></li>
                            {user !== null && user?.role === 'Admin' && <li className='mr-1'><Link to={'/admin/dashboard'}>Dashboard</Link></li>}
                            {user !== null && user?.role === 'Seller' && <li className='mr-1'><Link to={'/seller/my-products'}>My Products</Link></li>}
                            {user !== null && user?.role === 'Seller' && <li className='mr-1'><Link to={'/seller/my-buyers'}>My Buyers</Link></li>}
                        </ul>
                    </div>
                    <div className="dropdown dropdown-end mr-2">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <HeartIcon className='w-6 h-6' />
                                <span className="badge badge-sm indicator-item">{wishListProducts.length || 0}</span>
                            </div>
                        </label>
                        <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                            <div className="card-body">
                                <span className="font-bold text-lg">{wishListProducts.length} {wishListProducts.length > 1 ? 'Items' : 'Item'}</span>
                                <span className="text-info">Subtotal: &#2547;{totalAmount}</span>
                                <div className="card-actions">
                                    <Link className="btn btn-primary btn-block capitalize" to='/wishlist'>View Wish List</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL || avatar} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {user === null && <>
                                <li><Link to={'/login'}>Login</Link></li>
                            </>}

                            {user !== null && <>
                                <li><Link to={'/profile'}>Profile</Link></li>
                                <li><button onClick={handleLogOut}>Logout</button></li>
                            </>}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
