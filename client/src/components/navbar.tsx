import { useContext, useState } from 'react';
import '../styles/navbar.css'
import down from '../assets/down.svg'
import up from '../assets/up.svg'
import profile from '../assets/profile.svg'
import search from '../assets/search.svg'
import add from '../assets/add.svg'
import { useNavigate } from 'react-router-dom';
import RoomDialog from './roomDialog';
import { UserContext } from '../context/userContext';

const Navbar:React.FC = ()=>{
    
    const [drop , setDrop] = useState<boolean>(false)
    const [searchKey , setSearchKey] = useState<string>('')
    const [emptySearch , setEmptySearch] = useState<boolean>(false);
    const [logout , setLogout] = useState<boolean>(false);
    const userContext = useContext(UserContext);
    if(!userContext) throw new Error('Blah Blah bLha ...for now....')
    const {user} = userContext;
    const fields:string[] = user?["Home" , "ChatRoom" , "Calender" , "Code-Editor" , "LogOut"]:['Login' , 'Register'];
    const navigate = useNavigate()

    async function handleSearch() {
        if(searchKey===''){
            setEmptySearch(true);
            const TimeOut = setTimeout(()=>{
                setEmptySearch(false);
            },3000)
            return ()=>clearTimeout(TimeOut);
        }   
    }

    async function  handleLogOut() {
        setLogout(true);
    }

    return(
        <>
        {logout && <RoomDialog close={setLogout} action='Log Out'/>}
        <div className='navbar-outer-wrapper relative'>
        <div className="navbar-inner-wrapper flex justify-center my-2 mx-48 py-4">
            <ul className="flex list-none w-full justify-around">
                {
                    fields.map((field:string , index:number)=>{
                        return (
                            <li key={index} onClick={()=>{
                                index!=4 && navigate(`${field}`)
                                index===4 && handleLogOut()
                            }}
                            className="text-white cursor-pointer hover:font-semibold rounded-lg transition duration-200">{field}</li>
                        )
                    })
                }
            </ul>
        </div>
        { user && 
        <>
        <div className='navbar-drop-down w-10 h-10 absolute top-0 my-2 flex flex-col justify-around items-center' 
        style={{borderRadius:'100%',zIndex:'300'}} onClick={()=>{setDrop(!drop)}}>
                <img src={!drop?down:up} alt="" className='w-6'/>
        </div>
        { 
            [search , profile , add].map((url , index)=>{
                return(
                    <div className='navbar-drop-down w-10 h-10 absolute my-2 flex flex-col justify-around items-center transition duration-500' 
                    style={{borderRadius:'100%',transform:drop?`translateY(${3*index}rem)`:'translateY(-3rem)',opacity:drop?1:0,zIndex:'200'}}
                    onClick={()=>{
                        index!=0 && navigate(index===1?'/Profile':(index===2?'/Add-Question':''))
                        index==0 && handleSearch()
                        }}>
                        <img src={url} alt="" className='w-6'/>
                    </div>
                )
            })
        }
        </>
        }

        <div className='flex justify-center w-full absolute my-2' style={{top:'3.2rem'}}>
            <input type='text' placeholder='Search here...' 
            style={{opacity:drop?1:0,transform:`translateY(${drop?'20px':'0'})`,transition:'0.5s',borderColor:emptySearch?'red':'white'}}
            className='w-1/2 h-10 px-4 py-2 bg-white border-2 border-white rounded-full' 
            onChange={(e)=>setSearchKey(e.target.value)}/>
        </div>
        </div>
        </>
 )
}

export default Navbar
