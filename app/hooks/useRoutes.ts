import { useMemo } from "react";
import { usePathname } from "next/navigation";


import { BsFillChatDotsFill } from "react-icons/bs";
import { HiArrowLeftOnRectangle ,HiUsers} from "react-icons/hi2";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";


const useRoutes=()=>{
    const pathname=usePathname();
    const {conversationId}=useConversation()

    const routes=useMemo(()=>[
        {
            label:'Chat',
            href:'/conversation',
            icon:BsFillChatDotsFill,
            active:pathname === '/conversation' || !!conversationId
        },
        {
            label:'Users',
            href:'/users',
            icon:HiUsers,
            active:pathname === '/users' 
        },
        {
            label:'Logout',
            href:'#',
            icon:HiArrowLeftOnRectangle,
            onclick:()=>signOut()
        }
],[pathname,conversationId])
return routes;
}

export default useRoutes;

