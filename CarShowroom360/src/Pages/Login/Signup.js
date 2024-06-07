import React from 'react';
import { useCreateUserWithEmailAndPassword, useSendEmailVerification, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import {auth, db} from '../../firebase.init';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import useToken from '../../Hooks/useToken';
import Loading from '../Shared/Loading';
import { doc, setDoc } from 'firebase/firestore';


const Signup = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [sendEmailVerification, sending] = useSendEmailVerification(auth);

    const [token] = useToken(user || googleUser)
    const navigate = useNavigate()
    if (token) {
        navigate('/dashboard')
    }

    let errorMessage;
    if (error || googleError || updateError) {
        errorMessage = <p className='text-error'> <small>Error: {error?.message}</small> </p>
    }
    if (loading || googleLoading || updating || sending) {
        return <Loading></Loading>
    }
    const onSubmit = async data => {
      //  alert (data.password)
       // const auth = getAuth();
       //alert(data.email)
       const email=data.email;
       const password=data.password;
       try {
            const res = await createUserWithEmailAndPassword(auth,email,password);
            await setDoc(doc(db,"User",res.user.uid),{
                id: res.user.uid,
                email: email,
                password: password,
                name: data.name
            });
            navigate("/");
       } catch (error) {
        console.log(error);
       }
      
    }

    return (
        <div className='flex justify-center px-2'>
            <div>
                <h2 className='text-xl md:text-2xl lg:text-3xl py-6 text-center text-secondary'>Create Account</h2>
                <p className='text-center pb-5'>Create an account for access and to keep track of your order history.</p>
                <div className='mx-auto w-full max-w-xs'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className='input input-bordered w-full max-w-xs'
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: 'Name is mandatory.'
                                    }
                                })} />
                            <label className="label">
                                {errors.name?.type === 'required' &&
                                    <span className="label-text-alt text-error">{errors.name.message}</span>}

                            </label>
                        </div>
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


                        <input className='w-full max-w-xs btn btn-primary my-3' type="submit" value="Signup" />
                    </form>

                    {errorMessage}

                    <p><small>Already have an account? <Link className='text-secondary font-semibold' to='/login'>Login Please</Link></small></p>
                </div>

                <div className="divider">or</div>

                <div className='text-center'>
                    <button onClick={() => signInWithGoogle()} className='mt-2 btn btn-outline btn-secondary'>Continue with Google</button>
                </div>

            </div>

        </div>
    );
};

export default Signup;


