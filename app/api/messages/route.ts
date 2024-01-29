import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/Prismadb"
import { pusherServer } from "@/app/libs/pusher";


export async function POST(
    request:Request
){
    try {
        const currentUser=await getCurrentUser()
        const body=await request.json()
        const{
            message,
            image,
            conversationId
        }=body;

        if(!currentUser?.id || !currentUser?.email){
            return new NextResponse("Unauthorized",{status:401})

        }


        //create new message in db
        const newMessage=await prisma?.message.create({
            data:{
                body:message,
                image:image,
                converstion:{
                    connect:{
                        id:conversationId
                    }
                },
                sender:{
                    connect:{
                        id:currentUser.id
                    }
                },
                seen:{
                    connect:{
                        id:currentUser.id
                    }
                }
            },
            include:{
                seen:true,
                sender:true
            }
        })



        //use during pushers
        const updatedConversation=await prisma?.conversation.update({
            where:{
                id:conversationId
            },
            data:{
                lastMessageAt:new Date(),
                messages:{
                    connect:{
                        id:newMessage?.id
                    }
                }
            },
            include:{
                users:true,
                messages:{
                    include:{
                        seen:true
                    }
                }
            }
        })

        await pusherServer.trigger(conversationId,'messages:new',newMessage)  //channel is conversationId for newmessage

        const lastMessage=updatedConversation.messages[updatedConversation.messages.length -1]

        updatedConversation.users.map((user)=>{
            pusherServer.trigger(user.email!,'conversation:update',{
                id:conversationId,
                messages:[lastMessage]
            })
        })

        return NextResponse.json(newMessage)
    } catch (error:any) {
        console.log(error,"ERROR_MESSAGES")
        return new NextResponse('InternalError',{status:500})
    }
}