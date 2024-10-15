import React, { useEffect, useState } from 'react'
import './style.css'
import CodeEditor from '../../components/code'

const AddQuestion:React.FC = ()=>{
    const [title , setTitle] = useState<string>('')
    const [statement , setStatement] = useState<string>('')
    const [code , setCode] = useState<string>('')
    const [tags , setTags] = useState<string>('')
    const [language , setLanguage] = useState<string>('cpp')

    const handleSubmit = ()=>{
        [title , statement ].some((field:string)=>{
            console.log(field)
            if(!field){
                alert('All fields are necessary')
                return true
            } 
            return false
        })
    }

    return(
        <div className='page-wrapper'>
            <form className='flex flex-col justify-center items-start w-full' onSubmit={(e)=>{
                e.preventDefault()
            }}>
                <input className='w-3/4 border-2 rounded-lg my-4 p-2' type='text' 
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setTitle(e.target.value)}}
                name='title' placeholder='Enter the Title of the Question'/>

                <textarea className='w-full border-2 rounded-lg my-4 p-2' 
                onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{setStatement(e.target.value)}}
                style={{height:'30vh'}} name='statement' placeholder='Enter the Statement of the Question'/>
                <CodeEditor setCode={setCode} setLanguage={setLanguage}  language={language}/>

                <input className='w-3/4 border-2 rounded-lg my-4 p-2' 
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setTags(e.target.value)}}
                type='text' name='title' placeholder='Enter the Tags of the Question, separated by space' />
                
                <input type='submit' value='Add Question' onClick={handleSubmit}
                className='text-center bg-red-600 text-white text-xl p-2 rounded-lg border-2 border-black '/>
            </form>
        </div>
    )
}

export default AddQuestion