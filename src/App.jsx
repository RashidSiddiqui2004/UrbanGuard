
import React, { useContext, useEffect, useState } from 'react';
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
import CommunityDiscussions from './components/communityforum/discussion-forum/CommunityDiscussions';
import DiscussionReply from './components/communityforum/discussion-forum/DiscussionReply';
import UserProfile from './components/userprofile/UserProfile';
import QnA from './components/communityforum/qna/QnA';
import AdminDashboard from './components/admin/AdminDashboard';
import ADMIN_EMAIL from './utils/AdminDetails';
// import isRegisteredUser from './utils/RegisteredDeptEmails';
import DepartmentAdminDB from './components/admin/DepartmentAdminDb';
import NotificationSection from './components/communityforum/notifications/NotificationSection';
import MyReport from './components/communityforum/notifications/MyReport';
import myContext from './context/data/myContext';
import LoadingSpinner from './utils/LoadingSpinner';



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

          <Route path="/user-profile" element={
            <ProtectedRoute>
              <Layout>
                <UserProfile />
              </Layout>
            </ProtectedRoute>
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
                <CommunityDiscussions />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/thread-reply/:id" element={
            <ProtectedRoute>
              <Layout>
                <DiscussionReply />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/myreport/:id" element={
            <ProtectedRoute>
              <Layout>
                <MyReport />
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
                <QnA />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/notifications" element={
            <ProtectedRoute>
              <Layout>
                <NotificationSection />
              </Layout>
            </ProtectedRoute>
          } />


          <Route path="/dashboard" element={
            <ProtectedRouteForAdmin>
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRouteForAdmin>
          } />

          <Route path="/departments-reports" element={
            <ProtectedRouteForDepartments>
              <Layout>
                <DepartmentAdminDB />
              </Layout>
            </ProtectedRouteForDepartments>
          } />

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

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

  if (admin.user.email === ADMIN_EMAIL) {
    return children
  }
  else {
    return <Navigate to={'/login'} />
  }

}

// Department-admins
const ProtectedRouteForDepartments = ({ children }) => {

  const context = useContext(myContext)
  const { getMyDept } = context;

  const user_emailID = JSON.parse(localStorage.getItem('user')).user.email;  

  const [isDataFetched, setIsDataFetched] = useState(false);
  const [department, setDept] = useState(null);

  const fetchData = async () => {
    try {
      const isDeptAdmin = await getMyDept(user_emailID);

      if (isDeptAdmin!==false && isDeptAdmin.department !== null) {
        setDept(isDeptAdmin.department);
       } else {
        throw new Error('User is not a department admin.');
      }
    } catch (error) {
      console.error('Error fetching data:', error); 
    } finally {
      setIsDataFetched(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);  

  // Render logic
  return isDataFetched ? (department !== null ? children : <Navigate to={'/'} />) 
  : 
  <LoadingSpinner/>;

}