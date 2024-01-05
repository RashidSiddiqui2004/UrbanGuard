
import React from 'react'
import HeroCommunity from './HeroCommunity'
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from './Sidebar';

const Forum = () => {
  return (
    <div className='flex flex-row min-h-screen'>

      <div className='hidden lg:block lg:w-[20%] bg-slate-400'>
        <Sidebar/>
      </div>

      <div className='w-[100%] lg:w-[80%] bg-slate-800'>

        <div className='text-lg block lg:hidden fixed left-10 mt-2'>
          <RxHamburgerMenu />
        </div>

        <HeroCommunity />
      </div>
      
    </div>
  )
}

export default Forum