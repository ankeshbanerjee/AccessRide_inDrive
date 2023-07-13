// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDO_qK1h6Qcgt-EMmmxqcrxAC397TsgIM",
  authDomain: "accessride-auth.firebaseapp.com",
  projectId: "accessride-auth",
  storageBucket: "accessride-auth.appspot.com",
  messagingSenderId: "575093580677",
  appId: "1:575093580677:web:6bf43cc84b31d95ad15aec"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);