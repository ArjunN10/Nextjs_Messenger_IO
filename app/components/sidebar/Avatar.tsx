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
      w-9
      h-9
      rounded-full
      md:h-10
      md:w-10
      ">
      <Image
      alt="Avatar"
      src={user?.image || '/images/holder.png'}
      fill
      />
      </div>
    </div>
  )
}

export default Avatar