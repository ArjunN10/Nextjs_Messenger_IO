import prisma from '@/app/libs/Prismadb'
import getCurrentUser from './getCurrentUser'

const getConversations=async()=>{
    const currentUser=await getCurrentUser()

    if(!currentUser?.id){
        return []
    }

    try {
       const conversations=await prisma.conversation.findMany({
        orderBy:{
            lastMessageAt:'desc'     //oredr newly conversations on top 
        },
        where:{
            userIds:{
                has:currentUser.id   //Load every cov containing user(1-on-1 & group)
            }
        },
        include:{
            users:true,
            messages:{
                include:{
                    sender:true,
                    seen:true
                }
            }
        }
       }) 
       return conversations;
    } catch (error:any) {
        return []
        
    }
}
export default getConversations;