import { useContext,useEffect,useState } from "react";
import { Comment } from "../pages/question";
import { UserContext } from "../context/userContext";
import trash from '../assets/trash.svg'
import edit from '../assets/edit.svg'
import like from '../assets/like.svg'
import RoomDialog from "./roomDialog";

interface Props{
    data:Comment
}

const CommentCard:React.FC<Props>=({data})=>{
    const [comment, setComment] = useState<Comment>();
    useEffect(()=>{
        setComment(data)
    },[])
    const userContext = useContext(UserContext);
    const [editing , setEditing] = useState<boolean>(false)
    const [del , setDelete] = useState<boolean>(false)
    if(!userContext) throw new Error('Blah Blah Blah....')
    const {user} = userContext


    return(
        <>
        {editing }
        {del && <RoomDialog action="Delete" close={setDelete}/>}
        <div className="w-full border-2 rounded border-black my-2 p-2">
            <div className="text-gray-500 font-bold text-xs">{comment?.username} said</div>
            <div>{comment?.statement}</div>
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <img src={like} alt="LIKE" style={{width:'18px'}}/>
                    {comment?.userId===user?._id && <img src={edit} alt="EDIT" style={{width:'18px'}} onClick={()=>{setEditing(true)}}/>}
                    {comment?.userId===user?._id && <img src={trash} alt="DEL" style={{width:'18px'}} onClick={()=>{setDelete(true)}}/>}
                </div>
                <div className="text-right w-full text-gray-500 font-bold text-xs">{comment?.date}</div>
            </div>
        </div>
        </>
    )
}

export default CommentCard