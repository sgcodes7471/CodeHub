import React from "react";
import { Messages } from "../context/chatContext";

interface Props { 
    message:Messages
}

const Message:React.FC<Props>=({message})=>{
    return(
        <>
        <div className="card message-card py-1 px-4 flex flex-col items-center justify-between"
        style={{backgroundColor:'white',width:'max-content'}}>
        <div className="message-sender-username flex justify-between w-full font-semibold mx-2 text-gray-500 text-sm">
            <span>{message.username}</span>
            <span>{message.timeSent}</span>
        </div>
        {
            message.attachmentType === 'image' && <img src={message.attachment} alt=""/>
        }
        <div className="text-lg w-full ">{message.message}</div>
        </div>
        </>
    )
}

export default Message