
import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/data/myContext';
import Report from './Report';

const DepartmentAdminDB = () => {

    const context = useContext(myContext)
    const { reports, getAllReports, deleteReport, getMyDept, getFiledReports } = context;

    const [department, setDept] = useState('');
    const [deptName, setDeptname] = useState('');

    const user_emailID = JSON.parse(localStorage.getItem('user')).user.email;

    let deptReports = reports.filter((obj) => obj.incidentType.toLowerCase()
        .includes(deptName.toLowerCase()));

    const [filedreports, setFiledReports] = useState(false);

    const fetchFiledReports = async () => {

        try { 
            const reports = await Promise([
                getFiledReports(),
            ]);

        } catch (error) {
            console.log(error);;
        }
        finally {
            const originalData = reports.filter((obj) => obj.incidentType.toLowerCase()
                .includes(deptName.toLowerCase()));

            setFiledReports(originalData);
           
        }
    }

    const fetchUnFiledReports = async () => {

        await getAllReports();

        deptReports = reports.filter((obj) => obj.incidentType.toLowerCase()
            .includes(deptName.toLowerCase()));

        setFiledReports(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simultaneously fetch data from both functions
                const [reportsdata, deptData] = await Promise.all([
                    getAllReports(),
                    getMyDept(user_emailID)
                ]);

                setDept(deptData?.department);
                setDeptname(deptData?.departmentName);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className='mb-8 overflow-x-hidden'>

            <div className='mt-4'>
                <h2 className=' mt-10 md:mt-0 text-lg md:text-4xl merriweather text-center'>{department} Dashboard</h2>
            </div>

            <div className='lg:w-[80%] ml-[10%] mt-3'>

                <div className="flex gap-x-2 items-center justify-between mb-4 px-4 py-3 mt-2 
                 text-gray-600 rounded-md">


                    <button className='bg-blue-500 text-white shadow-md hover:bg-blue-600 transition-all'
                        onClick={fetchFiledReports}
                    >
                        Retrieve Filed Reports
                    </button>


                    <button className='bg-purple-500 text-white shadow-md hover:bg-purple-600 transition-all'
                        onClick={fetchUnFiledReports}
                    >
                        Retrieve Unfiled Reports
                    </button>

                </div>

            </div>

            {((filedreports === false) && deptReports && deptReports.length > 0) ? (

                deptReports.map((reportItem, index) => {

                    const { incidentType, imageUrl, latitude, longitude,
                        anonymousReporting, description, uid, id, filed } = reportItem;

                    const handleDelete = async () => {
                        deleteReport(reportItem);
                    }

                    return (
                        <div key={index}>
                            <Report
                                reporttype={incidentType}
                                images={imageUrl}
                                latitude={latitude}
                                longitude={longitude}
                                anonymousReporting={anonymousReporting}
                                description={description}
                                deleteReport={handleDelete}
                                reportUserID={uid}
                                reportID={id}
                                filed={filed}
                            />
                        </div>
                    );
                })
            ) : ""}

            {(filedreports && filedreports.length > 0) ? (
                filedreports.map((reportItem, index) => {

                    const { incidentType, imageUrl, latitude, longitude,
                        anonymousReporting, description, uid, id, filed } = reportItem;

                    const handleDelete = async () => {
                        deleteReport(reportItem);
                    }

                    return (
                        <div key={index}>
                            <Report
                                reporttype={incidentType}
                                images={imageUrl}
                                latitude={latitude}
                                longitude={longitude}
                                anonymousReporting={anonymousReporting}
                                description={description}
                                deleteReport={handleDelete}
                                reportUserID={uid}
                                reportID={id}
                                filed={filed}
                            />
                        </div>
                    );
                })
            ) : ""}

            {
                (filedreports !== false && filedreports.length === 0) ||
                    (deptReports && deptReports.length === 0)

                    ?

                    <div>
                        <h2 className='text-center text-2xl text-white my-10 merriweather'>Hurray, no reports filed as of now. Happy Hours..</h2>
                    </div>
                    :

                    ""
            }

        </div>
    )
}

export default DepartmentAdminDB;