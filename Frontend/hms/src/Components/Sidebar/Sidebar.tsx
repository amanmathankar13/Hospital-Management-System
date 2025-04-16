import { Avatar } from '@mantine/core'
import { IconCannabis } from '@tabler/icons-react'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='bg-red-200 w-64 flex flex-col gap-8 pt-3 items-center py-3'>
        <div className='flex items-center gap-1 text-red-500'>
            <IconCannabis size={40} className='mb-1'/>
            <span className='font-heading font-semibold text-3xl'>MediCore</span>
        </div>
        <div className='p-1 bg-white rounded-full shadow-xl'>
            <Avatar variant='filled' src="avatar.png" size={'xl'} alt="it's me" />
        </div>
        
    </div>
  )
}

export default Sidebar