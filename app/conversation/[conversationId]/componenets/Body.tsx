"use client"

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";


interface BodyProps{
  initialMessages:FullMessageType[]
}
const Body:React.FC<BodyProps> = ({
  initialMessages
}) => {

  const [messages, setMessages] = useState(initialMessages || []);
  // console.log("messs",messages)
  const bottomRef=useRef<HTMLDivElement>(null)

  const {conversationId}=useConversation()


  //post rout for seen the body 
  
  useEffect(()=>{
  axios.post(`/api/conversation/${conversationId}/seen`)
  },[conversationId])

  useEffect(()=>{
    pusherClient.subscribe(conversationId)
    bottomRef?.current?.scrollIntoView()

    const messageHandler=(message:FullMessageType)=>{
    axios.post(`/api/conversation/${conversationId}/seen`)

      setMessages((current)=>{
        if(find(current,{id:message.id})){   //Query checks any message in array with id
          return current;
        }
        return [...current,message]
      })
    bottomRef?.current?.scrollIntoView()

    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) => current.map((currentMessage) => {
        if (currentMessage.id === newMessage.id) {
          return newMessage;
        }
  
        return currentMessage;
      }))
    };

    pusherClient.bind('messages:new',messageHandler)
    pusherClient.bind('message:update',updateMessageHandler)

    return()=>{
      pusherClient.unsubscribe(conversationId)    //unmounting
      pusherClient.unbind('messages:new',messageHandler)
      pusherClient.unbind('message:update',updateMessageHandler)
    }
  },[conversationId])

// 
    return (
    <div className="flex-1 overflow-y-auto">
    {messages.map((message,i)=>(
        <MessageBox
        isLast={i === messages.length - 1}
        key={message.id}
        data={message}
        />
     ))} 
    <div ref={bottomRef} className="pt-24"/>
{/* Body */}

   </div>
    );
}

export default Body;