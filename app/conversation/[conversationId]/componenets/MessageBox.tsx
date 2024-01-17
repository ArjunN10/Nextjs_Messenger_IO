"use client"

import Avatar from "@/app/components/sidebar/Avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";


interface  MessageBoxProps{
    data:FullMessageType
    isLast:boolean
}
const MessageBox:React.FC<MessageBoxProps> = ({
    data,
    isLast
}) => {
const session=useSession();

const isOwn=session?.data?.user?.email === data?.sender?.email;
const seenList=(data.seen || [])
.filter((user)=>user.email !== data?.sender?.email)  //removing sender user from the list of seen
.map((user)=>user.name)
.join(', ')    //uer1,user2,user3

//Dynamic classes
const container=clsx(
    "flex gap-3 p-4",
    isOwn && "justify-end"
)

const avatar=clsx(isOwn && "order-2")

const body=clsx(
    "flex flex-col gap-2",
    isOwn && "item-end"
)

const message=clsx(
    "text-sm w-fit overflow-hidden",
    isOwn?'bg-sky-500 text-white':'bg-gray-100',
    data.image?'rounded-md p-0':'rounded-full py-2 px-3'
);



    return (
        <div className={container}>
<div className={avatar}>
<Avatar user={data.sender}/>
    </div> 
    <div className={body}>
<div className="flex item-center gap-1">
<div className="text-sm text-gray-500">
        {data.sender.name}
</div>
</div>
    </div>   
    </div>
    );
}

export default MessageBox;