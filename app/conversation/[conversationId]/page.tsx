import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";

import Body from "./componenets/Body";
import Header from "./componenets/Header";
import EmptySpace from "@/app/components/EmptySpace";
import Form from "./componenets/Form";

interface IParams{
    conversationId:string;
}


const ConversationId = async({params}:{params:IParams})=> {

    const conversation=await getConversationById(params.conversationId)
    const messages = await getMessages(params.conversationId);

    if (!conversation || !messages) {
        return (
          <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
              <EmptySpace />
            </div>
          </div>
        );
    }

    return (
    <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
            <Header conversation={conversation}/>
           <Body initialMessages={messages}/>
            <Form/>
        </div>
    </div>
    );
};

export default ConversationId;