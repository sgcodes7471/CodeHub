import ChatArea from "../../components/chatArea.js"
import Rooms from "../../components/rooms"
import { ChatContextProvider } from "../../context/chatContext.js"

const ChatRoom:React.FC=()=>{
    return(
        <ChatContextProvider>
        <div className="page-wrapper flex justify-between" >
            <Rooms/>
            <ChatArea/>
        </div>
        </ChatContextProvider>
    )
}
export default ChatRoom