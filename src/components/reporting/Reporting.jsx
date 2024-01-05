
import React, { useEffect, useState } from 'react'
// import MyMap from './Maps';
import getLocation from "./mapScript";
import PreviewReport from './PreviewReport';

const Reporting = () => {

    const [incidentType, setIncidentType] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [mediaFile, setMediaFile] = useState(null);
    const [latitude, setLatitude] = useState(-1);
    const [longitude, setLongitude] = useState(77);
    const [anonymousReporting, setAnonymousReporting] = useState(false);

    const [showPreview, setShowPreview] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Incident reported:', {
            incidentType,
            latitude,
            longitude,
            description,
            mediaFile,
            anonymousReporting,
        });
    };

    const handlePreview = () => {
        setShowPreview(true);
    };

    const handleConfirmation = () => {
        console.log('Report submitted!');
    };

    useEffect(() => {

    }, [latitude, longitude]);

    return (

        <div className='md:flex md:flex-row' id='container'>

            <div className="w-[50%] mx-auto mt-1 p-6 rounded-md">

                <h1 className='text-2xl mb-3 font-bold font-serif'>UrbanGuard</h1>

                <h1 className="text-2xl font-bold mb-4">Report an Incident</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="incidentType" className="block text-sm font-medium text-gray-200">
                            Incident Type
                        </label>
                        <select
                            id="incidentType"
                            value={incidentType}
                            onChange={(e) => setIncidentType(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md text-slate-700"
                            required
                        >
                            <option value="" disabled>Select an incident type</option>
                            <option value="Accident">Accident</option>
                            <option value="Crime">Crime</option>
                            <option value="InfrastructureIssue">Infrastructure Issue</option>
                        </select>
                    </div>

                    {/* <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-600">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter incident location"
                            className="mt-1 p-2 w-full border rounded-md text-slate-900"
                            required
                        />
                    </div> */}

                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-200 mb-3">
                            Location
                        </label>

                        <button onClick={() => {
                            getLocation()
                                .then((location) => {
                                    setLatitude(location.latitude);
                                    setLongitude(location.longitude);
                                })
                                .catch((error) => {
                                    alert(error);
                                });

                        }}
                            className='bg-slate-200 text-slate-950'>Get My Location</button>

                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium
                         text-gray-200 ">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Provide a detailed description"
                            rows="4"
                            className="mt-1 p-2 w-full border rounded-md text-slate-900"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="mediaFile" className="block text-sm font-medium text-gray-200">
                            Upload Media (optional)
                        </label>
                        <input
                            type="file"
                            id="mediaFile"
                            onChange={(e) => setMediaFile(e.target.files[0])}
                            className="mt-1"
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="anonymousReporting"
                            checked={anonymousReporting}
                            onChange={() => setAnonymousReporting(!anonymousReporting)}
                            className="mr-2"
                        />
                        <label htmlFor="anonymousReporting" className="text-md text-gray-200">
                            Report Anonymously
                        </label>
                    </div>

                    {
                        anonymousReporting ?
                            <h2>
                                Your report will be anonymous.
                            </h2>
                            : ""
                    }

                    {/* <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Submit Report
                    </button> */}

                </form>


                <button className="w-full my-4 bg-pink-200 text-slate-950 text-xl" onClick={handlePreview}>
                    Preview Report
                </button>

                {showPreview && (
                    <PreviewReport 
                    reporttype = {incidentType}
                    latitude={latitude} longitude={longitude} anonymousReporting={anonymousReporting}
                    description={description} handleConfirmation={handleConfirmation}/>
                )}

            </div>


            <div className='w-[50%] pt-2'>
                <h2 className='text-xl font-semibold text-center mb-2'>Get your current Location</h2>

                {/* {
                    (latitude!=-1) ?
                    <MyMap latitude={latitude} longitude={longitude} />
                     : ""
                } */}

            </div>

        </div>

    );
}

export default Reporting