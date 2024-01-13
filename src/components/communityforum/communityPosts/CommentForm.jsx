
import React, { useState, useContext } from 'react';   
import "./styles.css";
import { auth } from '../../../firebase/FirebaseConfig';
import myContext from '../../../context/data/myContext'; 
 
import getUsernameByUID  from '../../../utils/GetUser';

const CommentForm = ({ post_id }) => {
  const [comment, setComment] = useState('');

  const context = useContext(myContext);
  const { writeComment } = context;
  
  const uid = auth?.currentUser?.uid;

  const [u_name, setUser] = useState('');

  getUsernameByUID(uid).then((username) => {
    if (username) { 
      setUser(username);
    } else {
      console.log(`User with UID ${uid} not found.`);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === '') return;
    
    writeComment(post_id, uid, comment, u_name);
    setComment(''); 

    setTimeout(() => {
      window.location.reload();
    }, 2000); 
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        height={100}
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="comment-input"
      />
      <button type="submit" className="comment-submit bg-blue-400 text-white">
        Submit
      </button>
    </form> 
  );
};

export default CommentForm;