import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const SingleCars = () => {

    const { id } = useParams();

    const { data: product = {}, isLoading } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            const res = await fetch(`https://used-server.vercel.app/product/${id}`);
            const data = await res.json();
            return data;
        }
    });

    const { product_name, description, category, brand, condition, originalPrice, sellPrice, purchaseYear, date, image, author } = product;

    return (
        <div className='container mx-auto px-5 py-10'>
            <div className='lg:w-10/12 lg:mx-auto lg:shadow-lg lg:rounded-md p-4'>
                <img src={image} alt='' className='w-full h-auto rounded-md' />
                <div className='px-3'>
                    <h1 className='text-2xl font-semibold my-2'>{product_name}</h1>
                    <p className='text-sm font-semibold pl-2 flex items-center'>Post By {author?.displayName} {author?.verified && <CheckCircleIcon className='w-4 h-4 mt-1 ml-1 text-blue-500' />}</p>
                    <p className='text-sm font-semibold pl-2'>Post Date {date}</p>
                    <p className='text-base mt-2'>{description}</p>
                    <p className='font-semibold mt-3'>Category : {category}</p>
                    <p className='font-semibold'>Brand: {brand}</p>
                    <p className='font-semibold'>Condition: {condition}</p>
                    <p className='font-semibold'>Purchase Price:{originalPrice}</p>
                    <p className='font-semibold'>Sell Price:{sellPrice}</p>
                    <p className='font-semibold'>Purchase Year: {`${new Date(purchaseYear).getMonth()}-${new Date(purchaseYear).getFullYear()}`}</p>
                </div>
            </div>
        </div>
    );
}

export default SingleCars;
