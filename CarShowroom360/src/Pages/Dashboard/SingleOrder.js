import React, { useState } from 'react';

const SingleOrder = ({ booking, index, refetch }) => {
    const [status, setStatus] = useState('Pending');
    const handleChange = () => {
        setStatus('Shipped')
    }

    return (
        <tr>
            <th>{index + 1}</th>
            <td>{booking.buyerEmail}</td>
            <td>{booking.product}</td>
            <td>{booking.orderQuantity}</td>
            <td>{booking.paid === true ? <button onClick={() => { handleChange() }} className='btn btn-xs btn-primary'>{status}</button> : <button className='btn btn-sm btn-error'>Unpaid</button>}</td>
        </tr>
    );
};

export default SingleOrder;