import React, { useState } from "react";
import search from '../assets/search.svg'
import NewRoom from "./newRoom";

const RoomSearch:React.FC=()=>{
    const [key , setKey] = useState<string>("")
    const [create , setCreate] = useState<boolean>(false);
    return(
        <>
        {create && <NewRoom close={setCreate}/>}
        <div className="card flex flex-col border-2 border-white justify-center rounded-lg px-3 relative"
        style={{overflowX:"hidden" , height:'70vh', width:'20vw' , borderRadius:'20px' , zIndex:'0'}}>
            <div className="fixed top-0 mt-4 flex justify-between items-center">
            <input type="text" placeholder="Type here..." className="card px-4 py-2 " 
            style={{backgroundColor:'white',width:'16vw'}} onChange={(e)=>{setKey(e.target.value)}}/>
            <img src={search} alt=""/>
            </div>
            <button className="px-6 py-2 fixed bottom-0 mb-4 text-xl text-white font-semibold rounded bg-red-500" 
            onClick={()=>setCreate(true)}>New Room</button>
        </div>

        </>
    )
} 

export default RoomSearch