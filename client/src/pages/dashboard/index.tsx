import React, { useState } from 'react';
import Feed from '../../components/feed';
import './style.css';

const Dashboard: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10; //hard-coded for now. will be chnages after fetching from backedn

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    return(
        <div className='w-[100vw] flex flex-col justify-center items-center'>
        <div className="card w-[80vw] min-h-[70vh] h-full font-semibold p-4 flex flex-col items-center mt-[10vh]" >
        <Feed purpose={'All Questions'}/>
        </div>
        <div className="flex justify-center gap-4 my-[2vh]">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`px-3 py-2 rounded-md ${
                            currentPage === index + 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-white hover:bg-blue-200'
                        }`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Dashboard