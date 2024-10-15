import home from '../assets/home.svg'

const PreNavbar = ()=>{
    return(
        <>
        <div className='flex items-centre justify-between my-4 mx-8'>
            <img  src={home} alt="" className='w-8'/>
            <ul className='list-none flex'>
                <li className='px-4 '>Login</li>
                <li className='px-4 '>Sign Up</li>
                <li className='px-4 '>About</li>
            </ul>
        </div>
        </>
    )
}
export default PreNavbar