
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion'; 
import { auth } from '../../firebase/FirebaseConfig';
import getUsernameByUID from '../../utils/GetUser';
import { MdCircleNotifications } from "react-icons/md";
import myContext from '../../context/data/myContext';

const Sidebar = () => {

    // to get the username from Database (optimised using caching)
    // async function getUsernameByUID(uid) {
    //     // Reference to the "users" collection

    //     const usersCollection = collection(fireDB, 'users');

    //     const userQuery = query(usersCollection, where('uid', '==', uid));

    //     try {
    //         const querySnapshot = await getDocs(userQuery);

    //         if (!querySnapshot.empty) {
    //             // Retrieve the first (and hopefully only) document
    //             const userDoc = querySnapshot.docs[0];
    //             const username = userDoc.data().name;
    //             return username;
    //         } else {
    //             console.log('User not found.');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching user:', error);
    //     }

    //     return null;

    // }

    const [user_name, setUser] = useState('');

    const context = useContext(myContext);

    const { getMyNotifications,notifications} = context;

    useEffect(() => { 
 
        const fetchData = async () => {
            // Get user ID from local storage
            const storedUserID = localStorage.getItem('user');
            const userID = storedUserID ? JSON.parse(storedUserID).user.uid : null;

            // Fetch username and set it to the state and local storage
            const fetchUsername = async () => {
                const cachedUsername = localStorage.getItem('username');
                if (cachedUsername == null) {
                    try {
                        const uid = auth.currentUser.uid;
                        const username = await getUsernameByUID(uid);
                        if (username) {
                            setUser(username);
                            localStorage.setItem('username', username);
                        } else {
                            console.log(`User with UID ${uid} not found.`);
                        }
                    } catch (error) {
                        console.error('Error fetching username:', error);
                    }
                } else {
                    setUser(cachedUsername);
                }
            };

            // Fetch notifications
            const fetchNotifications = async () => {
                try {
                    const flag = await getMyNotifications(userID); 
                } catch (error) {
                    console.error('Error fetching notifications:', error);
                }
            };

            // Execute the functions
            await fetchUsername();
            await fetchNotifications();
        };

        fetchData();

    }, []);

    return (
        <div className='fixed'>

            <Link to={'/'}>
                <div className='flex justify-center'>
                    <h2 className='text-md lg:text-xl mt-4 text-slate-800 
                        text-center font-bold my-5 hidden lg:block'>Urban Guard</h2>
                    {
                        notifications.length > 0
                            ?
                            <Link to={'/notifications'}>
                                <MdCircleNotifications className='my-5 mx-2 text-2xl text-slate-800' />
                            </Link>
                            :
                            ""
                    }

                </div>
            </Link>

            <div
                className='bg-slate-800 py-3 px-4 mx-6 rounded-lg my-3 shadow-md
                 shadow-purple-600 hover:scale-95 transition-all mt-16 md:mt-0'>
                <Link to={'/user-profile'} className='flex flex-row gap-6 justify-center'>
                    <div className="w-6 h-6">
                        <img src="https://res.cloudinary.com/drlkkozug/image/upload/v1705071144/y9evmbpdht5ezj3fkal9.jpg" alt="user Avatar" className='rounded-full' />
                    </div>

                    <h3 className='text-center text-xl text-white'>{user_name}</h3>
                </Link>
            </div>


            <div
                initial={{ x: -200 }}
                animate={{ x: 0 }}
                transition={{
                    duration: 1.5,
                }}
                className='bg-slate-800 py-5 px-4 mx-6 rounded-lg my-3 shadow-md
                 shadow-purple-600 hover:scale-95 transition-all'>
                <Link to={'/community-posts'}>
                    <h3 className='text-center text-2xl text-white'>Community Posts</h3>
                </Link>
            </div>

            <div
                initial={{ x: -200 }}
                animate={{ x: 0 }}
                transition={{
                    duration: 1.5,
                }}
                className='bg-slate-800 py-5 px-4 mx-6 rounded-lg my-3 shadow-md shadow-slate-600 hover:scale-95 transition-all'>
                <Link to={'/community-discussion'}>
                    <h3 className='text-center text-2xl text-white'>General Discussions</h3>
                </Link>
            </div>

            <div
                initial={{ x: -200 }}
                animate={{ x: 0 }}
                transition={{
                    duration: 1.5,
                }}
                className='bg-slate-800 py-5 px-4 mx-6 rounded-lg my-3 shadow-md shadow-blue-500 hover:scale-95 transition-all'>
                <Link to={'/community-qna'}>
                    <h3 className='text-center text-2xl text-white'> FAQs </h3>
                </Link>
            </div>


            <div className="mt-6 flex-col items-center merriweather hidden lg:flex
            justify-between h-full bg-gray-800 text-white p-4 flex-grow">
                <div className="">
                    <img src="/logo.jpg" alt="Urban Guard Logo"
                        className="w-12 h-12 rounded-full mb-2 ml-10" />
                    <h1 className="text-xl font-semibold">Urban Guard</h1>
                </div>

                <nav className="space-y-1">
                    <a href="/" className="block text-sm">Home</a>
                    <a href="/report" className="block text-sm">Incident Reports</a>
                    <a href="/emergency-resources" className="block text-sm">Resources</a>
                </nav>

                <div className="text-center mt-6">
                    <p className="text-sm mb-2">Contact us: contact@urbanguard.com</p>
                    <p className="text-xs">&copy; {new Date().getFullYear()} Urban Guard. All rights reserved.</p>
                </div>
            </div>


        </div>

    )
}

export default Sidebar