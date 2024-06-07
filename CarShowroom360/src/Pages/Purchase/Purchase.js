import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import Booking from './Booking';
import {db} from '../../firebase.init';
import { doc, getDoc } from 'firebase/firestore';

const Purchase = () => {

    const { productId } = useParams();
    const [product,setProduct] = useState(null);
    useEffect  (() => {
        const product = async () =>{
            const dt = await getDoc(doc(db,"Product",productId));
            setProduct(dt.data())
        }
        return () => {
            product()
        }
    }
    ,[productId])
    // if (isLoading) {
    //     return <Loading></Loading>
    // }


    return (
        <div>
            {
                product && 
                <div className='px-4 md:px-16 lg:px-16 py-6'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:mt-12'>
                        <div className='mx-auto w-5/6'>
                            <img src={product.img} alt={product.name} />
                        </div>
                        <div className='mx-auto w-5/6'>
                            <h4 className='text-secondary text-xl md:text-3xl mb-2 font-semibold'>{product.name}</h4>
                            <p><span className='font-bold text-xl'>$ {product.price} </span>(single item)</p>
                            <p className='my-3'>{product.description}</p>
                            <p className='xl:text-lg'><span className='font-semibold text-secondary'>Available Quantity:</span> {product.stock}</p>
                            <p className='xl:text-lg'><span className='font-semibold text-secondary'>Minimum Order Quantity:</span> {product.minimumQuantity}</p>
                        </div>

                    </div>
                    <Booking product={product}></Booking>
                </div>
            } 
        </div>
    );
};

export default Purchase;