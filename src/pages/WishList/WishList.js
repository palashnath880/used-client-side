import React, { useContext } from 'react';
import { UsedContext } from '../../contexts/UsedContextProvider/UsedContextProvider';

const WishList = () => {

    const { wishListProducts, wishListRefetch } = useContext(UsedContext);

    return (
        <div className='container mx-auto py-10 px-5'>

        </div>
    );
}

export default WishList;
