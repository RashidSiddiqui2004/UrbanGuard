
import React, { useContext, useEffect, useState } from 'react'
import getUsernameByUID from '../../../utils/GetUser';
import myContext from '../../../context/data/myContext';
import { useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const DiscussionReply = () => {

    const params = useParams();
    const commentId = params.id;

    const context = useContext(myContext);
    const { threadReplies, getThreadReplies, replyOnThread, setThreadReplies } = context;

    const [thread, setThread] = useState(null)

    useEffect(() => {

        const fetchThreadReplies = async () => {
            const currentThread = await getThreadReplies(commentId);
            setThread(currentThread);
        };

        fetchThreadReplies();

        // let formattedReplies = [];

        // // Assuming threadReplies is an array of strings
        // threadReplies?.forEach(element => {
        //     const newReply = colorTaggedNames(element); 
        //     formattedReplies.push(newReply);
        //     console.log(newReply);
        // });

        // setThreadReplies(formattedReplies);

    }, [commentId]);


    const [replyText, setReplyText] = useState('');

    const handleReplyChange = (e) => {
        setReplyText(e.target.value);
    };

    const user = JSON.parse(localStorage.getItem('user')).user.uid

    const [u_name, setUser] = useState('')

    getUsernameByUID(user).then((username) => {
        if (username) {
            setUser(username);
        }
    });

    function colorTaggedNames(message) {

        // Use a regular expression to find all words starting with '@'
        const regex = /@(\w+)/g;
        const coloredMessage = message.replace(regex, '<span className="text-blue-800 font-semibold">@$1</span>');

        // Display the colored message

        return coloredMessage;
        // document.body.innerHTML = coloredMessage;
    }

    function copyToClipboard() {
        const urlToCopy = window.location.href;

        // Create a temporary input element
        const tempInput = document.createElement('input');
        tempInput.value = urlToCopy;
        document.body.appendChild(tempInput);

        // Select the text inside the input element
        tempInput.select();
        tempInput.setSelectionRange(0, 99999);

        // Copy the text to the clipboard
        document.execCommand("copy");

        // Remove the temporary input element
        document.body.removeChild(tempInput);

        const messagePointer = document.getElementById('copyConf');

        messagePointer.classList.remove('hidden');
        
        setTimeout(() => {
            messagePointer.classList.add('hidden');
        }, 1000);

    }

    // Attach the copyToClipboard function to the share button click event

    const handleReplySubmit = () => {
        replyOnThread(commentId, replyText, u_name);
        setReplyText('');
        getThreadReplies(commentId);

        // let formattedReplies = [];

        // threadReplies.array.forEach(element => {
        //     const newreply = colorTaggedNames(element);
        //     formattedReplies.push(newreply);
        // });

        // setThreadReplies(formattedReplies)
    };

    return (
        <div className='w-[70%] items-center lg:mx-[180px] mt-11 md:mt-0 ml-3 md:ml-0 mb-4'>

            <div className="p-4">

                <div className="flex items-center">
                    <img
                        src="https://res.cloudinary.com/drlkkozug/image/upload/v1705071144/y9evmbpdht5ezj3fkal9.jpg"
                        className="w-10 h-10 rounded-full object-cover mr-2"
                    />
                    <span className="font-semibold text-gray-200">{thread?.author}</span>

                </div>
                <p className="text-white mt-2 bg-slate-400 px-2 py-2 rounded-md">{thread?.discussion}</p>


                {/* suggested users */}

                {/* <div id='mentionDropdown' className='bg-slate-800 text-gray-200'>
                    <ul>
                        <li className='mentionItem bg-slate-400 text-slate-950
                         hover:bg-slate-800 hover:text-gray-200 hover:scale-105 transition-all'>Rashid</li>
                        <li className='mentionItem bg-slate-400 text-slate-950
                         hover:bg-slate-800 hover:text-gray-200 hover:scale-105 transition-all'>Sofiya</li>
                    </ul>
                </div> */}

                <div className='flex gap-9'>
                    <button id="shareButton"
                        className='border-gray-400 mt-2 mb-1 bg-slate-700 text-gray-400'
                        onClick={copyToClipboard}>Share Thread</button>

                    <div className='bg-pink-400 text-white rounded-lg px-4
                     mt-2 text-center h-16 pb-5 hidden transition-all' id='copyConf'>
                        <p className='mt-5'>Copied to Clipboard</p>
                    </div>
                </div>

                {/* Reply input field */}
                <div className="mb-4 mt-2">
                    <textarea
                        id='discussionTextarea'
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

            <div className='ml-5 mb-2'>
                <p>Use '@' to tag someone in the thread.</p>
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
                    )
                })}
            </div>



        </div>
    )
}

export default DiscussionReply