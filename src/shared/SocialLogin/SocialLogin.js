import React from 'react';
import { FaGoogle } from 'react-icons/fa'

const SocialLogin = () => {
    return (
        <>
            <button type='button' className='btn btn-outline w-full'>
                <FaGoogle className='mr-2' />
                Continue With Google
            </button>
        </>
    );
}

export default SocialLogin;
