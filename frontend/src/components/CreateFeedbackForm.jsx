import React, { useEffect, useState } from "react";
import { instructors } from '../temp/data';
import { User } from 'react-feather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { SetRate } from './SetRate';
import Axios from 'axios';

const FeedBackType = ({ type, whenChange }) => {
  return (
    <div className="flex gap-3 items-center mb-2">
      <p
        className={`${
          type === 'packages' ? 'text-yellow-400' : 'text-yellow-100'
        } uppercase text-[1em] font-semibold tracking-widest transition-all ease-in-out duration-300 cursor-pointer`}
        onClick={() => whenChange('packages')}
      >
        Package
      </p>
      <div className={`w-7 h-3 bg-stone-500 opacity-75 rounded-xl`}>
        <div
          className={`${
            type === 'packages' ? 'ml-1' : 'ml-4'
          } w-2 h-2 bg-amber-400 rounded-xl mt-[2px] transition-all ease-in-out duration-300`}
        ></div>
      </div>
      <p
        className={`${
          type === 'instructors' ? 'text-yellow-400' : 'text-yellow-100'
        } uppercase text-[1em] font-semibold tracking-widest transition-all ease-in-out duration-300 cursor-pointer`}
        onClick={() => whenChange('instructors')}
      >
        Instructor
      </p>
    </div>
  );
};

const CreateInstructorFeedback = () => {
  const instructorList = instructors;
  const packagesTypes = ['silver', 'gold', 'platinum'];
  const feedbackTypes = ['question', 'suggestion', 'complaint'];

  const [ifID, setifID] = useState(0);
  const [pfID, setpfID] = useState(0);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [instructor, setInstructor] = useState('');
  const [packageType, setPackageType] = useState('');
  const [reviewType, setReviewType] = useState('');
  const [feedbackNote, setFeedbackNote] = useState('');
  const [rate, setRate] = useState(0);
  const [type, setType] = useState('packages');
  const [dataList, setDataList] = useState(packagesTypes);

  const inputRating = (newRate) => {
    setRate(newRate + 1);
  };

  const changeType = (thisType) => {
    setType(thisType);
    setDataList(thisType === 'packages' ? packagesTypes : instructorList);
  };

  useEffect(() => {
    fetchMaxIdAndSetId();
  }, []);

  const fetchMaxIdAndSetId = async () => {
    try {
      if (type === 'packages') {
        const response = await Axios.get('http://localhost:3001/api/get-package-feedbacks-maxid');
        const maxId = response.data?.maxId;
        setpfID(maxId + 1); // set next package feedback id
      } else {
        const response = await Axios.get('http://localhost:3001/api/get-instruct-feedbacks-maxid');
        const maxId = response.data?.maxId;
        setifID(maxId + 1); // set next instructor feedback id
      }
    } catch (error) {
      console.error('Axios Error (getMaxId): ', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let feedbackData;

    if (type === 'packages') {
      feedbackData = {
        pfID: pfID,
        cusName: fullName,
        cusEmail: email,
        pName: packageType,
        pfType: reviewType,
        pfRate: rate,
        pfNote: feedbackNote,
        pfDate: new Date(),
      };
    } else {
      feedbackData = {
        ifID: ifID,
        cusName: fullName,
        cusEmail: email,
        iName: instructor,
        ifType: reviewType,
        ifRate: rate,
        ifNote: feedbackNote,
        ifDate: new Date(),
      };
    }

    console.log('Submitting feedback:', feedbackData);

    try {
      const apiEndpoint = type === 'packages'
        ? 'http://localhost:3001/api/create-package-feedback'
        : 'http://localhost:3001/api/create-instruct-feedback';

      const response = await Axios.post(apiEndpoint, feedbackData);

      if (response.status === 200) {
        alert('Successfully added feedback!');
        // Reset the form here
        setFullName('');
        setEmail('');
        setInstructor('');
        setPackageType('');
        setReviewType('');
        setFeedbackNote('');
        setRate(0);
        fetchMaxIdAndSetId(); // Fetch new ID for the next submission
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('An error occurred while submitting feedback. Please try again.'); // Alert on error
    }
  };

  return (
    <div>
      <form className='flex flex-col gap-2 items-center w-[30vw]' onSubmit={handleSubmit}>
        <FeedBackType type={type} whenChange={changeType} />
        <input type="hidden" name={type} />
        <div className='w-full flex items-center relative'>
          <input
            className='w-full hover:shadow-md hover:shadow-zinc-900 hover:outline-none relative py-1 px-3 pr-10 rounded-lg focus:shadow-md focus:shadow-zinc-900 focus:outline-none transition-all duration-500'
            type="text"
            name="full_name"
            id="full_name"
            placeholder='Name . . .'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)} // Update the state
          />
          <label className='absolute right-2 text-zinc-500' htmlFor="full_name">
            <User />
          </label>
        </div>
        <div className='w-full flex items-center relative'>
          <input
            className='w-full hover:shadow-md hover:shadow-zinc-900 hover:outline-none relative py-1 px-3 pr-10 rounded-lg focus:shadow-md focus:shadow-zinc-900 focus:outline-none transition-all duration-500'
            type="text"
            name="user_email"
            id="user_email"
            placeholder='Email . . .'
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update the state
          />
          <label htmlFor="user_email">
            <FontAwesomeIcon className='absolute right-2 top-[5px] text-[1.25em] text-zinc-500' icon={faAt} />
          </label>
        </div>
        <div className='w-full flex items-center relative'>
          {
            type === 'packages' ? (
              <label className='flex-1 text-center font-semibold text-stone-800' htmlFor="review_package">Package</label>
            ) : (
              <label className='flex-1 text-center font-semibold text-stone-800' htmlFor="review_instructor">Instructor</label>
            )
          }
          <select
            className='flex-[2] hover:shadow-md hover:shadow-zinc-900 hover:outline-none outline-none border-none py-1 px-3 rounded-lg focus:shadow-md focus:shadow-zinc-900 focus:outline-none transition-all duration-500'
            name="review_instructor"
            id="review_instructor"
            value={type === 'packages' ? packageType : instructor}
            onChange={(e) => type === 'packages' ? setPackageType(e.target.value) : setInstructor(e.target.value)} // Update the state
          >
            {
              type === 'packages' ? (
                <option className='text-zinc-400' value="">Select Package ..</option>
              ) : (
                <option className='text-zinc-400' value="">Select Instructor ..</option>
              )
            }
            {
              dataList.map((content, index) => (
                <option key={index} className='capitalize' value={content}>{content}</option>
              ))
            }
          </select>
        </div>
        <div className='w-full flex justify-center items-center relative'>
          <select
            className='w-4/5 outline-none hover:shadow-md hover:shadow-zinc-900 hover:outline-none border-none py-1 px-3 rounded-lg focus:shadow-md focus:shadow-zinc-900 focus:outline-none transition-all duration-500'
            name="review_type"
            id="review_type"
            value={reviewType}
            onChange={(e) => setReviewType(e.target.value)} // Update the state
          >
            <option className='text-zinc-400' value="">Choose Feedback Type . .</option>
            {
              feedbackTypes.map((feedback, index) => (
                <option key={index} className='capitalize' value={feedback}>{feedback}</option>
              ))
            }
          </select>
        </div>
        <div className='w-full flex items-center justify-center relative'>
          <SetRate rate={rate} handleRating={inputRating} />
        </div>

        <textarea
          className='resize-none w-full h-24 hover:shadow-md hover:shadow-zinc-900 hover:outline-none border-none py-2 px-3 rounded-lg focus:shadow-md focus:shadow-zinc-900 focus:outline-none transition-all duration-500'
          placeholder='Leave your feedback here...'
          value={feedbackNote}
          onChange={(e) => setFeedbackNote(e.target.value)} // Update the state
        ></textarea>
        <button
          className='bg-amber-400 px-3 py-1 rounded-lg font-semibold text-white hover:bg-amber-300 transition-all duration-300'
          type="submit"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default CreateInstructorFeedback;
