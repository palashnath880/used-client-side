import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa'
import { UserContext } from '../../contexts/UserContextProvider/UserContextProvider';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const SocialLogin = () => {

    const { signInWithGoogle } = useContext(UserContext);
    const [cookies, setCookie] = useCookies(['used_access_token']);
    const navigate = useNavigate();

    const location = useLocation();
    const pathName = location.state?.from?.pathname || '/';

    const handleSignInGoogle = () => {
        signInWithGoogle()
            .then(res => {
                const user = res?.user;
                axios.post('https://used-server.vercel.app/used-jwt', { uid: user?.uid })
                    .then(result => {
                        if (result.data?.token) {
                            setCookie('used_access_token', result.data?.token);
                            axios.post('https://used-server.vercel.app/users', {
                                displayName: user?.displayName,
                                email: user?.email,
                                uid: user?.uid,
                                photoURL: user?.photoURL,
                                role: 'Buyer',
                                date: `${format(new Date(), 'PP')} ${new Date().toLocaleTimeString()}`
                            })
                                .then(() => {
                                    navigate(pathName, { replace: true });
                                })
                        }
                    })
            })
            .catch(err => console.error(err));
    }

    return (
        <>
            <button onClick={handleSignInGoogle} type='button' className='btn btn-outline w-full'>
                <FaGoogle className='mr-2' />
                Continue With Google
            </button>
        </>
    );
}

export default SocialLogin;
