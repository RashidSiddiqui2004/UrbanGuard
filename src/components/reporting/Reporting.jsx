
import React, { useRef, useState } from 'react'
import MyMap from './Maps';
import getLocation from "./mapScript";
import PreviewReport from './PreviewReport';

import myContext from '../../context/data/myContext';
import { useContext } from 'react';
import getUsernameByUID from '../../utils/GetUser';
import { auth } from '../../firebase/FirebaseConfig';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Editor } from '@tinymce/tinymce-react';
import { uploadFile } from '../../utils/UploadFile';
import Navbar from '../Navbar';


const Reporting = () => {

    const context = useContext(myContext);
    const { sendReport } = context;

    const [incidentType, setIncidentType] = useState('');
    // const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [mediaFile, setMediaFile] = useState(null);
    const [latitude, setLatitude] = useState(-1);
    const [longitude, setLongitude] = useState(-1);
    const [anonymousReporting, setAnonymousReporting] = useState(false);

    const [imageUrl, setImageUrl] = useState([]);

    const [showPreview, setShowPreview] = useState(false);

    const uid = auth?.currentUser?.uid;

    const [u_name, setUser] = useState('');

    getUsernameByUID(uid).then((username) => {
        if (username) {
            setUser(username);
        } else {
            console.log(`User with UID ${uid} not found.`);
        }
    });

    const handleMediaChange = async (e) => {

        try {
            // Upload the file and wait for the promise to resolve
            const url = await uploadFile(e.target.files[0]);

            // Once the promise is resolved, update the state
            setMediaFile(e.target.files[0]);

            // Check if the URL is not null before updating the state
            if (url !== null) {
                // Append the new URL to the existing array of URLs
                setImageUrl(prev => [...prev, url]);
                console.log(imageUrl);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            // Handle the error as needed, e.g., display an error message to the user
        }
    }

    const handlePreview = async () => {

        // const url = await uploadFile(mediaFile);

        const content = editorRef.current.getContent();

        setDescription(content);

        console.log(content);

        // if (!(url === null)) setImageUrl(url);

        setShowPreview(true);
    };

    // Reference to the TinyMCE editor
    const editorRef = useRef(null);

    const handleConfirmation = async (e) => {
        e.preventDefault();

        if (description.trim() === '') return;

        const reportSent = await sendReport(uid, u_name, incidentType, description, latitude, longitude, imageUrl, anonymousReporting);

        if (reportSent===true) {
            // if report submitted, redirect to home page & give a toast message 
            setTimeout(() => {
                window.location.reload();
            }, 1000);

            toast.success('Report submitted successfully!', {
                position: 'top-right',
                autoClose: 2000, // Close the toast after 2 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } 
        // else { 
        //     toast.error('Error submitting the report. Please try again later.', {
        //         position: 'top-right',
        //         autoClose: 3000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //     });
        // }
    };

    return (

        <div>

            <Navbar />

            <div className='lg:flex lg:flex-row' id='container'>

                <div className="lg:w-[50%] mx-[2%] lg:mx-auto mt-1 p-6 rounded-md">

                    <h1 className='text-2xl mb-3 font-bold font-serif'>UrbanGuard</h1>

                    <h1 className="text-lg lg:text-2xl font-bold mb-4">Report an Incident</h1>

                    <form className="space-y-4">

                        {/* report type */}
                        <div>
                            <div className="mb-4">

                                <label htmlFor="incidentType" className="block text-sm font-medium text-gray-200">
                                    Incident Type
                                </label>

                                <select
                                    id="incidentType"
                                    value={incidentType}
                                    onChange={(e) => setIncidentType(e.target.value)}
                                    className="mt-1 p-2 w-full border rounded-md text-slate-700 
                                focus:outline-none focus:ring focus:border-blue-300 text-sm lg:text-lg"
                                    required
                                >
                                    <option value="" disabled>Select an incident type</option>
                                    <option value="Accident">Accident</option>
                                    <option value="Crime">Crime</option>
                                    <option value="Infrastructure Issue">Infrastructure Issue</option>
                                    <option value="Suspicious activities">Suspicious activities</option>
                                    <option value="Cybersecurity Concerns">Cybersecurity Concerns</option>
                                    <option value="Social Issues">Social Issues </option>

                                </select>
                            </div>

                        </div>

                        {/* location */}
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-200 mb-3">
                                Location
                            </label>

                            <button onClick={(e) => {
                                e.preventDefault();
                                getLocation()
                                    .then((location) => {
                                        setLatitude(location.latitude);
                                        setLongitude(location.longitude);
                                    })
                                    .catch((error) => {
                                        alert(error);
                                    });
                            }}
                                className='bg-slate-200 text-slate-950 text-sm 
                            lg:text-xl w-[100%]'>Get My Location</button>

                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium
                         text-gray-200 mb-2">
                                Description
                            </label>


                            <div className='block lg:hidden'>
                                <Editor
                                    apiKey='aflhte2kchgwcgg6wo27mxqz79lhro2h443k16fftegeoo6x'
                                    onInit={(evt, editor) => (editorRef.current = editor)}
                                    init={{
                                        menubar: false,
                                        height: 650,
                                        width: 310,
                                        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                                    }}
                                    initialValue="Give report description"
                                />
                            </div>

                            <div className='hidden lg:block'>
                                <Editor
                                    apiKey='aflhte2kchgwcgg6wo27mxqz79lhro2h443k16fftegeoo6x'
                                    onInit={(evt, editor) => (editorRef.current = editor)}
                                    init={{
                                        menubar: false,
                                        height: 550,
                                        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                                    }}
                                    initialValue="Give report description"
                                />
                            </div>

                        </div>

                        <div>
                            <label htmlFor="mediaFile" className="block text-sm font-medium text-gray-200">
                                Upload Media (optional)
                            </label>
                            <input
                                type="file"
                                id="mediaFile"
                                onChange={(e) => { handleMediaChange(e) }}
                                className="mt-1"
                            />

                            {
                                (imageUrl.length >= 1) ?

                                    <p className='my-1'>Upload more media files (optional)</p>
                                    :
                                    ""
                            }

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
                    </form>


                    <button className="w-full my-4 bg-pink-200 text-slate-950 text-xl" onClick={handlePreview}>
                        Preview Report
                    </button>

                    {
                        showPreview && (
                            <PreviewReport
                                reporttype={incidentType} images={imageUrl}
                                latitude={latitude} longitude={longitude} anonymousReporting={anonymousReporting}
                                description={description} handleConfirmation={handleConfirmation} />
                        )
                    }

                </div >


                <div className='lg:w-[50%] pt-2 mt-2'>
                <h2 className='text-xl font-semibold text-center mb-2'>Get your current Location</h2>

                {
                    (latitude != -1) ?
                        <MyMap latitude={latitude} longitude={longitude} />
                        : ""
                }

            </div>

            </div >

        </div>

    );
}

export default Reporting


// const data = new FormData()
// data.append("file", mediaFile)
// data.append("upload_preset", "rashidSid")
// data.append("cloud_name", "rashidCloud")

// fetch("https://api.cloudinary.com/v1_1/rashidCloud/image/upload", {
//     method: "post",
//     headers: {
//         'Authorization': `Basic ${btoa(`${apiKey}:${apiSecret}`)}`,
//     },
//     body: data,
// }).then((res) => res.json())
//     .then((result) => {
//         console.log(result)
//     }).catch((error) => {
//         console.log(error);
//     })

// uploadOnCloudinary(mediaFile);