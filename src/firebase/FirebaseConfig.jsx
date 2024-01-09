// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'; 
import { getStorage, ref } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpv-1WsRdyIzepys73MoBBd1hs69o6lxY",
  authDomain: "myfirstproject-60cfb.firebaseapp.com",
  projectId: "myfirstproject-60cfb",
  storageBucket: "myfirstproject-60cfb.appspot.com",
  messagingSenderId: "317066893957",
  appId: "1:317066893957:web:1a2c9928b5e3100b4b27ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app); 
// Create a root reference
const storage = getStorage();

export {fireDB, auth, storage}