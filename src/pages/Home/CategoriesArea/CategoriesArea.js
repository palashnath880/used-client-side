import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UsedContext } from '../../../contexts/UsedContextProvider/UsedContextProvider';

const CategoriesArea = () => {

    const { categories } = useContext(UsedContext);

    return (
        <div className='container mx-auto px-5 py-10'>
            <div className='pb-10'>
                <h1 className='text-center text-3xl'>Categories</h1>
            </div>
            <div className='mt-5'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {categories.map((category, index) =>
                        <Link to={`/category/${category?.value}`} key={index}>
                            <div className='rounded-lg overflow-hidden relative group'>
                                <div>
                                    <img src={category?.thumbnail} alt={`${category?.category} Category Thumbnail`} />
                                </div>
                                <div className='absolute duration-100 top-0 lg:top-full group-hover:top-0 right-0 h-full w-full' style={{ background: 'linear-gradient(#00000075, #00000075)' }}>
                                    <div className='h-full w-full flex justify-center items-center'>
                                        <h1 className='text-2xl text-slate-50 font-semibold'>{category?.category}</h1>
                                    </div>
                                </div>
                            </div>
                        </Link>)
                    }

                </div>
            </div>
        </div>
    );
}

export default CategoriesArea;
