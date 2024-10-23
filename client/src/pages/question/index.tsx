import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import trash from '../../assets/trash.svg'
import edit from '../../assets/edit.svg'
import { UserContext } from "../../context/userContext";
import RoomDialog from "../../components/roomDialog";
import { Editor } from "@monaco-editor/react";

export interface Question {
    _id:string,
    tags:string[],
    userId:string,
    username:string,
    headline:string,
    statement:string,
    code:string,
    language:string,
    upvotes:number,
    date:string
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
                tags:['tag1'],
                userId:"1",
                username:"srinjoy",
                headline:"headline",
                statement:"statement",
                code:"",
                language:"",
                upvotes:123,
                date:"22-10-2024"
            }
            setTimeout(()=>{
                setQuestion(q)
            },1000)
        }
        getQuestion()
    },[])
    return(
        <>
        {editing }
        {del && <RoomDialog action="Delete" close={setDelete}/>}
        <div className="page-wrapper">
            <div>{question?.headline}</div>
            <div>
                <div>
                    Posted by <span>{question?.username}</span> on <span>{question?.date}</span>
                </div>
                {question?.userId === user?._id &&<div>
                <img src={trash} alt="EDIT" onClick={()=>{setEditing(true)}}/>
                <img src={edit} alt="DEL" onClick={()=>{setDelete(true)}}/>
                </div>}
            </div>
            <div>
                {question?.statement}
            </div>

            {question?.code !== '' && 
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
        </div>
        </>
    )
}

export default Question