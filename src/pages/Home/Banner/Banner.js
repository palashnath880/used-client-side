import React from 'react';
import { Link } from 'react-router-dom';
import BannerImg from '../../../images/banner.jpg';

const Banner = () => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: `url(${BannerImg})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Welcome To <span className='text-6xl'>Used</span></h1>
                    <p className="mb-5">Used is a most popular used car-selling website. To date, more than 200 cars have been sold through Used.</p>
                    <Link to='/products' className="btn btn-primary">Book Now</Link>
                </div>
            </div>
        </div>
    );
}

export default Banner;
