import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.init';
import { useNavigate } from 'react-router-dom';
import SingleProduct from './SingleProduct';

const ManageProducts = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productCollectionRef = collection(db, "Product");
                const querySnapshot = await getDocs(productCollectionRef);
                const productData = querySnapshot.docs.map(doc => doc.data());
                setProducts(productData);
            } catch (error) {
                console.error("Error getting documents:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className='px-4 lg:px-2 py-4'>
            <h3 className='pb-4 px-4 text-lg'>List of Products:</h3>
            <div className="overflow-x-auto px-4">
                <table className="table table-zebra w-full lg:w-9/12">
                    <thead>
                        <tr>
                            <th className='text-base'>No</th>
                            <th className='text-base'>Name</th>
                            <th className='text-base'>Price</th>
                            <th className='text-base'>Minimum Quantity</th>
                            <th className='text-base'>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <SingleProduct
                                product={product}
                                index={index}
                                key={product._id}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProducts;
