import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import Loader from '../../../components/Loader/Loader';
import { useCookies } from 'react-cookie';
import { format } from 'date-fns'
import { UserContext } from '../../../contexts/UserContextProvider/UserContextProvider';
import { UsedContext } from '../../../contexts/UsedContextProvider/UsedContextProvider';
import toast from 'react-hot-toast';
import ProductItem from '../../../shared/ProductItem/ProductItem';
import BookingModal from '../../../shared/BookingModal/BookingModal';

const Advertise = () => {

    const [cookies] = useCookies(['used_access_token']);
    const { user } = useContext(UserContext);
    const { wishListRefetch } = useContext(UsedContext);
    const [booking, setBooking] = useState(null);

    const { data: advertiseProducts = [], isLoading } = useQuery({
        queryKey: ['advertiseProducts'],
        queryFn: async () => {
            const res = await fetch(`https://used-server.vercel.app/advertise-product`);
            const data = await res.json();
            return data;
        }
    });

    const handleWishList = (productID) => {
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

    return (
        <div className='container mx-auto px-5 py-10'>
            <h1 className='py-3 text-center text-3xl border-b pb-3'>Advertise Cars</h1>
            <div className='mt-5'>
                {advertiseProducts.length <= 0 && <p className='text-center font-semibold py-3 rounded-md bg-red-100 text-red-500'>No Product Found</p>}
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {advertiseProducts.map(product =>
                        <ProductItem
                            key={product?._id}
                            product={product}
                            handleWishList={handleWishList}
                            booking={setBooking}
                        />
                    )}
                </div>
                {booking && <BookingModal booking={booking} closeModal={setBooking} />}
            </div>
        </div>
    );
}

export default Advertise;
