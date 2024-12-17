import React from "react";

interface Prop{
    dates:(number | null)[][],
    currentDay :number,
    selectedDay:number,
    onSelect:(any)
}

const DatesMatrix:React.FC<Prop> = ({ dates, currentDay , selectedDay ,onSelect }) => {
    return (
        <div className="flex flex-col">
            {dates.map((date:(number|null)[] | null[] , index:number) => (
                <div key={index} className="flex justify-evenly" >
                    {date.map((day:number|null) => (
                        <div style={{width:'5vw',height:'5vh',
                            borderBottom:selectedDay===day?'4px solid rgba(255, 0, 0, 0.5)':'none',
                            borderRadius:selectedDay===day?'none':'2vh',padding:'1vh', textAlign:'center' ,
                            cursor:'pointer', 
                            backgroundColor: day === currentDay ? 'rgba(255, 0, 0, 0.5)' : 'inherit'}}
                        onClick={() => {onSelect(day)}} 
                        key={Math.random()}>{day}</div>
                    ))}
                </div>
            ))}
        </div>
    );
};
export default DatesMatrix;