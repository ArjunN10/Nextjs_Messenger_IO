
'use client'

import useRoutes from '@/app/hooks/useRoutes'
import React, { useState } from 'react'

const DesktopSidebar=()=> {

    const routes=useRoutes();
    const [isOpen,seisOpen]=useState(false)
  return (
    <div>DesktopSidebar</div>
  )
}


export default DesktopSidebar