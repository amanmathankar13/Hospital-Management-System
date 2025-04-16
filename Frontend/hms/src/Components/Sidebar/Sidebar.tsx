import { Avatar, Text} from '@mantine/core'
import { IconCalendarCheck, IconCannabis, IconLayoutDashboard, IconStethoscope, IconVaccine, IconWheelchair } from '@tabler/icons-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const links=[
    {
        name:"Dashboard", url:"/dashboard", icon:<IconLayoutDashboard stroke={1.5}/>
    },
    {
        name:"Doctors", url:"/doctors", icon:<IconStethoscope stroke={1.5}/>
    },
    {
        name:"Patients", url:"/patients", icon:<IconWheelchair stroke={1.5}/>
    },
    {
        name:"Appointments", url:"/appointments", icon:<IconCalendarCheck stroke={1.5}/>
    },
    {
        name:"Pharmacy", url:"/pharmacy", icon:<IconVaccine stroke={1.5}/>
    }
]

const Sidebar = () => {
  return (
    <div className='bg-red-200 w-64 flex flex-col gap-8 pt-3 items-center py-3'>
        <div className='flex items-center gap-1 text-red-500'>
            <IconCannabis size={40} className='mb-1'/>
            <span className='font-heading font-semibold text-3xl'>MediCore</span>
        </div>
        <div className='flex flex-col gap-1 items-center'>
            <div className='p-1 bg-white rounded-full shadow-xl'>
                <Avatar variant='filled' src="avatar.png" size={'xl'} alt="it's me" />
            </div>
            <span className='font-medium'>Aman</span>
            <Text c="dimmed" size='xs'>Admin</Text>
        </div>
        <div className='flex flex-col gap-1'>
            {
                links.map((link) => {
                    return <NavLink to={link.url} key={link.url} className={({isActive})=>`flex items-center gap-3 w-full font-medium text-neutral-900 px-4 py-5 rounded-lg ${isActive?"bg-primary-400":"hover:bg-gray-100"}`}>
                        {link.icon}
                        <span className='font-medium'>{link.name}</span>
                    </NavLink>
                })
            }

        </div>
    </div>
  )
}

export default Sidebar