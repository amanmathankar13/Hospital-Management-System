import { Avatar, Text} from '@mantine/core'
import { IconCalendarCheck, IconCannabis, IconLayoutDashboard, IconUser, IconVaccine, IconWheelchair } from '@tabler/icons-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const links=[
    {
        name:"Dashboard", url:"/doctor/dashboard", icon:<IconLayoutDashboard stroke={1.5}/>
    },
    {
        name:"Profile", url:"/doctor/profile", icon:<IconUser stroke={1.5}/>
    },
    {
        name:"Patients", url:"/doctor/patients", icon:<IconWheelchair stroke={1.5}/>
    },
    {
        name:"Appointments", url:"/doctor/appointments", icon:<IconCalendarCheck stroke={1.5}/>
    },
    {
        name:"Pharmacy", url:"/doctor/pharmacy", icon:<IconVaccine stroke={1.5}/>
    }
]

const Sidebar = () => {
    const user = useSelector((state:any)=> state.user)
  return (
    <div className='flex overflow'>
        <div className='w-64'></div>
        <div className='bg-dark fixed w-64 h-screen overflow-y-auto hide-scrollbar flex flex-col gap-8 items-center'>
            <div className='flex fixed z-[500] py-3 bg-dark items-center gap-1 text-primary-400'>
                <IconCannabis size={40} className='mb-1'/>
                <span className='font-heading font-semibold text-3xl'>MediCore</span>
            </div>
            <div className='flex flex-col gap-5 mt-20'>
                <div className='flex flex-col gap-1 items-center'>
                    <div className='p-1 bg-white rounded-full shadow-xl'>
                        <Avatar variant='filled' src="/avatar.png" size={'xl'} alt="it's me" />
                    </div>
                    <span className='font-medium text-light'>{user.name}</span>
                    <Text c="dimmed" className='text-light' size='xs'>{user.role}</Text>
                </div>
                <div className='flex flex-col gap-2'>
                    {
                        links.map((link) => {
                            return <NavLink to={link.url} key={link.url} className={({isActive})=>`flex items-center gap-3 w-full font-medium px-4 py-5 rounded-lg ${isActive?"bg-primary-400 text-dark":"hover:bg-gray-100 hover:text-dark text-light"}`}>
                                {link.icon}
                                <span className='font-medium'>{link.name}</span>
                            </NavLink>
                        })
                    }

                </div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar