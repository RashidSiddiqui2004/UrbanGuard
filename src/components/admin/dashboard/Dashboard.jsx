import React, { useContext, useEffect, useState } from 'react'
// import {FaUserTie } from 'react-icons/fa';

import { FaUserTie, FaClipboardList, FaUsers, FaWpforms } from 'react-icons/fa';

import myContext from '../../../context/data/myContext';
import Layout from '../../../components/layout/Layout';
import DashboardTab from './DashboardTab';
import {
    collection, getDocs,
    query,
} from 'firebase/firestore';
import { fireDB } from '../../../firebase/FirebaseConfig';



function Dashboard() {
    const context = useContext(myContext)
    const { mode } = context
    const locationsRef = collection(fireDB, 'posts');
    const locationsQuery = query(locationsRef);

    const usersRef = collection(fireDB, 'users');
    const userQuery = query(usersRef);

    const packagesRef = collection(fireDB, 'challenges');
    const packagesQuery = query(packagesRef);

    const [numPosts, setNumPosts] = useState(null);
    const [numUsers, setUsers] = useState(null);
    const [numChallenges, setChallenges] = useState(null);

    useEffect(() => {
        getDocs(locationsQuery)
            .then((querySnapshot) => {
                const numberOfItems = querySnapshot.size;
                setNumPosts(numberOfItems);
            })
            .catch((error) => {
            });

        getDocs(userQuery)
            .then((querySnapshot) => {
                const userCnt = querySnapshot.size;
                setUsers(userCnt);
            })
            .catch((error) => {
            });

        getDocs(packagesQuery)
            .then((querySnapshot) => {
                const pkgCnt = querySnapshot.size;
                setChallenges(pkgCnt);
            })
            .catch((error) => {
            });

    }, [])
    return (
        <Layout>
            <section className="text-gray-600 body-font mt-10 mb-10">
                <div className="container px-5 mx-auto mb-10">
                    <div className="flex flex-wrap -m-4 text-center">
                        <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                            <div className="border-2 hover:shadow-purple-600 shadow-md bg-gray-100 border-gray-300 px-4 py-3 rounded-xl dark:bg-gray-800 dark:text-white">
                                <div className="text-purple-500 w-12 h-12 mb-3 inline-block">
                                    <FaWpforms size={50} />
                                </div>
                                <h2 className="text-3xl text-black font-semibold fonts1">
                                    {numPosts}
                                </h2>
                                <p className="text-purple-500 font-bold">Total Posts</p>
                            </div>
                        </div>

                        <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                            <div className="border-2 hover:shadow-purple-600 shadow-md bg-gray-100 border-gray-300 px-4 py-3 rounded-xl dark:bg-gray-800 dark:text-white">
                                <div className="text-purple-500 w-12 h-12 mb-3 inline-block">
                                    <FaClipboardList size={50} />
                                </div>
                                <h2 className="text-3xl text-black font-semibold fonts1">
                                    {numChallenges}
                                </h2>
                                <p className="text-purple-500 font-bold">Total Challenges</p>
                            </div>
                        </div>

                        <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                            <div className="border-2 hover:shadow-purple-600 shadow-md bg-gray-100 border-gray-300 px-4 py-3 rounded-xl dark:bg-gray-800 dark:text-white">
                                <div className="text-purple-500 w-12 h-12 mb-3 inline-block">
                                    <FaUsers size={50} />
                                </div>
                                <h2 className="text-3xl text-black font-semibold fonts1">
                                    {numUsers}
                                </h2>
                                <p className="text-purple-500 font-bold">Total Users</p>
                            </div>
                        </div>


                    </div>
                </div>
                <DashboardTab />
            </section>
        </Layout>
    )
}

export default Dashboard