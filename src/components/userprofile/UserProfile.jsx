import React, { useContext, useEffect, useState } from 'react';
import {
    FaCalendar, FaRegComments,
    FaThumbsUp, FaRegNewspaper, FaUsers, FaUserFriends
} from 'react-icons/fa';

import { IoMdArrowDropdown } from "react-icons/io";
import myContext from '../../context/data/myContext';
import { auth } from '../../firebase/FirebaseConfig';
import Post from '../communityforum/communityPosts/Post';

const UserProfile = () => {

    const context = useContext(myContext);

    const { myposts, getMyPosts, getUserDetails} = context;

    const [showPosts, setShowposts] = useState(false);

    const userid = auth?.currentUser?.uid;

    const userDetails = localStorage.getItem("userProfile");

    const handlePosts = async () => {

        setShowposts((prev) => !prev); 

        if (showPosts === false) {
            return;
        }

        const fetchedPosts = await getMyPosts(userid);

        if (fetchedPosts) {
            setShowposts(true);
        }
    }

    const [metaData, setMetadata] = useState({
        postsCount: 0,
        commentsCount: 0,
        likesCount: 0,
        postCommentsCount: 0,
        followersCount: 0,
        followingsCount: 0,
        username: "Username",
        emailId: "email@gmail.com",
        joinDate: "January 1, 2024"
    });
    
    useEffect(() => {

        const getUserdata = async () => {
            const userData = await getUserDetails(userid);   
            setMetadata(userData);
        };
 
        getUserdata();
    }, []);  
    

    return (
        <div className='px-[5%] py-5 merriweather'>
            <h1 className='text-center text-2xl mb-5 font-bold'>User Profile</h1>

            <div className='flex items-center justify-center mb-5 mt-9'>
                <img
                    src="https://res.cloudinary.com/drlkkozug/image/upload/v1705071144/y9evmbpdht5ezj3fkal9.jpg"
                    alt='Profile'
                    className='w-14 h-14 rounded-full object-cover mr-4'
                />
                <div>
                    <h2 className='text-lg font-semibold'>{userDetails?.username || metaData?.username}</h2>
                    <p className='text-gray-300 py-1'>{userDetails?.emailId || metaData?.emailId}</p>
                </div>
            </div>

            <div className='grid grid-cols-1 ml-[30%] lg:ml-0 lg:grid-cols-3 
            justify-center lg:space-x-8 mb-5 mt-10'>
                <div className='flex items-center space-x-2 my-3 lg:my-0'>
                    <FaRegNewspaper className='text-xl' />
                    <p>{metaData?.postsCount} Posts</p>
                </div>
                <div className='flex items-center space-x-2 my-3 lg:my-0'>
                    <FaThumbsUp className='text-xl' />
                    <p>{metaData?.likesCount} Likes</p>
                </div>
                <div className='flex items-center space-x-2 my-3 lg:my-0'>
                    <FaRegComments className='text-xl' />
                    <p>{metaData?.commentsCount} Comments</p>
                </div>
            </div>

            <div className='flex justify-center space-x-16 mb-5 mt-4'>
                <div className='flex items-center space-x-2'>
                    <FaUsers className='text-xl' />
                    <p>{metaData?.followersCount} Followers</p>
                </div>
                <div className='flex items-center space-x-2'>
                    <FaUserFriends className='text-xl' />
                    <p>{metaData?.followingsCount} Followings</p>
                </div>
            </div>

            <div className='flex items-center space-x-2 mb-5'>
                <FaCalendar className='text-xl' />
                <p>Joined on {userDetails?.joinDate || metaData?.joinDate}</p>
            </div>

            {/* User posts */}

            <div className='w-full bg-gray-700 rounded-lg flex flex-row justify-center cursor-pointer'
                onClick={handlePosts}>

                <h3 className='text-center py-3 text-lg'>My Posts</h3>

                <div className={`my-3 ml-4 text-3xl ${showPosts ? '-rotate-90' : ''}`}>
                    <IoMdArrowDropdown />
                </div>

            </div>

            {showPosts ?

                myposts.length > 0 ? (

                    // Render user posts if there are any

                    myposts.map((postItem, index) => (
                        <div key={index}>
                            <Post post={postItem} />
                        </div>
                    ))
                ) : (
                    // Render a message if there are no user posts
                    <div>
                        <h2 className='text-center text-3xl text-white my-10'>You have no posts right now!</h2>
                        <h2 className='text-center text-3xl text-white my-10'>Write your first post now.</h2>
                    </div>
                ) :
                <div>
                    <h2 className='text-center text-xl text-slate-600 my-10'>Your posts will appear here...</h2>
                 </div>
            }


        </div>
    );
};

export default UserProfile;
