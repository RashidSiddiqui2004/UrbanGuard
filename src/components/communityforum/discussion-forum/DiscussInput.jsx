import React, { useState, useContext } from 'react';
import "../communityPosts/styles.css";
import getUsernameByUID from '../../../utils/GetUser';
import { auth } from '../../../firebase/FirebaseConfig';
import myContext from '../../../context/data/myContext';
import { IoMdSend } from "react-icons/io";

const DiscussInput = () => {

    const context = useContext(myContext);

    const { addThread, thread, setThread } = context;

    let uid;

    try {
        uid = auth.currentUser.uid;
    } catch (err) {
    }


    const [u_name, setUser] = useState('');

    getUsernameByUID(uid).then((username) => {
        if (username) {
            setUser(username);
            thread.authorId = uid;
            thread.author = u_name;
        }
    });

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (thread.discussion.trim() === '') return;

        const threadAdded = await addThread();

        const discussId = document.getElementById('thread');

        if (threadAdded) {
            discussId.value = "";
        }
    };

    return (
        <div className=''>
            <form onSubmit={handleSubmit} className="comment-form">
                <input
                    id='thread'
                    type="text"
                    height={200}
                    placeholder="Add a thread..."
                    value={thread.discussion}
                    onChange={(e) => setThread({ ...thread, discussion: e.target.value })}
                    className="comment-input"
                />
                <button type="submit" className="comment-submit flex bg-green-300 text-slate-900">
                    Submit Thread
                    <IoMdSend className='my-[5px] ml-2' />
                </button>
            </form>
        </div>
    )
}

export default DiscussInput