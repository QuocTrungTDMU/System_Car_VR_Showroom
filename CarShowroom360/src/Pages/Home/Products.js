import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Product from './Product';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { db } from '../../firebase.init';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getProduct = async () => {
            const get = await getDocs(collection(db,"Product"))
            const dt = []
            get.forEach((item) => {
                dt.push(item.data())
              //  console.log(item.data())
            })
            setProducts(dt) 
           
        }
        return () => {
            getProduct();
        }
    }, [])
    return (
        <div className='px-8 lg:px-16 py-8'>
            <h2 className='text-xl md:text-2xl lg:text-3xl text-center my-6'>Manufactured Automotor Parts</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8'>
                {products.slice(-3).map(product => <Product
                    key={product._id}
                    product={product}
                ></Product>)
                }
            </div>
            <button className='btn my-4 lg:my-10 float-right hover:bg-transparent'><Link to='/products'>
                See all products <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></Link></button>

        </div>
    );
};

export default Products;