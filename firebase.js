import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8UsRdnyV2ORxM8tjXsJ8SSQbMPEThgYk",
  authDomain: "sonny-sagna.firebaseapp.com",
  projectId: "sonny-sagna",
  storageBucket: "sonny-sagna.appspot.com",
  messagingSenderId: "1047681443862",
  appId: "1:1047681443862:web:a065f3903e9bc4a28fed37",
  measurementId: "G-F3RBNEX2FS",
};

//Get the firebase app for any front end work..This is done when checking if the user is logged in in the orders.js file
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
