import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBkiiqYOy7eJ0VTXwrtvd8Dmql2B8pUcM4",
    authDomain: "vatriume-5776b.firebaseapp.com",
    databaseURL: "https://vatriume-5776b.firebaseio.com",
    projectId: "vatriume-5776b",
    storageBucket: "vatriume-5776b.appspot.com",
    messagingSenderId: "231019453074",
    appId: "1:231019453074:web:4161ca0f6b8cc5586a644b",
    measurementId: "G-3W27Y10HZD",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.analytics();

export default firebase;
