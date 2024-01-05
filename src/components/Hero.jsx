import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className='text-center min-h-[500px]'>

            <motion.h1
                initial={{ x: -1000 }}
                animate={{ x: 0 }}
                transition={{
                    duration: 1,
                    delay: 0.2,
                }}
                className='flex justify-center my-2 text-xl md:text-6xl font-bold'>"Empower Safety, Report
                <span className='text-pink-400 mx-2'> Incidents. </span></motion.h1>

            <motion.h1
                initial={{ x: -1000 }}
                animate={{ x: 0 }}
                transition={{
                    duration: 1,
                    delay: 0.2,
                }}
                className='flex justify-center text-xl md:text-6xl font-bold'> Be a Guardian of Your City!" </motion.h1>

            <motion.h1
                initial={{ x: -1000 }}
                animate={{ x: 0 }}
                transition={{
                    duration: 1,
                    delay: 0.2,
                }}
                className='flex justify-center my-4 text-sm md:text-2xl font-bold'> Building Safer, Smarter Cities Together. </motion.h1>


            <div className='flex justify-center gap-8 my-8'>

                <Link to={'/signup'}>
                    <button className='bg-blue-950 flex gap-3 border-2 border-white
                py-3 px-4 shadow-md shadow-slate-500 text-xl'>Register</button>
                </Link>

                <Link to={'/login'}>
                    <button className='bg-slate-700 flex gap-3 border-2 border-white
                py-3 px-4 shadow-md shadow-slate-500 text-xl'>Log-In</button>
                </Link>

            </div>

        </div>

    )
}

export default Hero