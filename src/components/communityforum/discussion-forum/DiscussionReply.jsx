
import React, { useContext, useEffect, useState } from 'react'
import getUsernameByUID from '../../../utils/GetUser';
import myContext from '../../../context/data/myContext';
import { useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const DiscussionReply = () => {

    const params = useParams();
    const commentId = params.id;

    const context = useContext(myContext);
    const { threadReplies, getThreadReplies, replyOnThread } = context;

    const [thread, setThread] = useState(null)

    useEffect(() => {

        const fetchThreadReplies = async () => {
            const currentThread = await getThreadReplies(commentId);
            setThread(currentThread);
        };

        fetchThreadReplies();
    }, [commentId]);

    const [replyText, setReplyText] = useState('');

    const handleReplyChange = (e) => {
        setReplyText(e.target.value)
    };

    const user = JSON.parse(localStorage.getItem('user')).user.uid

    const [u_name, setUser] = useState('')

    getUsernameByUID(user).then((username) => {
        if (username) {
            setUser(username);
        }
    });

    const handleReplySubmit = () => {
        replyOnThread(commentId, replyText, u_name);
        setReplyText('');
        getThreadReplies(commentId);
    };
    
    return (
        <div className='w-[70%] items-center mx-[230px]'>

            <div className="p-4">

                <div className="flex items-center">
                    <img
                        src="/user.jpg"
                        className="w-10 h-10 rounded-full object-cover mr-2"
                    />
                    <span className="font-semibold text-gray-500">{thread?.author}</span>

                </div>
                <p className="text-white mt-2 bg-slate-400 px-2 py-2 rounded-md">{thread?.discussion}</p>

                <div className='flex flex-row'>

                    <span className='bg-red-200 rounded-md mx-2 my-2 px-2 py-1'>{thread?.hasOwnProperty('likes') ? thread?.likes : 0} Likes</span>

                </div>

                {/* Reply input field */}
                <div className="mb-4">
                    <textarea
                        className="w-full p-2 border rounded-md text-slate-900"
                        rows="4"
                        placeholder="Type your reply here..."
                        value={replyText}
                        onChange={handleReplyChange}
                    ></textarea>
                </div>

                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                    onClick={handleReplySubmit}
                >
                    Reply
                </button>
            </div>

            <div>
                {threadReplies.map((reply) => {
                const timestamp = reply.timestamp.toDate();

                const relativeTime = formatDistanceToNow(timestamp, { addSuffix: true });
                    return (
                    <div key={reply.timestamp} className="bg-gray-700 py-2 my-2 mx-4 p-4 shadow-md rounded-lg">
                        <p className="text-gray-200">{reply.text}</p>
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-gray-300 text-sm">{`By ${reply.author}`}</p>
                            <p className="text-gray-300 text-sm">{`${relativeTime}`}</p>
                        </div>
                    </div>
                )})}
            </div>



        </div>
    )
}

export default DiscussionReply