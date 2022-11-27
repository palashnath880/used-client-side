import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import Loader from '../../components/Loader/Loader';
import { UserContext } from '../../contexts/UserContextProvider/UserContextProvider';
import CheckOut from '../CheckOut/CheckOut';

const MyOrders = () => {

    const { user } = useContext(UserContext);
    const [cookies] = useCookies(['used_access_token']);
    const [payment, setPayment] = useState(null);

    const { data: myOrders = [], refetch, isLoading } = useQuery({
        queryKey: ['myOrders'],
        queryFn: async () => {
            if (!user?.uid) {
                return [];
            }
            const res = await fetch(`https://used-server.vercel.app/orders/${user?.uid}`, {
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
                {isLoading && <div className='py-60'><Loader /></div>}
                {!isLoading && <>
                    {myOrders.length <= 0 && <p className='text-center font-semibold py-3 rounded-md bg-red-100 text-red-500'>No Orders</p>}
                    {myOrders.map((order) =>
                        <div key={order?._id} className='mb-3 shadow-lg border border-gray-300 rounded-md p-3'>
                            <div className='flex'>
                                <div className='w-52 rounded-lg overflow-hidden'>
                                    <img src={order?.product?.image} alt='Wish List Thumbnail' />
                                </div>
                                <div className='flex-1 px-4'>
                                    <h1 className='text-xl font-semibold'>{order?.product?.product_name}</h1>
                                    <p className='text-sm'>{order?.product?.description.slice(0, 200)}</p>
                                    <p className='font-semibold'>${order?.product?.sellPrice}</p>
                                    <div className='my-2'>
                                        <div className="badge badge-outline mr-1">{order?.product?.category}</div>
                                        <div className="badge badge-outline mr-1">{order?.product?.brand}</div>
                                        <div className="badge badge-outline mr-1">{order?.product?.condition}</div>
                                        <div className="badge badge-outline mr-1">{order?.product?.location}</div>
                                        <div className="badge badge-outline mr-1">{order?.product?.mobile}</div>
                                    </div>
                                    <p className='font-semibold text-sm'>Meeting Location: {order?.meetLocation}</p>
                                    <p className='font-semibold text-sm flex gap-2'>
                                        <span className=''>Booking Date: {order?.bookingDate}</span>
                                        {order?.payment && <span>| Payment Date: {order?.paymentDate}</span>}
                                    </p>
                                </div>
                                <div className='flex justify-center items-center'>
                                    {
                                        order?.product?.sell ?
                                            (order?.payment ? <span className='badge badge-outline'>Paid</span> :
                                                <span className='badge badge-outline'>Sold</span>) :
                                            (!order?.payment && <label onClick={() => setPayment(order)} htmlFor="paymentModal" className="btn btn-primary btn-sm">Pay</label>)
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Payment Modal */}
                    {payment !== null && <>
                        <input type="checkbox" id="paymentModal" className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box relative">
                                <label htmlFor="paymentModal" onClick={() => setPayment(null)} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                <CheckOut
                                    order={payment}
                                    paymentComplete={() => {
                                        refetch();
                                        setPayment(null);
                                    }}
                                />
                            </div>
                        </div>
                    </>}
                </>}
            </div>
        </div >
    );
}

export default MyOrders;
