
import React from 'react'
import { Link } from 'react-router-dom'

const Mobileposter1 = "https://res.cloudinary.com/drlkkozug/image/upload/v1705042856/xiakv9qelywtgkjcujtw.png";
const Mobileposter2 = "https://res.cloudinary.com/drlkkozug/image/upload/v1705042856/mztjmbz6liswerp5cdi8.png";
const desktopImage = "https://res.cloudinary.com/drlkkozug/image/upload/v1705042855/tsjzffj80djfqy2ixjrz.png";

const CommunityForumPoster = () => {
    return (
        <div className='mt-10 min-h-[300px]'>

            <hr />

            <h1 className='flex justify-center my-2 text-xl md:text-4xl
             font-bold font-serif italic py-4 text-center'>
                Community Forum: Collaborate for a Safer City
            </h1>

            <div className='lg:flex lg:flex-row merriweather'>
                <div className='lg:w-[60%] px-6'>
                    <h2 className='lg:flex lg:justify-center my-2 text-sm md:text-3xl
                    font-bold italic'>
                        Engage, Discuss, Collaborate
                    </h2>

                    <p className='justify-center text-center text-sm md:text-lg
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
                        <button className='flex justify-center text-slate-950 bg-green-300 px-8 py-2 text-xl
                        ml-5 lg:ml-[30%]
                        shadow-sm shadow-neutral-400 border-green-400 hover:scale-[102%]
                     transition-all'>
                            Join the Conversation</button>
                    </Link>

                </div>

                <div className='w-[80%] mx-[10%] mt-8 lg:mt-0 lg:mx-0 lg:w-[40%]'>
                    <img src="Forum.jpg" alt="CommunityForum" width={500}
                        className='rounded-xl' />
                </div>
            </div>

            <div className="hidden lg:flex lg:flex-row mt-16 justify-center gap-16">

                <div className='w-[20%]'>
                    <img src={Mobileposter1} alt="UI-Mobile" srcSet=""
                        className="rounded-lg shadow-md shadow-purple-300" />

                    <p className="text-sm text-center mt-4 italic font-serif">Mobile Version</p>
                </div>

                <div className='w-[20%]'>
                    <img src={Mobileposter2} alt="UI-Mobile2" srcSet=""
                        className="rounded-lg shadow-md shadow-purple-300" />
                    <p className="text-sm text-center mt-4 italic font-serif">Mobile Version (Posts)</p>
                </div>

                <div className='w-[40%]'>
                    <h1 className='text-5xl mt-[20%] italic font-serif text-blue-600'>Positive Environment</h1>
                    <h1 className='text-4xl  my-8 italic font-serif'>"Our Forum Embraces Positivity! Let's create a space where we uplift, support, and inspire each other."</h1>

                    <Link to={'/community-forum-intro'}>
                        <button className='flex justify-center bg-blue-300 text-slate-800
                    px-16 py-4 text-4xl mt-8
                    shadow-sm shadow-neutral-400 border-green-400 hover:scale-[102%]
                    transition-all'>
                            Get Started</button>
                    </Link>
                </div>

            </div>

            <div className="hidden lg:flex lg:flex-row mt-16 justify-center gap-16">

                <div className='w-[45%]'>
                    <img src={desktopImage} alt="UI-Mobile2" srcSet=""
                        className="rounded-lg shadow-md shadow-purple-300 w-[600px] h-[500px]" />

                    <p className="text-sm text-center mt-4 italic font-serif">Desktop Version</p>
                </div>

                <div className='w-[40%]'>
                    <h1 className='text-5xl mt-[20%] italic font-serif text-green-400'>Responsible Posting</h1>
                    <h1 className='text-4xl  my-8 italic font-serif'>"Responsible Posting Encouraged! Share responsibly, respect others' opinions, and keep our discussions constructive."</h1>

                    <Link to={'/community-forum-intro'}>
                        <button className='flex justify-center bg-blue-300 text-slate-800
                    px-16 py-4 text-4xl mt-8
                    shadow-sm shadow-neutral-400 border-green-400 hover:scale-[102%]
                    transition-all'>
                            Get Started</button>
                    </Link>

                </div>

            </div>




        </div>
    )
}

export default CommunityForumPoster