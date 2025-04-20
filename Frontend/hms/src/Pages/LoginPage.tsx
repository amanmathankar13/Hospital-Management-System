import { Button, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../Service/UserService';
import { errorNotification, successNotification } from '../Utility/NotificationService';
import { useDispatch } from 'react-redux';
import { setJwt } from '../Slices/JwtSlice';
import { jwtDecode } from 'jwt-decode';
import { setUser } from '../Slices/UserSlice';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const form = useForm({
        initialValues: {
          email: '',
          password: '',
        },
    
        validate: {
          email: (value:any) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
          password: (value:any) => (!value?"Password is required":null)
        },
    });
    const handleSubmit = (values: typeof form.values) => {
        setLoading(true);
        loginUser(values).then((response) => {
            successNotification("Logged in Successfully.");
            dispatch(setJwt(response));
            dispatch(setUser(jwtDecode(response)))
            navigate('/dashboard');
        })
        .catch((error)=>{
            errorNotification(error?.response?.data?.errorMessage);
        })
        .finally(() => {
            setLoading(false);
            });
    };
return (
    <div style={{background:"url(/bg1.jpg)"}} className='h-screen w-screen !bg-cover !bg-center !bg-no-repeat flex items-center justify-center'>
        <div className='w-[430px] mx-auto bg-light p-10 py-8 shadow-lg rounded-lg'>
            <form onSubmit={form.onSubmit(handleSubmit)} className='flex flex-col gap-8 [&_.mantine-Input-input]:!border-gray-400 focus-within:[&_.mantine-Input-input]:!border-primary-500 [&_.mantine-Input-input]:!border [&_input]:!pl-2 [&_svg]:text-neutral-400 [&_input]:text-neutral-900'>
                <div className='self-center font-medium font-heading text-xl mb-2'>
                    Login
                </div>

                    <TextInput
                    variant="unstyled"
                    size="md"
                    radius="md"
                    placeholder="Email"
                    {...form.getInputProps('email')}
                    />
                    <PasswordInput
                    variant="unstyled"
                    size="md"
                    radius="md"
                    placeholder="Password"
                    {...form.getInputProps('password')}
                    />
                <Button loading={loading} className='mt-4' radius={'md'} size='md' type='submit' color='primary.4'>Login</Button>
                <div className='text-neutral-400 text-sm self-center'>Don't have an account ? <Link to="/signup" className='hover:underline text-blue-400'>SignUp</Link></div>
            </form>
            
        </div>
    </div>
  )
}

export default LoginPage