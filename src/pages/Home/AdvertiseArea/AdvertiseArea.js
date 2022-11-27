import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import Loader from '../../../components/Loader/Loader';
import { UsedContext } from '../../../contexts/UsedContextProvider/UsedContextProvider';
import { UserContext } from '../../../contexts/UserContextProvider/UserContextProvider';
import BookingModal from '../../../shared/BookingModal/BookingModal';
import ProductItem from '../../../shared/ProductItem/ProductItem';

const AdvertiseArea = () => {

    const [booking, setBooking] = useState(null);
    const { user } = useContext(UserContext);
    const { wishListRefetch } = useContext(UsedContext);
    const [cookies] = useCookies(['used_access_token']);

    const { data: advertiseItem = [], isLoading } = useQuery({
        queryKey: ['advertiseItem'],
        queryFn: async () => {
            const res = await fetch(`https://used-server.vercel.app/advertise-product`);
            const data = await res.json();
            return data;
        }
    });

    const handleWishList = (productID) => {

        if (user == null) {
            toast.error('Please login for added product to the wish list.');
            return;
        }

        const wishlist = {
            authorID: user?.uid,
            productID,
            date: `${format(new Date(), 'PP')} ${new Date().toLocaleTimeString()}`,
        };
        axios.post(`https://used-server.vercel.app/wishlist`, wishlist, {
            headers: {
                authorization: `bearer ${cookies?.used_access_token}`,
            }
        })
            .then(res => {
                if (res.data?.acknowledged) {
                    toast.success('Product Added To Wish List');
                    wishListRefetch();
                }
            })
            .catch(err => console.error(err));
    }

    if (isLoading) {
        return <div className='py-10'><Loader /></div>
    }

    if (advertiseItem.length <= 0) {
        return <></>
    }

    return (
        <div className='container mx-auto px-5 py-10'>
            <div className='pb-10'>
                <h1 className='text-center text-3xl '>Advertise Items</h1>
            </div>
            <div className='mt-5'>
                <div className='grid grid:cols-1 lg:grid-cols-3 gap-4'>
                    {advertiseItem.map(product =>
                        <ProductItem
                            key={product?._id}
                            product={product}
                            booking={setBooking}
                            handleWishList={handleWishList}
                        />
                    )}
                </div>
            </div>
            {booking && <BookingModal booking={booking} closeModal={setBooking} />}
        </div>
    );
}

export default AdvertiseArea;
