import React, { useState } from 'react';
import SocialLogin from '../../shared/SocialLogin/SocialLogin';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { signUp } from '../../firebase/firebase';
import { CreateJWT } from '../../utilities/utilities';

const SignUp = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();

    // register user 
    const handleRegister = (data) => {
        setError('');
        setLoading(true);
        signUp(data?.email, data?.password)
            .then(res => {
                const user = res?.user;
                const userData = {
                    displayName: data?.name,
                    email: user?.email,
                    uid: user?.uid,
                    photoURL: user?.photoURL,
                    role: data?.user_role,
                    date: `${format(new Date(), 'PP')} ${new Date().toLocaleTimeString()}`
                };
                // insert user in mongodb
                axios.post('https://used-server.vercel.app/users', userData)
                    .then(() => {
                        // create jwt 
                        CreateJWT(user?.uid, (err) => {
                            setLoading(false);
                            if (!err) {
                                navigate('/');
                            } else {
                                console.error(err);
                            }
                        });
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
                    <form onSubmit={handleSubmit(handleRegister)} className='border shadow-lg px-4 py-5 rounded-md min-w-[380px] max-w-full'>
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
                        <p className='text-center mt-2'><small>Already Have An Account. Please <Link className='underline' to={'/login'}>Login</Link></small></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;