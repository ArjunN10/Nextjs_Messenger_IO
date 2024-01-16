import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptySpace from "@/app/components/EmptySpace";
import Header from "./componenets/Header";
import Body from "./componenets/Body";
import Form from "../[conversationId]/componenets/Form";

interface IParams{
    conversationId:string;
}


const ConversationId = async({params}:{params:IParams})=> {

    const conversation=await getConversationById(params.conversationId)
    const messages=await getMessages(params.conversationId)

    if (!conversation) {
        return (
          <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
              <EmptySpace />
            </div>
          </div>
        )
    }

    return (
    <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
            <Header conversation={conversation}/>
            <Body/>
            <Form/>
        </div>
    </div>
    );
}

export default ConversationId;