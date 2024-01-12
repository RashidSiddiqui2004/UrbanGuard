
import React from 'react'
import { ImAttachment } from "react-icons/im";
import RenderHTMLContent from '../../utils/RenderHTMLContent';


const PreviewReport = ({ reporttype, description, latitude, longitude, anonymousReporting,
    handleConfirmation, imageUrl }) => {
 
    return (
        <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-slate-800">
            <h3 className="text-xl font-semibold mb-2 text-center">Report Preview</h3>
           

            <h2 className='bg-red-500 text-white px-8 py-2 ml-[70%] w-fit rounded-lg'>
                {reporttype}
            </h2>

            <p className="mb-1">
                Location:{' '}
                {latitude
                    ? `Lat: ${latitude}, Lng: ${longitude}`
                    : 'Not available'}
            </p>
            <p className='text-center mt-3 mb-2'>{anonymousReporting ? 'Anonymous Reporting' : ''}</p>

            {description ?
                <div className='my-4 px-3 py-2 font-semibold'> 
                    <RenderHTMLContent htmlContent={description} />
                </div> : ""}

            {imageUrl ?

                <div>
                    <div className='flex flex-row justify-center'>
                        <ImAttachment className='my-1 mx-2' />
                        <h2 className='text-center text-xl text-slate-300'>Attachments</h2>
                    </div>

                    <img src={imageUrl} alt="Report media uploaded"
                        className='w-[60%] text-center mx-[20%] py-3 rounded-xl' srcSet="" />
                </div>


                :

                ""}

            <button className="w-full my-4 bg-blue-500 text-slate-950 text-xl" onClick={handleConfirmation}>
                Confirm Report
            </button>


        </div>
    )
}

export default PreviewReport