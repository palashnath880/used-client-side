import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../images/avatar.png';
import logo from '../../images/logo.png';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import useCookie from '../../hooks/useCookie';
import { logOut } from '../../firebase/firebase';

const DashboardHeader = () => {

    const user = useSelector(state => state.user);
    const { removeCookie } = useCookie(['used_access_token']);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                removeCookie('used_access_token');
            })
            .catch(err => console.error(err));
    }

    return (
        <header className='shadow-lg '>
            <div className="navbar container mx-auto justify-between">
                <div className='lg:flex-1 lg:hidden'>
                    <label htmlFor="dashboard" className="cursor-pointer drawer-button px-3">
                        <Bars3Icon className='w-6 h-6' />
                    </label>
                </div>
                <div className="lg:flex-1">
                    <Link to={'/'}>
                        <img className='w-24' src={logo} alt='Logo' />
                    </Link>
                </div>
                <div className="lg:flex-none">
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

export default DashboardHeader;
