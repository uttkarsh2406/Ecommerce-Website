// Import the functions you need from the SDKs you need
import "firebase/compat/auth";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk0eloBzdeV-UzqP5i9edcRdcvTHwP9FU",
  authDomain: "ecom-6d7fc.firebaseapp.com",
  projectId: "ecom-6d7fc",
  storageBucket: "ecom-6d7fc.appspot.com",
  messagingSenderId: "461627709290",
  appId: "1:461627709290:web:7443b4804e5c94a6753713"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const Auth = getAuth(app);
export const googleAUthProvider = new GoogleAuthProvider();
