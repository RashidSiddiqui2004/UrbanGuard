
import { formatDistanceToNow } from 'date-fns';
import React, { useContext } from 'react'
import { FaReply } from "react-icons/fa";
import myContext from '../../../context/data/myContext';

const DiscussionYard = ({ thread, myPost }) => {

    const conditionalStyles = myPost ? { backgroundColor: '#5bcc75', color: 'white' } : { backgroundColor: 'white', color: 'white' };

    const timestamp = thread.time.toDate();

    const relativeTime = formatDistanceToNow(timestamp, { addSuffix: true });

    // like a comment 
    // const likeComment = async (commentId) => {

    //     const likeRef = doc(fireDB, 'comments', `${commentId}`);

    //     let condition = isNaN(commentData.likes) || (commentData.hasOwnProperty('likes')==false);

    //     if(condition===false){
    //         // console.log(commentData);
    //         // console.log(commentData.hasOwnProperty('likes'));
    //         // console.log(isNaN(commentData.likes))
    //         const updatedVotes = commentData.likes + 1; // Increment the likes
    //         const updatedPost = {
    //             ...commentData,
    //             likes: updatedVotes,
    //         };

    //         // Update the post in the database
    //         // await setDoc(doc(fireDB, 'comm', params.id), updatedPost);
    //         setCommentData(updatedPost);
    //         toast.success('Comment Upvoted 👍');
    //         await setDoc(likeRef, updatedPost );
    //     }

    //     else{
    //         const updatedVotes =  1; // Increment the likes
    //         const updatedPost = {
    //             ...commentData,
    //             likes: updatedVotes,
    //         };

    //         setCommentData(updatedPost);
    //         toast.success('1st like👍');
    //         await setDoc(likeRef, updatedPost );
    //     }

    // }

    // reply to a thread


    const context = useContext(myContext);

    const {followUser} = context;

    const userID = JSON.parse(localStorage.getItem('user')).user.uid;

    function replytoThread() {
        window.location.href = `thread-reply/${thread.id}`;
    }

    const followActivity = async () => {
        await followUser(userID, thread.authorId, thread.author);
    }

    return (

        <div className="py-4 px-6 mx-4 my-8 rounded-lg shadow-md" style={conditionalStyles}>
            <div className="flex items-center mb-4">
                <img
                    src="https://res.cloudinary.com/drlkkozug/image/upload/v1705071144/y9evmbpdht5ezj3fkal9.jpg"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    alt="User Avatar"
                />
                <div>
                    <h3 className="font-semibold text-gray-800">{thread.author}</h3>
                    <p className="text-gray-900 text-sm">{relativeTime}</p>
                </div>

                <div className="flex items-center space-x-2 ml-5">
                    <button className="text-slate-200 bg-slate-800 hover:underline"
                        onClick={followActivity}>Follow</button> 
                </div>

            </div>

            <div className="bg-gray-100 text-gray-700 p-4 rounded-lg">
                <p className="text-lg leading-relaxed merriweather">
                    {thread.discussion}
                </p>
            </div>

            <div className='flex flex-row justify-end' onClick={replytoThread}>
                <button
                    className="mt-2
                    flex bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={() => {
                    }}
                > Reply
                    <FaReply className='text-sm ml-3 mt-1 rotate-180' />
                </button>
            </div>

        </div>
    );
};

export default DiscussionYard;
