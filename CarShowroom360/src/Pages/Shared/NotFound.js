import React from 'react';
import img from '../../images/6342464.jpg'

const NotFound = () => {
    return (
        <div className='w-4/5 mx-auto text-center mb-16'>
            <h2 className='text-3xl text-gray-500 py-8'>Sorry!! This page is not found.</h2>
            <div className='flex justify-center'>
                <img src={img} className='h-96' alt="" />
            </div>
        </div>
    );
};

export default NotFound;