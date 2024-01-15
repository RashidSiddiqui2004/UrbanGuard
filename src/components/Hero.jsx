import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'


const Hero = () => {

    const user = JSON.parse(localStorage.getItem('user'));


    return (
        <div className='text-center min-h-[300px] mt-20 merriweather overflow-hidden'>

            <motion.h1
                initial={{ x: -1000 }}
                animate={{ x: 0 }}
                transition={{
                    duration: 1,
                    delay: 0.2,
                }}
                className='flex justify-center my-2 text-lg md:text-6xl font-bold'>
                <span className='text-2xl lg:text-5xl -mt-2 mr-2 ml-3 md:ml-0'>❝</span>Empower
                <span className='text-green-400 mx-2'> Safety</span>,Report
                <span className='text-pink-400 mx-2'> Incidents. </span> </motion.h1>

            <motion.h1
                initial={{ x: -1000 }}
                animate={{ x: 0 }}
                transition={{
                    duration: 1,
                    delay: 0.2,
                }}
                className='flex justify-center text-xl md:text-6xl font-bold mt-4'> Be a
                <span className='text-red-400 mx-2'> Guardian </span> of Your City!

                <span className='text-2xl lg:text-5xl -mt-2 ml-2'> ❞ </span> </motion.h1>

            <motion.h1
                initial={{ x: -1000 }}
                animate={{ x: 0 }}
                transition={{
                    duration: 1,
                    delay: 0.2,
                }}
                className='flex justify-center my-4 text-sm md:text-2xl font-bold'> Building Safer, Smarter Cities Together. </motion.h1>


            {
                !user ?
                    <div className='flex justify-center gap-8 my-8'>

                        <Link to={'/signup'}>
                            <button className='bg-slate-800 text-white flex gap-3 border-2 border-white
                    py-5 px-3 lg:px-6 shadow-md shadow-slate-500 text-xl md:text-2xl'>
                            </button>
                        </Link>

                        <Link to={'/login'}>
                            <button className='bg-green-400 text-slate-900 flex gap-3 border-2 border-white
                    py-5 px-3 lg:px-6 shadow-md shadow-slate-500 text-xl md:text-2xl'>Log-In</button>
                        </Link>

                    </div>
                    :

                    ""
            }


        </div>

    )
}

export default Hero