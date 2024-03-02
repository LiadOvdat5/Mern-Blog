// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-93096.firebaseapp.com",
  projectId: "mern-blog-93096",
  storageBucket: "mern-blog-93096.appspot.com",
  messagingSenderId: "1024660731110",
  appId: "1:1024660731110:web:8311264ca9043fdc1a3727",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
