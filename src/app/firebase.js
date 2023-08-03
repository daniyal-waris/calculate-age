// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlVmhyloi6rW-n6YZ-3bqzsSu_ftj4EDU",
  authDomain: "cyber-evangelists.firebaseapp.com",
  projectId: "cyber-evangelists",
  storageBucket: "cyber-evangelists.appspot.com",
  messagingSenderId: "277756837674",
  appId: "1:277756837674:web:ece7b9e79901aafad2a853",
  measurementId: "G-PJ0D31DKTH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);