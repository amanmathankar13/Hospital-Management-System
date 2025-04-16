import React from 'react'
import Header from '../Components/Header/Header'
import Sidebar from '../Components/Sidebar/Sidebar'

const AppRoutes = () => {
  return (
    <div className='flex'>
        <Sidebar/>
        <div className='w-full'>
            <Header/>
        </div>
    </div>
  )
}

export default AppRoutes