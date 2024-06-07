import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51L1BS3CGNwyMDjuO07cDqOQtHg2y7DaUenAPsRIkG99Hl18YT2o9KFb4efxU7B4FmnERWmtqtFuKLkHfOhsFbPPs00XXJffZyK');

const Payment = () => {
    const { id } = useParams();
    const url = `https://public-rozella-fatema.koyeb.app/bookings/${id}`;
    const { data: booking, isLoading } = useQuery(['bookings', id], () => fetch(url, {
        method: "GET",
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='pl-6 my-6'>

            <div className="card w-50 max-w-md bg-teal-50 shadow-xl">
                <div className="card-body">
                    <p className='font-semibold' >Hello {booking.buyer},</p>
                    <h2 className='text-lg'>You have ordered for {booking.orderQuantity} {booking.product}.</h2>
                    <h2>Total cost of your order is: <span className='text-secondary font-semibold'>${booking.cost}</span> </h2>

                </div>
            </div>

            <div className="card flex-shrink-0 w-50 mt-5 max-w-md shadow-2xl bg-base-100">
                <div className="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm booking={booking} />
                    </Elements>

                </div>
            </div>
        </div>
    );
};

export default Payment;