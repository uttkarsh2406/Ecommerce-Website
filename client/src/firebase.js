// Import the functions you need from the SDKs you need
import "firebase/compat/auth";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXgo54p72TfzvL6KyvOkP6L8u65WvoMDw",
  authDomain: "ecomm-af7f9.firebaseapp.com",
  projectId: "ecomm-af7f9",
  storageBucket: "ecomm-af7f9.appspot.com",
  messagingSenderId: "55998945531",
  appId: "1:55998945531:web:788cfca0117871db29b85e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const Auth = getAuth(app);
export const googleAUthProvider = new GoogleAuthProvider();
