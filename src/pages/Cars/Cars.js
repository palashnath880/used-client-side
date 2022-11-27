import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import { UsedContext } from '../../contexts/UsedContextProvider/UsedContextProvider';
import { UserContext } from '../../contexts/UserContextProvider/UserContextProvider';
import BookingModal from '../../shared/BookingModal/BookingModal';
import ProductItem from '../../shared/ProductItem/ProductItem';

const Cars = () => {

    const [cookies] = useCookies(['used_access_token']);
    const { user } = useContext(UserContext);
    const { wishListRefetch } = useContext(UsedContext);
    const [booking, setBooking] = useState(null);

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`https://used-server.vercel.app/products`);
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

    return (
        <div className='container mx-auto px-5 py-10'>
            <h1 className='text-2xl text-center border-b pb-3 pl-3 font-semibold'>Cars</h1>
            <div className='mt-5'>
                {isLoading && <div className='py-60'><Loader /></div>}
                {!isLoading && <div>
                    <div className='grid lg:grid-cols-3 gap-4'>
                        {products.map((product, index) =>
                            <ProductItem
                                key={index}
                                product={product}
                                handleWishList={handleWishList}
                                booking={setBooking}
                            />
                        )}
                    </div>
                </div>}
            </div>
            {booking && <BookingModal booking={booking} closeModal={setBooking} />}
        </div>
    );
}

export default Cars;
