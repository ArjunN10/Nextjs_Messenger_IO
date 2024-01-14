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
      <span className="
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
      "/>
      </div>
    </div>
  )
}

export default Avatar