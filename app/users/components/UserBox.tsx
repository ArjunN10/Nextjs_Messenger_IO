"use client"

import Avatar from "@/app/components/sidebar/Avatar"
import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"


interface UserBoxProps{
    data:User
}

const UserBox:React.FC<UserBoxProps>=({
data
})=>{

const router=useRouter()
const [isLoading,setisLoading]=useState(false)

//start conv with user/on click
const handleClick=useCallback(()=>{
setisLoading(true)

axios.post('/api/conversations',{ 
    userId:data.id
})
.then((data)=>{
router.push(`/conversatio   ns/${data.data.id}`)
})
.finally(()=>setisLoading(false));
},[data,router])

return(
<div
onClick={handleClick}
className="
w-full
relative
flex
items-center
space-x-3
bg-white
p-3
hover:bg-neutral-100
rounded-lg
transition
cursor-pointer">
<Avatar user={data}/>

</div>
    )
}

export default UserBox