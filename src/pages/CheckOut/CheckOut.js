import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const CheckOut = () => {

    const params = useParams();

    const { data: checkoutProduct } = useQuery({
        queryKey: ['checkoutProduct'],
        queryFn: async () => {
            const res = await fetch(`https://used-server.vercel.app/product/${params?.id}`);
            const data = await res.json();
            return data;
        }
    });

    if (checkoutProduct?.sell) {
        return <div className='h-96'>
            <div className='h-full w-full flex justify-center items-center'>
                <div className='text-center'>
                    <h1 className='text-2xl mb-4 font-semibold'>This product already sold</h1>
                    <Link className='btn-primary py-2 px-4' to='/products'>Go To Product Page</Link>
                </div>
            </div>
        </div>;
    }

    return (
        <div className='container mx-auto px-5 py-10'>
            <div className='w-96 mx-auto p-3 rounded-md border border-gray-300'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm checkoutProduct={checkoutProduct} />
                </Elements >
            </div>
        </div>
    );
}

export default CheckOut;
