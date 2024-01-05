
import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Features from './features/Features'
import CommunityForumPoster from './posters/CommunityForumPoster'

const Home = () => {
    return (
        <>
           <Navbar/>
           <Hero/>
           <Features/>
           <CommunityForumPoster/>
        </>
      )
}

export default Home