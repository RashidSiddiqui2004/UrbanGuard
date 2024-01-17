
import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/data/myContext';
import Report from './Report';

const DepartmentAdminDB = () => {

    const context = useContext(myContext)
    const { reports, getAllReports, deleteReport, getMyDept } = context;

    const [department, setDept] = useState('');
    const [deptName, setDeptname] = useState('');

    const filteredReports = reports.filter((obj) => obj.incidentType.toLowerCase()
        .includes(deptName.toLowerCase()))

    const user_emailID = JSON.parse(localStorage.getItem('user')).user.email;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simultaneously fetch data from both functions
                const [reports, deptData] = await Promise.all([
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
                <h2 className='text-lg md:text-4xl merriweather text-center'>{department} Dashboard</h2>
            </div>

            <div className='w-[80%] ml-[10%] mt-3'>

                <div className='lg:flex lg:flex-row justify-end'>

                    <div className='ml-[30%]'>
                        <h3 className='border-2 border-slate-300 text-slate-100
                       py-3 px-3 rounded-lg'>{department}</h3>
                    </div>

                </div>

            </div>

            {(filteredReports.length > 0) ? (
                filteredReports.map((reportItem, index) => {
                    const { incidentType, imageUrl, latitude, longitude,
                        anonymousReporting, description } = reportItem;

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
                            />
                        </div>
                    );
                })
            ) : (
                <div>
                    <h2 className='text-center text-2xl text-white my-10 merriweather'>Hurray, no reports filed as of now. Happy Hours..</h2>
                </div>
            )}

        </div>
    )
}

export default DepartmentAdminDB;