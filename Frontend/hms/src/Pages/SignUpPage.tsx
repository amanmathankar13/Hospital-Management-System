import { Button, PasswordInput, SegmentedControl, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import React from 'react'
import { Link } from 'react-router-dom';

const SignUpPage = () => {
    const form = useForm({
        initialValues: {
            type:"PATIENT",
            email: '',
            password: '',
            confirmPassword: '',
        },
    
        validate: {
          email: (value:any) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
          password: (value:any) => (!value?"Password is required":null),
          confirmPassword: (value:any, values:any) => (!value?"Confirm Password is required":value !== values.password?"Password don't match" : null),
        },
    });
    const handleSubmit = (values: typeof form.values) => {
        console.log(values);
    };
return (
    <div style={{background:"url(/bg1.jpg)"}} className='h-screen w-screen !bg-cover !bg-center !bg-no-repeat flex items-center justify-center'>
        <div className='w-[430px] mx-auto bg-light p-10 py-8 shadow-lg rounded-lg'>
            <form onSubmit={form.onSubmit(handleSubmit)} className='flex flex-col gap-8 [&_.mantine-Input-input]:!border-gray-400 focus-within:[&_.mantine-Input-input]:!border-primary-500 [&_.mantine-Input-input]:!border [&_input]:!pl-2 [&_svg]:text-neutral-400 [&_input]:text-neutral-900'>
                <div className='self-center font-medium font-heading text-xl mb-2'>
                    SignUp
                </div>
                <SegmentedControl className='[&_*]: text-sm border border-gray-400' color='primary.5' bg="none" {...form.getInputProps("type")} fullWidth size="md" radius="lg" data={[{label:'Patient',value:'PATIENT'}, {label:'Doctor',value:'DOCTOR'}, {label:'Admin',value:'ADMIN'}]} />

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
                    <PasswordInput
                    variant="unstyled"
                    size="md"
                    radius="md"
                    placeholder="Confirm Password"
                    {...form.getInputProps('confirmPassword')}
                    />
                <Button radius={'md'} size='md' type='submit' color='primary.4'>SignUp</Button>
                <div className='text-neutral-400 text-sm self-center'>Already have an account ? <Link to="/login" className='hover:underline'>Login</Link></div>
            </form>
        </div>
    </div>
  )
}

export default SignUpPage;