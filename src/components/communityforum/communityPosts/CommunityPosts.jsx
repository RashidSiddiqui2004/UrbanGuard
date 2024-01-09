
import React, { useContext } from 'react'
import Post from './Post'
import { Link } from 'react-router-dom'
import myContext from '../../../context/data/myContext'
import Filter from './Filter'

const CommunityPosts = () => {

    const context = useContext(myContext)
    const { post, searchkey, setPostCategory, categoryType } = context;
 
    const filteredPosts = post.filter((obj) => obj.title.toLowerCase().includes(searchkey.toLowerCase()) ||
        obj.tags.toLowerCase().includes(searchkey.toLowerCase()))
        .filter((obj) => obj.category.toLowerCase()
            .includes(categoryType.toLowerCase()))


    return (
        <div className='mb-8 overflow-x-hidden'>

            <div className='flex flex-row justify-around'>

            
                <div className='w-[30%] ml-[10%] mt-6'>

                    <div className="flex items-center justify-between">
                        <p className="font-medium">
                            Set Filters
                        </p>
                        <button
                            onClick={() => { setPostCategory('') }}
                            className="px-4 bg-gray-700 hover:bg-gray-200 mt-6
                         text-gray-50 hover:text-slate-950 transition-all hover:shadow-sm hover:shadow-green-400 text-sm font-medium rounded-md">
                            Reset Filter
                        </button>
                    </div>

                    <div>
                        <div>
                            <select value={categoryType} onChange={(e) => setPostCategory(e.target.value)}
                                className="px-6 py-3 rounded-md bg-slate-900 text-white
                                border-transparent outline-0 focus:border-gray-500 
                                text-sm w-fit min-w-40 text-center">

                                {post.map((item, index) => {
                                    return (
                                        <option key={index} value={item.category.toLowerCase()}
                                            className=''>{item.category}</option>
                                    )
                                })}

                            </select>
                        </div>
                    </div>

                </div>

                <div className="mt-5 ml-[30%]">
                    <Filter />
                </div>

            </div>

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

            {/* {post.filter((obj) => obj.title.toLowerCase().includes(searchkey.toLowerCase()) ||
                obj.tags.toLowerCase().includes(searchkey.toLowerCase()))
                .filter((obj) => obj.category.toLowerCase()
                    .includes(categoryType.toLowerCase())).map((postItem, index) => {
                        return (
                            <div key={index}>
                                <Post post={postItem} />
                            </div>
                        )
                    })} */}

            {(filteredPosts.length > 0) ?
                (filteredPosts.map((postItem, index) => (
                    <div key={index}>
                        <Post post={postItem} />
                    </div>
                )))
                :
                <h2 className='text-center text-3xl text-white my-10'>Sorry, no posts match your filters..</h2>
            }

        </div>
    )
}

export default CommunityPosts

