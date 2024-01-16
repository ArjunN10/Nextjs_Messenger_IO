"use client"

import Avatar from "@/app/components/sidebar/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";

// import Image from "next/image"

interface HeaderProps{
    conversation:Conversation & {
        users:User[]
    }
}
const Header:React.FC<HeaderProps> = ({
    conversation,
}) => {

    const otherUser=useOtherUser(conversation)

    const statusText=useMemo(()=>{
if(conversation.isGroup){                   
    return `${conversation.users.length}members`;       //show howmany members in gropu instead on online
}
return 'Active'

    },[conversation])



    return (
        <div className="
        bg-white
        w-full
        flex
        border-b-[1px]
        sm:px-4
        px-4
        lg:px-6
        justify-between
        item-center
        shadow-sm
        ">
        <div className="flex gap-3 items-center">
            <Link className="
            lg:hidden
            block
            text-sky-500
            hover:text-sky-600
            transition
            cursor-pointer"
            href="/conversation">
            <HiChevronLeft size={32}/>
            </Link>
            <div className="mt-2">
            <Avatar user={otherUser}/>
            </div>
            <div className="flex flex-col">
            <div>
                {conversation?.name || otherUser?.name}
            </div>
            <div className="
            text-sm
            font-light
            text-neutral-500
            ">
                {statusText}
            </div>
         </div>
        </div> 
        <HiEllipsisHorizontal
        size={32}
        onClick={()=>{}}
        className="
        text-sky-500
        cursor-pointer
        hover:text-sky-600
        transition
        "/>
</div>
    );
}

export default Header;