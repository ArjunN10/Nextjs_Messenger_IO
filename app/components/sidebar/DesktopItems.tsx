'use client'

import React from 'react'
import clsx from 'clsx'
import Link from 'next/link';


interface DesktopItemsProps{
    label:string;
    icon:any;
    href:string;
    onclick?:()=>void;
    active?:boolean
}

const DesktopItems:React.FC<DesktopItemsProps>=({
    label,
    icon:Icon,
    href,
    onclick,
    active
})=> {
    const handleCliack=()=>{
        if(onclick){
            return onclick()
        }
    }
  return (
    <li onClick={handleCliack}>
    <Link href={href}
    className={clsx(
        `group
        flex
        gap-x-3
        rounded-md
        p-3
        text-sm
        leading-6
        font-semibold
        text-gray-500
        hover:text-
        hover:bg-gray-100 `,
        active && 'bg-gray-100 text-black'
    )}
    >
        <Icon className="h-6 w-6 shrink-0 "/>
    <span className='sr-only'>{label}</span>
    </Link>
        </li>
  )
}

export default DesktopItems