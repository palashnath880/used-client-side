import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GoogleSVG from '../../images/google.svg';
import AppStoreSVG from '../../images/app-store.svg';
import facebook from '../../images/facebook.svg';
import instagram from '../../images/instagram.svg';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { UsedContext } from '../../contexts/UsedContextProvider/UsedContextProvider';

const Footer = () => {

    const { categories } = useContext(UsedContext);

    return (
        <footer className='bg-gray-700 pt-10'>
            <div className='container mx-auto px-5'>
                <div className='grid grid-cols-3 pb-5'>
                    <div className='text-slate-50'>
                        <h2 className='text-xl font-semibold'>Download Our App</h2>
                        <div className='flex items-center gap-2 mt-2'>
                            <img className='w-32 h-auto cursor-pointer' src={GoogleSVG} alt='Google SVG' />
                            <img className='w-32 h-auto cursor-pointer' src={AppStoreSVG} alt='App Store SVG' />
                        </div>
                        <p className='text-sm mt-4'>Connect With Facebook & Instagram.</p>
                        <div className='flex items-center gap-2 mt-2'>
                            <a href='https://www.facebook.com'><img className='cursor-pointer' src={facebook} alt='Facebook Logo SVG' /></a>
                            <a href='https://www.instagram.com'><img className='cursor-pointer' src={instagram} alt='Instagram Logo SVG' /></a>
                        </div>
                    </div>
                    <div>
                        <h2 className='text-xl font-semibold text-slate-50'>Help And Support</h2>
                        <div className='mt-3'>
                            <ul className='pl-3'>
                                <li>
                                    <Link to='/faq' className='pb-1 mb-1 border-b duration-200 border-transparent hover:border-slate-400 flex items-center text-slate-300 hover:text-slate-100'>
                                        <ChevronRightIcon className='h-4 w-4 mr-2' />FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/contact-us' className='pb-1 mb-1 border-b duration-200 border-transparent hover:border-slate-400 flex items-center text-slate-300 hover:text-slate-100'>
                                        <ChevronRightIcon className='h-4 w-4 mr-2' />Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/privacy-policy' className='pb-1 mb-1 border-b duration-200 border-transparent hover:border-slate-400 flex items-center text-slate-300 hover:text-slate-100'>
                                        <ChevronRightIcon className='h-4 w-4 mr-2' />Privacy & Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h2 className='text-xl font-semibold text-slate-50'>Categories</h2>
                        <div className='mt-3'>
                            <ul className='pl-3'>
                                {categories.map((cate, index) =>
                                    <li key={index}>
                                        <Link to={`/category/${cate?.value}`} className='pb-1 mb-1 border-b duration-200 border-transparent hover:border-slate-400 flex items-center text-slate-300 hover:text-slate-100'>
                                            <ChevronRightIcon className='h-4 w-4 mr-2' />{cate?.category}
                                        </Link>
                                    </li>)
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container mx-auto px-5 border-t border-t-slate-500 '>
                <div className='py-5 text-slate-50 flex items-center justify-between'>
                    <p className='text-center'>Copyright © | Develop By <a target="_blank" href='https://github.com/palashnath880'>Palash</a></p>
                    <Link to='/' className='text-lg font-semibold'>Used</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
