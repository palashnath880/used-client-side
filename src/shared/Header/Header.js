import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import avatar from '../../images/avatar.png';
import { Bars3Icon, HeartIcon } from '@heroicons/react/24/outline';
import { UsedContext } from '../../contexts/UsedContextProvider/UsedContextProvider';
import logo from '../../images/logo.png';
import { useSelector } from 'react-redux';
import useCookie from '../../hooks/useCookie';
import { logOut } from '../../firebase/firebase';

const Header = () => {

    const { wishListProducts } = useContext(UsedContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const { removeCookie } = useCookie(['used_access_token']);

    const user = useSelector(state => state.user);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                removeCookie('used_access_token');
            })
            .catch(err => console.error(err));
    }

    return (
        <header className='shadow-lg '>
            <div className="navbar container justify-between mx-auto relative">
                <button className='block lg:hidden' onClick={() => setMenuOpen(!menuOpen)}>
                    <Bars3Icon className='h-6 w-6' />
                </button>
                <div className="lg:flex-1">
                    <Link className="" to={'/'}>
                        <img className='w-24' src={logo} alt='Logo' />
                    </Link>
                </div>
                <div className={`flex-none ${menuOpen ? 'block w-full z-50 absolute bg-base-100 py-5' : 'hidden'} lg:block lg:static lg:bg-transparent lg:py-0 lg:w-auto top-full right-0 `}>
                    <div className="lg:flex">
                        <ul tabIndex={0} className="menu lg:menu-horizontal px-2">
                            <li className='mr-1'><NavLink to='/'>Home</NavLink></li>
                            <li className='mr-1'><NavLink to='/cars'>Cars</NavLink></li>
                            <li className='mr-1'><NavLink to='/advertise'>Advertised</NavLink></li>
                            <li className='mr-1'><NavLink to='/blogs'>Blogs</NavLink></li>
                            {user !== null && <li className='mr-1'><NavLink to='/my-orders'>My Orders</NavLink></li>}
                            {user !== null && <li className='mr-1'><NavLink to='/wishlist'>Wish List</NavLink></li>}
                            {user !== null && user?.role === 'Admin' && <li className='mr-1'><Link to={'/admin/dashboard'}>Dashboard</Link></li>}
                            {user !== null && user?.role === 'Seller' && <li className='mr-1'><Link to={'/seller/dashboard'}>Dashboard</Link></li>}
                        </ul>
                        {user !== null && <div className="hidden lg:inline-block mr-2">
                            <Link to='/wishlist' className="btn btn-ghost btn-circle" title='Wish List'>
                                <div className="indicator">
                                    <HeartIcon className='w-6 h-6' />
                                    <span className="badge badge-sm indicator-item">{wishListProducts.length || 0}</span>
                                </div>
                            </Link>
                        </div>}
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
        </header>
    );
}

export default Header;
