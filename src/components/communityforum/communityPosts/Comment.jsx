
import React from 'react' 
// import { doc, setDoc } from 'firebase/firestore';
// import { toast } from 'react-toastify';
// import { fireDB } from '../../../firebase/FirebaseConfig';

const Comment = ({ comment }) => { 

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

    // reply to a comment

    // function replyToComment (){
    //     window.location.href =`commentreplies/${commentData.id}`;
    // }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center">
                <img
                    src="/user.jpg"
                    className="w-10 h-10 rounded-full object-cover mr-2"
                />
                <span className="font-semibold text-gray-700">{comment.username}</span>
            </div>
            <p className="text-gray-800 mt-2">{comment.comment}</p>

            {/* <div className='flex flex-row'>
                <button className='bg-green-200 my-2 px-2 py-1 rounded-md'
                    onClick={() => { likeComment(commentData.id) }}>Like</button>
                <span className='bg-red-200 rounded-md mx-2 my-2 px-2 py-1'>{commentData.hasOwnProperty('likes') ? commentData.likes : 0} Likes</span>
                <span className=' mx-3 my-2 px-2'>|</span>
                <button className='bg-gray-600 text-white my-2 px-2 py-1 rounded-md'
                onClick={replyToComment}>Reply</button>
            </div> */}

        </div>
    )
}

export default Comment