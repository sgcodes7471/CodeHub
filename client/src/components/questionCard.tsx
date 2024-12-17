import eye from '../assets/eye.svg'
import like from '../assets/like.svg'
import { useNavigate } from 'react-router-dom'
interface Props{
    data:any
}
const QuestionCard:React.FC<Props> = ({data})=>{
    let views = data.views
    let likes = data.likes
    const navigate = useNavigate();
    let symbols = new Map<Number , String>()
    symbols.set(4 , 'k')
    symbols.set(5 , 'k')
    console.log(views[0]+'.'+(views.substring(1,3)!=='00'?views.substring(1,3):''))
    if(views.length>3) views=views[0]+'.'+(views.substring(1,3)!=='00'?views.substring(1,3):'')+symbols.get(views.length)
    return(
        <div className="question-card flex justify-between w-full bg-white black rounded cursor-pointer" 
        onClick={()=>navigate(`/Question/${data._id}`)}
        style={{padding:'10px 20px',gap:'30px',borderRadius:'20px',marginTop:'20px'}}>
            <div className="w-3/4 flex flex-col justify-between items-start">
                <div className='black text-xl'>{(data.title).substring(0,30)}...</div>
                <div className='text-gray-600 text-sm'>Posted on {data.date}</div>
            </div>
            <div className="w-1/4 flex justify-around " style={{gap:'10px'}}>
                <div className='text-lg flex justify-center items-center'>{views}<img src={eye} alt=""/></div>
                <div className='text-lg flex  justify-center items-center'>{likes}<img src={like} alt=""/></div>
            </div>
        </div>
    )
}
export default QuestionCard