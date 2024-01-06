
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import MyState from './context/data/myState';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';
import Login from './components/registration/Login';
import Signup from './components/registration/Signup';
import Reporting from './components/reporting/Reporting';
import Layout from './components/communityforum/Layout';
import HeroCommunity from './components/communityforum/HeroCommunity';
import SafetyTips from './components/communityforum/SafetyTips';
import CommunityPosts from './components/communityforum/communityPosts/CommunityPosts';
import AddPost from './components/communityforum/communityPosts/AddPost';
import NoPage from './components/nopage/NoPage';
import EmergencyResources from './components/emergencyResources/EmergencyResources';
import Navbar from './components/Navbar';

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/report" element={
            <ProtectedRoute>
              <Reporting />
            </ProtectedRoute>
          } />

          <Route path="/emergency-resources" element={
            <div>
              <Navbar />
              <EmergencyResources />
            </div>

          } />

          <Route path="/community-forum-intro" element={
            <ProtectedRoute>
              <Layout>
                <HeroCommunity />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/add-post" element={
            <ProtectedRoute>
              <Layout>
                <AddPost />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/community-safety-tips" element={
            <ProtectedRoute>
              <Layout>
                <SafetyTips />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/community-discussion" element={
            <ProtectedRoute>
              <Layout>
                <SafetyTips />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/community-posts" element={
            <ProtectedRoute>
              <Layout>
                <CommunityPosts />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/community-events" element={
            <ProtectedRoute>
              <Layout>
                <SafetyTips />
              </Layout>
            </ProtectedRoute>
          } />


          <Route path="/community-qna" element={
            <ProtectedRoute>
              <Layout>
                <SafetyTips />
              </Layout>
            </ProtectedRoute>
          } />

          {/* 
          <Route path="/dashboard" element={
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
          } /> */}

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          {/* <Route path="/userprofile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } /> */}

          {/* <Route path='/about' element={<AboutUsPage />} /> */}

          <Route path="/*" element={<NoPage />} />

        </Routes>

        <ToastContainer />

      </Router>
    </MyState>

  )
}

export default App

// user 
export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user')
  if (user) {
    return children
  } else {
    return <Navigate to={'/login'} />
  }
}

// admin 

const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('user'))

  if (admin.user.email === 'siddiqui20042007@gmail.com') {
    return children
  }
  else {
    return <Navigate to={'/login'} />
  }

}