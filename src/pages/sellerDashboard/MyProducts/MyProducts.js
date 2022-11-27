import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { UserContext } from '../../../contexts/UserContextProvider/UserContextProvider';
import Loader from '../../../components/Loader/Loader';
import axios from 'axios';
import toast from 'react-hot-toast';

const MyProductsItem = ({ product, index, handleAdvertise, handleDelete }) => {
    const { _id, product_name, image, category, brand, originalPrice, sellPrice } = product;
    return (
        <tr className='text-sm'>
            <th>{index + 1}</th>
            <td>
                <div className='flex items-start'>
                    <div className='w-28 overflow-hidden rounded-md'>
                        <img src={image} alt='Product Image' />
                    </div>
                    <span className='ml-2 font-semibold'>{product_name}</span>
                </div>
            </td>
            <td>{category}</td>
            <td>{brand}</td>
            <td>
                <p className='flex flex-col'>
                    <span><span className='font-semibold'>Purchase: </span>${originalPrice}</span>
                    <span><span className='font-semibold'>Sell: </span>${sellPrice}</span>
                </p>
            </td>
            <td>
                <input disabled={product?.sell} onChange={() => handleAdvertise(_id, !product?.advertise)} type="checkbox" defaultChecked={product?.advertise} className="checkbox" />
            </td>
            <td>
                {product?.sell ?
                    <span className='badge badge-error text-slate-50'>Sold</span>
                    : <span className='badge badge-success text-slate-50'>Available</span>}
            </td>
            <td>
                <label
                    disabled={product?.sell}
                    htmlFor="productDeleteModal"
                    className="btn btn-error text-slate-50 btn-sm"
                    onClick={() => handleDelete(product)}
                >Delete</label>
            </td>
        </tr>
    );
}

const MyProducts = () => {

    const { user } = useContext(UserContext);
    const [confirmModal, setConfirmModal] = useState(null);
    const [cookies] = useCookies(['used_access_token']);

    const { data: products = [], isLoading, isSuccess, refetch } = useQuery({
        queryKey: ['my-products'],
        queryFn: async () => {
            const res = await fetch(`https://used-server.vercel.app/my-products/${user?.uid}`, {
                headers: {
                    authorization: `bearer ${cookies?.used_access_token}`,
                }
            });
            const data = await res.json();
            return data;
        }
    });

    const handleAdvertise = (id, status) => {
        axios.patch(`https://used-server.vercel.app/my-products/${id}`, { status, uid: user?.uid }, {
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
        axios.delete(`https://used-server.vercel.app/my-products/${id}`, {
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
                                    <th>Brand</th>
                                    <th>Price</th>
                                    <th>Advertise</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) =>
                                    <MyProductsItem
                                        key={index}
                                        index={index}
                                        product={product}
                                        handleAdvertise={handleAdvertise}
                                        handleDelete={setConfirmModal}
                                    />
                                )}
                            </tbody>
                        </table>
                    </div>
                </div> :
                <p className='text-center text-red-500 bg-red-100 font-semibold rounded-md py-3 mt-5'>Not Found</p>
            )
            }
            {/* Delete Confirm Modal */}
            {confirmModal && <>
                <input type="checkbox" id="productDeleteModal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative">
                        <h3 className="text-xl font-bold text-center">Are you sure delete {confirmModal?.product_name}</h3>
                        <div className='mt-3 flex justify-center gap-2'>
                            <label htmlFor="productDeleteModal" onClick={() => handleDelete(confirmModal?._id)} className="btn text-slate-50 btn-success">Yes</label>
                            <label htmlFor="productDeleteModal" onClick={() => setConfirmModal(null)} className="btn text-slate-50 btn-error">No</label>
                        </div>
                    </div>
                </div>
            </>}
        </div >
    );
}

export default MyProducts;
