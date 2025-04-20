import { Button, PasswordInput, SegmentedControl, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../Service/UserService';
import { errorNotification, successNotification } from '../Utility/NotificationService';
import { useState } from 'react';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const form = useForm({
        initialValues: {
            role:"PATIENT",
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    
        validate: {
          name: (value:any)=> (!value?"Name is required":null),
          email: (value:any) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
          password: (value: any) =>
            !value
              ? "Password is required"
              : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
              ? null
              : "Password must be at least 8 characters, include uppercase, lowercase, number, and special character",
          confirmPassword: (value:any, values:any) => (value !== values.password?"Password don't match" : null),
        },
    });
    const handleSubmit = (values: typeof form.values) => {
        setLoading(true);
        registerUser(values).then((data)=>{
            console.log(data);
            successNotification("SignUp Successfully.")
            navigate('/login')
        })
        .catch((error)=>{
            console.log(error);
            errorNotification(error.response.data.errorMessage)
        })
        .finally(()=>
        {
            setLoading(false);
        }
        );
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
                    placeholder="Name"
                    {...form.getInputProps('name')}
                    />
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
                <Button loading={loading} radius={'md'} size='md' type='submit' color='primary.4'>SignUp</Button>
                <div className='text-neutral-400 text-sm self-center'>Already have an account ? <Link to="/login" className='hover:underline text-blue-400'>Login</Link></div>
            </form>
        </div>
    </div>
  )
}

export default SignUpPage;