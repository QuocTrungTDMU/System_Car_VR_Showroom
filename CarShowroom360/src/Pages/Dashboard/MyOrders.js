import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'

import { Link, useNavigate } from 'react-router-dom';
import {auth, db} from '../../firebase.init'
import CancelModal from './CancelModal';
import { QuerySnapshot, collection, getDocs, query } from 'firebase/firestore';

const MyOrders = () => {
    const [bookings, setBookings] = useState([]);
    const [cancel, setCancel] = useState(null);
    const [user] = useAuthState(auth)
    const navigate = useNavigate();
    useEffect(() => {
        const fetchOders = async () =>{
            const getOder = await getDocs(collection(db,'Oder'))
            const ordersData = getOder.docs.map(doc => doc.data())
            setBookings(ordersData)
            //console.log(ordersData)
        }
        return () => fetchOders()
    }, [])

    return (
        <div className='px-4 lg:px-2 py-4'>
            {/* <p className='pb-4'>Total number of products you ordered: {bookings.length}</p> */}
            <div className="overflow-x-auto px-4">
                <table className="table table-zebra w-full">

                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Total Cost</th>
                            <th>Address</th>
                            <th>Action</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) =>
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{booking.product}</td>
                                <td>{booking.orderQuantity}</td>
                                <td>${booking.cost}</td>
                                <td>{booking.address}</td>
                                <td>{!booking.paid
                                    ?
                                    <label onClick={() => { setCancel(booking);}} htmlFor="cancel-confirm-modal" className='btn btn-error btn-sm'>Cancel</label>
                                    :
                                    <p className='text-secondary'>Tx id: {booking.transactionId}</p>}
                                </td>

                                <td>{!booking.paid ? <Link to={`/dashboard/payment/${booking._id}`}><button className='btn btn-primary btn-sm'> Pay </button></Link> : <span className='font-semibold text-secondary'> Paid </span>}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {cancel ? <CancelModal
                cancel={cancel}
                setCancel={setCancel}
            ></CancelModal> : <></>}

        </div >
    );
};

export default MyOrders;