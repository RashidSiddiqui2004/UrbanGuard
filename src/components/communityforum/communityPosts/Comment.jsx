
import React from 'react' 

const Comment = ({ comment }) => {

    // reply to a comment

    // function replyToComment (){
    //     window.location.href =`commentreplies/${commentData.id}`;
    // }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center">
                <img
                    src="https://res.cloudinary.com/drlkkozug/image/upload/v1705071144/y9evmbpdht5ezj3fkal9.jpg"
                    alt='User Avatar'
                    className="w-10 h-10 rounded-full object-cover mr-2"
                />
                <span className="font-semibold text-gray-700">{comment.username}</span>
            </div>
            <p className="text-gray-800 mt-2">{comment.comment}</p>
        </div>
    )
}

export default Comment


{/* <div className='flex flex-row'>
                <button className='bg-green-200 my-2 px-2 py-1 rounded-md'
                    onClick={() => { likeComment(commentData.id) }}>Like</button>
                <span className='bg-red-200 rounded-md mx-2 my-2 px-2 py-1'>{commentData.hasOwnProperty('likes') ? commentData.likes : 0} Likes</span>
                <span className=' mx-3 my-2 px-2'>|</span>
                <button className='bg-gray-600 text-white my-2 px-2 py-1 rounded-md'
                onClick={replyToComment}>Reply</button>
            </div> */}