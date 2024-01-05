
import React from 'react'

const HeroCommunity = () => {
  return (
    <div className='py-6 px-4 mt-4'>
        <h1 className='text-center text-2xl text-slate-100 
        font-serif font-semibold mb-2'>Community Forum: Connect, Share, Discuss</h1>

        <h3 className='text-normal text-lg text-pretty text-center
         flex-wrap'>Join the conversation, share your insights, and stay informed about safety and community matters.</h3>

        <div className='text-center flex justify-center mt-8 rounded-xl'>
            <img src="Forum.jpg" alt="" className='rounded-3xl' />
        </div>

        <div>
            <h2 className='text-2xl text-center my-8 font-serif font-bold'>Explore Community Chats</h2>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 text-xl md:text-xl'>
                <button className='bg-green-400 text-slate-900
                 font-bold font-serif shadow-md shadow-red-300 hover:scale-[102%]
                 transition-all w-[50%] px-9 items-center ml-[25%] lg:ml-0 lg:px-0 lg:w-full'>Safety Tips</button>
                <button className='bg-blue-300 text-slate-900
                 font-bold font-serif shadow-md shadow-red-300 hover:scale-[102%]
                 transition-all  w-[50%] px-9 items-center ml-[25%] lg:ml-0  lg:px-0 lg:w-full'>Community Events</button>
                <button className='bg-pink-300 text-slate-900
                 font-bold font-serif shadow-md shadow-red-300 hover:scale-[102%]
                 transition-all  w-[50%] px-9 items-center ml-[25%] lg:ml-0 lg:px-0 lg:w-full'>General Discussions</button>
            </div>

        </div>
    </div>
  )
}

export default HeroCommunity