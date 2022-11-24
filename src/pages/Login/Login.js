import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContextProvider/UserContextProvider';
import SocialLogin from '../../shared/SocialLogin/SocialLogin';

const Login = () => {

    const { loginUser, loadUserData } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [cookies, setCookie] = useCookies(['used_access_token']);
    const [error, setError] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const location = useLocation();
    const pathName = location?.state?.from?.pathname || '/';
    const navigate = useNavigate();

    const handleLogin = (data) => {
        setLoading(true);
        setError('');
        loginUser(data?.email, data?.password)
            .then(res => {
                const user = res?.user;
                axios.post('http://localhost:5000/used-jwt', { uid: user?.uid })
                    .then(result => {
                        setLoading(false);
                        if (result.data?.token) {
                            setCookie('used_access_token', result.data?.token);
                        }
                        navigate(pathName, { replace: true });
                    })
            })
            .catch(err => {
                setLoading(false);
                const errorCode = err.code;
                errorCode === 'auth/wrong-password' && setError('Wrong Password');
                errorCode === 'auth/user-not-found' && setError('No Users Found');
            });
    }

    return (
        <div className="hero min-h-screen">
            <div className="hero-content">
                <div className="max-w-md">
                    <form onSubmit={handleSubmit(handleLogin)} className='border shadow-lg px-4 py-5 rounded-md min-w-[350px] max-w-full'>
                        <h2 className='text-4xl text-center border-b pb-3'>Login!</h2>
                        <div className='mt-2'>
                            <label className='block mb-1' htmlFor='email'>Email</label>
                            <input
                                type="email"
                                id='email'
                                placeholder="Email"
                                className="input input-bordered w-full"
                                {...register('email', { required: 'Please enter your email' })}
                            />
                            {errors?.email && <small className='text-red-500'>{errors?.email?.message}</small>}
                        </div>
                        <div className='mt-2'>
                            <label className='block mb-1' htmlFor='password'>Password</label>
                            <input
                                type="password"
                                id='password'
                                placeholder="Password"
                                className="input input-bordered w-full"
                                {...register('password', { required: 'Please enter your password' })}
                            />
                            {errors?.password && <small className='text-red-500'>{errors?.password?.message}</small>}
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
                        <p className='text-center mt-2'><small>Don't Have An Account. Please <Link className='underline' to={'/signup'}>Sign Up</Link></small></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
