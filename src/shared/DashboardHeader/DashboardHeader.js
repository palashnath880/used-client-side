import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContextProvider/UserContextProvider';
import { useCookies } from 'react-cookie';
import avatar from '../../images/avatar.png';
import logo from '../../images/logo.png';
import { Bars3Icon } from '@heroicons/react/24/outline';

const DashboardHeader = () => {

    const { user, logOut } = useContext(UserContext);
    const [a, b, removeCookie] = useCookies(['used_access_token']);

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
                <div className='flex-1 lg:hidden'>
                    <label htmlFor="sellerDrawer" className=" cursor-pointer drawer-button lg:hidden">
                        <Bars3Icon className='w-6 h-6' />
                    </label>
                </div>
                <div className="flex-1">
                    <Link to={'/'}>
                        <img className='w-24' src={logo} alt='Logo' />
                    </Link>
                </div>
                <div className="flex-none">
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
