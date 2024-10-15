import trash from '../assets/trash.svg'
import group from '../assets/group.svg'
import { useState } from 'react'

interface Room{
    id:string,
    profile:string,
    name:string,
    read:boolean
}

interface Prop{
    room:Room
}

const ChatLogs:React.FC<Prop>=({room})=>{

    const [seeParticipant , setSeeParticipant] = useState<boolean>(false)
    const [seeRequests , setSeeRequests] = useState<boolean>(false)

    return(
        <div className="flex flex-col">
            <div className="flex justify-between w-full p-2 bg-gray">
                <img src={room.profile} alt=""/>
                <div className="flex justify-evenly">
                    <img src={trash} alt='DEL'/>
                    <img src={group} alt='' onClick={()=>{setSeeParticipant(!seeParticipant)}}/>
                </div>
            </div>
        </div>
    )
}

export default ChatLogs