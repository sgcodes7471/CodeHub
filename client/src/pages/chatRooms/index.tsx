import ChatArea from "../../components/chatArea.js"
import Rooms from "../../components/rooms"
import RoomSearch from "../../components/roomSearch.js"

const ChatRoom:React.FC=()=>{
    return(
        
        <div className="page-wrapper flex justify-between" >
            <Rooms/>
            <ChatArea/>
            <RoomSearch/>
        </div>
    )
}
export default ChatRoom