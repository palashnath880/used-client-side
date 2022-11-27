import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { UserContext } from '../../../contexts/UserContextProvider/UserContextProvider';
import { useCookies } from 'react-cookie';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';

const UsersItem = ({ user, serial, handleVerified, handleDeleteUser }) => {
    const { uid, displayName, photoURL, email, role, verified, date } = user;
    const { user: currentUser } = useContext(UserContext);
    return (
        <tr>
            <th>{serial}</th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={photoURL} alt="Avatar" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{displayName}</div>
                        <span className="badge">{role}</span>
                    </div>
                </div>
            </td>
            <td>
                {email}
            </td>
            <td>{date && new Date(date).toLocaleDateString()}</td>
            <td>{verified ?
                <CheckCircleIcon onClick={() => handleVerified(uid, false)} className='w-6 h-6 text-blue-500 cursor-pointer' /> :
                <CheckCircleIcon onClick={() => handleVerified(uid, true)} className='w-6 h-6 cursor-pointer' />}</td>
            <th>
                {role !== 'Admin' && uid !== currentUser?.uid && <label htmlFor="userDeleteModal" onClick={() => handleDeleteUser(user)} className="btn btn-error btn-xs">Delete</label>}
            </th>
        </tr >
    );
}

const AllUsers = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['used_access_token']);
    const [filterRole, setFilterRole] = useState('');
    const [confirmModal, setConfirmModal] = useState(null);
    const { user, logOut } = useContext(UserContext);
    const navigate = useNavigate();

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['all-users', filterRole],
        queryFn: async () => {
            const res = await fetch(`https://used-server.vercel.app/all-users/?role=${filterRole}`, {
                headers: {
                    authorization: `bearer ${cookies?.used_access_token}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    const handleVerified = (id, verified) => {
        axios.put(`https://used-server.vercel.app/all-users/${id}`, { verified }, {
            headers: {
                authorization: `bearer ${cookies?.used_access_token}`
            }
        })
            .then(res => {
                if (res?.data?.acknowledged) {
                    refetch();
                    toast.success('User Verified Status Update Successfully.');
                }
            });
    }

    const logoutHandler = () => {
        logOut()
            .then(() => {
                removeCookie('used_access_token');
                navigate('/login');
            });
    }

    const handleDeleteUser = (deletedUser) => {
        axios.delete(`https://used-server.vercel.app/user/${deletedUser?.uid}`, {
            headers: {
                authorization: `bearer ${cookies?.used_access_token}`,
                admin_uid: user?.uid,
            }
        })
            .then(() => {
                toast.success(`${deletedUser?.displayName} deleted successfully.`);
                refetch();
                setConfirmModal(null);
            })
            .catch((err) => {
                const errorCode = err.response?.status;
                if (errorCode) {
                    toast.error("Your Access Token Is Expired. Login and come back.");
                    logoutHandler();
                }
            });
    }

    return (
        <div>
            <h2 className='text-2xl border-b pb-3 font-semibold'>All Users </h2>
            <div className='mt-5'>
                <div className='mb-5'>
                    <p className='pb-2 text-base'>Filters</p>
                    <select onChange={(e) => setFilterRole(e.target.value)} className="select select-bordered select-sm max-w-xs">
                        <option value='Admin'>Admin</option>
                        <option value='Seller'>Seller</option>
                        <option value='Buyer'>Buyer</option>
                    </select>
                    <button className='btn btn-ghost btn-xs ml-3' onClick={() => setFilterRole('')}>Reset Filters</button>
                </div>
                {isLoading && <Loader />}
                {!isLoading && <div className="overflow-x-auto w-full">
                    {users.length > 0 ?
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Register Date</th>
                                    <th>Verified</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, index) =>
                                        <UsersItem
                                            key={user?._id}
                                            user={user}
                                            serial={index + 1}
                                            handleVerified={handleVerified}
                                            handleDeleteUser={setConfirmModal}
                                        />
                                    )
                                }
                            </tbody>
                        </table>
                        :
                        <p className='my-5 py-2 text-red-500 text-center font-semibold bg-red-100 rounded-md'>Not Found</p>
                    }
                </div>
                }
            </div>
            {/* Delete Confirm Modal */}
            {confirmModal && <>
                <input type="checkbox" id="userDeleteModal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative">
                        <h3 className="text-xl font-bold text-center">Are you sure delete {confirmModal?.displayName}</h3>
                        <div className='mt-3 flex justify-center gap-2'>
                            <label htmlFor="" onClick={() => handleDeleteUser(confirmModal)} className="btn text-slate-50 btn-success">Yes</label>
                            <label htmlFor="userDeleteModal" onClick={() => setConfirmModal(null)} className="btn text-slate-50 btn-error">No</label>
                        </div>
                    </div>
                </div>
            </>}
        </div>
    );
}

export default AllUsers;
