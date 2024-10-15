import React, { useState } from "react"
import edit from '../assets/edit.svg'
import ProfileEdit from "./profileEdit";

const ProfileCard:React.FC = ()=>{
    
    const [rotate , setRotate] = useState<boolean>(false);
    const [editing , setEditing] = useState<boolean>(false)

    const handleHover = (e:React.MouseEvent<HTMLDivElement>)=>{
        setRotate(true)
    }
    const stopHover = ()=>{
        setRotate(false)
    }

    return (
        <>
        <div className="flex justify-between relative" style={{margin:'5vh 5vw'}}>
            <div className="profile-info-wrapper w-1/2 flex flex-col justify-center px-16">
                <div className="text-2xl py-2 font-semibold">Username</div>
                <div className="text-2xl py-2 font-semibold">Tech Stack</div>
                <div className="text-2xl py-2 font-semibold">Language</div>
                <div className="text-2xl py-2 font-semibold">Contributions</div>
                <div className="absolute top-4 right-4">
                    <img src={edit} alt="" onClick={()=>{setEditing(true)}}/>
                </div>
            </div>
            <div className="profile-photo-wrapper w-1/2 flex justify-end">
                <div className="profile-photo border-4 border-gray bg-white" 
                style={{height:'300px',width:'300px',borderRadius:'100%',transition:'1s',transform:rotate?`rotateY(360deg)`:'rotateY(0)'}}
                onMouseEnter={handleHover} onMouseLeave={stopHover}>
                    {/* here img will come */}
                </div>
            </div>
        </div>
        {
            editing && <ProfileEdit setEditing={setEditing}/>
        }
        </>
    )
}

export default ProfileCard