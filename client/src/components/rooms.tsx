import React, { useState } from "react";
import RoomCard from "./roomCard";

interface Room{
        id:string,
        profile:string,
        name:string,
        read:boolean
}

const Rooms:React.FC=()=>{
    const [rooms , setRooms] = useState<Room[]>([])

    return(
        <div className="flex flex-col">
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