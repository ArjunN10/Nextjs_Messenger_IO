'use client'

import { User } from "@prisma/client"
import Image from "next/image"
import useActiveList from "../hooks/useActiveList"

interface AvatarProps{
  user?:User
}
const Avatar:React.FC<AvatarProps>= ({
  user
}) => {

  const {members}=useActiveList();
  const isActive = members.indexOf(user?.email!)!== -1;
  
  return (
    <div className="relative ">
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
    </div>
    {isActive && (

<span className="
absolute
bottom-1 
left-6  
w-4 h-4 
bg-green-400 
border-2  
dark:border-gray-800 
rounded-full"
></span>  
    )}
    </div>

       
  )
}

export default Avatar