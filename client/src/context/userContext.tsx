import React, {createContext, useState , ReactNode, useEffect} from 'react'

export interface User {
    _id:string,
    username:string,
    techStack:string,
    language:string,
}

interface UserContextProps {
    user:User|null,
    setUser: React.Dispatch<React.SetStateAction<User|null>>
}

interface UserContextProviderProps {
    children :ReactNode
}

export const UserContext = createContext<UserContextProps|undefined>(undefined)
export const UserContextProvider = ({children}:UserContextProviderProps)=>{
    const [user , setUser] = useState<User | null>(null)
    useEffect(()=>{
        const u:User = {
            _id:'1',
            username:"srinjoy",
            techStack:"TypeScript,MERN,Next",
            language:'Java'
        }
        setUser(u)
    },[])
    return(
        <UserContext.Provider value={{user , setUser}}>
            {children}
        </UserContext.Provider>
    )
}