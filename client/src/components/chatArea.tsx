import React, { useContext, useEffect, useState } from "react";
import { ChatContext , Messages } from "../context/chatContext";
import { UserContext  } from "../context/userContext";
import group from '../assets/group.svg'
import request from '../assets/request.svg'
import send from '../assets/send.svg'
import trash from '../assets/trash.svg'
import leave from '../assets/leave.svg'
import Message from "./message";
import RoomParticipantsList from "./roomParticipants";
import RoomRequestsList from "./roomRequests";
import RoomDialog from "./roomDialog";

const ChatArea:React.FC = ()=>{

    const chatContext = useContext(ChatContext)
    const userContext = useContext(UserContext)
    if(!chatContext) throw new Error('Blah Blah bLha ...for now....')
    if(!userContext) throw new Error('Blah Blah bLha ...for now....')
    const { current , messages} = chatContext
    const {user} = userContext
    const [participants , openParticipants] = useState<boolean>(false)
    const [requests , openRequests]  = useState<boolean>(false)
    const [leaves , openLeaves]=useState<boolean>(false)
    const [del , openDel]=useState<boolean>(false)
    const [newMessage , setNewMessage] = useState<Messages | null>(null)

    useEffect(()=>{
        console.log(newMessage)
    },[newMessage])

    async function handleSend(){
        //socket part
    }

    return(
        <>
        {participants && <RoomParticipantsList list={current?.participants} close={openParticipants}/>}
        {requests && <RoomRequestsList list={current?.requests} close={openRequests}/>}
        {leaves && <RoomDialog close={openLeaves} action="Leave"/>}
        {del && <RoomDialog close={openDel} action="Delete"/>}
        <div className="card flex flex-col border-2 border-white justify-center rounded-lg px-3 relative"
        style={{overflowX:"hidden" , height:'70vh', width:'45vw' , borderRadius:'20px'}}>
            {!current? 
            <div className="font-semibold text-xl flex w-full h-full items-center justify-center">Open a Chat</div>
            :
            <>
            <div className="card header-chat-area mt-4 fixed top-0 py-4 px-4 flex items-center justify-between"
            style={{backgroundColor:'white' , width:'95%'}}>
                <div className="header-room-name text-xl font-semibold flex items-center gap-2">
                    <img className="flex justify-center items-center bg-blue-500 text-xl" 
                    style={{width:'50px',height:'50px',borderRadius:'100%'}} src={current?.profile}/>
                    {current?.name}
                </div>
                <div className="flex justify-between gap-2">
                    <img src={group} alt="" onClick={()=>{openParticipants(true)}}/>
                    <img src={leave} alt="" onClick={()=>{openLeaves(true)}}/>
                    {current.adminId === user?._id && <img src={request} alt="" onClick={()=>{openRequests(true)}}/>}
                    {current.adminId === user?._id && <img src={trash} alt="" onClick={()=>{openDel(true)}}/>}
                </div>
            </div>

            <div className="flex flex-col "
            style={{overflowX:"scroll" , zIndex:'-2' , height:'70%' , justifyContent:'flex-end'}}>
            {
                messages.map((message:Messages , index:number)=>{
                    return(
                        <div key={index} className="flex my-1" 
                        style={{justifyContent:user?._id === message.senderId?"right":"left"}}>
                            <Message message={message}/>
                        </div>
                    )
                })
            }
            </div>
            


            <div className="flex justify-between fixed bottom-2 items-center gap-2" style={{width:'98%'}}>
            <input type="text" placeholder="Type here..." className="card px-4 py-2 " 
            style={{backgroundColor:'white',width:'42vw'}} onChange={(e)=>{setNewMessage({
                _id:'',
                roomId:current?._id,
                timeSent:`${Date.now}`,
                senderId:user?._id,
                message:e.target.value,
                attachment:"",
                attachmentType:null,
                username:user?.username,
                reactions:[]
            })}}/>
            <img src={send} alt="" style={{transform:'rotateZ(-60deg)'}} onClick={handleSend}/>
            </div>
            </> 
            }
            
        </div></>
    )
}
export default ChatArea