
import React, { useState } from 'react'
import { ImAttachment } from "react-icons/im";
import RenderHTMLContent from '../../utils/RenderHTMLContent';
import { MdNextPlan, MdDeleteOutline } from "react-icons/md";


const Report = ({ reporttype, description, latitude, longitude,
    anonymousReporting, images, deleteReport }) => {

    const [imageCnt, setImgCnt] = useState(0);

    const firstImage = images[imageCnt];

    const additionalImagesCount = images.length - 1;

    const totalImages = images.length;

    const handleSlider = () => {
        setImgCnt((prev) => (prev + 1) % totalImages);
        return;
    }

    return (

        <div className="mt-4 p-4 border border-gray-300 rounded-lg
             bg-slate-900 w-[80%] shadow-sm shadow-blue-400 mx-[10%]">
            <h3 className="text-xl font-semibold mb-2 text-center">Report</h3>

            <div className='flex flex-row'>

                <button onClick={deleteReport} className='bg-inherit text-red-600 text-xl'><MdDeleteOutline /></button>

                <h2 className='bg-red-500 text-white px-8 py-2 text-center mx-auto
            lg:ml-[70%] w-fit rounded-lg'>
                    {reporttype}
                </h2>

            </div>


            <p className="mb-1 mt-3 lg:mt-0">
                Location:{' '}
                {latitude
                    ? `Lat: ${latitude}, Lng: ${longitude}`
                    : 'Not available'}
            </p>

            {
                anonymousReporting
                    ?
                    <p className='text-center mt-3 mb-2 border-2 border-slate-400 py-2 px-2 rounded-lg'>Anonymous Reporting</p>
                    :

                    ""
            }

            {description ?
                <div className='my-4 px-3 py-2 font-semibold'>
                    <RenderHTMLContent htmlContent={description} />
                </div> : ""}

            {firstImage ?

                <div>
                    <div className='flex flex-row justify-center'>
                        <ImAttachment className='my-1 mx-2' />
                        <h2 className='text-center text-xl text-slate-300'>Attachments</h2>
                    </div>

                    <div className='flex flex-row relative'>
                        <img
                            src={firstImage}
                            alt="Report media uploaded"
                            className='w-[60%] text-center ml-[20%] py-3 rounded-xl'
                        />

                        {additionalImagesCount > 0 && (
                            <div className='w-fit h-fit my-[20%] ml-1 lg:ml-8 flex
                            bg-red-500 text-white rounded-full p-2 cursor-pointer'
                                onClick={handleSlider}>
                                <MdNextPlan className='text-2xl' />
                                +{additionalImagesCount}
                            </div>
                        )}
                    </div>
                </div>

                :

                ""}


        </div>
    )
}

export default Report