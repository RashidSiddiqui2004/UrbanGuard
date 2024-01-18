
import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import {
    Timestamp, addDoc, collection, deleteDoc, doc, getDocs,
    onSnapshot, orderBy, query, setDoc, getDoc, updateDoc, increment,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { where } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import THRESHOLD_FLAGS from '../../utils/ThresholdFlags';

function myState(props) {

    const [mode, setMode] = useState('light');

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = "rgb(17, 24, 39)"
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = "white"
        }
    }

    const [loading, setLoading] = useState(false);

    const sendReport = async (uid, u_name, incidentType, description, latitude,
        longitude, imageUrl, anonymousReporting) => {

        if (description === "" || latitude === -1 || longitude === -1 || uid == null ||
            incidentType === "") {
            toast.error("All fields are required")
            return false;
        }

        const reportsRef = collection(fireDB, 'reports'); // Reference to the reports collection

        // Create a new report document

        // depending on anonymous reporting or not
        let report;

        if (anonymousReporting === false) {
            report = {
                uid,
                u_name,
                incidentType,
                description,
                latitude,
                longitude,
                imageUrl,
                anonymousReporting: false,
                timestamp: new Date(),
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            };
        }

        else {
            report = {
                incidentType,
                description,
                imageUrl,
                latitude,
                longitude,
                anonymousReporting: true,
                timestamp: new Date(),
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            };
        }

        await setDoc(doc(reportsRef), report);

        return true;
    }

    const [reports, setReports] = useState([]);

    const getAllReports = async () => {
        setLoading(true)

        try {
            const q = query(
                collection(fireDB, 'reports'),
                orderBy('timestamp', 'desc')
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let reportsArray = [];
                QuerySnapshot.forEach((doc) => {
                    reportsArray.push({ ...doc.data(), id: doc.id });
                });
                setReports(reportsArray);
                setLoading(false);
            });

            return () => data;

        } catch (error) {
            setLoading(false)
        }

    }

    const getMyDept = async (email) => {

        // departments -> search for your email
        const deptQuery = query(
            collection(fireDB, 'departments'),
            where('emailID', '==', email)
        );

        const deptSnapshot = await getDocs(deptQuery);

        if (!deptSnapshot.empty) {

            const deptDocument = deptSnapshot.docs[0]._document.data.value.mapValue.fields;

            const data = {
                department: deptDocument.department.stringValue,
                departmentName: deptDocument.departmentName.stringValue
            };

            return data;
        }

        return false;
    }

    const getSpecificReports = async () => {
        return true;
    }

    const getReportbyId =  async (reportID) => {
        const reportRef = doc(fireDB, 'reports', reportID); // Replace 'threads' with your actual collection name

        try {
            const reportDoc = await getDoc(reportRef);

            if (reportDoc.exists()) {
                // Extract thread data from the document
                const data = { id: reportDoc.id, ...reportDoc.data() };

                console.log(data);
                return data;
            }  
        } catch (error) {
            return null;
        }
    }

    const message = "Your report has been filed."

    const addNotification = async (userid, reportID) => {

        const newNotification = { id: Date.now(), message };

        // userID, reportID

        const notificationRef = collection(fireDB, 'notifications'); // Reference to the reports collection

        const notification = {
            userId: userid,
            reportID: reportID,
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        };


        await setDoc(doc(notificationRef), notification);

        // Add the new notification to the array
        setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    };

    const [notifications, setNotifications] = useState([]);

    const getMyNotifications = async (userid) => {
        const notificationRef = collection(fireDB, 'notifications');

        const notifQuery = query(
            notificationRef,
            where('userId', '==', userid)
        );

        try {
            const notifSnapshot = await getDocs(notifQuery);

            // Access the documents from the snapshot
            const notifications = [];
            
            notifSnapshot.forEach(doc => {
                notifications.push({ id: doc.id, ...doc.data() });
            }); 

            setNotifications(notifications);

            return true;
        } catch (error) { 
            return false;
        }
    };

    // const removeNotification = (notificationId) => {
    //     setNotifications((prevNotifications) => prevNotifications.filter((n) => n.id !== notificationId));
    // };

    const deleteReport = async (report) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'reports', report.id))
            toast.success('Report deleted successfully')
            getAllReports();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const [posts, setPosts] = useState({
        title: "",
        description: "",
        author: null,
        authorId: "",
        location: "",
        category: "",
        imageUrl: null,
        tags: null,
        likes: 0,
        supports: 0,
        flags: 0,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    const addPost = async () => {

        if (posts.title == null || posts.category == null || posts.description == null) {
            return toast.error("All fields are required")
        }

        setLoading(true)

        try {
            const postRef = collection(fireDB, 'posts');
            await addDoc(postRef, posts)
            toast.success("Added post successfully");

            setTimeout(() => {
                window.location.href = '/community-posts'
            }, 800);

            getPostData();

            setLoading(false)

            return true;
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const [post, setPost] = useState([]);

    const getPostData = async () => {
        setLoading(true)

        try {
            const q = query(
                collection(fireDB, 'posts'),
                orderBy('time', 'desc')
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let postArray = [];
                QuerySnapshot.forEach((doc) => {
                    postArray.push({ ...doc.data(), id: doc.id });
                });
                setPost(postArray);
                setLoading(false);
            });

            return () => data;

        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    useEffect(() => {
        getPostData();
        getThreads();
    }, []);

    const [myposts, setMyPosts] = useState([]);

    const getMyPosts = async (userID) => {
        setLoading(true)

        try {
            const q = query(
                collection(fireDB, 'posts'),
                where('authorId', '==', userID),
                orderBy('time', 'desc')
            );

            const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
                let myPostArray = [];
                QuerySnapshot.forEach((doc) => {
                    myPostArray.push({ ...doc.data(), id: doc.id });
                });
                setMyPosts(myPostArray);

                setLoading(false);
            });

            return () => unsubscribe();
        } catch (error) {
            let myPostArray = [];
            setMyPosts(myPostArray);
            setLoading(false);
        }
    }

    // update post function
    // const updatePost = async () => {
    // setLoading(true)
    // try {

    //     await setDoc(doc(fireDB, 'posts', posts.id), posts)
    //     toast.success("Post Updated successfully")
    //     setTimeout(() => {
    //         window.history.back();
    //     }, 800);
    //     getPostData();
    //     setLoading(false)

    // } catch (error) {
    //     console.log(error)
    //     setLoading(false)
    // }
    // }

    // delete post

    const deletePost = async (item) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'posts', item.id))
            toast.success('Post Deleted successfully')
            getPostData();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const flagPost = async (userId, postId) => {
        setLoading(true);

        try {
            const postRef = doc(fireDB, 'posts', postId);

            const flagsRef = doc(fireDB, 'flags', `${userId}_${postId}`);

            const flagDoc = await getDoc(flagsRef);

            if (flagDoc.exists()) {
                // The user has already flagged the post
                // display a message

                toast.info("Already flagged this post !");
                return false;
            } else {
                // flag the post 

                // Increment the 'flags' field by 1
                await updateDoc(postRef, {
                    flags: increment(1),
                });

                toast.success("Reported post !");

                // Get the updated post data
                const postDoc = await getDoc(postRef);
                const flagsCount = postDoc.data().flags || 0;

                // Check if the flags count exceeds the threshold
                if (flagsCount > THRESHOLD_FLAGS) {
                    // If yes, delete the post
                    await deleteDoc(postRef);
                }

                await setDoc(flagsRef, { userId, postId });
            }

            setLoading(false);
        } catch (error) {
            console.error('Error flagging post:', error);
            setLoading(false);
        }
    };

    const followUser = async (followerId, followingId, followingUsername) => {
        try {

            if (followerId == followingId) {
                toast.error(`You can't follow yourself !`);
                return false;
            }

            const followingsQuery = query(
                collection(fireDB, 'followings'),
                where('follower', '==', followerId),
                where('following', '==', followingId)
            );

            const followingsSnapshot = await getDocs(followingsQuery);

            if (!followingsSnapshot.empty) {
                toast.info(`You are already following ${followingUsername}`);
                return false;
            }

            const followingsCollection = collection(fireDB, 'followings');

            const followingsDocRef = await addDoc(followingsCollection, {
                follower: followerId,
                following: followingId,
                time: Timestamp.now(),
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            });

            if (followingsDocRef) {
                toast.success(`You are now following ${followingUsername}`);

                return true;
            }

        } catch (error) {
            console.error('Error following user:', error.message);
            return false;
        }
    };

    const getUserDetails = async (userId) => {

        const userQuery = query(collection(fireDB, 'users'), where('uid', '==', userId));
        const userSnapshot = await getDocs(userQuery);

        let username, emailId, joinTime;

        userSnapshot.forEach((doc) => {
            username = { ...doc.data(), id: doc.id }.name;
            emailId = { ...doc.data(), id: doc.id }.email;
            joinTime = { ...doc.data(), id: doc.id }.time;
        });

        const joinDate = joinTime.toDate();

        // Extracting components
        const year = joinDate.getFullYear();
        const month = joinDate.getMonth() + 1; // Month is zero-indexed, so add 1
        const day = joinDate.getDate();
        const hours = joinDate.getHours();
        const minutes = joinDate.getMinutes();
        const seconds = joinDate.getSeconds();

        // Creating a formatted string
        const userJoinDate = `${year}-${month}-${day}`;
        const userjoinTime = `${hours}:${minutes}:${seconds}`

        const postsQuery = query(collection(fireDB, 'posts'), where('authorId', '==', userId));
        const postsSnapshot = await getDocs(postsQuery);

        const postsCount = postsSnapshot.size;

        // Get the comments count on the website
        const commentsQuery = query(collection(fireDB, 'comments'), where('user_id', '==', userId));
        const commentsSnapshot = await getDocs(commentsQuery);
        const commentsCount = commentsSnapshot.size;

        // Get the likes count on user's posts
        const postsLikesQuery = query(collection(fireDB, 'posts'), where('authorId', '==', userId));
        const postslikesSnapshot = await getDocs(postsLikesQuery);

        let totalLikes = 0;

        // Iterate through each post
        postslikesSnapshot.forEach((postDoc) => {
            const postData = postDoc.data();

            // If 'likes' field exists and is a number, add it to totalLikes
            if (postData.likes && typeof postData.likes === 'number') {
                totalLikes += postData.likes;
            }

        });

        const likesCount = totalLikes;

        // Get the comments count on user's posts
        const postCommentsQuery = query(collection(fireDB, 'comments'), where('authorId', '==', userId));
        const postCommentsSnapshot = await getDocs(postCommentsQuery);
        const postCommentsCount = postCommentsSnapshot.size;

        // Get the followers count
        const followersQuery = query(collection(fireDB, 'followings'), where('following', '==', userId));
        const followersSnapshot = await getDocs(followersQuery);
        const followersCount = followersSnapshot.size;

        // Get the followings count
        const followingsQuery = query(collection(fireDB, 'followings'), where('follower', '==', userId));
        const followingsSnapshot = await getDocs(followingsQuery);
        const followingsCount = followingsSnapshot.size;

        // Set the user details
        const metadata = {
            postsCount,
            commentsCount,
            likesCount,
            postCommentsCount,
            followersCount,
            followingsCount,
            username,
            emailId,
            joinDate: userJoinDate,
        };

        const details = localStorage.getItem("userProfile");

        if ((details == null)) {
            const permanentData = {
                username: username,
                emailId: emailId,
                joinDate: userjoinTime,
            };

            // Convert the object to a JSON string
            const permanentDataString = JSON.stringify(permanentData);

            // Store the JSON string in localStorage
            localStorage.setItem("userProfile", permanentDataString);
        }


        return metadata;
    };

    const [thread, setThread] = useState({
        discussion: "",
        author: null,
        authorId: "",
        likes: 0,
        dislikes: 0,
        time: Timestamp.now(),
        replies: [],
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    const addThread = async () => {

        if (thread.discussion == null || thread.authorId == null) {
            return toast.error("All fields are required")
        }

        setLoading(true)

        try {
            const threadRef = collection(fireDB, 'threads');
            await addDoc(threadRef, thread)
            toast.success("Added thread successfully");

            setLoading(false)

            return true;
        } catch (error) {
            console.log(error);
            setLoading(false)
            return false;
        }
    }

    const [threads, setThreads] = useState([]);

    const getThreads = async () => {
        setLoading(true)

        try {
            const q = query(
                collection(fireDB, 'threads'),
                orderBy('time', 'desc')
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let threadsArray = [];
                QuerySnapshot.forEach((doc) => {
                    threadsArray.push({ ...doc.data(), id: doc.id });
                });
                setThreads(threadsArray);
                setLoading(false);
            });

            return () => data;

        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    // get replies on a thread

    const [threadReplies, setThreadReplies] = useState([])

    async function getThreadReplies(threadId) {

        const threadRef = doc(fireDB, 'threads', threadId); // Replace 'threads' with your actual collection name

        try {
            const threadDoc = await getDoc(threadRef);

            if (threadDoc.exists()) {
                // Extract thread data from the document
                const threadData = { id: threadDoc.id, ...threadDoc.data() };

                const threadReplies = threadData.replies;

                setThreadReplies(threadReplies);

                return threadData;

            } else {
                alert('No such document!');
                return null;
            }
        } catch (error) {
            return null;
        }
    }

    async function replyOnThread(threadId, replyText, u_name) {
        try {
            // Get a reference to the thread document
            const threadRef = doc(fireDB, 'threads', threadId);
            const threadDoc = await getDoc(threadRef);

            if (threadDoc.exists()) {

                const threadData = { id: threadDoc.id, ...threadDoc.data() };

                const threadReplies = threadData.replies;

                // Retrieve the current state of replies
                const currentReplies = [...threadReplies];

                // Update the thread document with the new reply
                await updateDoc(threadRef, {
                    replies: [...currentReplies, { text: replyText, author: u_name, timestamp: Timestamp.now() }],
                });

                toast.success("Replied to the thread ✅");

                setTimeout(() => {
                    window.location.reload();
                }, 800);

            } else {
                alert('No such document!');
                return null;
            }


        } catch (error) {
            console.error('Error adding reply:', error.message);
        }
    }

    const [mail, setEmail] = useState("");

    const getUserEmail = async (authorID) => {

        const usersCollection = collection(fireDB, 'users');

        const userQuery = query(usersCollection, where('uid', '==', authorID));

        getDocs(userQuery)
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const userDocument = querySnapshot.docs[0].data();
                    let userEmail = userDocument.email;
                    setEmail(userEmail);
                    // console.log(userEmail);
                    return userEmail;
                } else {
                    console.log('No user found with the specified UID.');
                }
            })
            .catch((error) => {
                console.error('Error retrieving user email:', error);
            });

    }

    const [comments, setComments] = useState([]);

    async function getCommentsForPost(postId) {

        try {
            const commentsRef = collection(fireDB, 'comments'); // Reference to the comments collection

            // Create a query to filter comments by postId
            const commentsQuery = query(commentsRef, where('post_id', '==', postId));

            // Execute the query and get the documents
            const querySnapshot = await getDocs(commentsQuery);

            // Extract the comment data from the query snapshot
            const comments = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setComments(comments);

            return comments;

        } catch (error) {
            console.error('Error fetching comments:', error.message);
        }

        return;
    }

    async function writeComment(post_id, user_id, comment, username) {
        const commentsRef = collection(fireDB, 'comments'); // Reference to the comments collection

        // Create a new comment document
        const newComment = {
            post_id,
            user_id,
            comment,
            username,
            // likes: 0,
            timestamp: new Date(),
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        };

        await setDoc(doc(commentsRef), newComment);
    }

    // get replies for comment

    const [replies, setReplies] = useState([]);

    async function getReplies(commentId) {

        const commentsColl = collection(fireDB, 'comments');

        const userQuery = query(commentsColl, where('id', '==', commentId));

        getDocs(userQuery)
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const userDocument = querySnapshot.docs[0].data();
                    let commentdata = userDocument;
                    setReplies(commentdata);
                    // console.log(commentReplies); 
                } else {
                    console.log('No reply found.');
                }
            })
            .catch((error) => {
                console.error('Error retrieving replies:', error);
            });
    }


    const [user, setUser] = useState([]);

    const getUserData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, "users"))
            const usersArray = [];
            result.forEach((doc) => {
                usersArray.push(doc.data());
                setLoading(false)
            });
            setUser(usersArray);
            // console.log(usersArray)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const submitReply = async (commentId, userID, username, userReply) => {

        // Create a Firestore reference to the post document using a collection group query
        const commentsColl = collection(fireDB, 'comments');
        const postRef = query(commentsColl, where('id', '==', commentId));

        // Prepare the reply data
        const replyData = {
            userId: userID,
            reply: userReply,
            username: username,
            timestamp: new Date()
        };

        // Get the existing comment data, including the 'replies' array
        try {
            const userQuery = query(commentsColl, where('id', '==', commentId));
            const querySnapshot = await getDocs(userQuery);

            if (!querySnapshot.empty) {
                const userDocument = querySnapshot.docs[0].data();

                // Extract the existing 'replies' array
                const existingReplies = userDocument.replies || [];

                // Use the `arrayUnion` method to append the reply to the 'replies' array
                existingReplies.push(replyData);

                // Update the document with the new 'replies' array
                await updateDoc(querySnapshot.docs[0].ref, {
                    replies: existingReplies
                });
            } else {
                console.log('No comment found.');
            }
        } catch (error) {
            console.error('Error retrieving or updating replies:', error);
        }
    };

    const [profiles, setProfiles] = useState({
        userid: "",        // Unique user ID, you can use Firebase Authentication UID
        fullname: "",      // User's full name
        DOB: null,         // Date of Birth (you can use Firebase Timestamp)
        age: null,         // Calculated or updated age (can be derived from DOB)
        email: "",
        phoneNo: null,
        imageUrl: null,
        country: "India",
        followers: 0,
        followings: 0,
        time: Timestamp.now()
    });

    const updateProfile = async () => {

        if (profiles.email == null || profiles.fullname == null || profiles.userid == null) {
            return toast.error("All fields are required")
        }

        setLoading(true)

        try {
            const profileRef = collection(fireDB, 'profiles');
            await addDoc(profileRef, profiles)
            toast.success("Updated profile successfully");
            setTimeout(() => {
                window.location.href = '/userprofile'
            }, 800);
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const addProfile = async () => {
        if (profiles.email != null && profiles.fullname != null) {
            const profRef = collection(fireDB, 'profiles');
            await addDoc(profRef, profiles);
            toast.success("Updated profile siuccessfully!");
            setTimeout(() => {
                window.location.href = "/userprofile";
            }, 800);
            setLoading(false)
        }
        else {
            console.log("User email is not specified");
        }
    }

    const [userProfile, setUserprofile] = useState([]);

    const getProfileData = async (userid) => {
        setLoading(true);

        try {
            const q = query(
                collection(fireDB, 'profiles'),
                where('userid', '==', userid)
            );

            const data = onSnapshot(q, (querySnapshot) => {
                let profileData = [];
                querySnapshot.forEach((doc) => {
                    profileData.push({ ...doc.data(), id: doc.id });
                });
                setUserprofile(profileData);
                setLoading(false);
            });

            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    const [searchkey, setSearchkey] = useState('')
    const [categoryType, setPostCategory] = useState('')

    const [reportType, setReportType] = useState('')

    return (
        <MyContext.Provider value={{
            mode, toggleMode, loading, setLoading,
            sendReport, reports, getAllReports, reportType, setReportType, deleteReport,
            getMyDept, getSpecificReports, addNotification, getMyNotifications,notifications,
            getReportbyId,
            posts, setPosts, addPost, post, myposts, getMyPosts,
            deletePost, user, profiles, setProfiles, updateProfile,
            userProfile, setUserprofile, addProfile,
            getProfileData, searchkey,
            setSearchkey, setPostCategory, categoryType,
            comments, setComments, writeComment,
            getCommentsForPost, getUserEmail, mail, getReplies,
            replies, setReplies, submitReply,
            addThread, setThread, thread, threads, getThreads,
            threadReplies, setThreadReplies, getThreadReplies, replyOnThread,
            getUserDetails, followUser, flagPost,
        }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default myState