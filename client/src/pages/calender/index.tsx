import React from "react";
import { useState } from "react";
import generateDates from "./generateDates";
import Contests from "../../components/contest";
import CalenderHeader from "../../components/calenderHeaders";
import DatesMatrix from "../../components/datesMatrix";
import Weeks from "../../components/weeks";
import './style.css'

const Calender:React.FC=()=>{

    const dates:(number | null)[][] = generateDates()
    const currentDay:number = new Date().getDate();
    const [selectedDay , setSelectedDay ] = useState<number>(currentDay)
    const daySelectHandler = (day:any) => {
        setSelectedDay(day)
    }
    const date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = date.getMonth();
    const year = date.getFullYear();

    return(
        <>
        <div className='body-wrapper page-wrapper flex' style={{height:'80vh'}}>
        
        <div className='calender-wrapper' >
        <div className='calender-block-wrapper flex flex-col'>
        <CalenderHeader/>
        <div className='flex justify-center flex-col h-3/4'>
        <Weeks/>
        <DatesMatrix dates={dates} currentDay={currentDay} selectedDay={selectedDay} onSelect={daySelectHandler}/>
        </div>
        </div>
        
        <div className='contests-wrapper'>
        <div style={{textAlign:'center' , fontWeight:'bold' }}>Contests List for {selectedDay}{(selectedDay===1 && 'st') || (selectedDay===2 && 'nd') || (selectedDay===3 && 'rd') || 'th'}</div>
        <Contests day = {selectedDay} month = {month} year={year} />
        </div>
        </div>
        </div>
        </>
    )
}

export default Calender