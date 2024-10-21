import React, { useContext, useEffect } from "react";
import { ChatContext , Room } from "../context/chatContext";

interface Prop{
    room:Room
}

const RoomCard:React.FC<Prop>=({room})=>{
    
    const context = useContext(ChatContext)
    if(!context) throw new Error('ChatContext must be used within a ChatContextProvider')
    const {opened , setOpened , setMessages , setCurrent} = context
    useEffect(()=>{
        console.log(opened)
    },[opened])

    const handleClick = ()=>{
        setOpened(room._id)
        setCurrent(room)
        setMessages(room.chats)
    }
    
    return(
        <div className="flex items-center justify-between py-2 px-4 my-2 rounded-lg w-full" 
        onClick={handleClick} style={{backgroundColor:opened===room._id?'rgb(152, 255, 118)':'white'}}>
                <div className="flex flex-col items-start h-full">
                    <div className="text-xl font-semibold">{room.name}</div>
                    <div className="text-sm font-bold text-green-500">{!room.read?'New Message':'   '}</div>
                </div>
                <div className="flex justify-center items-center bg-blue-500" style={{width:'50px',height:'50px',borderRadius:'100%'}}>
                <img src={room.profile} alt=""/>
                </div>
        </div>
    )
}

export default RoomCard