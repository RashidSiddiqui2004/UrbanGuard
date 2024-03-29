
import React, { useContext } from 'react'
import { FaHandHoldingHeart, FaHeartCircleBolt } from "react-icons/fa6";
import { auth, fireDB } from '../../../firebase/FirebaseConfig';
import myContext from '../../../context/data/myContext';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import CommentForm from './CommentForm';
import CommentSection from './CommentSection';
import RenderHTMLContent from '../../../utils/RenderHTMLContent';
import { MdOutlineDangerous } from "react-icons/md";
import { toast } from 'react-toastify';

const Post = ({ post }) => {

    const { title, tags, description, imageUrl, id, authorId, category,
        location, author, likes, supports } = post;

    const tagList = tags.split(", ");

    const context = useContext(myContext);

    const { followUser, flagPost} = context;

    const userID = JSON.parse(localStorage.getItem('user')).user.uid;

    async function likePost() {
        try {
            let userId;
            let postId;

            if (auth.currentUser == null) {
                toast.dark('Please log in/sign up to like posts.');
                return;
            }
            try {
                userId = auth.currentUser.uid;
                postId = id;

                const likeRef = doc(fireDB, 'likes', `${userId}_${postId}`);
                const likeDoc = await getDoc(likeRef);

                if (likeDoc.exists()) {
                    // The user has already liked the post, so "unlike" it
                    const updatedVotes = post.likes - 1; // Decrement the likes
                    const updatedPost = {
                        ...post,
                        likes: updatedVotes,
                    };

                    await setDoc(doc(fireDB, 'posts', id), updatedPost);

                    // setPosts(updatedPost);
                    toast.dark('Post Downvoted 👎');
                    await deleteDoc(likeRef);
                } else {
                    // The user hasn't liked the post yet, so "like" it
                    const updatedVotes = post.likes + 1; // Increment the likes
                    const updatedPost = {
                        ...post,
                        likes: updatedVotes,
                    };

                    // Update the post in the database
                    await setDoc(doc(fireDB, 'posts', id), updatedPost);
                    // setPosts(updatedPost);
                    toast.success('Post Upvoted 👍');
                    await setDoc(likeRef, { userId, postId });
                }
            } catch (error) {
                console.error('Error while liking a post:', error);
            }
        } catch (error) {
            // toast.dark('Please log in/sign up to like posts.');
            return;
        }

    }

    const followActivity = async () => {
        await followUser(userID, authorId, author);
    }

    function debounce(func, delay) {
        let timeoutId;

        return function () {
            const context = this;
            const args = arguments;

            clearTimeout(timeoutId);
            timeoutId = setTimeout(function () {
                func.apply(context, args);
            }, delay);
        };
    }

    const throttleFlagPost = debounce(function() {
        flagPost(userID,id);
    }, 5000);

    return (

        <div
            className="bg-slate-200 rounded-lg p-6 shadow-md max-w-2xl mx-auto mt-8
             overflow-y-hidden w-[100%]">
                
            {/* Post Title */}
            <h2 className="text-2xl font-bold mb-4 text-slate-600 merriweather">{title}</h2>

            {/* Author */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8">
                        <img src="https://res.cloudinary.com/drlkkozug/image/upload/v1705071144/y9evmbpdht5ezj3fkal9.jpg" alt="user Avatar" className='rounded-full' />
                    </div>
                    <span className="text-gray-700 font-semibold">{author}</span>
                </div>

                <div className="flex items-center space-x-2">
                    <button className="text-slatw-8900 bg-blue-500 hover:underline"
                        onClick={followActivity}>Follow</button>
                    <button className="bg-red-400 text-white hover:underline flex"
                    onClick={() => throttleFlagPost()}>Flag
                        <MdOutlineDangerous className='mt-[1px] ml-2 text-2xl' /></button>
                </div>

            </div>

            {/* Tags and Category */}
            <div className="lg:flex items-center mb-4">
                {/* Location */}
                <div className="mb-4 mt-5 lg:mt-2">
                    <span className="text-gray-700 font-semibold font-serif">Location:</span>
                    <span className="text-slate-900 font-bold font-serif ml-2">{location}</span>
                </div>

                <div className="ml-auto mt-5 lg:mt-2">
                    <span className="bg-blue-500 text-slate-800 px-5 py-2 rounded-xl">{category}</span>
                </div>
            </div>


            {/* Media (Image or Video) */}
            <div className="mb-4">
                <img src={imageUrl} alt="Post Media"
                    className="w-full h-auto object-cover rounded-md shadow-md" />
            </div>

            {/* Post Description */}

            {description ?

                <div className="text-gray-800 leading-relaxed mb-4">
                    <RenderHTMLContent htmlContent={description} />
                </div>
                : ""}


            {/* Upvotes */}

            <div className="flex items-center space-x-2 mb-4 gap-5 ml-4">

                <div className='flex space-x-2' onClick={() => likePost()}>
                    <span className='text-xl text-slate-800 my-1 cursor-pointer'><FaHandHoldingHeart /></span>
                    <span className="text-slate-800 text-lg">{likes}</span>
                </div>

                {/* <div className='flex space-x-2'>
                    <span className='text-xl text-slate-800 my-1 cursor-pointer'><FaHeartCircleBolt /></span>
                    <span className="text-slate-800 text-lg">{supports}</span>
                </div> */}

            </div>

            <div className="items-center text-lg">

                {tagList.map((item, index) =>
                (
                    <p className="text-blue-500" key={index}>#{item}</p>
                ))}

            </div>

            {userID ? <CommentForm post_id={id} /> : ""}

            <CommentSection postId={id} />

        </div>

    )
}

export default Post