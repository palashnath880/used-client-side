import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <div className='container mx-auto px-5 py-10'>
            <div className='h-96'>
                <div className='h-full w-full flex justify-center items-center'>
                    <div className='text-center'>
                        <h1 className='text-2xl font-semibold'>Thank You</h1>
                        <p className='mb-4 font-semibold'>Privacy & Policy Page Coming Soon</p>
                        <Link className='btn-primary py-2 px-4' to='/'>Go To Home Page</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
