const generateDates = ():(number | null)[][] => {
    const calender:(number | null)[][] = [[]]
    const date = new Date();
    const year = date.getFullYear();
    
    const firstDay = new Date(year, date.getMonth(), 1);
    const lastDay = new Date(year, date.getMonth() + 1, 0);
    let week = 0;
    
    for(let i =0;i< firstDay.getDay();i++){
        calender[week].push()                                                      
    }
    
    for(let i=1;i<=lastDay.getDate();i++){
        if(calender[week].length === 7){
            week++
            calender[week] = []
        } 
        calender[week].push(i)                                                    
    }
    
    while(calender[week].length<7){
        calender[week].push(null)
    }
    return calender
}

export default generateDates