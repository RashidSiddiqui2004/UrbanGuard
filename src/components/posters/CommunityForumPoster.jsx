
import React from 'react'
import { Link } from 'react-router-dom'

const CommunityForumPoster = () => {
    return (
        <div className='mt-10 min-h-[300px]'>

            <hr />

            <h1 className='flex justify-center my-2 text-xl md:text-4xl
             font-bold font-serif italic py-4'>
                Community Forum: Collaborate for a Safer City
            </h1>

            <div className='flex flex-row'>
                <div className='w-[60%] px-6'>
                    <h2 className='flex justify-center my-2 text-sm md:text-3xl
             font-bold font-serif italic'>
                        Engage, Discuss, Collaborate
                    </h2>

                    <p className='flex justify-center text-center text-sm md:text-lg
                    font-semibold font-serif my-5'>
                        <span className='text-5xl -mt-2'>❝</span>Join our Community Forum to share safety concerns,

                        <br />

                        exchange tips, and collaborate with neighbors for a safer city.
                        <span className='text-5xl mt-4 ml-2'>❞</span>
                    </p>

                    <p className='flex justify-center text-center text-sm md:text-lg
                    font-semibold font-serif my-5'>
                        Discover a space where users come together to discuss safety-related topics, share experiences, and build a stronger, safer community.
                    </p>

                    <Link to={'/community-forum-intro'}>
                        <button className='flex justify-center px-8 py-2 text-xl ml-[30%]
                    shadow-sm shadow-neutral-400 border-green-400 hover:scale-[102%]
                     transition-all'>
                            Join the Conversation</button>
                    </Link>

                </div>

                <div className='w-[40%]'>
                    <img src="Forum.jpg" alt="CommunityForum" width={500}
                        className='rounded-xl' />
                </div>
            </div>
        </div>
    )
}

export default CommunityForumPoster