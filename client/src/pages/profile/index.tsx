import Feed from '../../components/feed'
import ProfileCard from '../../components/profileCard'
import './style.css'

const Profile:React.FC = ()=>{
    return(
        <div className='page-wrapper'>
        <ProfileCard/>
        <div className="card w-full h-full font-semibold p-4 flex flex-col items-center justify-center" style={{margin:'5vh 0px'}}>
        <Feed purpose={'My Questions'}/>
        </div>
        </div>
    )
}

export default Profile