import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/Loader/Loader';
import { useParams } from 'react-router-dom';
import ProductItem from '../../shared/ProductItem/ProductItem';
import BookingModal from '../../shared/BookingModal/BookingModal';
import axios from 'axios';
import { format } from 'date-fns';
import { UserContext } from '../../contexts/UserContextProvider/UserContextProvider';
import toast from 'react-hot-toast';
import { UsedContext } from '../../contexts/UsedContextProvider/UsedContextProvider';
import { useCookies } from 'react-cookie';

const Category = () => {

    const { categoryName } = useParams();
    const [booking, setBooking] = useState(null);
    const { user } = useContext(UserContext);
    const { wishListRefetch } = useContext(UsedContext);
    const [cookies] = useCookies(['used_access_token']);

    const { data: categoryProducts = [], isLoading } = useQuery({
        queryKey: ['categoryProducts'],
        queryFn: async () => {
            const res = await fetch(`https://used-server.vercel.app/category/${categoryName}`);
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

    const { category, products } = categoryProducts;

    return (
        <div className='container mx-auto px-5 py-10'>
            <h1 className='text-2xl border-b pb-3 font-semibold text-center'>{category}</h1>
            <div className='mt-5'>
                {isLoading && <div className='py-40'><Loader /></div>}
                {!isLoading &&
                    <>
                        {products.length <= 0 && <p className='text-center font-semibold py-3 rounded-md bg-red-100 text-red-500'>Not Found</p>}
                        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {products.map((product, index) =>
                                <ProductItem
                                    key={index}
                                    product={product}
                                    booking={setBooking}
                                    handleWishList={handleWishList}
                                />
                            )}
                        </div>
                        {booking && <BookingModal booking={booking} closeModal={setBooking} />}
                    </>
                }
            </div>
        </div>
    );
}

export default Category;
