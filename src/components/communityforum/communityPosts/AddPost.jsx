
import React, { useContext, useRef, useState } from 'react'
import myContext from '../../../context/data/myContext';
import { auth } from '../../../firebase/FirebaseConfig';
import { Editor } from '@tinymce/tinymce-react';
import getUsernameByUID from '../../../utils/GetUser';
import { uploadFile } from '../../../utils/UploadFile';
import PostPreview from './PostPreview';

function AddPost() {
    const context = useContext(myContext);
    const { posts, setPosts, addPost } = context;

    const [useImageUrl, setUseImageUrl] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    const [postPreview, setPostPreview] = useState(false);

    const handleCheckboxChange = () => {
        setUseImageUrl(!useImageUrl);
    };

    const handleImageFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setImageFile(file);
    };


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

    const handlePreview = async () => {

        const content = await editorRef2.current.getContent();

        // Update state using the state updater function
        setPosts((prevPosts) => ({ ...prevPosts, description: content }));

        if (!(imageFile == null)) {
            try {
                const imageUrlfromFB = await uploadFile(imageFile)

                // Update state with the image URL
                if (imageUrlfromFB !== null) {
                    setPosts((prevPosts) => ({ ...prevPosts, imageUrl: imageUrlfromFB }));
                }

            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        setPostPreview(true);
    };



    const uploadPost = async () => {
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


                    {/* title */}
                    <div>
                        <input type="text"
                            value={posts.title}
                            onChange={(e) => setPosts({ ...posts, title: e.target.value })}
                            name='title'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full   rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
                            placeholder='Add Post title'
                        />
                    </div>


                    {/* editor */}
                    <div>
                        <Editor
                            apiKey='aflhte2kchgwcgg6wo27mxqz79lhro2h443k16fftegeoo6x'
                            onInit={(evt, editor) => (editorRef2.current = editor)}
                            init={{
                                menubar: false,
                                height: 500,
                                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                            }}
                            initialValue="Post Description"
                        />
                    </div>


                    {/* <div>
                        <input type="text"
                            value={posts.imageUrl}
                            onChange={(e) => setPosts({ ...posts, imageUrl: e.target.value })}
                            name='imageurl'
                            className=' bg-gray-600 mb-4 px-2 py-3 my-2 w-full  rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
                            placeholder='Add an Image Url'
                        />
                    </div> */}

                    <div className='mt-6'>

                        <div className='flex flex-row gap-6'>
                            {!useImageUrl ? (
                                <div>
                                    <label htmlFor="imageUrl"
                                        className="block text-sm mt-2 font-medium text-gray-200 mb-3">
                                        Want to upload Image URL
                                    </label>

                                </div>
                            ) : (
                                <div>
                                    <label htmlFor="imageFile"
                                        className="block text-sm mt-2 font-medium text-gray-200 mb-3">
                                        Want to upload Image File
                                    </label>

                                </div>
                            )}

                            <input
                                type="checkbox"
                                id="useImageUrl"
                                checked={useImageUrl}
                                onChange={handleCheckboxChange}
                                className="mr-2 px-11 py-11 transform scale-150"
                            />
                        </div>


                        {useImageUrl ? (
                            <div>
                                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-200 mb-3">
                                    Image URL
                                </label>
                                <input type="text"
                                    value={posts.imageUrl}
                                    onChange={(e) => setPosts({ ...posts, imageUrl: e.target.value })}
                                    name='imageurl'
                                    className=' bg-gray-600 mb-4 px-2 py-3 my-2 w-full  rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
                                    placeholder='Add an Image Url'
                                />
                            </div>
                        ) : (
                            <div>
                                <label htmlFor="imageFile" className="block text-sm font-medium text-gray-200 mb-3">
                                    Upload Image
                                </label>
                                <input
                                    type="file"
                                    id="imageFile"
                                    accept="image/*"
                                    onChange={handleImageFileChange}
                                    className="bg-gray-600 mb-4 px-2 py-3 my-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
                                />
                            </div>
                        )}
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
                            onClick={handlePreview}
                            className='  w-full text-black bg-green-300 hover:bg-blue-400 font-bold inputbox px-2 py-2 rounded-lg'>
                            Get Post Preview
                        </button>
                    </div>

                    {postPreview && (
                        <PostPreview posts={posts} />
                    )}

                    {postPreview && (

                        <div className='flex justify-center mb-3 mt-7'>
                            <button
                                onClick={uploadPost}
                                className='w-full text-slate-950 bg-blue-400 text-lg
                                hover:bg-blue-400 font-bold inputbox px-2 py-2 rounded-lg'
                            >
                                Publish Post to Community
                            </button>
                        </div>
                    )}



                </div>
            </div>
        </div >
    )
}

export default AddPost

