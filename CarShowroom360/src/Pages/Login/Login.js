import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {auth} from '../../firebase.init';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading';
import useToken from '../../Hooks/useToken';

const Login = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const navigate = useNavigate();
    const location = useLocation();
    const [token] = useToken(user || googleUser);
    let from = location.state?.from?.pathname || "/";
    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [from, token, navigate])

    let errorMessage;
    if (error || googleError) {
        errorMessage = <p className='text-error'> <small>Error: {error?.message}</small> </p>
    }
    if (loading || googleLoading) {
        return <Loading></Loading>
    }

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password)
    };

    return (
        <div className='flex justify-center px-2'>
            <div>
                <h2 className='text-xl md:text-2xl lg:text-3xl py-6 text-center text-secondary'>Login</h2>
                <p className='text-center pb-5'>Login to access our community resources and place your order.</p>
                <div className='mx-auto w-full max-w-xs'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className='input input-bordered w-full max-w-xs'
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email adress is mandatory.'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Please, provide a valid email.'
                                    }
                                })} />
                            <label className="label">
                                {errors.email?.type === 'required' &&
                                    <span className="label-text-alt text-error">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' &&
                                    <span className="label-text-alt text-error">{errors.email.message}</span>}
                            </label>
                        </div>
                        <div className="form-control ">
                            <label className="label font-semibold">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className='input input-bordered w-full max-w-xs'
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password is mandatory.'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Password has to be 6 characters or longer.'
                                    }

                                })} />

                            <label className="label">
                                {errors.password?.type === 'required' &&
                                    <span className="label-text-alt text-error">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' &&
                                    <span className="label-text-alt text-error">{errors.password.message}</span>}
                            </label>
                        </div>


                        <input className='w-full max-w-xs btn btn-primary my-3' type="submit" value="Login" />
                    </form>

                    {errorMessage}

                    <p><small>New to Blackstone Automotive? <Link className='text-secondary font-semibold' to='/signup'>Create an account</Link></small></p>
                </div>

                <div className="divider">or</div>

                <div className='text-center'>
                    <button onClick={() => signInWithGoogle()} className='mt-2 btn btn-outline btn-secondary'>Continue with Google</button>
                </div>

            </div>

        </div>
    );
};

export default Login;