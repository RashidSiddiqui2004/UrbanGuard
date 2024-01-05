

import React, { useContext, useState } from 'react'
import myContext from '../../../context/data/myContext' 
import { auth } from '../../../firebase/FirebaseConfig';
import { fireDB } from '../../../firebase/FirebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import MonacoEditor from "react-monaco-editor";
import "./styles.css"
import Navbar from '../../../components/navbar/Navbar';
import CodingForumFooter from '../../../components/footer/Footer';

function AddPost() {
    const context = useContext(myContext);
    const { posts, setPosts, addPost } = context;
    const [language, setLanguage] = useState("javascript");
    const [title, settitle] = useState("");
    const [desc, setDesc] = useState("");

    const handleCodeChange = (newCode) => {
        setPosts({ ...posts, code: newCode }); 
    };

    const handleTitle = (e) => {
        settitle(e.target.value)
        console.log(e.target.value);
        setPosts({ ...posts, title: e.target.value }); 
    };

    const handleDesc = (e) => {
        setDesc(e.target.value);
        setPosts({ ...posts, description: e.target.value }); 
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
        setPosts({ ...posts, language: e.target.value })
    };

    // to get the username
    async function getUsernameByUID(uid) {
        // Reference to the "users" collection
        const usersCollection = collection(fireDB, 'users');
 
        const userQuery = query(usersCollection, where('uid', '==', uid));

        try {
            const querySnapshot = await getDocs(userQuery);

            if (!querySnapshot.empty) {
                // Retrieve the first (and hopefully only) document
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

    let uid;

    try {
        uid = auth.currentUser.uid;
    } catch (err) {
        console.error("error", err);
    }


    const [u_name, setUser] = useState('');

    getUsernameByUID(uid).then((username) => {
        if (username) { 
            setUser(username);
            posts.authorId = uid;
            posts.author = u_name;
        } else {
            console.log(`User with UID ${uid} not found.`);
        }
    });

    return (
        <div>
            <Navbar/>
            <div className='flex justify-center items-center postbg py-8'>
                <div className=' bg-gray-800 px-10 py-10 rounded-xl postform'>
                    <div>
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Add a Post</h1>
                    </div>
                    <div className=''>
                         
                         <input type="text"
                            value={posts.title}
                            onChange={handleTitle} 
                            name='title'
                            className=' bg-gray-600 mb-4 px-2 py-2  inputbox rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Add Post Title'
                        />
                    </div>
                    <div> 

                        <textarea cols="40" rows="10" name='description'
                            value={posts.description}
                            onChange={handleDesc} 
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full inputbox  rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='POST description..'>
                        </textarea>
                    </div>

                    <h2 className="text-2xl font-semibold mb-4 text-white">Code Editor</h2>

                    <div className="mb-4">
                        <label htmlFor="language" className="block font-semibold mb-2 text-white">
                            Select Language:  (*Optional)
                        </label>
                        <select
                            id="language"
                            value={posts.language}
                            onChange={handleLanguageChange}
                            // onChange={(e) => setPosts({ ...posts, language: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                        >
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="html">HTML</option>
                            <option value="css">CSS</option>
                            <option value="c">C</option>
                            <option value="cpp">C++</option>
                            <option value="kotlin">Kotlin</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="code" className="block font-semibold mb-2 text-white">
                            Code: (*Optional)
                        </label> 

                        <MonacoEditor
                            height="300"
                            language={language}
                            theme="vs-light"
                            value={posts.code} 
                            onChange={handleCodeChange} // Use the updated 'handleCodeChange' function
                            options={{
                                wordWrap: "on",
                            }}
                        />

                    </div>

                    <div>
                        <input type="text"
                            value={posts.imageUrl}
                            onChange={(e) => setPosts({ ...posts, imageUrl: e.target.value })}
                            name='imageurl'
                            className=' bg-gray-600 mb-4 px-2 py-3 my-2 w-full  rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
                            placeholder='Add an Image Url'
                        />
                    </div>
                    <div>
                        <input type="text"
                            value={posts.tags}
                            onChange={(e) => setPosts({ ...posts, tags: e.target.value })}
                            name='tags'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full   rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
                            placeholder='Add Tags (Separated by commas without #)'
                        />
                    </div>

                    <div className='flex justify-center mb-3'>
                        <button
                            onClick={addPost}
                            className='  w-full text-black bg-green-300 hover:bg-blue-400 font-bold inputbox px-2 py-2 rounded-lg'>
                            Publish Post
                        </button>
                    </div>

                </div>
            </div>
            <CodingForumFooter/>
        </div>
    )
}

export default AddPost

 