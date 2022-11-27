import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loader from '../../../components/Loader/Loader';
import ProductItem from '../../../shared/ProductItem/ProductItem';

const AdvertiseArea = () => {

    const { data: advertiseItem = [], isLoading } = useQuery({
        queryKey: ['advertiseItem'],
        queryFn: async () => {
            const res = await fetch(`https://used-server.vercel.app/advertise-product`);
            const data = await res.json();
            return data;
        }
    });

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
                <div className='grid grid-cols-3 gap-4'>
                    {advertiseItem.map(product =>
                        <ProductItem
                            product={product}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdvertiseArea;
