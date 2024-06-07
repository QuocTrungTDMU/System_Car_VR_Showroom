import React, { useContext, useEffect, useState } from 'react';
import {  db } from '../../firebase.init';
import ProfileModal from './ProfileModal';
import { AuthContext } from '../../Context/Authcontext';
import { doc, getDoc } from 'firebase/firestore';


const MyProfile = () => {
    // 
    const [User, setUser] = useState(null)
    const { currentUser } = useContext(AuthContext)
    console.log(currentUser)
    useEffect(() => {
        const product = async () => {
            const dt = await getDoc(doc(db, "User", currentUser.uid));
            setUser(dt.data())
            console.log(dt)
        }
        return () => {
            product()
        }
    }
        , [currentUser.uid])

    // if (isLoading) {
    //     return <Loading></Loading>
    // }

    return (
        <div>
            {
                User &&
                <div className='px-8 lg:px-16 text-lg'>
                    <h2 className='text-xl py-4'>Check and update your profile</h2>
                    <p> <span className='ml-2 font-bold'>Name:</span> {User.name}</p>
                    <p> <span className='ml-2 font-bold '>Email:</span>  {User.email}</p>
                    {User.location && <p> <span className='ml-2 font-bold '>Location:</span>  {User.location}</p>}

                    {User.phone && <p> <span className='ml-2 font-bold '>Phone:</span>  {User.phone}</p>}
                    {User.education && <p> <span className='ml-2 font-bold '>Education:</span>  {User.education}</p>}
                    {User.linkedin && <p> <span className='ml-2 font-bold '>Linkedin Profile:</span>  {User.linkedin}</p>}


                    <label htmlFor="my-modal-6" className="mt-4 btn btn-primary modal-button">Update</label>
                    <ProfileModal
                        id={currentUser.uid}
                        email={User.email}
                    ></ProfileModal>
                </div>
            }
        </div>
    );
};

export default MyProfile;