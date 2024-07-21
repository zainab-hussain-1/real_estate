// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey:"AIzaSyA2wSmlXOGbFk9J-_iHVDJI2_JORhxP_ps",
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "real-estate-954c2.firebaseapp.com",
  projectId: "real-estate-954c2",
  storageBucket: "real-estate-954c2.appspot.com",
  messagingSenderId: "724763502975",
  appId: "1:724763502975:web:2971b99ecc2c88ff6b524a"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);