import React, { useContext } from 'react';
import { UsedContext } from '../../contexts/UsedContextProvider/UsedContextProvider';
import { TrashIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContextProvider/UserContextProvider';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';

const WishList = () => {

    const { wishListProducts, wishListRefetch } = useContext(UsedContext);
    const { user } = useContext(UserContext);
    const [cookies] = useCookies(['used_access_token']);

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
                {wishListProducts.length > 0 ?
                    wishListProducts.map(pro =>
                        <div key={pro?._id} className='mb-3 shadow-lg p-3 rounded-md border border-gray-200'>
                            <div className='flex'>
                                <div className='w-52 rounded-lg overflow-hidden'>
                                    <img src={pro?.product?.image} alt='Wish List Thumbnail' />
                                </div>
                                <div className='flex-1 px-4'>
                                    <h1 className='text-xl font-semibold'>{pro?.product?.product_name}</h1>
                                    <p className='font-semibold'><span className='text-xl mr-1'>&#2547;</span>{pro?.product?.price}</p>
                                    <div className='my-2'>
                                        <div className="badge badge-outline mr-1">{pro?.product?.category}</div>
                                        <div className="badge badge-outline mr-1">{pro?.product?.condition}</div>
                                        <div className="badge badge-outline mr-1">{pro?.product?.location}</div>
                                    </div>
                                    <Link to={`/checkout/${pro?.productID}`} className='btn-primary px-5 py-2 rounded-md inline-block'>
                                        Buy Now <ShoppingCartIcon className='inline-block w-6 h-6' />
                                    </Link>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <button onClick={() => deleteWishList(pro._id)} className='p-2 bg-transparent hover:bg-red-100 hover:text-red-500 rounded-full duration-200'>
                                        <TrashIcon className='w-6 h-6' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                    : <p className='text-center font-semibold py-3 rounded-md bg-red-100 text-red-500'>Empty Wish List</p>
                }
            </div>
        </div >
    );
}

export default WishList;
