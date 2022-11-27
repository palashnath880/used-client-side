import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/Loader/Loader';
import { useParams } from 'react-router-dom';
import ProductItem from '../../shared/ProductItem/ProductItem';

const Category = () => {

    const { categoryName } = useParams();

    const { data: categoryProducts = [], isLoading } = useQuery({
        queryKey: ['categoryProducts'],
        queryFn: async () => {
            const res = await fetch(`https://used-server.vercel.app/category/${categoryName}`);
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <div className='py-60'><Loader /></div>
    }

    // const { category, products } = categoryProducts;

    console.log(categoryProducts);

    // return (
    //     <div className='container mx-auto px-5 py-10'>
    //         <h1 className='text-2xl border-b pb-3 font-semibold text-center'>{category}</h1>
    //         <div className='mt-5'>
    //             <div className='grid grid-cols-3 gap-4'>
    //                 {products.map((product, index) => <ProductItem key={index} product={product} />)}
    //             </div>
    //         </div>
    //     </div>
    // );
}

export default Category;
