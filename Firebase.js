// Import the functions you need from the SDKs you need
import * as firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaZBbkWM9cO3SfRa1G_Yk4ROB6VFAzkt0",
  authDomain: "fir-auth-21e5a.firebaseapp.com",
  projectId: "fir-auth-21e5a",
  storageBucket: "fir-auth-21e5a.appspot.com",
  messagingSenderId: "572548467321",
  appId: "1:572548467321:web:9f5d1ed2d8d00e250022a8"
};

// Initialize Firebase
let app
if (firebase.apps.length === 0) {
    app=firebase.initializeApp(firebaseConfig)
}
else {
    app=firebase.app()
}
const auth = firebase.auth()
export {auth}