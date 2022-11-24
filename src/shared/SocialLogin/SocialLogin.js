import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa'
import { UserContext } from '../../contexts/UserContextProvider/UserContextProvider';

const SocialLogin = () => {
    const { signInWithGoogle } = useContext(UserContext);

    const handleSignInGoogle = () => {
        signInWithGoogle()
            .then(res => console.log(res?.user))
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
