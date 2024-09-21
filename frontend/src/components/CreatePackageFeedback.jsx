import { React, useEffect, useState } from 'react'
import { User } from 'react-feather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt } from '@fortawesome/free-solid-svg-icons';

const CreatePackageFeedback = (reviewTypes) => {
  
    const packagesTypes = ['silver','gold','platinum']
  
    return (
      <div>
        <form className='flex flex-col gap-2 items-center w-[30vw]' action="" method="post">
          <div className='w-full flex items-center relative'>
            <input className='w-full hover:shadow-md hover:shadow-zinc-900 hover:outline-none relative py-1 px-3 pr-10 rounded-lg focus:shadow-md focus:shadow-zinc-900 focus:outline-none transition-all duration-500' type="text" name="full_name" id="full_name" />
            <label className='absolute right-2 text-zinc-500' htmlFor="full_name">
              <User />
            </label>
          </div>
          <div className='w-full flex items-center relative'>
            <input className='w-full hover:shadow-md hover:shadow-zinc-900 hover:outline-none relative py-1 px-3 pr-10 rounded-lg focus:shadow-md focus:shadow-zinc-900 focus:outline-none transition-all duration-500' type="text" name="user_email" id="user_email" />
            <label htmlFor="user_email">
              <FontAwesomeIcon className='absolute right-2 top-[5px] text-[1.25em] text-zinc-500' icon={faAt} />
            </label>
          </div>
          <div className='w-full flex items-center relative'>
            <label className='flex-1 text-center' htmlFor="review_package">Package</label>
            <select className='flex-[2] hover:shadow-md hover:shadow-zinc-900 hover:outline-none outline-none border-none py-1 px-3 rounded-lg focus:shadow-md focus:shadow-zinc-900 focus:outline-none transition-all duration-500' name="review_package" id="review_package" onChange={''}>
              <option value="">Select Package ..</option>
              {
                packagesTypes.map((content, index) => (
                  <option key={index} className='capitalize' value={content}>{content}</option>
                ))
              }
            </select>
          </div>
          <div className='w-full flex justify-center items-center relative'>
            {/* <label htmlFor=""></label> */}
            <select className='w-4/5 outline-none hover:shadow-md hover:shadow-zinc-900 hover:outline-none border-none py-1 px-3 rounded-lg focus:shadow-md focus:shadow-zinc-900 focus:outline-none transition-all duration-500' name="review_type" id="review_type">
              <option value="">Choose Feedback Type ..</option>
                {
                  reviewTypes.map((content, index) => (
                    <option key={index} className='capitalize' value={content}>{content}</option>
                  ))
                }
            </select>
          </div>
          <div className='w-full flex items-center relative'>rates</div>
          <div className='w-full flex items-center relative'>
            <textarea className='w-full outline-none hover:shadow-md hover:shadow-zinc-900 hover:outline-none border-none py-1 px-3 rounded-lg focus:shadow-md focus:shadow-zinc-900 focus:outline-none transition-all duration-500' name="user_feedback" id="user_feedback"></textarea>
          </div>
          <div className='w-full pt-3 flex items-center justify-center gap-4 relative'>
            <button className='flex items-center justify-center py-2 uppercase font-semibold px-10 rounded-xl bg-yellow-500 hover:shadow-md hover:shadow-zinc-900 hover:outline-none transition-all duration-500' type="reset">Cancel</button>
            <button className='flex items-center justify-center py-2 uppercase font-semibold px-10 rounded-xl bg-yellow-500 hover:shadow-md hover:shadow-zinc-900 hover:outline-none transition-all duration-500' type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
    
}
  

export default CreatePackageFeedback
