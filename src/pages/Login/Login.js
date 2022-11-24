import React, { useState } from 'react';
import SocialLogin from '../../shared/SocialLogin/SocialLogin';

const Login = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    return (
        <div className="hero min-h-screen">
            <div className="hero-content">
                <div className="max-w-md">
                    <form className='border shadow-lg px-4 py-5 rounded-md min-w-[350px] max-w-full'>
                        <h2 className='text-4xl text-center border-b pb-3'>Login!</h2>
                        <div className='mt-2'>
                            <label className='block mb-1' htmlFor='email'>Email</label>
                            <input type="email" id='email' placeholder="Email" className="input input-bordered w-full" />
                        </div>
                        <div className='mt-2'>
                            <label className='block mb-1' htmlFor='password'>Password</label>
                            <input type="password" id='password' placeholder="Password" className="input input-bordered w-full" />
                        </div>
                        {error && <p className='text-red-500 mt-2 rounded-md bg-red-100 px-2'><small>{error}</small></p>}
                        <div className='mt-5'>
                            <button disabled={loading} className="btn btn-primary w-full">
                                {loading && <span className='w-8 h-8 border-4 rounded-full border-slate-50 border-t-transparent animate-spin'></span>}
                                {!loading && 'Login'}
                            </button>
                        </div>
                        <div className="divider">OR</div>
                        <SocialLogin />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
