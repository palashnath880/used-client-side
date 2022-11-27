import axios from 'axios';
import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContextProvider/UserContextProvider';

const BookingModal = ({ closeModal, booking }) => {
    const { _id, authorID, product_name, sellPrice } = booking;
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [cookies] = useCookies(['used_access_token']);

    const { handleSubmit, register, formState: { errors } } = useForm();

    const handleBooking = (data) => {
        setLoading(true);
        const orders = {
            productID: _id,
            productAuthor: authorID,
            customerName: user?.displayName,
            customerEmail: user?.email,
            customerId: user?.uid,
            customerMobile: data?.mobile,
            meetLocation: data?.meetLocation,
            bookingDate: `${format(new Date(), 'PP')} ${new Date().toLocaleTimeString()}`,
        }
        axios.post(`https://used-server.vercel.app/orders`, orders, {
            headers: {
                authorization: `bearer ${cookies?.used_access_token}`,
            }
        })
            .then(() => {
                setLoading(false);
                toast.success('Booked Successfully.');
                closeModal(null);
            })
            .catch(err => {
                setLoading(false);
                const errorCode = err?.response?.status;
                if (errorCode === 403) {
                    toast.error('Your access token is expired.Please Login and come back.');
                }
            });
    }

    return (
        <>
            <input type="checkbox" id="bookingModal" className="modal-toggle" />
            <div className="modal" >
                <div className="modal-box relative">
                    <label onClick={() => closeModal(null)} htmlFor="bookingModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    {user === null && <p>Please <Link className='underline' to={'/login'}>login</Link> for booking.</p>}
                    {user !== null && <>
                        <h3 className="text-lg font-bold mb-2">Booking Form!</h3>
                        <form className='mb-3' onSubmit={handleSubmit(handleBooking)}>
                            <div className="form-control mb-2">
                                <label className="input-group">
                                    <span className='font-semibold'>Product Name</span>
                                    <input type="text" className="input input-bordered w-full focus:outline-0" defaultValue={product_name} readOnly />
                                </label>
                            </div>
                            <div className="form-control mb-2">
                                <label className="input-group">
                                    <span className='font-semibold'>Price</span>
                                    <input type="text" className="input input-bordered w-full focus:outline-0" defaultValue={sellPrice} readOnly />
                                </label>
                            </div>
                            <div className="form-control mb-2">
                                <label className="input-group">
                                    <span className='font-semibold'>Name</span>
                                    <input type="text" className="input input-bordered w-full focus:outline-0" defaultValue={user?.displayName} readOnly />
                                </label>
                            </div>
                            <div className="form-control mb-2">
                                <label className="input-group">
                                    <span className='font-semibold'>Email</span>
                                    <input type="text" className="input input-bordered w-full focus:outline-0" defaultValue={user?.email} readOnly />
                                </label>
                            </div>
                            <div className="form-control mb-2">
                                <label className="input-group">
                                    <span className='font-semibold'>Mobile</span>
                                    <input
                                        type="tel"
                                        placeholder='Mobile'
                                        className="input input-bordered w-full focus:outline-0"
                                        {...register('mobile', { required: "Enter Your Mobile Number" })}
                                    />
                                </label>
                                {errors?.mobile && <small className='text-red-500'>{errors?.mobile?.message}</small>}
                            </div>
                            <div className="form-control mb-2">
                                <label className="input-group">
                                    <span className='font-semibold'>Meeting Location</span>
                                    <input
                                        type="text"
                                        placeholder='Meeting Location'
                                        className="input input-bordered w-full focus:outline-0"
                                        {...register('meetLocation', { required: "Enter Meeting Location" })}
                                    />
                                </label>
                                {errors?.meetLocation && <small className='text-red-500'>{errors?.meetLocation?.message}</small>}
                            </div>
                            <div className='mt-3'>
                                <button disabled={loading} type='submit' className='btn btn-primary w-full'>Booking</button>
                            </div>
                        </form>
                    </>}
                </div>
            </div>
        </>
    );
}

export default BookingModal;
