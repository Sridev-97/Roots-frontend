// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDLBqtmjdf4Gz9xAnpenpHcwwRj3bgT4Pw",
    authDomain: "roots-63778.firebaseapp.com",
    projectId: "roots-63778",
    storageBucket: "roots-63778.firebasestorage.app",
    messagingSenderId: "469352053351",
    appId: "1:469352053351:web:ad305aeec68a0a62aff2c2",
    measurementId: "G-CZ01895TTP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
