import prisma from '@/app/libs/Prismadb'

const getMessages = async (
    conversationId:string
  ) => {
    try {
    //     let whereClause = {};
    // if (conversationId) {
    //   whereClause = {
    //     conversationId: conversationId,
    //   };
    // }   

    //   const messages = await prisma.message.findMany({
    //     where:whereClause,
    //     include: {
    //       sender: true,
    //       seen: true,
    //     },
    //     orderBy: {
    //       createdAt: 'asc'
    //     }
    //   });
  
    //   return messages;

    const messages=await prisma.message.findMany({
      where:{
        conversationId:conversationId 
      },
      include:{
        sender:true,
        seen:true
      },
      orderBy:{
        createdAt:'asc'
      }
    })

    return messages;
    } catch (error: any) {
      return [];
    }
  };

export default getMessages