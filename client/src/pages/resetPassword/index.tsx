import { useEffect, useState , ChangeEvent} from "react";

export default function Reset(){

    const [password , setPassword] = useState<string>('');
    const [confPassword , setConfPassword] = useState<string>('');
    const [issue , setIssue] = useState<string|null>(null);

    useEffect(()=>{
        const Timeout = setTimeout(()=>{
            setIssue(null);
        },4000)
        return()=>{clearTimeout(Timeout)}
    },[issue])

    async function handleReset() {
        if(password.length === 0 || confPassword.length === 0){
            setIssue('Fields cannot be empty');
            return;
        }
        if(password !== confPassword){
            setIssue('Password should match confPassword');
            return;
        }
        
    }
    
    return(
        <div className="w-[100vw] h-[100vh] flex items-center justify-center">
            <div className="form-wrapper w-[40%]" style={{borderRadius:'14px',padding:'6px'}}>
                <div className="p-10" style={{borderRadius:'8px',background:'#fbfbfb'}}>
                <form className="flex flex-col items-center justify-center gap-6" onSubmit={(e)=>{
                    e.preventDefault();
                    handleReset();
                }}>
                    <input className="input border-2 border-blue-500 rounded-xl" type="password" placeholder="Enter your Password" 
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)}/>
                    <input className="input border-2 border-blue-500 rounded-xl" type="password" placeholder="Comfirm your Password" 
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>setConfPassword(e.target.value)}/>
                    <input type="submit" value='Register' className="w-[10vw] py-2 text-white cursor-pointer font-semibold rounded" 
                    style={{fontSize:'1.1rem',background:'rgb(58, 58, 255)'}}/>
                </form>
                <div className="text-blue-500 my-2 cursor-pointer">Already have an account?</div>
                <div className="text-red-500 text-left mt-2 h-[20px] font-semibold">{issue}</div>
                </div>
            </div>
        </div>
    )
}
    