import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useCookies } from 'react-cookie';
import { UserContext } from '../../contexts/UserContextProvider/UserContextProvider';

const MyOrders = () => {

    const { user } = useContext(UserContext);
    const [cookies] = useCookies(['used_access_token']);

    const { data: myOrders = [] } = useQuery({
        queryKey: ['myOrders'],
        queryFn: async () => {
            if (!user?.uid) {
                return [];
            }
            const res = await fetch(`http://localhost:5000/my-orders/${user?.uid}`, {
                headers: {
                    authorization: `bearer ${cookies?.used_access_token}`,
                }
            });
            const data = await res.json();
            return data;
        }
    });

    return (
        <div className='container mx-auto px-5 py-10'>
            <h1 className='text-2xl border-b pb-3 pl-3 font-semibold'>My Orders</h1>
            <div className='mt-5'>
                {myOrders.map((order) =>
                    <div key={order?._id} className='mb-3 shadow-lg border border-gray-300 rounded-md p-3'>
                        <div className='flex'>
                            <div className='w-52 rounded-lg overflow-hidden'>
                                <img src={order?.product?.image} alt='Wish List Thumbnail' />
                            </div>
                            <div className='flex-1 px-4'>
                                <h1 className='text-xl font-semibold'>{order?.product?.product_name}</h1>
                                <p>{order?.product?.description}</p>
                                <p className='font-semibold'><span className='text-xl mr-1'>&#2547;</span>{order?.product?.price}</p>
                                <div className='my-2'>
                                    <div className="badge badge-outline mr-1">{order?.product?.category}</div>
                                    <div className="badge badge-outline mr-1">{order?.product?.condition}</div>
                                    <div className="badge badge-outline mr-1">{order?.product?.location}</div>
                                </div>
                                <p className='font-semibold text-sm'>Order Date: {order?.date}</p>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default MyOrders;
