
import React, { useContext, useEffect } from 'react'
import myContext from '../../context/data/myContext';
import Report from './Report';

const AdminDashboard = () => {

    const context = useContext(myContext)
    const { reports, getAllReports, reportType, setReportType,deleteReport} = context;

    const uniqueCategories = [...new Set(reports.map(report => report.incidentType))];

    const filteredReports = reports.filter((obj) => obj.incidentType.toLowerCase()
        .includes(reportType.toLowerCase()))

    useEffect(() => {
        getAllReports();
    }, [])

    return (
        <div className='mb-8 overflow-x-hidden'>

            <div className='mt-4'>
                <h2 className='text-lg md:text-4xl merriweather text-center'>Admin Dashboard</h2>
            </div>

            <div className='w-[30%] ml-[10%]'>

                <div className="flex items-center justify-between mb-4 px-4 py-3 mt-2 bg-gradient-to-r
                 from-blue-300 to-purple-400 text-slate-800 rounded-md shadow-md">
                    <p className= "text-lg font-semibold">
                        Explore Reports
                    </p>
                    <button
                        onClick={() => { setReportType('') }}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-200
            text-gray-50 hover:text-slate-950 transition-all
            text-sm font-medium rounded-md">
                        Reset Filters
                    </button>
                </div>

                <div className="mb-6">
                    <select
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                        className="px-6 py-3 rounded-md bg-slate-900 text-white
            border-transparent outline-0 focus:border-gray-500 
            text-sm min-w-40">
                        <option value="" className="text-center">All Categories</option>
                        {uniqueCategories.map((category, index) => (
                            <option key={index} value={category} className='text-center'>
                                {category}
                            </option>
                        ))}
                    </select>
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

export default AdminDashboard;