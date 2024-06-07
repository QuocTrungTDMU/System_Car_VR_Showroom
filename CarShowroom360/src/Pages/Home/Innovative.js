import { faRecycle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Innovative = () => {
    return (
        <div>
            < div className='w-11/12 mx-auto my-8 py-4 md:py-8 bg-teal-50'>
                <h2 className='text-center text-xl md:text-4xl pb-4 lg:pb-10 font-bold text-secondary'>Innovation and Environment</h2>
                <div className='text-center'>
                    <h1><FontAwesomeIcon className='h-10' icon={faRecycle}></FontAwesomeIcon></h1>
                    <h2 className='text-lg pt-2 px-4'>We are committed towards building a sustainable society through recycling and always trying to come up with Innovative technology for manufacturing vehicle parts.</h2>
                    <p className='text-secondary font-semibold py-2'>To know about our new innovation, subscribe to our Newsletter</p>
                    <input type="email" placeholder="Enter email" className="my-2 mr-2 input input-bordered input-secondary w-full max-w-xs" />
                    <input type="submit" value='Subscribe' className='input input-bordered bg-secondary text-white' />

                </div >
            </div >
        </div >
    );
};

export default Innovative;