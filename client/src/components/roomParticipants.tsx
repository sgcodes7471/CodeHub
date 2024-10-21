import React from "react";
import { User } from "../context/userContext";

interface Props {
    list:User[]
}

const RoomParticipantsList:React.FC<Props> = ({list})=>{
    return(
        <div className="card" style={{width:'40vw' , background:'white' , height:'20vh'}}>
        {
            list.map((item:User,index:number)=>{
                return(
                    <>

                    </>
                )
            })
        }
        </div>
    )
}

export default RoomParticipantsList