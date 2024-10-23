import { ChangeEvent, useState } from 'react'
import cross from '../assets/cross.svg'
interface Props{
    setEditing:(editing:boolean)=>void
}

const ProfileEdit:React.FC<Props> = ({setEditing})=>{
    const [langauge , setLanguage] = useState<string>('')
    const [techStack , setTechStack] = useState<string>('')
    const [notification , setNotification] = useState<string>('')

    const handleSubmit = ()=>{
        
    }

    return(
        <div className="w-full h-full fixed top-0 left-0 bg-black/50 flex justify-center items-center" style={{zIndex:200}}>
            <div className="profile-edit-wrapper w-1/2 border-4 rounded-lg bg-white border-white relative flex justify-center"
            style={{ height:'60vh'}}>
                <img src={cross} alt="" className='absolute top-2 right-2' onClick={()=>{setEditing(false)}}/>

                <form className='flex flex-col justify-center items-center w-full' onSubmit={(e)=>{e.preventDefault()}}>
                <input type='text' className='w-3/4 border-2 border-black rounded-lg my-4 p-2'
                placeholder='Enter your New Language' onChange={(e:ChangeEvent<HTMLInputElement>)=>{setLanguage(e.target.value)}}/>
                
                <input type='text' className='w-3/4 border-2 border-black rounded-lg my-4 p-2'
                placeholder='Enter your New TechStack' onChange={(e:ChangeEvent<HTMLInputElement>)=>{setTechStack(e.target.value)}}/>
                
                <div className='flex flex-col items-start my-2'> 
                <label className='inline-flex items-center'>
                <input type='checkbox' name='notification' value='all' className='inline-block' 
                onChange={()=>{setNotification('ALL')}}/> 
                <span className='text-lg'>Allow All Notifications</span></label>

                <label className='inline-flex items-center'>
                <input type='checkbox' name='notification' value='imp' className='inline-block' 
                onChange={()=>{setNotification(notification=>notification+' IMP')}}/> 
                <span className='text-lg'>Allow Important Notifications</span></label>

                <label className='inline-flex items-center'>
                <input type='checkbox' name='notification' value='general' className='inline-block'  
                onChange={()=>{setNotification(notification=>notification+' GEN')}}/> 
                <span className='text-lg'>Allow General Notifications</span></label>

                <label className='inline-flex items-center'>
                <input type='checkbox' name='notification' value='chat' className='inline-block'  
                onChange={()=>{setNotification(notification=>notification+' CHAT')}}/> 
                <span className='text-lg'>Allow Chats Notifications</span></label>
                
                <label className='inline-flex items-center'>
                <input type='checkbox' name='notification' value='course' className='inline-block'  
                onChange={()=>{setNotification(notification=>notification+' COURSE')}}/> 
                <span className='text-lg'>Allow Course Notifications</span></label>
                </div>

                <input type='submit' value='Save' onClick={handleSubmit}
                className='text-center bg-red-600 text-white py-1 px-5 text-lg rounded-lg border-2 border-black mt-4'/>
            
                </form>    
            </div>
        </div>
    )
}
export default ProfileEdit