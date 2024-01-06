
import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Features from './features/Features'
import CommunityForumPoster from './posters/CommunityForumPoster'
import Footer from './Footer'

const Home = () => {
    return (
        <div>
           <Navbar/>
           <Hero/>
           <Features/>
           <CommunityForumPoster/> 
           <Footer/>
        </div>
      )
}

export default Home