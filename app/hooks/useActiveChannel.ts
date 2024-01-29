import { useEffect, useState } from "react";
import useActiveList from "./useActiveList";
import { Channel, Members } from "pusher-js";
import { pusherClient } from "../libs/pusher";

const useActiveChannel = () => {
    const {set,add,remove}= useActiveList()
    const [activeChannel,setActiveChannel]=useState<Channel | null>(null)

    //listen all people join or leave

    useEffect(()=>{
        let channel = activeChannel;

        if(!channel){
            channel = pusherClient.subscribe('presence-messager');
            setActiveChannel(channel)
        }
        channel.bind('pusher:subscription_succeded',(members:Members)=>{
            const initialMembers:string[]=[];

            members.each((member:Record<string,any>)=>initialMembers.push(member.id))
            set(initialMembers)
        })

        
    channel.bind("pusher:member_added", (member: Record<string, any>) => {
        add(member.id)
      });
  
      channel.bind("pusher:member_removed", (member: Record<string, any>) => {
        remove(member.id);
      });
  
      return () => {
        if (activeChannel) {
          pusherClient.unsubscribe('presence-messenger');
          setActiveChannel(null);
        }
      }
    },[activeChannel,set,add,remove])
}

export default useActiveChannel;