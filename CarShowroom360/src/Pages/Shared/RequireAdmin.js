import { signOut } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth, db } from '../../firebase.init';
import { AuthContext } from '../../Context/Authcontext';
import { doc, getDoc } from 'firebase/firestore';

const RequireAdmin = ({ children }) => {
    const location = useLocation();
    const { currentUser } = useContext(AuthContext)
    const [admin, setAdmin] = useState(false)
    const [user, setUser] = useState(false)
    useEffect(() => {
        if (currentUser != null) {
            setUser(true)
        }
        const getUser = async () => {
            const kt = await getDoc(doc(db, "User", currentUser.uid))
            if (kt.data().role != "admin")
                setAdmin(true)
        }
        return () => getUser();
        if (!user || !admin) {
            signOut(auth)
            return <Navigate to="/login" state={{ from: location }} replace />;
        }
    }, [user,admin])
    
    return children;
};

export default RequireAdmin;
