
import React, { useContext, useEffect, useState } from 'react'
import getUsernameByUID from '../../../utils/GetUser';
import myContext from '../../../context/data/myContext';
import { useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

const DiscussionReply = () => {

    const params = useParams();
    const commentId = params.id;

    const context = useContext(myContext);
    const { threadReplies, getThreadReplies, replyOnThread, setThreadReplies } = context;

    const [thread, setThread] = useState(null)

    let [taggedNames, setTaggedNames] = useState([]);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {

        const fetchThreadReplies = () => {
            getThreadReplies(commentId)
                .then(currentThread => {
                    setThread(currentThread);

                    const replies = currentThread.replies;

                    if (currentThread) {
                        const uniqueNames = Array.from(new Set(replies.map(obj => obj.author)));
                        setTaggedNames(uniqueNames); 
                    }
                })
                .catch(error => {
                    console.error('Error fetching thread replies:', error);
                });
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

    const [selectedName, setSelectedName] = useState('');

    const [replyText, setReplyText] = useState('');

    const handleNameClick = (name) => {
        setSelectedName(name);
        setIsMenuOpen(false);
        setReplyText((prevText) => prevText + `${name}` + ' ');
    };

    const handleReplyChange = (e) => {
        setReplyText(e.target.value);

        const reply = e.target.value; 
        const lastletter = reply[reply.length -1]
        
        if(lastletter=='@'){
            setIsMenuOpen(true);
        }else if(isMenuOpen===true){
            setIsMenuOpen(false);
        }
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
        <div className='lg:w-[70%] items-center lg:mx-[180px] mt-11 md:mt-0 ml-3 md:ml-0 mb-4 overflow-hidden'>

            <div className="p-4 md:w-full overflow-x-hidden">

                <div className="flex items-center">
                    <img
                        src="https://res.cloudinary.com/drlkkozug/image/upload/v1705071144/y9evmbpdht5ezj3fkal9.jpg"
                        className="w-10 h-10 rounded-full object-cover mr-2"
                    />
                    <span className="font-semibold text-gray-200">{thread?.author}</span>

                </div>
                <p className="text-white text-sm mt-2 bg-slate-400 px-2 py-2 rounded-md merriweather">{thread?.discussion}</p>

 
                <div className='block lg:flex gap-9'>
                    <button id="shareButton"
                        className='border-gray-400 mt-2 mb-1 bg-slate-700 text-gray-400'
                        onClick={copyToClipboard}>Share Thread</button>

                    <div className='text-pink-500 border-slate-300 border-2 rounded-lg px-4
                     mt-2 text-center h-16 pb-5 hidden transition-all shadow-md shadow-red-500' id='copyConf'>
                        <p className='mt-5'>Copied to Clipboard</p>
                    </div>
                </div>

                <div className='ml-1 mb-4 mt-5'>
                    <div className='flex items-center cursor-pointer' onClick={toggleMenu}>
                        <p className='text-gray-600 text-sm mb-2 mr-2'>Mention someone in the thread using '@'</p>
                        {isMenuOpen ? <HiChevronUp className='text-gray-600' size={20} /> : <HiChevronDown className='text-gray-600' size={20} />}
                    </div>

                    {isMenuOpen && (
                        <ul className='bg-gray-100 rounded-lg overflow-hidden shadow-md mt-2 w-fit'>
                            {taggedNames && taggedNames.length > 0 ? (
                                taggedNames.map((name, index) => (
                                    <li key={index} 
                                    className='border-b border-gray-200 px-4 py-3 hover:bg-gray-200 transition duration-300 cursor-pointer'
                                    onClick={() => handleNameClick(name)}>
                                        <span className='text-gray-800'>{name}</span>
                                    </li>
                                ))
                            ) : (
                                <li className='text-gray-500 px-4 py-3'>No one available to tag.</li>
                            )}
                        </ul>
                    )}
                </div> 

                <div className="mb-4 mt-2">
                    <textarea
                        id='discussionTextarea'
                        className="w-full p-2 border rounded-md bg-white text-slate-900"
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

            <div className=''>
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


// threadReplies.forEach(comment => {
//     // console.log(comment.author);
//     setTaggedName((prev) => [...prev, comment.author])
// });

// console.log(taggedNames);