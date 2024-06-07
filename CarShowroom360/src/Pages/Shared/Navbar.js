import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import {auth} from '../../firebase.init';

const Navbar = () => {
    const [user] = useAuthState(auth);
    const logout = () => {
        signOut(auth);
        localStorage.removeItem('accessToken')
    };

    const navItems = <>
        <li><Link to='/home'>Home</Link></li>
        <li><Link to='/products'>Products</Link></li>
        {user && <li><Link to='/dashboard'>Dashboard</Link></li>}
        <li>{user ?
            <button onClick={logout} className='btn btn-ghost  text-base'>Sign out</button>
            :
            <Link to='/login'>Login</Link>}
        </li>
        <li>{user && <p className='text-teal-600'>{user.displayName}</p>}</li>
    </>
    return (
        <div className='md:px-10'>
            <div className="navbar px-0 bg-base-100">
                <div className="navbar-start">
                    <div className="md:pl-2 dropdown">
                        <label tabIndex="0" className="btn btn-ghost lg:hidden px-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 uppercase">
                            {navItems}
                        </ul>
                    </div>
                    <div className="btn btn-ghost normal-case text-lg md:text-xl lg:text-3xl text-secondary">Blackstone Automotive</div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0 uppercase">
                        {navItems}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Navbar;