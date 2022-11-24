import React, { useContext, useState } from 'react';
import SocialLogin from '../../shared/SocialLogin/SocialLogin';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContextProvider/UserContextProvider';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const { createUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [cookies, setCookie] = useCookies(['used_access_token']);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const handleCreateUser = (data) => {
        setError('');
        setLoading(true);
        createUser(data?.email, data?.password)
            .then(res => {
                const user = res?.user;
                axios.post('http://localhost:5000/users', {
                    displayName: data?.name,
                    email: user?.email,
                    uid: user?.uid,
                    photoURL: user?.photoURL,
                    role: data?.user_role
                })
                    .then(() => {
                        axios.post('http://localhost:5000/used-jwt', { uid: user?.uid })
                            .then(result => {
                                setLoading(false);
                                if (result.data?.token) {
                                    setCookie('used_access_token', result.data?.token);
                                }
                                navigate('/');
                            })
                    })
            })
            .catch(err => {
                setLoading(false);
                const errorCode = err.code;
                if (errorCode === 'auth/email-already-in-use') {
                    setError('Email already use.');
                }
            });
    }

    return (
        <div className="hero min-h-screen">
            <div className="hero-content">
                <div className="max-w-md">
                    <form onSubmit={handleSubmit(handleCreateUser)} className='border shadow-lg px-4 py-5 rounded-md min-w-[380px] max-w-full'>
                        <h2 className='text-4xl text-center border-b pb-3'>Signup!</h2>
                        <div className='mt-2'>
                            <label className='block mb-1' htmlFor='name'>Full Name</label>
                            <input
                                type="text"
                                id='name'
                                placeholder="Full Name"
                                className="input input-bordered w-full"
                                {...register('name', { required: 'Please Enter Your Name' })}
                            />
                            {errors?.name && <small className='text-red-500'>{errors?.name?.message}</small>}
                        </div>
                        <div className='mt-2'>
                            <label className='block mb-1' htmlFor='email'>Email</label>
                            <input
                                type="email"
                                id='email'
                                placeholder="Email"
                                className="input input-bordered w-full"
                                {...register('email', { required: 'Please Enter Your Email' })}
                            />
                            {errors?.email && <small className='text-red-500'>{errors?.email?.message}</small>}
                        </div>
                        <div className='mt-2'>
                            <label className='block mb-1' >Select Your Role</label>
                            <div className='flex gap-2'>
                                <div className='flex-1'>
                                    <input
                                        type="radio"
                                        id='buyer'
                                        className="sr-only peer"
                                        defaultValue={'Buyer'}
                                        {...register('user_role', { required: 'Please Select User Role' })}
                                    />
                                    <label className='block border border-gray-300 py-4 rounded-lg text-center font-semibold cursor-pointer duration-300 peer-checked:bg-primary peer-checked:text-slate-50' htmlFor='buyer'>Buyer</label>
                                </div>
                                <div className='flex-1'>
                                    <input
                                        type="radio"
                                        id='seller'
                                        className="sr-only peer"
                                        defaultValue={'Seller'}
                                        {...register('user_role', { required: 'Please Select User Role' })}
                                    />
                                    <label className='block border border-gray-300 py-4 rounded-lg text-center font-semibold cursor-pointer duration-300 peer-checked:bg-primary peer-checked:text-slate-50' htmlFor='seller'>Seller</label>
                                </div>
                            </div>
                            {errors?.user_role && <small className='text-red-500'>{errors?.user_role?.message}</small>}
                        </div>
                        <div className='mt-2'>
                            <label className='block mb-1' htmlFor='password'>Password</label>
                            <input
                                type="password"
                                id='password'
                                placeholder="Password"
                                className="input input-bordered w-full"
                                {...register('password', {
                                    required: true,
                                    min: 6,
                                    pattern: /^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&? "]).*$/
                                })}
                            />
                            {errors?.password && <p><small className='text-red-500'>Password more than 6 characters, at least 1 uppercase and lowercase, and at least 1 number and a special character.</small></p>}
                        </div>
                        {error && <p className='text-red-500 mt-2 rounded-md bg-red-100 px-2'><small>{error}</small></p>}
                        <div className='mt-5'>
                            <button disabled={loading} className="btn btn-primary w-full">
                                {loading && <span className='w-8 h-8 border-4 rounded-full border-slate-50 border-t-transparent animate-spin'></span>}
                                {!loading && 'Signup'}
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

export default SignUp;