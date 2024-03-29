
import React, { useContext, useState } from 'react'
import { ImAttachment } from "react-icons/im";
import RenderHTMLContent from '../../utils/RenderHTMLContent';
import { MdNextPlan, MdDeleteOutline } from "react-icons/md";
import { toast } from 'react-toastify';
import myContext from '../../context/data/myContext';
import { IoCheckmarkDone } from "react-icons/io5";


const Report = ({ reporttype, description, latitude, longitude,
    anonymousReporting, images, deleteReport, reportUserID = -1, reportID, filed = false }) => {

    const [imageCnt, setImgCnt] = useState(0);

    const context = useContext(myContext);

    const { addNotification, UpdateReportState } = context;

    const firstImage = images[imageCnt];

    const additionalImagesCount = images.length - 1;

    const totalImages = images.length;

    const handleSlider = () => {
        setImgCnt((prev) => (prev + 1) % totalImages);
        return;
    }

    const reportFiled = async () => {
        await addNotification(reportUserID, reportID);
        await UpdateReportState(reportID);
        toast.success("Report filed successfully!")
    }

    return (

        <div className="mt-4 p-4 border border-gray-300 rounded-lg
             bg-slate-900 w-[80%] shadow-sm shadow-blue-400 mx-[10%]">

            <div className='flex flex-row justify-center'>
                <h3 className="text-xl font-semibold mb-2 text-center">Report</h3>

                {
                    filed ?
                        <div className='ml-8 text-3xl mt-0'>
                            <IoCheckmarkDone />
                        </div>
                        :
                        ""
                }
            </div>

            <div className='flex flex-row justify-center'>

                {/* <button onClick={deleteReport} className='bg-inherit text-red-600 text-xl'><MdDeleteOutline /></button> */}

                <button onClick={reportFiled} className='bg-inherit text-green-600 text-sm md:text-xl
                    border-2 px-3 md:px-6 border-gray-400 shadow-sm shadow-slate-500 transition-all
                    hover:shadow-md hover:shadow-slate-400'>
                    Filed
                </button>

                <button onClick={deleteReport} className='bg-inherit text-red-600 text-sm md:text-xl
                    border-2 px-3 md:px-6 border-gray-400 ml-8 shadow-sm shadow-slate-500 transition-all
                    hover:shadow-md hover:shadow-slate-400'>
                    Delete Report
                </button>

                <h2 className='bg-red-500 hidden md:block text-white px-8 py-2 text-center mx-auto
            lg:ml-[30%] w-fit rounded-lg my-auto'>
                    {reporttype}
                </h2>

            </div>


            <p className="mb-1 mt-3 md:mt-10 lg:mt-5">
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