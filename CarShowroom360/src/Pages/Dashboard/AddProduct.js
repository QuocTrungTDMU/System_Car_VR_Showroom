import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { db, storage } from '../../firebase.init';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uuid from 'react-uuid';


const AddProduct = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const imgUploadKey = '8ef9ce20f333800ab7085b22ba4b5827';


   
    const newID = uuid()
    const onSubmit = data => {
        const storageRef = ref(storage, `car/${data.brand}/${newID}`);
        const img = data.img[0];
        console.log(img)
        uploadBytes(storageRef, img).then((snapshot) => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                try {
                    await setDoc(doc(db, "Product", newID), {
                        _id: newID,
                        name: data.name,
                        description: data.description,
                        price: parseInt(data.price),
                        minimumQuantity: parseInt(data.minimumQuantity),
                        stock: parseInt(data.stock),
                        brand:data.brand,
                        img: downloadURL
                    })
                    alert("Bạn đã thêm sản phẩm thành công")
                    window.location.reload();
                   
                }
                catch {
                    alert("Đặt hàng ngu như bò")
                }
            });
        })
       
    }
    
    return (
        <div>
            <p className='my-4 mx-8 md:text-lg'>Add new product's details in company database through filling this table.</p>
            <div className='mx-4 md:mx-12 w-full max-w-xs'>
                <form className='grid grid-cols-1 gap-2' onSubmit={handleSubmit(onSubmit)}>
                    <label className='font-semibold'>Product Name</label>
                    <input
                        className="input input-bordered input-primary rounded-none "
                        type="text"
                        placeholder="Name"
                        {...register("name", {
                            required: {
                                value: true
                            }
                        })} />

                    <label className='font-semibold'>Description</label>
                    <textarea className="input input-bordered rounded-none h-40"
                        type="text"
                        placeholder='Description'
                        {...register("description", {
                            required: {
                                value: true
                            }
                        })} />

                    <label className='font-semibold'>Price</label>
                    <input className="input input-bordered rounded-none"
                        type="number"
                        placeholder="Price"
                        {...register("price", {
                            required: {
                                value: true
                            }
                        })} />

                    <label className='font-semibold'>Minimum Order Quantity</label>
                    <input className="input input-bordered rounded-none"
                        type="number"
                        placeholder="Minimum Quantity"
                        {...register("minimumQuantity", {
                            required: {
                                value: true
                            }
                        })} />

                    <label className='font-semibold'>Total Stock</label>
                    <input className="input input-bordered rounded-none"
                        type="number"
                        placeholder="Stock"
                        {...register("stock", {
                            required: {
                                value: true
                            }
                        })} />
                    {/* <label className='font-semibold'>Description</label>
                    <textarea className="input input-bordered rounded-none h-10"
                        type="text"
                        placeholder='Brand'
                        {...register("Brand", {
                            required: {
                                value: true
                            }
                        })} /> */}
                    <label className='font-semibold'>Brand</label>
                    <select
                        className="select select-bordered rounded-none h-10"
                        {...register("brand", {
                            required: {
                                value: true,
                                message: "Please select a brand"
                            }
                        })}
                    >
                        <option value="">Select a brand</option>
                        <option value="Mercedes">Mercedes Benz</option>
                        <option value="BMW">BMW</option>
                        <option value="Lexus">Lexus</option>
                        <option value="Audi">Audi</option>
                        <option value="Honda">Honda</option>
                        <option value="Toyota">Toyota</option>
                        <option value="KIA">KIA</option>
                    </select>


                    <label className='font-semibold'>Upload product image</label>
                    <input
                        className="input"
                        type="file"
                        {...register("img", {
                            required: {
                                value: true
                            }
                        })}
                    />


                    <input type="submit" className='btn btn-primary mt-2 border-2 rounded-none' value="Add Product" />
                </form>
            </div>
        </div>
    );
};

export default AddProduct;