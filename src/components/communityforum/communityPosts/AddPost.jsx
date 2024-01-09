
import React, { useContext, useRef, useState } from 'react'
import myContext from '../../../context/data/myContext';
import { auth } from '../../../firebase/FirebaseConfig';
import { Editor } from '@tinymce/tinymce-react';
import getUsernameByUID from '../../../utils/GetUser';

function AddPost() {
    const context = useContext(myContext);
    const { posts, setPosts, addPost } = context;
    
    let uid;

    try {
        uid = auth.currentUser.uid;
    } catch (err) {
    }


    const [u_name, setUser] = useState('');

    getUsernameByUID(uid).then((username) => {
        if (username) {
            setUser(username);
            posts.authorId = uid;
            posts.author = u_name;
        }
    });


    // Reference to the TinyMCE editor
    const editorRef2 = useRef(null);

    const uploadPost = async () => {
        const content = editorRef2.current.getContent();
        console.log(content);

        // Update state using the state updater function
        setPosts((prevPosts) => ({ ...prevPosts, description: content }));

        console.log(posts);

        const postUploadstate = await addPost();

        return postUploadstate;
    }

    return (
        <div>
            <div className='flex justify-center items-center postbg py-8'>
                <div className='bg-gray-800 px-10 py-10 rounded-xl w-[80%]'>
                    <div className='flex gap-4 justify-center'>
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Publish Post</h1>

                        <span className='-my-3'><img src="addpost.png" alt="New Post" width={50} srcSet="" /></span>
                    </div>

                    <div>
                        <input type="text"
                            value={posts.title}
                            onChange={(e) => setPosts({ ...posts, title: e.target.value })}
                            name='title'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full   rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
                            placeholder='Add Post title'
                        />
                    </div>

                    <div>
                        {/* <textarea cols="40" rows="10" name='description'
                            value={posts.description}
                            onChange={handleDesc}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full inputbox  rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Post description..'>
                        </textarea> */}
                        <Editor
                            apiKey='aflhte2kchgwcgg6wo27mxqz79lhro2h443k16fftegeoo6x'
                            onInit={(evt, editor) => (editorRef2.current = editor)}
                            init={{
                                menubar: false,
                                height: 500,
                                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                            }}
                            initialValue="Give report description"
                        />
                    </div>

                    <></>


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
                            value={posts.category}
                            onChange={(e) => setPosts({ ...posts, category: e.target.value })}
                            name='category'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full   rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
                            placeholder='Set Category'
                        />
                    </div>


                    <div>
                        <input type="text"
                            value={posts.location}
                            onChange={(e) => setPosts({ ...posts, location: e.target.value })}
                            name='location'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full   rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
                            placeholder='Location..'
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
                            onClick={uploadPost}
                            className='  w-full text-black bg-green-300 hover:bg-blue-400 font-bold inputbox px-2 py-2 rounded-lg'>
                            Publish Post to Community
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddPost

