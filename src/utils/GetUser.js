
import { collection, query, where, getDocs } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig"; 

async function getUsernameByUID(uid) {
    // Reference to the "users" collection
    const usersCollection = collection(fireDB, 'users');

    // Create a query to find the user with the specified UID
    const userQuery = query(usersCollection, where('uid', '==', uid));

    try {
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const username = userDoc.data().name;

            return username;
        } else {
            console.log('User not found.');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
    }

    return null;

}

export default getUsernameByUID;

