import React from 'react';
import { useNavigate } from 'react-router-dom';
const Product = ({ product }) => {
    const { _id, name, img, description, price, stock, minimumQuantity } = product;
    const navigate = useNavigate()
    const navigateToPurchase = id => {
       navigate(`/purchase/${id}`)
    }
    return (
        <div>
            <div className="card lg:max-w-lg h-full bg-teal-50 shadow-xl">
                <figure><img className='h-64 w-full' src={img} alt="" /></figure>
                <div className="card-body">
                    <h2 className="text-lg lg:text-xl font-semibold ">{name}</h2>
                    <p>{description}</p>
                    <p className='font-semibold'>Minimum Order Quantity: <span className=' font-normal'>{minimumQuantity}</span> </p>
                    <p className='font-semibold'>Available Quantity: <span className=' font-normal'>{stock}</span> </p>
                    <p className='font-semibold'>Price per unit: <span className='text-lg font-normal'>${price}</span> </p>

                    <button onClick={() => navigateToPurchase(_id)} className="mt-2 btn btn-outline btn-secondary">Purchase</button>


                </div>
            </div>
        </div>
    );
};

export default Product;