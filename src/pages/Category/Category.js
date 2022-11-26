import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/Loader/Loader';
import { useParams } from 'react-router-dom';

const Category = () => {

    const { categoryName } = useParams();

    const { data: categoryProducts = [], isLoading } = useQuery({
        queryKey: ['categoryProducts'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/category/${categoryName}`);
            const data = await res.json();
            return data;
        }
    });

    console.log(categoryProducts);

    if (isLoading) {
        return <div className='py-60'><Loader /></div>
    }

    return (
        <div className='container mx-auto px-5 py-10'>
            <h1 className='text-2xl border-b pb-3 font-semibold text-center'>{categoryProducts?.category}</h1>
            <div className='mt-5'>

            </div>
        </div>
    );
}

export default Category;
