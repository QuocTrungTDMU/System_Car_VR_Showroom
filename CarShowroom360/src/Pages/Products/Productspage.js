import React, { useEffect, useState } from 'react';
import Product from '../Home/Product';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase.init';

const Productspage = () => {
    const [products, setProducts] = useState([]);
    const [productView, setViewProduct] = useState([]);
    const [filterBrand, setFilterBrand] = useState('');
    const [filterPrice, setFilterPrice] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleBrandFilterChange = (event) => {
        const selectedBrandValue = parseInt(event.target.value); 
        setFilterBrand(selectedBrandValue); 
    
        if (selectedBrandValue === 0) {
            setProducts(productView);
        } else if(selectedBrandValue== 1) {
            setProducts(productView.filter(item => item.brand === "Mercedes"));
        }
        else if(selectedBrandValue== 2) {
            setProducts(productView.filter(item => item.brand === "BMW"));
        }
        else if(selectedBrandValue== 3) {
            setProducts(productView.filter(item => item.brand === "Lexus"));
        }
        else if(selectedBrandValue== 4) {
            setProducts(productView.filter(item => item.brand === "Audi"));
        }
        else if(selectedBrandValue== 5) {
            setProducts(productView.filter(item => item.brand === "Honda"));
        }
        else if(selectedBrandValue== 6) {
            setProducts(productView.filter(item => item.brand === "Toyota"));
        }
        else if(selectedBrandValue== 7) {
            setProducts(productView.filter(item => item.brand === "KIA"));
        }
    };
    
    
    const handlePriceFilterChange = (event) => {
        setFilterPrice(event.target.value);
        const priceValue = parseInt(event.target.value);
        
        if (priceValue == 0) {
            setProducts(productView);
        } else if (priceValue == 2) {
            setProducts(productView.filter(item => item.price < 2000000000));
        } else if(priceValue == 1){
            setProducts(productView.filter(item => item.price > 100000000));
        }
    };
    
    
    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
        setProducts(productView.filter(item => item.name.includes(event.target.value)));
        //setProducts(setViewProduct.filter(item => item.name.toLowerCase().includes(event.target.value.toLowerCase())));

    };
    useEffect(() => {
        const getProduct = async () => {
            const get = await getDocs(collection(db, "Product"))
            const dt = []
            get.forEach((item) => {
                dt.push(item.data())
            })
            setProducts(dt)
            setViewProduct(dt)
        }
        return () => {
            getProduct();
        }
    }, [])

    return (
        <div className='px-8 lg:px-16 py-8 mb-4'>
            <h2 className='text-xl md:text-2xl lg:text-3xl text-center my-8'>PRODUCTS</h2>
            <div className='flex justify-center space-x-4 mb-4'>
                <div>
                    <label htmlFor="brandFilter" className="block text-sm font-medium text-gray-700">Filter by Brand:</label>
                    <select id="brandFilter" onChange={handleBrandFilterChange} value={filterBrand} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="0">All</option>
                        <option value="1">Mercedes Benz</option>
                        <option value="2">BMW</option>
                        <option value="3">Lexus</option>
                        <option value="4">Audi</option>
                        <option value="5">Honda</option>
                        <option value="6">Toyota</option>
                        <option value="7">KIA</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="priceFilter" className="block text-sm font-medium text-gray-700">Filter by Price:</label>
                    <select id="priceFilter" onChange={handlePriceFilterChange} value={filterPrice} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="0">All</option>
                        <option value="1">Greater $100000000</option>
                        <option value="2">Less $2000000000</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search Product:</label>
                    <input type="text" id="search" value={searchTerm} onChange={handleSearchTermChange}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8'>
                {products.map(product => <Product
                    key={product._id}
                    product={product}
                ></Product>)
                }
            </div>
        </div>

    );
};


export default Productspage;