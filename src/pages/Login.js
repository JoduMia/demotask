import { Button, Label, TextInput } from 'flowbite-react'
import React, { useContext } from 'react'
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider'
import { useState } from 'react';

const Login = () => {
    const { googleSignIn, signWithEmailPass, setLoading,user } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate= useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
    //login with google
    const googleLogin = () => {
        setError('');
        googleSignIn()
            .then(() => {
                navigate(from, {replace:true});
                toast.success('Successfully logged in!!!')
            })
            .catch(error => {
                setError(error.message);
                toast.error(error.message);
            })
            .finally(() => {
                setLoading(false)
            })
    };





    const handleSubmit = (e) => {
        setError('');
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        form.reset()

        signWithEmailPass(email, password)
        .then(() => {

            if(user.emailVerified){
              navigate(from, {replace: true});
            } else {
              toast.error('Please verify your email and then try login !!!')
            }
        })
        .catch(error => {
            setError(error.message)
            toast.error(error.message);
        })
        .finally(() => {
          setLoading(false)
        })
    };



    return (
        <div className='dark:bg-[#000000ca] rounded-md flex items-center justify-center h-[100vh]'>
            <div className='w-[80%] md:w-[50%] shadow-lg bg-green-300 dark:bg-white rounded p-3 space-y-3'>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="email1"
                                value="Your email"
                                className='dark:!text-black'
                            />
                        </div>
                        <TextInput
                            id="email1"
                            name='email'
                            type="email"
                            placeholder="Enter Your Eamil Address"
                            required={true}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password1"
                                value="Your password"
                                className='dark:!text-black'
                            />
                        </div>
                        <TextInput
                            id="password1"
                            name='password'
                            type="password"
                            required={true}
                            placeholder='Enter Your Password'
                        />
                    </div>
                    <div>
                        <Button type="submit">
                            Submit
                        </Button>
                    </div>
                </form>
                <p className='text-red-600 font-medium'>{error && error}</p>
                <div>
                    <p className='font-semibold'>Haven't an Account? Please <Link to='/register' className='text-blue-700'>Register!!!</Link></p>
                </div>
                <div className='flex flex-col space-y-2 items-center justify-center'>
                    <Button onClick={googleLogin} >
                        <p><FaGoogle className='mr-2' /></p> Login With Google
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Login


