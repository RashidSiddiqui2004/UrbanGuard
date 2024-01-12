
import React from 'react'

const DisasterManager = ({ disaster }) => {
    return (
        <div className='bg-white rounded-2xl hover:bg-gray-300 transition-all'>

            <img src={disaster.image} alt="" srcSet="" className='h-[400px] w-full rounded-xl'/>

            <div className='p-4'>
                <h2 className='text-xl font-bold mb-2 text-slate-900'>{disaster.title}</h2>
                <p className='text-gray-600 mb-4'>
                    {disaster.description}
                </p>
                <a
                    href={disaster.link}
                    className='text-blue-500 font-semibold hover:underline'
                >
                    Learn More
                </a>
            </div>

        </div>
    )
}

export default DisasterManager