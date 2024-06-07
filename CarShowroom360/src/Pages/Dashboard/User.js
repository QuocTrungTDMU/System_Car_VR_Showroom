import { doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { toast } from 'react-toastify';
import { db } from '../../firebase.init';
import { reload } from 'firebase/auth';

const User = ({ user, index, refetch,id }) => {
    const { email, role } = user;

    const makeAdmin = async () => {
        
        const changeAdmin = doc(db, "User",user.id);
        if (role == "member") {
            await updateDoc(changeAdmin, {
                role: "admin"
            })
        }
        else {
            await updateDoc(changeAdmin, {
                role: "member"
            })
        }
         window.location.reload()
       // console.log(id)

    }
    return (

        <tr>
            <th>{index + 1}</th>
            <td>{user.email}</td>
            <td>{role === 'admin' ? <p className='text-secondary font-semibold'>Admin</p> : <button onClick={makeAdmin} className='btn btn-primary btn-sm'>Make Admin</button>}</td>
        </tr>


    );
};

export default User;