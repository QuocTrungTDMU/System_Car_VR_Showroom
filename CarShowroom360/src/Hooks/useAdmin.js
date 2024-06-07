import { useEffect, useState } from "react";

const useAdmin = user => {
    const [admin, setAdmin] = useState(false);
    const [adminloading, setAdminloading] = useState(true);
    useEffect(() => {
        const email = user?.email;
        if (email) {
            fetch(`https://public-rozella-fatema.koyeb.app/admin/${email}`, {
                method: "GET",
                headers: {  
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {

                    setAdmin(data.admin);
                    setAdminloading(false);
                })
        }

    }, [user])
    return [admin, adminloading]
}
export default useAdmin;