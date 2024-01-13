"use client"

import clsx from "clsx"
import useConversation from "../hooks/useConversation"
import EmptySpace from "../components/EmptySpace"

const Home=()=>{
    const {isOpen}=useConversation();

    return(
        <div className={clsx(`lg:pl-80
        h-full
        lg:block`,
        isOpen?'black':'hidden'
        )}>
            <EmptySpace/>
        </div>
    )
}

export default Home