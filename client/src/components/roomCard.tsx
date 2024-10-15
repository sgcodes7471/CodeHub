import React, { useState } from "react";

interface Prop{
    room:{
        id:string,
        profile:string,
        name:string,
        read:boolean
    }
}

const RoomCard:React.FC<Prop>=({room})=>{
    const [opened , setOpened] = useState<string>()
    
    return(
        <div className="flex items-center justify-betweem py-2 px-2 rounded-lg w-1/2" 
        onClick={()=>{setOpened(room.id)}} style={{backgroundColor:opened?'rgb(152, 255, 118)':'white'}}>
                <div className="flex flex-col items-start justify-center">
                    <div className="text-xl">{room.name}</div>
                    <div className="text-lg text-green-500">{room.read && 'New Message'}</div>
                </div>
                <img src={room.profile} alt=""/>
        </div>
    )
}

export default RoomCard