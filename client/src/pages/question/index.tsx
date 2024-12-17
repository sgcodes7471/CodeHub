import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import trash from '../../assets/trash.svg'
import edit from '../../assets/edit.svg'
import like from '../../assets/like.svg'
import { UserContext } from "../../context/userContext";
import RoomDialog from "../../components/roomDialog";
import { Editor } from "@monaco-editor/react";
import CommentCard from "../../components/commentCard";

export interface Comment {
    _id:string,
    userId:string,
    username:string,
    upvotes:number,
    statement:string,
    date:string,
}

export interface Question {
    _id:string,
    tags?:string[],
    userId:string,
    username:string,
    headline:string,
    statement:string,
    code?:string,
    language?:string,
    upvotes:number,
    views:number,
    date:string,
    comments:Comment[],
}

const Question:React.FC = ()=>{
    const  {qid} = useParams()
    const [question , setQuestion] = useState<Question | null>(null)
    const [editing , setEditing] = useState<boolean>(false)
    const [del , setDelete] = useState<boolean>(false)
    const userContext = useContext(UserContext)
    if(!userContext) throw new Error('Blah Blah Blah....')
    const {user} = userContext

    useEffect(()=>{
        const getQuestion = async()=>{
            const q = {
                _id:"1",
                userId:"1",
                username:"srinjoy",
                headline:"headline",
                statement:"statemen eiweoiu oif oiwref ouriwfh iurhuorwhf ior uiwrfiowelkhieof209eibv ihefvnfdjvb erb uhvir eoqpvb oddhoivef iofu3bv oriufwif hvbefhvbfeuivei uohfbreiut",
                views:12345,
                upvotes:123,
                date:"22-10-2024",
                comments:[{_id:'1',userId:'2',username:'C',upvotes:123,statement:'Kuch bhi bc',date:"22-10-2024"},
                    {_id:'2',userId:'1',username:'srinjoy',upvotes:432,statement:'hain bc',date:"23-10-2024"},
                    {_id:'3',userId:'4',username:'gulu',upvotes:432,statement:'haat bc',date:"23-10-2024"},
                ]
                //use genContext for this one
            }
            setTimeout(()=>{
                setQuestion(q)
            },1000)
        }
        getQuestion()
    },[])

    if(!question) return(
        <div className="flex w-100 h-100 text-center justify-center items-center text-white text-4xl font-bold">
        <span>Loading...</span>
       </div>
    )

    return(
        <>
        {editing }
        {del && <RoomDialog action="Delete" close={setDelete}/>}
        <div className="page-wrapper">
            <div className="w-full border-2 rounded-lg my-4 p-2 bg-white text-2xl font-semibold">{question?.headline}</div>
            <div className="flex justify-between items-start">
                <div className="text-white font-semibold">
                    Posted by <span>{question?.username}</span> on <span>{question?.date}</span>
                </div>
                <div className="flex p-2 bg-white rounded-xl gap-3">
                {question?.userId===user?._id && <img src={edit} alt="EDIT" style={{width:'25px'}} onClick={()=>{setEditing(true)}}/>}
                {question?.userId===user?._id && <img src={trash} alt="DEL" style={{width:'25px'}} onClick={()=>{setDelete(true)}}/>}
                <img src={like} alt="LIKE" style={{width:'25px'}}/>    
                </div>
            </div>
            <div className="w-full border-2 rounded-lg my-4 p-2 bg-white text-lg font-md" style={{height:'max-content'}}>
                {question?.statement}
            </div>

            {question?.code!==undefined && 
            <div>
            <Editor 
                className='my-4'
                theme='vs-dark'
                height="40vh"
                width="100%"
                defaultLanguage={question?.language}
                defaultValue={question?.code}
                />  
            </div>}  
            <div className="p-3 bg-white w-full rounded-lg font-semibold flex-col" style={{height:'max-content'}}>
                <div className="text-2xl ">Comments</div>
                {question?.comments?.length!=0 &&
                    question?.comments.map((comment:Comment,index:number)=>{
                        return(
                            <CommentCard data={comment} key={index}/>
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}

export default Question