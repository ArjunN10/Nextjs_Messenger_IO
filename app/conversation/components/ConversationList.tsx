"use client"

import useConversation from "@/app/hooks/useConversation"
import { FullConversationType } from "@/app/types"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useState } from "react"


interface ConversationListProps{
    initialItems:FullConversationType[]   //for initial load for user using PUSHER
}
const ConversationList:React.FC<ConversationListProps>=({
    initialItems
})=>{
const [items,setItems]=useState(initialItems);

const router=useRouter();

const {conversationId,isOpen}=useConversation()

    return(
        <aside
        className={clsx(`
        fixed
        inset-y-0
        pb-20
        lg:pb-0
        lg:left-20
        lg:w-80
        lg:block
        overflow-y-auto
        border-r
        border-gray-200`,
        isOpen?'hidden')}>
            conversation list
        </aside>
    )
}
export default ConversationList