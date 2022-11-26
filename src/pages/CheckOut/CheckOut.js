import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';

const stripePromise = loadStripe('pk_test_51M85apBKG8GcowxMXabwV1me45obfTE4rT4annZhuq1r1ck1k6jkk4R8OsQSt0f7znjg2Vr5osjzb6dYIzvVMZ1x00SbGQAAmi');

const CheckOut = () => {

    const params = useParams();

    const { data: checkoutProduct } = useQuery({
        queryKey: ['checkoutProduct'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/product/${params?.id}`);
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
