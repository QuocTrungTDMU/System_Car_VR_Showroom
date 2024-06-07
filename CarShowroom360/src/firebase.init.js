// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOTu-z1Q37u1q17dv9y2x4yJah5N9aJ58",
  authDomain: "trungbao-59124.firebaseapp.com",
  projectId: "trungbao-59124",
  storageBucket: "trungbao-59124.appspot.com",
  messagingSenderId: "662287208433",
  appId: "1:662287208433:web:a4cb81697009bc8a877e50"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const auth = getAuth(app);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
