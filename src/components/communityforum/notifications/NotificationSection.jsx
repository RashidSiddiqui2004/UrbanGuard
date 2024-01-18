
import React, { useContext, useState } from 'react'
import Notification from './Notification';
import myContext from '../../../context/data/myContext';

const NotificationSection = () => {

    const [user_name, setUser] = useState('');

    const context = useContext(myContext);

    const { notifications } = context;

    // const addNotification = (message) => {
    //     const newNotification = { id: Date.now(), message };

    //     setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    // };

    // const removeNotification = (notificationId) => {
    //     setNotifications((prevNotifications) => prevNotifications.filter((n) => n.id !== notificationId));
    // };

    return (
        <div className='py-4 mt-12 md:mt-2 text-wrap md:w-full'>
            <h1 className='text-lg md:text-4xl merriweather text-center'>Notifications</h1>

            <div className='my-10'>
                 {notifications.map((notf, index) => {
                return (
                    <div key={notf.reportID}>
                        <Notification reportID={notf.reportID} />
                    </div>

                )
            })}

            </div>
           
        </div>
    )
}

export default NotificationSection