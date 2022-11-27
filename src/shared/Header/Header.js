import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContextProvider/UserContextProvider';
import { useCookies } from 'react-cookie';
import avatar from '../../images/avatar.png';
import { HeartIcon } from '@heroicons/react/24/outline';
import { UsedContext } from '../../contexts/UsedContextProvider/UsedContextProvider';
import logo from '../../images/logo.png';

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

    return (
        <header className='shadow-lg '>
            <div className="navbar container mx-auto">
                <div className="flex-1">
                    <Link className="" to={'/'}>
                        <img className='w-24' src={logo} alt='Logo' />
                    </Link>
                </div>
                <div className="flex-none">
                    <div className="">
                        <ul tabIndex={0} className="menu menu-horizontal px-2">
                            <li className='mr-1'><NavLink to='/'>Home</NavLink></li>
                            <li className='mr-1'><NavLink to='/cars'>Cars</NavLink></li>
                            <li className='mr-1'><NavLink to='/advertise'>Advertised</NavLink></li>
                            <li className='mr-1'><NavLink to='/blogs'>Blogs</NavLink></li>
                            {user !== null && <li className='mr-1'><NavLink to='/my-orders'>My Orders</NavLink></li>}
                            {user !== null && user?.role === 'Admin' && <li className='mr-1'><Link to={'/admin/dashboard'}>Dashboard</Link></li>}
                            {user !== null && user?.role === 'Seller' && <li className='mr-1'><Link to={'/seller/dashboard'}>Dashboard</Link></li>}
                        </ul>
                    </div>
                    {user !== null && <div className="dropdown dropdown-end mr-2">
                        <Link to='/wishlist' className="btn btn-ghost btn-circle" title='Wish List'>
                            <div className="indicator">
                                <HeartIcon className='w-6 h-6' />
                                <span className="badge badge-sm indicator-item">{wishListProducts.length || 0}</span>
                            </div>
                        </Link>
                    </div>}
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
