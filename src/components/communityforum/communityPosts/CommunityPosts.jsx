
import React, { useContext } from 'react'
import Post from './Post'
import { Link } from 'react-router-dom'
import myContext from '../../../context/data/myContext'

const CommunityPosts = () => {

    const context = useContext(myContext)
    const { post, searchkey, setSearchkey, filterType } = context;

    // const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className='mb-8 overflow-x-hidden'>
            <h1 className='text-lg font-semibold font-serif mx-2 my-8 text-center'>Community Posts</h1>

            <div className='fixed bottom-6 right-3 cursor-pointer'>
                <Link to={'/add-post'}>
                    <img src="addpost.png" alt="New Post" width={50} srcset="" />
                </Link>

                <div className="absolute inset-0 flex w-[60px] my-6
                 opacity-0 hover:opacity-100 transition-opacity duration-300
                 ">
                    <span className="text-white text-sm font-semibold">Add post</span>
                </div>
            </div>

            {post.filter((obj) => obj.title.toLowerCase().includes(searchkey))
                .filter((obj) => obj.tags.toLowerCase().includes(filterType)).map((item, index) => {

                    const { title, tags, description, imageUrl, id, category, location, author } = item;

                    const tagList = tags.split(", ");

                    return (<Post title={title} description={description} imageUrl={imageUrl} id={id}
                        tagList={tagList} category={category} author={author} />
                    )
            })}

        </div>
    )
}

export default CommunityPosts