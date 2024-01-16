'use client'

import { User } from "@prisma/client"
import Image from "next/image"

interface AvatarProps{
  user?:User
}
const Avatar:React.FC<AvatarProps>= ({
  user
}) => {
  return (
    <div className="relative">
      <div className="
      relative
      inline-block
      overflow-hidden
      h-9
      w-9
      rounded-full
      md:h-10
      md:w-10
      ring-1
      ring-black
      ">
      <Image
      alt="Avatar"
      src={user?.image || '/images/holder.png'}
      fill
      />

      {/* <span className="
      absolute
      block
      rounded-full
      bg-green-500
      ring-2
      ring-white
      top-0
      right-0
      h-2
      w-2
      md:h-3
      md:w-3
      "/> */}
            <span className="
            absolute
             text-green-500 
             right-0 
             bottom-0
            ">
            <svg width="20" height="20">
                  <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
               </svg>
            </span>

      </div>
  </div>
       
  )
}

export default Avatar