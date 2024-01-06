import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import {
    Timestamp, addDoc, collection, deleteDoc, doc, getDocs,
    onSnapshot, orderBy, query, setDoc, getDoc, updateDoc
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/FirebaseConfig';
import { where } from 'firebase/firestore';

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
        dislikes: 0,
        time: Timestamp.now(),
        comments: [],
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
    }, []);


    // update product function
    // const updatePost = async () => {
    //     setLoading(true)
    //     try {

    //         await setDoc(doc(fireDB, 'posts', posts.id), posts)
    //         toast.success("Post Updated successfully")
    //         setTimeout(() => {
    //             window.history.back();
    //         }, 800);
    //         getPostData();
    //         setLoading(false)

    //     } catch (error) {
    //         console.log(error)
    //         setLoading(false)
    //     }
    // }

    // delete product

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

    // challenges

    const [challenges, setChallenges] = useState({
        title: null,
        problemStatement: null,
        author: null,
        tags: null,
        submissions: 0,
        time: Timestamp.now()
    });

    const addChallenge = async () => {

        if (challenges.title == null) {
            return toast.error("Title is required..")
        }

        if (challenges.problemStatement == null) {
            return toast.error("Challenge is required..");
        }

        setLoading(true)

        try {
            const challengeRef = collection(fireDB, 'challenges');
            await addDoc(challengeRef, challenges)
            toast.success("Added Challenge Successfully");
            setTimeout(() => {
                window.location.href = '/challenges'
            }, 800);
            getChallengeData();
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const [challenge, setChallenge] = useState([]);

    const getChallengeData = async () => {

        setLoading(true)

        try {
            const q = query(
                collection(fireDB, 'challenges'),
                orderBy('time')
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let chlgArray = [];
                QuerySnapshot.forEach((doc) => {
                    chlgArray.push({ ...doc.data(), id: doc.id });
                });
                setChallenge(chlgArray);
                setLoading(false);
            });

            return () => data;

        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    useEffect(() => {
        getChallengeData();
    }, []);


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

    // const submitReply = async (commentId) => {
    //     // Create a Firestore reference to the post document using a collection group query
    //     // const postRef = db.collectionGroup('comments').where('id', '==', commentId);

    //     const commentsColl = collection(fireDB, 'comments');

    //     const postRef = query(commentsColl, where('id', '==', commentId));
    //     // Prepare the reply data
    //     const replyData = {
    //         userId: '12345', // Replace with the actual user ID
    //         reply: "New reply",
    //         timestamp: new Date()
    //     };

    //     const userQuery = query(commentsColl, where('id', '==', commentId));

    //     let commentdata = "";

    //     getDocs(userQuery)
    //         .then((querySnapshot) => {
    //             if (!querySnapshot.empty) {
    //                 const userDocument = querySnapshot.docs[0].data();
    //                 commentdata = userDocument; 
    //             } else {
    //                 console.log('No reply found.');
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Error retrieving replies:', error);
    //         });

    //     // Use the `arrayUnion` method to append the reply to the 'replies' array
    //     postRef.update({
    //         replies:commentdata.replies.arrayUnion(replyData),
    //     });

    // }

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
        // prefereces
        favdestinations: [],
        preferredActivities: [],
        country: "India",
        badge: "Beginner",
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

    const updateProfileAuto = async () => {

        if (profiles.email == null || profiles.fullname == null || profiles.userid == null) {
            return toast.error("All fields are required")
        }

        setLoading(true)

        try {
            const profileRef = collection(fireDB, 'profiles');
            await addDoc(profileRef, profiles)
            toast.success("Updated profile successfully");
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }


    const asliUpdateProfile = async () => {
        setLoading(true);

        try {
            const profileRef = doc(fireDB, 'profiles', [profiles.curr_id]);
            await updateDoc(profileRef, profiles);

            toast.success("Profile updated successfully");
            setTimeout(() => {
                window.location.href = '/userprofile';
            }, 800);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    };

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

    return (
        <MyContext.Provider value={{
            mode, toggleMode, loading, setLoading,
            posts, setPosts, addPost, post,
            deletePost, user, profiles, setProfiles, updateProfile,
            asliUpdateProfile,
            userProfile, setUserprofile, addProfile,
            updateProfileAuto, getProfileData, searchkey,
            setSearchkey, setPostCategory, setPostCategory, categoryType,
            comments, setComments, writeComment,
            getCommentsForPost, getUserEmail, mail, getReplies,
            replies, setReplies, submitReply
        }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default myState