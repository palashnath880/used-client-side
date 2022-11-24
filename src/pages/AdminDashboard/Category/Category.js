import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../components/Loader/Loader';
import axios from 'axios';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';

const Category = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [cookies] = useCookies(['used_access_token']);

    const { data: categories = [], isLoading, refetch } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/category`);
            const data = await res.json();
            return data;
        }
    });

    const handleCategory = (event) => {
        event.preventDefault();
        const form = event.target;
        const category = form.category.value;

        axios.post(`http://localhost:5000/category`, { category })
            .then(() => {
                toast.success('Category Added Successfully.');
                setModalOpen(false);
                refetch();
            })
            .catch(err => console.error(err));

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
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((cate, index) =>
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{cate?.category}</td>
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
                            <form onSubmit={handleCategory}>
                                <div className='mt-4'>
                                    <label htmlFor='category' className='label'>Category Name</label>
                                    <input type="text" name='category' placeholder="Category" className="input input-bordered w-full" required />
                                </div>
                                <div className='mt-5'>
                                    <button type='submit ' className='btn btn-primary'>Add Category</button>
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

export default Category;
