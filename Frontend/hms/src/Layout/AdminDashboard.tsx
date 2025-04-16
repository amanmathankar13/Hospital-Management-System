import React from 'react'
import Header from '../Components/Header/Header'
import Sidebar from '../Components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
        <div className='flex'>
            <Sidebar/>
            <div className='w-full flex flex-col'>
                <Header/>
                <Outlet/>
            </div>
        </div>
  )
}

export default AdminDashboard