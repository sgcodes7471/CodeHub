import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

interface Props { 
    day:number,
    month:number,
    year:number
}

const Contests:React.FC<Props> = ({ day  , month ,  year}) => {
    const [contests, setContests] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchContests = async () => {
            try{
                const response = await axios.get('https://codeforces.com/api/contest.list');
                const contests = await response.data.result.filter((contest:any) => (new Date(contest.startTimeSeconds * 1000).getDate() === day)
            && (new Date(contest.startTimeSeconds * 1000).getMonth() === month) && (new Date(contest.startTimeSeconds * 1000).getFullYear() === year));  
            setContests(contests)
                setLoading(false);
            }catch(error){
                alert('Failed to fetch the contests dates due to Network issues')
            }
        };
            fetchContests();
    }, [day , month , year]);
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (contests.length === 0) {
        return <div>No contests found on this day.</div>;
    }
    
    return (
        <div>
        {contests.map((contest) => (
            
            <Link to={`https://codeforces.com/contests/${contest.id}`} target='_blank' style={{color:'black' , textDecoration:'None'}}>
            <div key={contest.id} className='contest-card' >
            <div style={{fontSize:'1.2rem' , fontWeight:'bold'}}>{contest.name}</div>
            <p>Start time: {new Date(contest.startTimeSeconds * 1000).toLocaleString()}</p>
            <p>Duration: {contest.durationSeconds / 3600} hours</p>
            </div>
            </Link>
        ))}
        </div>
    );
};

export default Contests;