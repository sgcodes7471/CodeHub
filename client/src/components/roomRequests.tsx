import React, { useContext } from "react";
import { User, UserContext } from "../context/userContext";
import cross from '../assets/cross.svg'
import { ChatContext } from "../context/chatContext";

interface Props {
    list:User[]|[]|undefined,
    close:React.Dispatch<React.SetStateAction<boolean>>
}

const RoomRequestsList:React.FC<Props> = ({list,close})=>{

    const chatContext = useContext(ChatContext)
    const userContext = useContext(UserContext)
    if(!chatContext) throw new Error('Blah Blah bLha ...for now....')
    if(!userContext) throw new Error('Blah Blah bLha ...for now....')
    const { current } = chatContext
    const {user} = userContext

    return(
        <div className="bg-black bg-opacity-50 fixed top-0 left-0 flex items-center justify-center" style={{zIndex:200,width:'100vw' , height:'100vh'}}>
        <div className="card w-1/2 h-1/2 pt-10 relative" style={{backgroundColor:'white',overflowY:'scroll',borderRadius:'20px'}}>
        <img src={cross} alt="" className="fixed right-2 top-2" onClick={()=>{close(false)}}/>
        {
            list?.map((item:User,index:number)=>{
                return(
                    <div key={index} className="w-full py-2 px-8 text-xl flex items-center justify-between">
                        {item.username}
                        {current?.adminId === user?._id && 
                        <div>
                        <button className="text-sm px-2 py-1 border-2 rounded-lg bg-green-600 text-white">Accept</button>
                        <button className="text-sm px-2 py-1 border-2 rounded-lg bg-red-600 text-white">Reject</button>
                        </div>
                        }
                    </div>
                )
            })
        }
        </div>
        </div>
    )
}

export default RoomRequestsList