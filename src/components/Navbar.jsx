
import React, { Fragment, useContext, useState } from 'react'
import myContext from '../context/data/myContext';
import { BsFillCloudSunFill } from 'react-icons/bs'
import { FiSun } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react'
import { RxCross2 } from 'react-icons/rx'

function Navbar() {

  const context = useContext(myContext);

  const { mode, toggleMode } = context;

  const [open, setOpen] = useState(false)

  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.clear('user');
    window.location.href = '/login'
  }

  return (
    <div className='bg-white sticky top-0 z-50'>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl" style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 44, 52)' : '', color: mode === 'dark' ? 'white' : '', }}>
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 />
                  </button>
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">

                  <Link to={'/community-posts'} className="text-sm font-medium text-gray-900 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Community Posts
                  </Link>

                  {user ? <div className="flow-root">
                    <Link to={'/emergency-resources'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Emergency Resources
                    </Link>
                  </div> : ""}


                  {user?.user?.email === "siddiqui20042007@gmail.com" ? <div className="flow-root">
                    <Link to={'/dashboard'} className="-m-2 block p-2 font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Admin
                    </Link>
                  </div> : ""}

                  {user ? <div className="flow-root">
                    <a onClick={logout} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Logout
                    </a>
                  </div> : <div className="flow-root">
                    <Link to={'/signup'} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Signup
                    </Link>
                  </div>}
                  <div className="flow-root">
                    <Link to={'/'} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer">
                      <img
                        className="inline-block w-10 h-10 rounded-full"
                        src="/user.jpg"
                        alt="user" />                                        
                      </Link>
                  </div>
                </div>


              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">

        <nav aria-label="Top" className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl "  >
          <div className="">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

              </button>

              <div className="ml-4 flex lg:ml-0">
                <Link to={'/'} className='flex'>
                  <div className="flex ">
                    {/* <img src="/logo.jpg" alt="My Website Logo" className='w-[35px] h-auto' /> */}
                    <h1 className=' text-2xl font-bold text-black font-lato px-2 py-1 rounded'>UrbanGuard</h1>
                  </div>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">

                  {user ? <div className="flow-root">
                    <Link to={'/community-posts'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Community Posts
                    </Link>
                  </div> : ""}

                  <Link to={'/emergency-resources'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Emergency Resources
                  </Link>

                  {!user && (<Link to={'/signup'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Signup
                  </Link>)}

                  {user?.user?.email === 'siddiqui20042007@gmail.com' ?
                    <Link to={'/dashboard'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Admin
                    </Link> : ""}

                  {user ? <a onClick={logout} className="text-sm font-medium text-gray-700 cursor-pointer  " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Logout
                  </a> : ""}

                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 ">
                    <img
                      src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium" style={{ color: mode === 'dark' ? 'white' : '', }}>INDIA</span>
                  </a>
                </div>

                <Link to={'/userProfile'}>
                  <div className="hidden lg:ml-8 lg:flex">
                    <a href="#" className="flex items-center text-gray-700 ">
                      <img
                        className="inline-block w-10 h-10 rounded-full"
                        src="/user.jpg"
                        alt="user" />
                    </a>
                  </div>
                </Link>

              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar