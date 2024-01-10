
'use client'

import useRoutes from '@/app/hooks/useRoutes'
import React, { useState } from 'react'
import DesktopItems from './DesktopItems';


const DesktopSidebar=()=> {

    const routes=useRoutes();
    const [isOpen,seisOpen]=useState(false)
  return (
    <div className='
          hidden
          lg:fixed
          lg:inset-y-0
          lg:left-0
          lg:z-40
          lg:w-20
          xl:px-6
          lg:overflow-y-auto
          lg:bg-white
          lg:border-r-[1px]
          lg:pb-4
          lg:flex
          lg:flex-col
          justify-between
      '>
      <nav className='
          flex
          flex-col
          mt-4
          justify-between
      '>
      <ul
          role='list'
          className='
          flex
          flex-col
          items-center
          space-y-1
      '>
          {routes.map((item)=>(
            <DesktopItems 
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onclick={item.onclick}
            />
          ))}
      </ul>
    </nav>
  </div>
  )
}


export default DesktopSidebar