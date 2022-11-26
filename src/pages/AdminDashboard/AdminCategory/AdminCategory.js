import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../components/Loader/Loader';
import axios from 'axios';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

const AdminCategory = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [cookies] = useCookies(['used_access_token']);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imgbbKey = process.env.REACT_APP_IMGBB_KEY;

    const { data: categories = [], isLoading, refetch } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/categories`);
            const data = await res.json();
            return data;
        }
    });

    const handleCategory = (data) => {

        const category_name = data.category;

        data.date = `${format(new Date(), 'PP')} ${new Date().toLocaleTimeString()}`;
        data.value = category_name.trim().toLowerCase().replaceAll(/ /g, '_');
        const thumbnail = data.thumbnail[0];

        const formData = new FormData();
        formData.append('image', thumbnail);
        setError('');
        setLoading(true);
        axios.post(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, formData)
            .then((res) => {
                if (res.data?.success) {
                    data.thumbnail = res?.data?.data?.url;
                    axios.post(`http://localhost:5000/category`, data)
                        .then((response) => {
                            setLoading(false);
                            if (response.data?.status == 'bad') {
                                setError(response.data?.message);
                            } else {
                                toast.success('Category Added Successfully.');
                                setModalOpen(false);
                                refetch();
                            }
                        })
                        .catch(err => {
                            setLoading(false);
                            console.error(err)
                        });
                }
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }

    const handleDeleteCategory = (id) => {
        axios.delete(`http://localhost:5000/category/${id}`, {
            headers: {
                authorization: `bearer ${cookies?.used_access_token}`
            }
        })
            .then(() => {
                toast.success('Category Delete Successfully.');
                refetch();
            })
            .catch(err => console.error(err));
    }

    return (
        <div className='p-5'>
            <h2 className='text-2xl border-b pb-3 font-semibold'>Category</h2>
            <div>
                <label onClick={() => setModalOpen(true)} htmlFor="category-modal" className="btn btn-primary my-5">Add Category</label>
                {isLoading && <div className='py-10'><Loader /></div>}
                {!isLoading && (categories.length > 0 ?
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Category Name</th>
                                    <th>Create At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((cate, index) =>
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className='flex gap-2'>
                                                <img src={cate?.thumbnail} className='w-32 h-auto rounded-lg' />
                                                <span className='font-semibold pt-2'>{cate?.category}</span>
                                            </div>
                                        </td>
                                        <td>{cate?.date}</td>
                                        <td><button onClick={() => handleDeleteCategory(cate?._id)} className='btn btn-sm bg-red-500 border-transparent text-slate-50'>Delete</button></td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div> :
                    <p className='text-center text-red-500 bg-red-100 py-3 rounded-md mt-5'>Not Found</p>
                )
                }
            </div>

            {modalOpen &&
                <div>
                    <input type="checkbox" id="category-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg text-center relative">Add Category
                                <XMarkIcon onClick={() => setModalOpen(false)} className='w-5 h-5 absolute top-0 right-0 cursor-pointer' />
                            </h3>
                            <form onSubmit={handleSubmit(handleCategory)}>
                                <div className='mt-4'>
                                    <label htmlFor='category' className='label'>Category Name</label>
                                    <input
                                        type="text"
                                        id='category'
                                        placeholder="Category"
                                        className="input input-bordered w-full"
                                        {...register('category', { required: 'Enter Category Name' })}
                                    />
                                    {errors?.category && <small className='text-red-500'>{errors.category?.message}</small>}
                                </div>
                                <div className='mt-2'>
                                    <label htmlFor='thumbnail' className='label'>Category Thumbnail</label>
                                    <input
                                        type="file"
                                        id='thumbnail'
                                        className="file-input w-full input-bordered"
                                        {...register('thumbnail', { required: 'Select Category Thumbnail' })}
                                    />
                                    {errors?.thumbnail && <small className='text-red-500'>{errors.thumbnail?.message}</small>}
                                </div>
                                {error && <small className='text-red-500'>{error}</small>}
                                <div className='mt-5'>
                                    <button disabled={loading} type='submit ' className='btn btn-primary'>Add Category</button>
                                </div>
                            </form>
                            {/* <div className="modal-action">
                            <label htmlFor="category-modal" className="btn">Close</label>
                        </div> */}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default AdminCategory;
