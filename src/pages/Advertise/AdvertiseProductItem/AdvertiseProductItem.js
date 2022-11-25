import React, { useContext } from 'react';
import { HeartIcon, ShoppingCartIcon, ArrowRightIcon, } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { UsedContext } from '../../../contexts/UsedContextProvider/UsedContextProvider';

const AdvertiseProductItem = ({ product, handleWishList }) => {

    const { wishListProducts } = useContext(UsedContext);
    const { _id, image, product_name, category, condition, price, author, location } = product;

    const findWishListProduct = wishListProducts.find(pro => pro.productID == _id);

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="card-body px-3 py-4">
                <h2 className="card-title">
                    {product_name}
                </h2>
                <p className='text-lg'>
                    <span className='font-semibold'>TK </span>
                    {price}
                </p>
                <p className='flex items-center'>
                    Sell By {author?.displayName}
                    {author?.verified && <CheckCircleIcon className='w-4 h-4 mt-1 ml-1 text-blue-500' />}
                </p>
                <div>
                    <div className="badge badge-outline mr-1">{category}</div>
                    <div className="badge badge-outline mr-1">{condition}</div>
                    <div className="badge badge-outline mr-1">{location}</div>
                </div>
                <div className="card-actions justify-around mt-3">
                    <button disabled={findWishListProduct && true} onClick={() => handleWishList(_id)}>
                        <HeartIcon className='w-6 h-6' fill={findWishListProduct ? "black" : 'transparent'} />
                    </button>
                    <button>
                        <ShoppingCartIcon className='w-6 h-6' />
                    </button>
                    <Link to={`/products/${_id}`}>
                        <ArrowRightIcon className='w-6 h-6' />
                    </Link>
                </div>
            </div>
        </div >
    );
}

export default AdvertiseProductItem;
