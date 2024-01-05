
import React from 'react'

const PreviewReport = ({ reporttype, description, latitude, longitude, anonymousReporting,
    handleConfirmation }) => {
    return (
        <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-slate-800">
            <h3 className="text-xl font-semibold mb-2 text-center">Report Preview</h3>

            <h2 className='bg-red-500 text-white px-8 py-2 ml-[80%] w-fit rounded-lg'>{reporttype}</h2>

            <p className="mb-1">
                Location:{' '}
                {latitude
                    ? `Lat: ${latitude}, Lng: ${longitude}`
                    : 'Not available'}
            </p>
            <p>{anonymousReporting ? 'Anonymous Report' : 'Not anonymous'}</p>

            {description ?
                <div>
                    <p>{description}</p>
                </div> : ""}

            {/* <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md mt-2"
                onClick={handleConfirmation}
            >
                Confirm Report
            </button> */}

            <button className="w-full my-4 bg-blue-500 text-slate-950 text-xl" onClick={handleConfirmation}>
                Confirm Report
            </button>


        </div>
    )
}

export default PreviewReport