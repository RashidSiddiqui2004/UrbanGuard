
import React, { useContext, useEffect, useState } from 'react'
import { ImAttachment } from "react-icons/im";
import { MdNextPlan } from "react-icons/md";
import { useParams } from 'react-router-dom';
import RenderHTMLContent from '../../../utils/RenderHTMLContent';
import myContext from '../../../context/data/myContext';

const MyReport = () => {

    const { id } = useParams();
    const [imageCnt, setImgCnt] = useState(0);
    const context = useContext(myContext);
    const { getReportbyId } = context;

    const [report, setReport] = useState(null);
    const [firstImage, setFI] = useState("");
    const [additionalImages, setAI] = useState(0);

    const handleSlider = () => {
        setImgCnt((prev) => (prev + 1) % (additionalImages + 1));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const reportData = await getReportbyId(id);

                setReport(reportData);

                const images = reportData?.imageUrl;
                const imagesLength = images?.length || 0;

                setAI(imagesLength - 1);
                setFI(images?.[imageCnt] || '');
            } catch (error) {
                console.error('Error fetching report data:', error);
            }
        };

        fetchData();
    }, []);

    return (

        <div className="mt-4 p-4 border border-gray-300 rounded-lg
             bg-slate-900 w-[80%] shadow-sm shadow-blue-400 mx-[10%]">
            <h3 className="text-xl font-semibold mb-2 text-center">Report</h3>

            <div className='flex flex-row justify-center'>

                <button className='bg-inherit text-green-600 text-sm md:text-xl
                    border-2 px-3 md:px-6 border-gray-400 shadow-sm shadow-slate-500 transition-all
                    hover:shadow-md hover:shadow-slate-400'>
                    Report Filed
                </button>

                <h2 className='bg-red-500 hidden md:block text-white px-8 py-2 text-center mx-auto
            lg:ml-[50%] w-fit rounded-lg my-auto'>
                    {report?.incidentType}
                </h2>

            </div>


            <p className="mb-1 mt-3 md:mt-10 lg:mt-5">
                Location:{' '}
                {report?.latitude
                    ? `Lat: ${report?.latitude}, Lng: ${report?.longitude}`
                    : 'Not available'}
            </p>

            {
                report?.anonymousReporting
                    ?
                    <p className='text-center mt-3 mb-2 border-2 border-slate-400 py-2 px-2 rounded-lg'>Anonymous Reporting</p>
                    :

                    ""
            }

            {report?.description ?
                <div className='my-4 px-3 py-2 font-semibold'>
                    <RenderHTMLContent htmlContent={report?.description} />
                </div> : ""}

            {report?.imageUrl ?

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

                        {additionalImages > 0 && (
                            <div className='w-fit h-fit my-[20%] ml-1 lg:ml-8 flex
                            bg-red-500 text-white rounded-full p-2 cursor-pointer'
                                onClick={handleSlider}>
                                <MdNextPlan className='text-2xl' />
                                +{additionalImages}
                            </div>
                        )}
                    </div>

                </div>
                :
                ""}
        </div>

    )
}

export default MyReport;
