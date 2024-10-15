import React from "react";
import { Editor } from "@monaco-editor/react";

interface Props{
    setCode:(code:string)=>void , 
    setLanguage:(language:string)=>void , 
    language:string
}

const CodeEditor:React.FC<Props> = ({setCode , language , setLanguage})=>{
    return(
        <>
        <div className='lang-btn-wrapper flex w-full justify-center items-center'>
                    <div className='rounded-lg p-2 h-full mx-2 bg-white text-center cursor-pointer' onClick={()=>{setLanguage('cpp')}}
                    style={{width:'100px',backgroundColor:language==='cpp'?'rgb(70, 255, 150)':'white'}}>CPP</div>
                    <div className='rounded-lg p-2 h-full mx-2 bg-white text-center cursor-pointer' onClick={()=>{setLanguage('java')}}
                    style={{width:'100px',backgroundColor:language==='java'?'rgb(70, 255, 150)':'white'}}>Java</div>
                    <div className='rounded-lg p-2 h-full mx-2 bg-white text-center cursor-pointer' onClick={()=>{setLanguage('python')}}
                    style={{width:'100px',backgroundColor:language==='python'?'rgb(70, 255, 150)':'white'}}>Python</div>
                </div>
                <Editor 
                className='my-4'
                theme='vs-dark'
                height="40vh"
                width="100%"
                defaultLanguage={language}
                defaultValue=''
                onChange={(value)=>{
                    setCode(value || '')
                }}/>  
        </>
    )
}

export default CodeEditor