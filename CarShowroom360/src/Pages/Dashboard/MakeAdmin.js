import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading'
import User from './User';
import { collection, getDoc, getDocs} from 'firebase/firestore';
import { db } from '../../firebase.init';

const MakeAdmin = ()  => {

    useEffect (() => { 
    const getUser = async () => {
         const listUser = await getDocs(collection(db,"User"));
        const dt =[]
       
       listUser.forEach((item) => {
        dt.push(item.data())
         });
         setNameUser(dt)
    } 

   return () => getUser()
    },[])
    const [nameUser, setNameUser] = useState([])
    // if (isLoading) {
    //     return <Loading></Loading>
    // }

    return (
        nameUser.length> 0 && 
        <div className='px-4 lg:px-2 py-4'>
            <h3 className='pb-4 px-4 text-lg'>List of users:</h3>
            <div className="overflow-x-auto px-4">
                <table className="table table-zebra w-full lg:w-9/12">

                    <thead>
                        <tr>
                            <th className='text-base'>No</th>
                            <th className='text-base'>Email</th>
                            <th className='text-base'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nameUser.map((user, index) => <User
                            user={user}
                            index={index}
                            key={user._id}
                            id = {user.id}
                            ></User>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MakeAdmin;