import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Cars = () => {

    const { } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch();
            const data = await res.json();
        }
    });

    return (
        <div className='container mx-auto px-5 py-10'>
            <h1 className='text-2xl text-center border-b pb-3 pl-3 font-semibold'>Cars</h1>
            <div className='mt-5'>

            </div>
        </div>
    );
}

export default Cars;
