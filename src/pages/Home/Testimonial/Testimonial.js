import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import quote from '../../../images/quote.svg';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Testimonial = () => {
    return (
        <div className='container mx-auto px-5 py-10 mb-10 bg-zinc-50 rounded-md'>
            <div className='pb-10'>
                <h1 className='text-center text-3xl'>Testimonial</h1>
                <p></p>
            </div>
            <div className='mt-10'>
                <div className='lg:mx-auto lg:w-6/12 xl:w-5/12 rounded-lg shadow-lg bg-base-100'>
                    <Carousel
                        autoPlay={true}
                        emulateTouch={true}
                        showIndicators={false}
                        showArrows={false}
                        infiniteLoop={true}
                        showThumbs={false}
                        interval={10000}
                        showStatus={false}
                    >
                        <div className='border px-4 py-5 rounded-lg cursor-pointer'>
                            <article className='text-left'>
                                <img style={{ width: "auto" }} className='h-8 float-left' src={quote} alt="Quote SVG" />
                                In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
                                <img style={{ width: "auto", transform: "rotateY(-180deg) rotateX(-180deg)" }} className='h-8' src={quote} alt="Quote SVG" />
                            </article>
                            <div className='flex items-end flex-col mt-2'>
                                <h3 className='font-semibold text-lg italic'>Jon Herry</h3>
                                <p className='text-sm'>CEO of Google</p>
                            </div>
                        </div>
                        <div className='border px-4 py-5 rounded-lg cursor-pointer'>
                            <article className='text-left'>
                                <img style={{ width: "auto" }} className='h-8 float-left' src={quote} alt="Quote SVG" />
                                In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
                                <img style={{ width: "auto", transform: "rotateY(-180deg) rotateX(-180deg)" }} className='h-8' src={quote} alt="Quote SVG" />
                            </article>
                            <div className='flex items-end flex-col mt-2'>
                                <h3 className='font-semibold text-lg italic'>Jon Herry</h3>
                                <p className='text-sm'>CEO of Facebook</p>
                            </div>
                        </div>
                        <div className='border px-4 py-5 rounded-lg cursor-pointer'>
                            <article className='text-left'>
                                <img style={{ width: "auto" }} className='h-8 float-left' src={quote} alt="Quote SVG" />
                                In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
                                <img style={{ width: "auto", transform: "rotateY(-180deg) rotateX(-180deg)" }} className='h-8' src={quote} alt="Quote SVG" />
                            </article>
                            <div className='flex items-end flex-col mt-2'>
                                <h3 className='font-semibold text-lg italic'>Jon Herry</h3>
                                <p className='text-sm'>CEO of Twitter</p>
                            </div>
                        </div>
                    </Carousel>
                </div>
            </div >
        </div >
    );
}

export default Testimonial;
