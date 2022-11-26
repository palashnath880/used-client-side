import React from 'react';
import AdvertiseArea from '../AdvertiseArea/AdvertiseArea';
import Banner from '../Banner/Banner';
import CategoriesArea from '../CategoriesArea/CategoriesArea';
import Testimonial from '../Testimonial/Testimonial';

const Home = () => {
    return (
        <>
            <Banner />
            <AdvertiseArea />
            <CategoriesArea />
            <Testimonial />
        </>
    );
}

export default Home;
