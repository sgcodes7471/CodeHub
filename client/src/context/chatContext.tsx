import React, {createContext, useState , ReactNode, useEffect} from 'react'
import { User } from './userContext.tsx'

interface Reactions{
    reactor:string,
    reaction:string
}

export interface Messages {
    roomId:string,
    _id:string,
    message:string,
    senderId:string|undefined,
    attachment:string,
    attachmentType:string|null
    timeSent:string,
    username:string|undefined,
    reactions:[Reactions] | []
}


export interface Room {
    _id:string,
    profile:string,
    adminId:string,
    subAdminId:string|null|undefined,
    name:string,
    chats:Messages[]|[],
    participants:[User]|[],
    requests:[User]|[],
    read:boolean
}


export interface ChatContextProps {
    opened : string,
    current : Room | null,
    setCurrent : React.Dispatch<React.SetStateAction<Room | null>>
    setOpened : React.Dispatch<React.SetStateAction<string>>
    messages: Messages[]|[],
    setMessages : React.Dispatch<React.SetStateAction<Messages[]|[]>>,
    setRooms : React.Dispatch<React.SetStateAction<Room[]|[]>>,
    rooms : Room[] | [],
}

interface ChatContextProviderProps {
    children :ReactNode
}

export const ChatContext = createContext<ChatContextProps|undefined>(undefined)
export const ChatContextProvider = ({children}:ChatContextProviderProps)=>{
    const [opened , setOpened] = useState<string>("")
    const [current , setCurrent] = useState<Room | null>(null)
    const [messages ,  setMessages] = useState<Messages[]|[]>([])
    const [rooms, setRooms] = useState<Room[]|[]>([])

    useEffect(()=>{
        const r:Room[]|[] = [
            {_id : "1" , profile:"" , adminId:"1" , subAdminId:"" , name:"Room1" , chats:[
                {roomId:"1",
                _id:"1",
                message:"Testfjrheoiufhreiugheruig heriu",
                senderId:"1",
                attachment:"",
                attachmentType:null,
                timeSent:"22-10-2024 00:05",
                username:"username",
                reactions:[]},
                {roomId:"1",
                _id:"1",
                message:"Testfjrheoiufhreiugheruig heriu",
                senderId:"2",
                attachment:"",
                attachmentType:null,
                timeSent:"22-10-2024 00:27",
                username:"username",
                reactions:[]},
                {roomId:"1",
                _id:"1",
                message:"Test fjrheoi ufhreiug heruig heriu",
                senderId:"1",
                attachment:"",
                attachmentType:null,
                timeSent:"22-10-2024 00:45",
                username:"username",
                reactions:[]},

            ] , participants:[] , requests:[] , read:false},
            {_id : "2" , profile:"" , adminId:"1" , subAdminId:"" , name:"Room2" , chats:[] , participants:[] , requests:[] , read:false},
            {_id : "3" , profile:"" , adminId:"" , subAdminId:"" , name:"Room3" , chats:[] , participants:[] , requests:[] , read:true},
            {_id : "4" , profile:"" , adminId:"" , subAdminId:"" , name:"Room4" , chats:[] , participants:[] , requests:[] , read:false},
            {_id : "5" , profile:"" , adminId:"" , subAdminId:"" , name:"Room5" , chats:[] , participants:[] , requests:[] , read:true},
            {_id : "6" , profile:"" , adminId:"" , subAdminId:"" , name:"Room6" , chats:[] , participants:[] , requests:[] , read:false},
            {_id : "7" , profile:"" , adminId:"" , subAdminId:"" , name:"Room7" , chats:[] , participants:[] , requests:[] , read:false}
        ]
        setRooms(r)

    },[])
    
    return(
        <ChatContext.Provider value={{opened , current , setCurrent , setOpened , messages , setMessages , rooms , setRooms}}>
            {children}
        </ChatContext.Provider>
    )
}