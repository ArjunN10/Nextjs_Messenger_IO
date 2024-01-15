
interface IParams{
    conversationId:string;
}


const ConversationId = async({params}:{params:IParams})=> {
    return (
        <div>
           conversation Id
        </div>
    );
}

export default ConversationId;