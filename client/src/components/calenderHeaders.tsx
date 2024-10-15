const CalenderHeader = () => {
    const today= new Date()
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

    return (  
        <div className="flex w-full justify-evenly my-4 " >
            <div className="text-xl font-semibold">{monthNames[today.getMonth()]},{today.getFullYear()}</div>
            <div className="text-xl font-semibold">{weekNames[today.getDay()]}</div>
        </div>
    );
}

export default CalenderHeader;