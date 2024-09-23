import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';

const TableHead = ({ content }) => {
  return (
    <div className='w-full flex items-center p-1 rounded-lg bg-yellow-600'>
      {content.map((element, index) => (
        <div key={index} className={` ${ element === 'Feedback' ? 'flex-[3]' : 'flex-1' } flex justify-center items-center font-semibold text-slate-50`}>
          {element}
        </div>
      ))}
    </div>
  );
};

const TableData = ({ content }) => {
  return (
    <div className='flex flex-col w-full gap-2 mt-2'>
      {content.map((element, index) => (
        <div key={index} className={` ${element.ifType === 'complaint' ? 'outline-red-600' : ''} ${element.ifType === 'suggestion' ? 'outline-lime-600' : ''} ${element.ifType === 'question' ? 'outline-blue-600' : ''} flex items-center p-[6px] rounded-2xl transition-all duration-300 hover:shadow-md hover:shadow-zinc-800 outline outline-1 outline-offset-[-5px]`}>
          <div className='flex-1 flex justify-center items-center text-[16px]'>
            {new Date(element.ifDate).toLocaleDateString()} {/* Format date here */}
          </div>
          <div className='flex-1 flex justify-center items-center text-[16px]'>{element.cusName}</div>
          <div className='flex-1 flex justify-center items-center text-[16px]'>{element.cusEmail}</div>
          <div className='flex-1 flex justify-center items-center text-[16px]'>{element.iName}</div>
          <div className='flex-1 flex justify-center items-center text-[18px]'>{element.ifRate}</div>
          <div className='flex-[3] flex justify-center items-center text-[16px]'>{element.ifNote}</div>
          <div className='flex-1 flex justify-center items-center text-[16px] gap-4'>
            <span className={` ${element.status === 'reject' ? 'outline outline-1 outline-offset-[-5px] outline-green-600 text-green-600' : 'bg-green-800 text-green-100'} transition-all duration-300 py-2 px-3 rounded-xl text-[1.25em] hover:shadow-md hover:shadow-zinc-800 cursor-pointer`}>
              <FontAwesomeIcon icon={faThumbsUp} />
            </span>
            <span className={` ${element.status === 'approve' ? 'outline outline-1 outline-offset-[-5px] outline-red-600 text-red-600' : 'bg-red-800 text-red-100'} transition-all duration-300 py-2 px-3 rounded-xl text-[1.25em] hover:shadow-md hover:shadow-zinc-800 cursor-pointer`}>
              <FontAwesomeIcon icon={faThumbsDown} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};


const TablePagination = ({ nowIndex, totalIndex, paginFunction }) => {
  const paginBtns = [];
  for (let i = 0; i < totalIndex; i++) {
    paginBtns.push(
      <div className={` ${i === nowIndex ? 'bg-slate-600 text-slate-50' : 'text-slate-600'} outline outline-2 outline-offset-[-3px] text-[1em] outline-slate-600 px-3 py-1 rounded-lg hover:bg-slate-600 transition-all duration-300 hover:text-slate-50 cursor-pointer`} key={i} onClick={() => paginFunction(i + 1)}>{i + 1}</div>
    );
  }
  return (
    <div className="flex gap-2 items-center justify-center mt-6">
      <div className='outline outline-2 outline-offset-[-3px] text-[1em] text-slate-600 outline-slate-600 px-3 py-1 rounded-lg hover:bg-slate-600 transition-all duration-300 hover:text-slate-50 cursor-pointer' onClick={() => paginFunction('<')}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      {paginBtns}
      <div className='outline outline-2 outline-offset-[-3px] text-[1em] text-slate-600 outline-slate-600 px-3 py-1 rounded-lg hover:bg-slate-600 transition-all duration-300 hover:text-slate-50 cursor-pointer' onClick={() => paginFunction('>')}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </div>
  );
};

export const ShowFeedbacksInstructTable = ({ reviewType }) => {
  const [thisPage, setThisPage] = useState(1);
  const [packageReviews, setPackageReviews] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:3001/api/instruct-feedbacks')
      .then(response => response.json())
      .then(data => {
        setPackageReviews(data.response); // Update state with fetched data
        console.log(data.response); // Log the fetched data
      })
      .catch(error => {
        console.error('Error fetching package feedbacks:', error);
      });
  }, []);

  const tableHead = ['Date', 'Customer', 'Email', reviewType === 'instructors' ? 'Instructor' : 'Package', 'Rating', 'Feedback', 'Actions'];
  const maxRows = 5;
  const maxPages = Math.ceil(packageReviews.length / maxRows);
  
  const dataSet = packageReviews.slice(
    (thisPage - 1) * maxRows,
    thisPage * maxRows
  );

  const handlePagination = (direction) => {
    if (direction === '>' && thisPage < maxPages) {
      setThisPage(thisPage + 1);
    } else if (direction === '<' && thisPage > 1) {
      setThisPage(thisPage - 1);
    } else if (!isNaN(direction)) {
      setThisPage(parseInt(direction, 10));
    }
  };

  return (
    <div className='flex justify-center flex-col gap-6 p-10 bg-[#c7c7c72c] rounded-2xl backdrop-blur-sm items-center'>
      <SearchBar placeholder='Search here ..' />
      <div className='flex flex-col justify-center items-center p-3 rounded-xl bg-[#c7c7c7c4] w-[80vw]'>
        <TableHead content={tableHead} />
        <TableData content={dataSet} />
        <TablePagination nowIndex={thisPage - 1} totalIndex={maxPages} paginFunction={handlePagination} />
      </div>
    </div>
  );
};
