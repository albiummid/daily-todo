// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDROt9S9ytJVD9BoNJs_0RrSfCoEzHvOuI",
    authDomain: "albi-ummid.firebaseapp.com",
    projectId: "albi-ummid",
    storageBucket: "albi-ummid.firebasestorage.app",
    messagingSenderId: "420284453744",
    appId: "1:420284453744:web:7fadb033b6aa8ac0c4b5b5",
    measurementId: "G-XCH0P45BLE",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
