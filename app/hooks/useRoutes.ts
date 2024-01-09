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
            label:'chat',
            href:'/conversation',
            icon:BsFillChatDotsFill,
            active:pathname === '/conversation' || !!conversationId
        }
],[pathname,conversationId])
return routes;
}

export default useRoutes;

