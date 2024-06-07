import React, { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import {auth, db} from '../../firebase.init';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import uuid from 'react-uuid';
import { AuthContext } from '../../Context/Authcontext';


const AddReview = ()  =>  {
    const {currentUser} = useContext(AuthContext)
    const [nowName,setName] = useState()
    const handleReview = async event => {
        event.preventDefault();
        const id = uuid();

        const reviews = {
            name: currentUser.uid,
            review: event.target.review.value,
            ratings: event.target.ratings.value
        }
        try {
            await setDoc(doc(db,'Review',id),{
                reviews
            })
 
        }
        catch{
            alert("M đánh giá ngu như bò")
        }
        event.target.reset()

    }
//     useEffect (() => {
//         const callName = async () =>{
//              const checkName = await getDoc(doc(db,"User",currentUser.id))
//              setName(checkName.data().id)
//         }
//     return () => callName()
//    },[currentUser]) 
    
    return (
        <div className='px-4 lg:px-2 py-4 '>
            <h2 className='text-xl md:text-2xl text-secondary'>Rate and Review</h2>
            <p className='py-4 lg:pr-28'>We always love to know about buyers opinion about our products and overall experience about buying and shipping. So, leave a review here and tell us about the experience of buying from Blackstone Automotive.</p>

            <form className='grid grid-cols-1 gap-2' onSubmit={handleReview}>

                <label className='font-semibold text-lg'>Rate Your Experience</label>
                <input className="input input-bordered input-primary border-2 w-full max-w-xs" type="number" name="ratings" min={1} max={5} placeholder='Number of ratings' />

                <label className='font-semibold text-lg'>Write Your Review</label>
                <textarea type="text" placeholder="Write here" className="input input-bordered input-primary border-2 h-40  w-full max-w-xs" name='review' />

                <input type="submit" className='btn btn-primary mt-2 border-2 w-full max-w-xs' value="Submit review" />
            </form>
        </div>

    );
};

export default AddReview;