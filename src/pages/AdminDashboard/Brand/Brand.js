import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../components/Loader/Loader';
import axios from 'axios';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

const Brand = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [cookies] = useCookies(['used_access_token']);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imgbbKey = process.env.REACT_APP_IMGBB_KEY;

    const { data: brands = [], isLoading, refetch } = useQuery({
        queryKey: ['brands'],
        queryFn: async () => {
            const res = await fetch(`https://used-server.vercel.app/brand`);
            const data = await res.json();
            return data;
        }
    });

    const handleBrand = (data) => {

        const brandName = data.brandName;

        data.date = `${format(new Date(), 'PP')} ${new Date().toLocaleTimeString()}`;
        data.value = brandName.trim().toLowerCase().replaceAll(/ /g, '_');

        setError('');
        setLoading(true);

        axios.post(`https://used-server.vercel.app/brand`, data, {
            headers: {
                authorization: `bearer ${cookies?.used_access_token}`
            }
        })
            .then((response) => {
                setLoading(false);
                if (response.data?.status == 'bad') {
                    setError(response.data?.message);
                } else {
                    toast.success('Brand Added Successfully.');
                    setModalOpen(false);
                    refetch();
                }
            })
            .catch(err => {
                setLoading(false);
                console.error(err)
            });
    }

    const handleDeleteBrand = (id) => {
        axios.delete(`https://used-server.vercel.app/brand/${id}`, {
            headers: {
                authorization: `bearer ${cookies?.used_access_token}`
            }
        })
            .then(() => {
                toast.success('Brand Delete Successfully.');
                refetch();
            })
            .catch(err => console.error(err));
    }

    return (
        <div className='p-5'>
            <h2 className='text-2xl border-b pb-3 font-semibold'>Brand</h2>
            <div>
                <label onClick={() => setModalOpen(true)} htmlFor="category-modal" className="btn btn-primary my-5">Add Brand</label>
                {isLoading && <div className='py-10'><Loader /></div>}
                {!isLoading && (brands.length > 0 ?
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Brand Name</th>
                                    <th>Create At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {brands.map((brand, index) =>
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>
                                            {brand?.brandName}
                                        </td>
                                        <td>{brand?.date}</td>
                                        <td><button onClick={() => handleDeleteBrand(brand?._id)} className='btn btn-sm bg-red-500 border-transparent text-slate-50'>Delete</button></td>
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
                            <h3 className="font-bold text-lg text-center relative">Add Brand
                                <XMarkIcon onClick={() => setModalOpen(false)} className='w-5 h-5 absolute top-0 right-0 cursor-pointer' />
                            </h3>
                            <form onSubmit={handleSubmit(handleBrand)}>
                                <div className='mt-4'>
                                    <label htmlFor='brandName' className='label'>Brand Name</label>
                                    <input
                                        type="text"
                                        id='brandName'
                                        placeholder="Brand Name"
                                        className="input input-bordered w-full"
                                        {...register('brandName', { required: 'Enter Brand Name' })}
                                    />
                                    {errors?.brandName && <small className='text-red-500'>{errors.brandName?.message}</small>}
                                </div>
                                {error && <small className='text-red-500'>{error}</small>}
                                <div className='mt-5'>
                                    <button disabled={loading} type='submit ' className='btn btn-primary'>Add Brand</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Brand;
