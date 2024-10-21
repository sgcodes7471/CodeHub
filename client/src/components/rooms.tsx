import React, { useContext } from "react";
import RoomCard from "./roomCard";
import { ChatContext , Room} from "../context/chatContext";

const Rooms:React.FC=()=>{

    const context = useContext(ChatContext)
    if(!context) throw new Error('Blah Blah bLha ...for now....')
    const {rooms} = context

    

    return(
        <div className="flex flex-col border-2 border-white rounded-lg px-3 w-1/4" 
        style={{overflowY:'scroll', height:'70vh'}}>
            {
                rooms.map((room:Room)=>{
                    return(
                        <RoomCard room={room}/>
                    )
                })
            }
        </div>
    )
}

export default Rooms