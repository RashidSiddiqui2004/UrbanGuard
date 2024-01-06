
import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Features from './features/Features'
import CommunityForumPoster from './posters/CommunityForumPoster'

const Home = () => {
    return (
        <div className='mb-20'>
           <Navbar/>
           <Hero/>
           <Features/>
           <CommunityForumPoster/>
        </div>
      )
}

export default Home