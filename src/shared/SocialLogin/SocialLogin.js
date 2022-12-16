import React from 'react';
import { FaGoogle } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { loginWithGoogle } from '../../firebase/firebase';
import { CreateJWT } from '../../utilities/utilities';

const SocialLogin = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const pathName = location.state?.from?.pathname || '/';

    // handle google sign in
    const handleSignInGoogle = () => {
        loginWithGoogle()
            .then(res => {
                // firebase user 
                const user = res?.user;
                const userData = {
                    displayName: user?.displayName,
                    email: user?.email,
                    uid: user?.uid,
                    photoURL: user?.photoURL,
                    role: 'Buyer',
                    date: `${format(new Date(), 'PP')} ${new Date().toLocaleTimeString()}`
                };
                // create JSON Web Token ( JWT ) 
                CreateJWT(user?.uid, (err) => {
                    if (!err) {
                        // insert user in mongodb
                        axios.post('https://used-server.vercel.app/users', userData)
                            .then(() => navigate(pathName, { replace: true }));
                    } else {
                        console.error(err);
                    }
                });
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
