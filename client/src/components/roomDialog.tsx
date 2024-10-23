import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import cross from '../assets/cross.svg'
import { ChatContext } from "../context/chatContext";

interface Props {
    close:React.Dispatch<React.SetStateAction<boolean>>,
    action : string
}

const RoomDialog:React.FC<Props> = ({close , action})=>{

    const chatContext = useContext(ChatContext)
    const userContext = useContext(UserContext)
    if(!chatContext) throw new Error('Blah Blah bLha ...for now....')
    if(!userContext) throw new Error('Blah Blah bLha ...for now....')
    const { current } = chatContext
    const {user} = userContext

    return(
        <div className="bg-black bg-opacity-50 fixed top-0 left-0 flex items-center justify-center" style={{zIndex:200,width:'100vw' , height:'100vh'}}>
        <div className="card w-1/4 h-1/4 pt-10 relative flex flex-col items-center justify-evenly" style={{backgroundColor:'white',overflowY:'scroll',borderRadius:'20px'}}>
        <img src={cross} alt="" className="fixed right-2 top-2" onClick={()=>{close(false)}}/>
            <p className="text-xl">Sure you want to {action} this?</p>
            <button className="text-lg w-1/4 px-2 py-1 border-2 rounded-lg bg-red-600 text-white">Proceed</button>
        </div>
        </div>
    )
}

export default RoomDialog