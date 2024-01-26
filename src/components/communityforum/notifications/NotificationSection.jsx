
import React, { useContext, useState } from 'react'
import Notification from './Notification';
import myContext from '../../../context/data/myContext';

const NotificationSection = () => {

    const [user_name, setUser] = useState('');

    const context = useContext(myContext);

    const { notifications, deleteNotification} = context;

    return (
        <div className='py-4 mt-12 md:mt-2 text-wrap md:w-full'>
            <h1 className='text-lg md:text-4xl merriweather text-center'>Notifications</h1>

            <div className='my-10'>
                {notifications.length === 0 ? (
                    <p className="text-center text-xl text-gray-600">No notifications available</p>
                ) : (
                    notifications.map((notf, index) => (
                        <div key={notf.reportID}>
                            <Notification reportID={notf.reportID} reportUserId={notf.userId} deleteNotification={deleteNotification}/>
                        </div>
                    ))
                )} 
            </div>
           
        </div>
    )
}

export default NotificationSection