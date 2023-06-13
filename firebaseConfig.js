// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtWHl8K14ZBYtHOspYunhVlM9Q-DUwt1Y",
  authDomain: "talkhub-43366.firebaseapp.com",
  projectId: "talkhub-43366",
  storageBucket: "talkhub-43366.appspot.com",
  messagingSenderId: "816698389552",
  appId: "1:816698389552:web:03623c6f25f7a13b26e9f5",
  measurementId: "G-MSMXRGKL0R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
const analytics = getAnalytics(app);
export const auth = getAuth(app);