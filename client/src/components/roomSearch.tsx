import React, { useState } from "react";
import search from '../assets/search.svg'

const RoomSearch:React.FC=()=>{
    const [key , setKey] = useState<string>("")
    return(
        <div className="card flex flex-col border-2 border-white justify-center rounded-lg px-3 relative"
        style={{overflowX:"hidden" , height:'70vh', width:'20vw' , borderRadius:'20px' , zIndex:'0'}}>
            <div className="fixed top-0 mt-4 flex jutsify-between items-center">
            <input type="text" placeholder="Type here..." className="card px-4 py-2 " 
            style={{backgroundColor:'white',width:'16vw'}} onChange={(e)=>{setKey(e.target.value)}}/>
            <img src={search} alt=""/>
            </div>
            
        </div>
    )
} 

export default RoomSearch