
import React, { useState, useContext } from 'react';  
import { collection, query, where, getDocs } from "firebase/firestore"; 
import "./styles.css";
import { auth, fireDB } from '../../../firebase/FirebaseConfig';
import myContext from '../../../context/data/myContext'; 

const CommentForm = ({ post_id }) => {
  const [comment, setComment] = useState('');

  const context = useContext(myContext);
  const { writeComment } = context;

  async function getUsernameByUID(uid) {
    // Reference to the "users" collection
    const usersCollection = collection(fireDB, 'users');

    // Create a query to find the user with the specified UID
    const userQuery = query(usersCollection, where('uid', '==', uid));

    try {
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) { 
        const userDoc = querySnapshot.docs[0]; 
        const username = userDoc.data().name;

        return username;
      } else {
        console.log('User not found.');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }

    return null;

  }

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
      <button type="submit" className="comment-submit">
        Submit
      </button>
    </form> 
  );
};

export default CommentForm;