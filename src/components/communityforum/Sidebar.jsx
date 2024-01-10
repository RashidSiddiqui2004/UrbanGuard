
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion'; 

import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import myContext from '../../context/data/myContext';

const Sidebar = () => {

    const context = useContext(myContext)

    // to get the username from Database (optimised using caching)
    async function getUsernameByUID(uid) {
        // Reference to the "users" collection

        const usersCollection = collection(fireDB, 'users');

        const userQuery = query(usersCollection, where('uid', '==', uid));

        try {
            const querySnapshot = await getDocs(userQuery);

            if (!querySnapshot.empty) {
                // Retrieve the first (and hopefully only) document
                const userDoc = querySnapshot.docs[0];
                const username = userDoc.data().name;
                return username;
            } else {
                console.log('User not found.');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }

        return null;

    }

    const [user_name, setUser] = useState('');

    useEffect(() => {

        function usernameFunc() {

            const cacheCall = localStorage.getItem("username");
 
            if (cacheCall == null) {

                console.log('cacheCall1');

                let uid = auth.currentUser.uid;

                getUsernameByUID(uid).then((username) => {
                    if (username) {
                        setUser(username);
                        localStorage.setItem("username", username);
                    } else {
                        console.log(`User with UID ${uid} not found.`);
                    }
                });
            }
            else {
                setUser(cacheCall);
            }

        }

        usernameFunc();

    }, []);

    return (
        <div className='fixed'>

            <Link to={'/'}>
                <h2 className='text-md lg:text-xl mt-4 text-slate-800 
        text-center font-bold my-5'>Urban Guard</h2>
            </Link> 
            
            <div
                className='bg-slate-800 py-3 px-4 mx-6 rounded-lg my-3 shadow-md
                 shadow-purple-600 hover:scale-95 transition-all'>
                <Link to={'/user-profile'} className='flex flex-row gap-6 justify-center'>
                    <div className="w-6 h-6">
                        <img src="/user.jpg" alt="user Avatar" className='rounded-full' />
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
                }} className='bg-slate-800 py-5 px-4 mx-6 rounded-lg my-3 shadow-md shadow-violet-500 hover:scale-95 transition-all'>
                <Link to={'/community-safety-tips'}>
                    <h3 className='text-center text-2xl text-white'>Safety Alerts</h3>
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
                className='bg-slate-800 py-5 px-4 mx-6 rounded-lg my-3 shadow-md shadow-green-300 hover:scale-95 transition-all'>
                <Link to={'/community-events'}>
                    <h3 className='text-center text-2xl text-white'>Community Events</h3>
                </Link>
            </div>

            {/* <div
                initial={{ x: -200 }}
                animate={{ x: 0 }}
                transition={{
                    duration: 1.5,
                }}
                className='bg-slate-800 py-5 px-4 mx-6 rounded-lg my-3 shadow-md shadow-blue-500 hover:scale-95 transition-all'>
                <Link to={'/community-qna'}>
                    <h3 className='text-center text-2xl text-white'> Q & A</h3>
                </Link>
            </div> */}


            <div className='justify-center text-slate-900 
            font-bold my-12 font-serif'>
                <h2 className='text-center text-2xl'> &copy; {new Date().getFullYear()} Urban Guard</h2>
                <h2 className='text-center text-lg'>All rights reserved</h2>
            </div>


        </div>

    )
}

export default Sidebar