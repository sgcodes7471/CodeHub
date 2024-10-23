import { useState } from 'react';
import '../styles/navbar.css'
import down from '../assets/down.svg'
import up from '../assets/up.svg'
import profile from '../assets/profile.svg'
import search from '../assets/search.svg'
import add from '../assets/add.svg'
import { useNavigate } from 'react-router-dom';

const Navbar:React.FC = ()=>{
    
    const [drop , setDrop] = useState<boolean>(false)
    const fields:string[] = ["Home" , "ChatRoom" , "Calender" , "Courses" , "Code Editor" , "Log Out"];
    const navigate = useNavigate()

    return(
        <div className='navbar-outer-wrapper relative'>
        <div className="navbar-inner-wrapper flex justify-center my-2 mx-48 py-4">
            <ul className="flex list-none w-full justify-around">
                {
                    fields.map((field:string , index:number)=>{
                        return (
                            <li key={index} onClick={()=>{navigate(`${field}`)}}
                            className="text-gray-800 cursor-pointer hover:text-black rounded-lg transition duration-200">{field}</li>
                        )
                    })
                }
            </ul>
        </div>

        <div className='navbar-drop-down w-10 h-10 absolute top-0 my-2 flex flex-col justify-around items-center' 
        style={{borderRadius:'100%',zIndex:'100'}} onClick={()=>{setDrop(!drop)}}>
                <img src={!drop?down:up} alt="" className='w-6'/>
        </div>
        { 
            [search , profile , add].map((url , index)=>{
                return(
                    <div className='navbar-drop-down w-10 h-10 absolute my-2 flex flex-col justify-around items-center transition duration-500' 
                    style={{borderRadius:'100%',transform:drop?`translateY(${3*index}rem)`:'translateY(-3rem)',opacity:drop?1:0,zIndex:'200'}}
                    onClick={()=>{navigate(index===1?'/Profile':(index===2?'/Add-Question':''))}}>
                        <img src={url} alt="" className='w-6'/>
                    </div>
                )
            })
        }

        <div className='flex justify-center w-full absolute my-2' 
        style={{top:'3.2rem'}}>
            <input type='text' placeholder='Search here...' style={{opacity:drop?1:0,transform:`translateY(${drop?'20px':'0'})`,transition:'0.5s'}}
            className='w-1/2 h-10 px-4 py-2 bg-white border-2 border-white rounded-full'/>
        </div>
        </div>
 )
}

export default Navbar
