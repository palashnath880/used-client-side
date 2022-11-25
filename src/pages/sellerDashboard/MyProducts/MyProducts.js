import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { UserContext } from '../../../contexts/UserContextProvider/UserContextProvider';
import Loader from '../../../components/Loader/Loader';
import axios from 'axios';
import toast from 'react-hot-toast';

const MyProducts = () => {
    const { user } = useContext(UserContext);
    const [cookies] = useCookies(['used_access_token']);

    const { data: products = [], isLoading, isSuccess, refetch } = useQuery({
        queryKey: ['my-products'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/my-products/${user?.uid}`, {
                headers: {
                    authorization: `bearer ${cookies?.used_access_token}`,
                }
            });
            const data = await res.json();
            return data;
        }
    });

    const handleAdvertise = (id, status) => {
        axios.patch(`http://localhost:5000/my-products/${id}`, { status, uid: user?.uid }, {
            headers: {
                authorization: `bearer ${cookies?.used_access_token}`
            }
        })
            .then(res => {
                if (res?.data?.acknowledged) {
                    refetch();
                }
            })
            .catch(err => console.error(err));
    }

    const handleDelete = (id) => {
        const toastID = toast.loading('Products Deleting..');
        axios.delete(`http://localhost:5000/my-products/${id}`, {
            data: { uid: user?.uid },
            headers: {
                authorization: `bearer ${cookies?.used_access_token}`
            }
        })
            .then(res => {
                if (res?.data?.acknowledged) {
                    toast.dismiss(toastID);
                    toast.success('Product Deleted Successfully.');
                    refetch();
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            <h2 className='text-2xl border-b pb-3 font-semibold'>All Products</h2>
            {isLoading && <div className='py-10'><Loader /></div>}
            {isSuccess && (products.length > 0 ?
                < div className='mt-5'>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Advertise</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) =>
                                    <tr key={product._id}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className='flex items-start'>
                                                <div className='w-28 overflow-hidden rounded-md'>
                                                    <img src={product?.image} alt='Product Image' />
                                                </div>
                                                <span className='ml-2'>{product?.product_name}</span>
                                            </div>
                                        </td>
                                        <td>{product?.category}</td>
                                        <td>{product?.price}</td>
                                        <td>
                                            <input onChange={() => handleAdvertise(product?._id, !product?.advertise)} type="checkbox" defaultChecked={product?.advertise} className="checkbox" />
                                        </td>
                                        <td>{product?.status}</td>
                                        <td>
                                            <button className='btn btn-error text-slate-50 btn-sm' onClick={() => handleDelete(product?._id)}>Delete</button>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div> :
                <p className='text-center text-red-500 bg-red-100 font-semibold rounded-md py-3 mt-5'>Not Found</p>
            )
            }
        </div >
    );
}

export default MyProducts;
