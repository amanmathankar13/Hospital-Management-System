import { Avatar, Divider } from '@mantine/core'
import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const user = useSelector((state:any)=> state.user);
  return (
    <div className='p-10'>
        <div className='flex gap-5 items-center'>
            <Avatar variant='filled' src="/avatar.png" size={150} alt="it's me" />
            <div className='flex flex-col gap-2'>
                <div className='text-3xl font-medium text-neutral-900'>{user.name}</div>
                <div className='text-xl text-neutral-700'>{user.email}</div>
            </div>
        </div>
        <Divider my={'xl'}/>
        <div>
            <div className='text-2xl font-medium text-neutral-900'>Personal Information</div>
            <div className='flex gap-10'>
                <div>
                    <div>Date of Birth</div>
                    <div>27 August 2001</div>
                </div>
                <div></div>
            </div>
        </div>
    </div>
  )
}

export default Profile;
