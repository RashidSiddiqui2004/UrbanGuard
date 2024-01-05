
import React from 'react'

const FeatureCard = ({feature}) => {
    return (
        <div className='border-2 border-white bg-blue-100
         text-slate-800 py-3 px-8 rounded-lg hover:shadow-lg
          flex-grow-0 hover:shadow-pink-400 transition-all'>
            <img src={feature.featureIcon} alt="img" width={150}
             className='flex text-center ml-[20%] mb-4 mt-3 rounded-2xl'/>

            <h2 className='text-2xl text-center text-gray-950 font-bold font-serif'>{feature.featureTitle}</h2>

            <h3 className='text-lg text-center italic'>
                 {feature.featureDesc}
            </h3>
        </div>
    )
}

export default FeatureCard