import { useState , ChangeEvent, useEffect} from 'react'
import cross from '../assets/cross.svg'

interface Props {
    close:React.Dispatch<React.SetStateAction<boolean>>
}

const NewRoom:React.FC<Props> = ({close})=>{

    const [issue , setIssue] = useState<string|null>('');
    const [room , setRoom] = useState<string>('');

    async function handleSubmit() {
        if(room.trim().length===0){
            setIssue('Room Name cannot be empty!')
        }
    }

    useEffect(()=>{
        const Timeout = setTimeout(()=>{
                setIssue(null);
            },4000)
            return()=>{clearTimeout(Timeout)}
    },[issue])

    return(
        <div className="w-full h-full fixed top-0 left-0 bg-black/50 flex justify-center items-center" style={{width:'100vw',zIndex:200}}>
            <div className="profile-edit-wrapper w-1/4 border-4 rounded-xl bg-white border-white relative flex justify-center"
            style={{ height:'30vh'}}>
            <img src={cross} alt="" className="absolute right-2 top-2" onClick={()=>{close(false)}}/>
        
            <form className='flex flex-col justify-center items-center w-full' onSubmit={(e)=>{e.preventDefault()}}>
            <input type='text' className='w-3/4 border-2 border-black rounded-lg my-4 p-2'
            placeholder='Enter your New Language' onChange={(e:ChangeEvent<HTMLInputElement>)=>{setRoom(e.target.value)}}/>
             <input type='submit' value='Create' onClick={handleSubmit}
            className='text-center bg-red-600 text-white py-1 px-5 text-lg rounded-lg mt-4'/>
            
            </form> 
        </div>
        </div>
    )
}

export default NewRoom