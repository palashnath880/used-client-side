import React, { useContext, useState } from 'react';
import { UsedContext } from '../../contexts/UsedContextProvider/UsedContextProvider';
import { TrashIcon, ShoppingCartIcon, ArrowRightIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContextProvider/UserContextProvider';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import BookingModal from '../../shared/BookingModal/BookingModal';

const WishList = () => {

    const { wishListProducts, wishListRefetch } = useContext(UsedContext);
    const { user } = useContext(UserContext);
    const [cookies] = useCookies(['used_access_token']);
    const [booking, setBooking] = useState(null);

    const deleteWishList = (id) => {
        axios.delete(`https://used-server.vercel.app/wishlist/${user?.uid}/${id}`, {
            headers: {
                authorization: `bearer ${cookies?.used_access_token}`,
            }
        })
            .then(res => {
                if (res?.data?.acknowledged) {
                    toast.success('Product Remove Successfully.');
                    wishListRefetch();
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <div className='container mx-auto py-10 px-5'>
            <h1 className='text-2xl border-b pb-3 font-semibold'>My Wish List</h1>
            <div className='mt-5'>
                {wishListProducts.length > 0 ? <div className='grid grid-cols-3 gap-4'>
                    {wishListProducts.map(pro =>
                        <div key={pro._id} className="card bg-base-100 shadow-xl">
                            <figure><img src={pro?.product?.image} alt="Shoes" /></figure>
                            <div className="card-body px-3 py-4">
                                <h2 className="card-title">
                                    {pro?.product?.product_name}
                                </h2>
                                <p className='text-lg'>
                                    <span className='font-semibold'>$ </span>
                                    <span className='font-semibold' title='Sell Price'>{pro?.product?.sellPrice}/</span>
                                    <small title='Purchase Price'>{pro?.product?.originalPrice}</small>
                                </p>
                                {/* <p className='flex items-center'>
                                    Sell By {author?.displayName}
                                    {author?.verified && <CheckCircleIcon className='w-4 h-4 mt-1 ml-1 text-blue-500' />}
                                </p> */}
                                <div>
                                    <div className="badge badge-outline mr-1">{pro?.product?.category}</div>
                                    <div className="badge badge-outline mr-1">{pro?.product?.brand}</div>
                                    <div className="badge badge-outline mr-1">{pro?.product?.condition}</div>
                                    <div className="badge badge-outline mr-1">{pro?.product?.location}</div>
                                </div>
                                <div className="card-actions justify-around mt-3">
                                    <label onClick={() => setBooking(pro?.product)} htmlFor="bookingModal" className='cursor-pointer'><PlusIcon className='w-6 h-6' /></label>
                                    <Link to={`/products/${pro?.productID}`}>
                                        <ArrowRightIcon className='w-6 h-6' />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}</div>
                    : <p className='text-center font-semibold py-3 rounded-md bg-red-100 text-red-500'>Empty Wish List</p>
                }
            </div>
            {booking && <BookingModal booking={booking} closeModal={setBooking} />}
        </div >
    );
}

export default WishList;
