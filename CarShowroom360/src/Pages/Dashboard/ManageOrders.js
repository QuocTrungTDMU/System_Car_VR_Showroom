import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.init';
import Loading from '../Shared/Loading';
import './CSS/ManageOrders.css';


const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'Oder'));
                const ordersData = querySnapshot.docs.map(doc => doc.data());
                setOrders(ordersData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders: ', error);
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, status) => {
        try {
            // Update the order status in the database
            const orderRef = doc(db, 'Oder', orderId);
            await updateDoc(orderRef, { status });
            // Update the local state to reflect the change
            setOrders(prevOrders => prevOrders.map(order =>
                order.id === orderId ? { ...order, status } : order
            ));
        } catch (error) {
            console.error('Error updating order status: ', error);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='px-4 lg:px-2 py-4'>
            <h3 className='pb-4 px-4 text-lg'>List of Orders:</h3>
            <div className="overflow-x-auto px-4">
                <table className="table table-zebra w-full lg:w-9/12">
                    <thead>
                        <tr>
                            <th className='text-base'>No</th>
                            <th className='text-base'>Buyer</th>
                            <th className='text-base'>Product</th>
                            <th className='text-base'>Quantity</th>
                            <th className='text-base'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order.id}>
                                <td>{index + 1}</td>
                                <td>{order.buyer}</td>
                                <td>{order.product}</td>
                                <td>{order.orderQuantity}</td>
                                <td>
                                    <button
                                        onClick={() => handleStatusChange(order.id, 'not delivery')}
                                        className={order.status === 'not delivery' ? 'green-button' : 'red-button'}>
                                        Not Delivery
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(order.id, 'are delivering')}
                                        className={order.status === 'are delivering' ? 'green-button' : 'red-button'}>
                                        Are Delivering
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(order.id, 'Successful delivery')}
                                        className={order.status === 'Successful delivery' ? 'green-button' : 'red-button'}>
                                        Successful Delivery
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrders;
