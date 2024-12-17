import { useNavigate } from "react-router-dom";
import { useEffect, useState , ChangeEvent} from "react";

export default function Login(){

    const [email , setEmail] = useState<string>('');
    const [password , setPassword] = useState<string>('');
    const [issue , setIssue] = useState<string|null>(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const Timeout = setTimeout(()=>{
            setIssue(null);
        },4000)
        return()=>{clearTimeout(Timeout)}
    },[issue])

    async function handleLogin() {
        if(email.length === 0 || password.length === 0 ){
            setIssue('Fields cannot be empty');
            return;
        }
        
    }
    
    return(
        <div className="w-[100vw] h-[100vh] flex items-center justify-center">
            <div className="form-wrapper w-[40%]" style={{borderRadius:'14px',padding:'6px'}}>
                <div className="p-10" style={{borderRadius:'8px',background:'#fbfbfb'}}>
                <form className="flex flex-col items-center justify-center gap-6" onSubmit={(e)=>{
                    e.preventDefault();
                    handleLogin();
                }}>
                    <input className="input border-2 border-blue-500 rounded-xl" type="email" placeholder="Enter your Email" 
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)}/>
                    <input className="input border-2 border-blue-500 rounded-xl" type="password" placeholder="Enter your Password" 
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)}/>
                    <input type="submit" value='Login' className="w-[10vw] py-2 text-white cursor-pointer font-semibold rounded" 
                    style={{fontSize:'1.1rem',background:'rgb(58, 58, 255)'}}/>
                </form>
                <div className="text-blue-500 my-2 cursor-pointer" onClick={()=>{navigate('/Register')}}>Already have an account?</div>
                <div className="text-blue-500 my-2 cursor-pointer" onClick={()=>{navigate('/Forgot-Password')}}>Forgot Password?</div>
                <div className="text-red-500 text-left mt-2 h-[20px] font-semibold">{issue}</div>
                </div>
            </div>
        </div>
    )
}