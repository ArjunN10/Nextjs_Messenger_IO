"use client"

import { Conversation } from "@prisma/client"


interface ConversationListProps{
    initialItems:Conversation[]   //for initial load for user using PUSHER
}
const ConversationList:React.FC<ConversationListProps>=({
    initialItems
})=>{

    return(
        <div>
            conversation list
        </div>
    )
}
export default ConversationList