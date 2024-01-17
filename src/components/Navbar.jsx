
import React, { Fragment, useContext, useState } from 'react'
import myContext from '../context/data/myContext';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react'
import { RxCross2 } from 'react-icons/rx'
import ADMIN_EMAIL from '../utils/AdminDetails';
import isRegisteredUser from '../utils/RegisteredDeptEmails';

function Navbar() {

  const context = useContext(myContext);

  const { mode } = context;

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
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
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
                <div className="border-t border-gray-200 px-4 py-6 ">

                  {user ? <div className="flow-root mb-2">
                    <Link to={'/report'} className="text-sm font-medium text-gray-700"
                      style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Send Report
                    </Link>
                  </div> : ""}

                  <div className="flow-root mb-2">
                    <Link to={'/community-posts'} className="text-sm font-medium text-gray-900"
                      style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Community Posts
                    </Link>
                  </div>

                  {user ? <div className="flow-root mb-2">
                    <Link to={'/emergency-resources'} className="text-sm font-medium text-gray-700"
                      style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Emergency Resources
                    </Link>
                  </div> : ""}


                  {user?.user?.email === ADMIN_EMAIL ? <div className="flow-root">
                    <Link to={'/dashboard'} className="mt-[1px] -ml-2 block p-2 font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '', }}>
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
                    <Link to={'/user-profile'} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer">
                      <img
                        className="inline-block w-10 h-10 rounded-full"
                        src="https://res.cloudinary.com/drlkkozug/image/upload/v1705071144/y9evmbpdht5ezj3fkal9.jpg"
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

        <nav aria-label="Top" className="bg-gray-800 text-white px-4 sm:px-6 lg:px-8 shadow-xl "  >
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

              <div className="ml-8 flex lg:ml-0">
                <Link to={'/'} className='flex'>
                  <div className="flex ">
                    <img src="https://res.cloudinary.com/drlkkozug/image/upload/v1705071145/thftfiyzg6c29p4d6vws.jpg" alt="Urban Guard Logo" className='w-[35px] h-auto' />
                    <h1 className=' text-2xl font-bold font-lato 
                    px-2 py-1 rounded-md text-white'>UrbanGuard</h1>
                  </div>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">


                  {user ? <div className="flow-root">
                    <Link to={'/report'} className="text-sm font-medium text-white">
                      Send Report
                    </Link>
                  </div> : ""}

                  {user ? <div className="flow-root">
                    <Link to={'/community-posts'} className="text-sm font-medium text-white">
                      Community Posts
                    </Link>
                  </div> : ""}


                  <Link to={'/emergency-resources'} className="text-sm font-medium text-white">
                    Emergency Resources
                  </Link>

                  {!user && (<Link to={'/signup'} className="text-sm font-medium text-white">
                    Signup
                  </Link>)}

                  {user?.user?.email === ADMIN_EMAIL ?
                    <Link to={'/dashboard'} className="text-sm font-medium text-white">
                      Admin
                    </Link> : ""}

                  {isRegisteredUser(user?.user?.email) ? <div className="flow-root">
                    <Link to={'/departments-reports'} className="text-sm font-medium text-white">
                      Department Reports
                    </Link>
                  </div> : ""}

                  {user ? <a onClick={logout} className="text-sm font-medium cursor-pointer text-white">
                    Logout
                  </a> : ""}

                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center">
                    <img
                      src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium text-white">INDIA</span>
                  </a>
                </div>

                <Link to={'/user-profile'}>
                  <div className="hidden lg:ml-8 lg:flex">
                    <a href="#" className="flex items-center">
                      <img
                        className="inline-block w-10 h-10 rounded-full"
                        src="https://res.cloudinary.com/drlkkozug/image/upload/v1705071144/y9evmbpdht5ezj3fkal9.jpg"
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