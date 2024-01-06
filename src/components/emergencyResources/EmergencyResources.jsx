import React from 'react'
import DisasterManager from './DisasterManager';

import earthquake from "/public/earthquake.jpg";
import flood from "/public/flood.jpg";
import hurricane from "/public/hurricane.jpg";
import thunderstorm from "/public/thunderstorm.jpg";

const EmergencyResources = () => {

    const emergencyServicesData = [
        {
            title: 'Local Police Department',
            contactNumber: '123-456-7890',
            description: 'Dedicated to ensuring the safety and security of our community.',
        },
        {
            title: 'Fire Department',
            contactNumber: '987-654-3210',
            description: 'Responding to fire emergencies and promoting fire safety in the neighborhood.',
        },
        {
            title: 'Emergency Medical Services (EMS)',
            contactNumber: '555-123-4567',
            description: 'Providing swift medical assistance during emergencies.',
        },
        {
            title: 'National Emergency Hotline',
            contactNumber: '911',
            description: 'Connect with emergency services nationwide for immediate assistance.',
        },
    ];

    const disasterData = [
        {
          title: 'Earthquake',
          description: 'Guidelines on what to do during an earthquake.',
          link: '#',
          image: earthquake,
        },
        {
          title: 'Flood',
          description: 'Guidelines on how to stay safe during a flood.',
          link: '#',
          image: flood,
        },
        {
          title: 'Hurricane',
          description: 'Steps to take before and during a hurricane.',
          link: '#',
          image: hurricane,
        }, 
        {
            title: 'Thunderstorm',
            description: 'Steps to take before and during a thunderstorm.',
            link: '#',
            image: thunderstorm
          }, 
      ];


    return (
        <div className='py-8'>
            <h1 className='text-lg lg:text-3xl text-center font-bold font-serif
         text-slate-200'>Emergency Services Information Hub</h1>

            <div className='mx-[10%] lg:grid lg:grid-cols-4 mt-7 lg:gap-y-7'>

                {emergencyServicesData.map((service, index) => (
                    <div
                        key={index}
                        className='bg-white rounded-2xl h-60 w-64 hover:bg-gray-300 transition-all p-4'
                    >
                        <h2 className='text-xl font-bold mb-2 text-slate-900'>{service.title}</h2>
                        <p className='text-gray-800 mb-4'>{service.description}</p>
                        <p className='text-slate-800 font-semibold text-xl'>{`Contact: ${service.contactNumber}`}</p>
                    </div>
                ))}

                {/* Emergency Preparedness Guide */}
                <div className='bg-white rounded-2xl h-60 w-64 hover:bg-gray-300 transition-all p-4'>
                    <h2 className='text-xl font-bold mb-2 text-slate-900'>Emergency Preparedness Guide</h2>
                    <p className='text-gray-800 mb-4'>
                        Link to a Comprehensive Emergency Guide: Provide a link to a detailed guide on emergency preparedness for residents.
                    </p>
                    <a
                        href='#' // Replace with the actual link
                        className='text-blue-500 font-semibold hover:underline'
                    >
                        Read Guide
                    </a>
                </div>

                {/* Community Resources */}
                <div className='bg-white rounded-2xl h-60 w-64 hover:bg-gray-300 transition-all p-4'>
                    <h2 className='text-xl font-bold mb-2 text-slate-900'>Community Resources</h2>
                    <p className='text-gray-600 mb-4'>
                        Links to Local Organizations: Include links to local organizations offering support during emergencies.
                    </p>
                    <a
                        href='#' // Replace with the actual link
                        className='text-blue-500 font-semibold hover:underline'
                    >
                        Explore Resources
                    </a>
                </div>

                {/* Evacuation Routes */}
                <div className='bg-white rounded-2xl h-60 w-64 hover:bg-gray-300 transition-all p-4'>
                    <h2 className='text-xl font-bold mb-2 text-slate-900'>Evacuation Routes</h2>
                    <p className='text-gray-600 mb-4'>
                        Map of Evacuation Routes: Display a map or provide information on designated evacuation routes in the area.
                    </p>
                    <a
                        href='#' // Replace with the actual link or map
                        className='text-blue-500 font-semibold hover:underline'
                    >
                        View Routes
                    </a>
                </div>

            </div>

            <h1 className='text-lg lg:text-3xl text-center font-bold font-serif
         text-slate-200  mt-16'>What to do in Natural Disasters?</h1>

            <p className='text-center my-1 text-balance'>Guidance on actions to take during natural disasters such as earthquakes, floods, and storms.
            </p>

            <div className='mx-[10%] lg:grid lg:grid-cols-2 mt-7 lg:gap-y-7 gap-10'>

                {disasterData.map((disaster, index) => (
                    <div key={index}>
                        <DisasterManager disaster={disaster} />
                    </div>
                ))}
 
            </div>
        </div>
    )
}

export default EmergencyResources