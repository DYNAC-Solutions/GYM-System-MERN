import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCircleUser } from '@fortawesome/free-solid-svg-icons';

const ReviewBlock = ({ cusName, rate, note, ifDate }) => {

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return { formattedDate, formattedTime };
};

const { formattedDate, formattedTime } = formatDate(ifDate);

  const stars = () => {
    const starElements = [];
    
    for (let i = 0; i < rate; i++) {
      starElements.push(
        <FontAwesomeIcon className="text-yellow-500 text-[1.25em]" key={i} icon={faStar} />
      );
    }
    for (let i = rate; i < 5; i++) {
      starElements.push(
        <FontAwesomeIcon className="text-zinc-500 text-[1.25em]" key={i} icon={faStar} />
      );
    }
    
    return starElements;
  };

  return (
    <div className='flex gap-2 flex-row-reverse items-center p-3 rounded-2xl bg-[#fffbd662]'>
      <div className='flex-1 rounded-full overflow-hidden flex items-center justify-center'>
        <FontAwesomeIcon className='text-[60px]' icon={faCircleUser} />
      </div>
      <div className='flex-[5]'>
      
        <p className='text-[.85em]'>{cusName}</p>
        <p className='text-[.85em]'>{note}</p>
        <div className='flex gap-3 justify-end'>{stars()}</div>
        <p className='text-[.85em]'>{formattedDate}</p>
            <p className='text-[.85em]'>{formattedTime}</p>
      </div>
    </div>
  );
};

const InstructorFeedback = ({ name }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // Fetch feedback data from the API
    fetch('http://localhost:3001/api/instruct-feedbacks')
      .then(response => response.json())
      .then(data => {
        // Filter feedbacks where iName matches the provided name
        const filteredFeedbacks = data.response.filter(feedback => feedback.iName === name);
        setFeedbacks(filteredFeedbacks);
      })
      .catch(error => console.error('Error fetching feedbacks:', error));
  }, [name]);

  return (
    <div className='flex gap-3 justify-center items-start p-10 w-[60vw] rounded-xl bg-[#c7c7c7c4]'>
      <div className="flex-1 flex flex-col gap-2">
        <div className='aspect-[4/5] rounded-xl overflow-hidden'>
          <img className='w-[125%] relative top-[-10%]' src="/images/instructor_placeholder.jpg" alt="instructor-profile" />
        </div>
        <p className='text-[1.35em] font-semibold capitalize text-amber-700'>{name}</p>
      </div>
      <div className='flex-[3] flex flex-col gap-3'>
        {/* Display filtered review blocks */}
        {feedbacks.length > 0 ? (
          feedbacks.map(feedback => (
            <ReviewBlock
              key={feedback._id}
              rate={feedback.ifRate}
              note={feedback.ifNote}
              cusName={feedback.cusName}
              ifDate={feedback.ifDate}
            />
          ))
        ) : (
          <p>No feedback available for this instructor.</p>
        )}
      </div>
    </div>
  );
};

export default InstructorFeedback;
