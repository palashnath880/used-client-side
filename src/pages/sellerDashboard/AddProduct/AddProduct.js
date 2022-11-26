import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../contexts/UserContextProvider/UserContextProvider';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const { handleSubmit, register, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [cookies] = useCookies(['used_access_token']);
    const { user, logOut } = useContext(UserContext);
    const location = ['Dhaka', 'Chittagong', 'Borishal', 'Cumilla', 'Feni', 'Pabna', 'Noakhali'];
    const imgbbKey = process.env.REACT_APP_IMGBB_KEY;

    const navigate = useNavigate();

    const { data: categories = [] } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/category`);
            const data = await res.json();
            return data;
        }
    });

    const handleAddProduct = (data) => {

        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);

        data.authorID = user?.uid;
        data.date = `${format(new Date(), 'PP')} ${new Date().toLocaleTimeString()}`;
        setLoading(true);
        axios.post(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, formData)
            .then(res => {
                if (res.data?.success) {
                    data.image = res?.data?.data?.url;
                    axios.post(`http://localhost:5000/product`, data, {
                        headers: {
                            authorization: `bearer ${cookies?.used_access_token}`,
                        }
                    })
                        .then(response => {
                            setLoading(false);
                            if (response.data?.acknowledged) {
                                toast.success('Product Added Successfully.');
                                reset();
                            }
                        })
                        .catch(err => {
                            setLoading(false);
                            const statusCode = err.response.status;
                            if (statusCode == 403) {
                                toast.error('Your access token is expired. Please Login');
                                logOut();
                                navigate('/login', { replace: true });
                            }
                        });
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            <h2 className='font-semibold text-2xl border-b pb-3'>Add Product For Sale</h2>
            <form onSubmit={handleSubmit(handleAddProduct)}>
                <div className='grid grid-cols-2 gap-4'>
                    <div className="form-control w-full ">
                        <label className="label" htmlFor='product_name'>
                            <span className="label-text">Product Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Product Name"
                            id='product_name'
                            className="input input-bordered w-full"
                            {...register('product_name', { required: 'Enter Product Name' })}
                        />
                        {errors?.product_name && <small className='text-red-500'>{errors?.product_name?.message}</small>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label" htmlFor='category'>
                            <span className="label-text">Category</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            name='category'
                            {...register('category', { required: 'Select Category' })}
                        >
                            <option value="">Select Category</option>
                            {categories.map((item, index) => <option key={index} value={item?.category}>{item?.category}</option>)}
                        </select>
                        {errors?.category && <small className='text-red-500'>{errors?.category?.message}</small>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label" htmlFor='price'>
                            <span className="label-text">Price</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Price"
                            id='price'
                            className="input input-bordered w-full"
                            {...register('price', { required: 'Enter Product Price' })}
                        />
                        {errors?.price && <small className='text-red-500'>{errors?.price?.message}</small>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label" htmlFor='condition'>
                            <span className="label-text">Condition</span>
                        </label>
                        <select
                            className="select select-bordered w-full" id='condition'
                            {...register('condition', { required: 'Select Condition' })}
                        >
                            <option value="">Select Condition</option>
                            <option value={'Excellent'}>Excellent</option>
                            <option value={'Good'}>Good</option>
                            <option value={'Fair'}>Fair</option>
                        </select>
                        {errors?.condition && <small className='text-red-500'>{errors?.condition?.message}</small>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label" htmlFor='location'>
                            <span className="label-text">Location</span>
                        </label>
                        <select className="select select-bordered w-full" id='location' {...register('location', { required: 'Select Location' })}>
                            <option value="">Select Location</option>
                            {location.map((item, index) => <option key={index} value={item}>{item}</option>)}
                        </select>
                        {errors?.location && <small className='text-red-500'>{errors?.location?.message}</small>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label" htmlFor='used_month'>
                            <span className="label-text">Used Month</span>
                        </label>
                        <input
                            type="number"
                            min='1'
                            placeholder="Month"
                            id='used_month'
                            className="input input-bordered w-full"
                            {...register('used_month', { required: 'Enter Used Month' })}
                        />
                        {errors?.used_month && <small className='text-red-500'>{errors?.used_month?.message}</small>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label" htmlFor='mobile'>
                            <span className="label-text">Mobile</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Mobile"
                            id='mobile'
                            className="input input-bordered w-full"
                            {...register('mobile', { required: 'Enter Mobile Number' })}
                        />
                        {errors?.mobile && <small className='text-red-500'>{errors?.mobile?.message}</small>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label" htmlFor='image'>
                            <span className="label-text">Image</span>
                        </label>
                        <input
                            type="file"
                            className="file-input file-input-bordered w-full"
                            {...register('image', { required: 'Select Image' })} />
                        {errors?.image && <small className='text-red-500'>{errors?.image?.message}</small>}
                    </div>
                </div>
                <div className='mt-2'>
                    <div className="form-control inline-block">
                        <label className="label cursor-pointer gap-4">
                            <input type="checkbox" className="checkbox" {...register('advertise')} />
                            <span className="label-text">Advertise</span>
                        </label>
                    </div>
                </div>
                <div className="form-control w-full mt-2 ">
                    <label className="label" htmlFor='description'>
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        className="textarea textarea-bordered"
                        id='description'
                        placeholder="Description"
                        {...register('description', { required: 'Write Your Product Details And Used Experience.' })}
                    ></textarea>
                    {errors?.description && <small className='text-red-500'>{errors?.description?.message}</small>}
                </div>
                {loading && <div className="text-center py-5">
                    <div role="status">
                        <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                }
                <div className='mt-4 text-center'>
                    <button disabled={loading} className='btn btn-primary'>Add Product </button>
                </div>
            </form >
        </div >
    );
}

export default AddProduct;
