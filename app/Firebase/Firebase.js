// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW8k2jFNNau_y1yHQvHW0msOr5hCtbbMA",
  authDomain: "roam-car.firebaseapp.com",
  projectId: "roam-car",
  storageBucket: "roam-car.firebasestorage.app",
  messagingSenderId: "489172294870",
  appId: "1:489172294870:web:7109ba56d5d19199823d77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);