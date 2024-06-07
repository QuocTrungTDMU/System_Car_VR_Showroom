import { doc, updateDoc } from 'firebase/firestore';
// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
import { db } from '../../firebase.init';

const ProfileModal = ({ email, refetch,id }) => {
    const handleUpdate = async (event) => {
        event.preventDefault();
        
        // Set the "capital" field of the city 'DC'
        const Education = event.target[0].value;
        const location = event.target[1].value;
        const phone = event.target[2].value;
        const linkedin = event.target[3].value;

        const washingtonRef = doc(db, "User", id);
        await updateDoc(washingtonRef, {
            education: Education,
            phone: location,
            location: phone,
            linkedin: linkedin
        })
        // alert("Đã update thành công")
        console.log(id);
        window.location.reload()
    }
    return (
        <div>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className="modal-action">
                        <label htmlFor="my-modal-6" className="btn">X</label>
                    </div>
                    <div className='mx-auto w-full max-w-xs'>
                        <form className='grid grid-cols-1 gap-2' onSubmit={handleUpdate}>

                            <label className='font-semibold'>Education</label>
                            <input className="input input-bordered input-primary" placeholder='Education' type="text" name="education" />

                            <label className='font-semibold'>Location</label>
                            <input placeholder='Location' className="input input-bordered input-primary  border-2   " type="text" name="location" />

                            <label className='font-semibold'>Phone No</label>
                            <input placeholder='Phone no' className="input input-bordered input-primary  border-2   " type="text" name="phone" />
                            <label className='font-semibold'>Linkedin Profile</label>
                            <input placeholder='Profile' className="input input-bordered input-primary  border-2" type="url" name="linkedin" />

                            <input type="submit" className='btn btn-primary mt-2 border-2' value="Update" />
                        </form>

                    </div>



                </div>
            </div>
        </div>
    );
};

export default ProfileModal;