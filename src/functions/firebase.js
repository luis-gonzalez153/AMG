import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const configuracionFirebase = {
    // apiKey: "AIzaSyBAk5C7mTJJGXLB6OxsSv6W1ZZ4z6HQ0Go",
    // authDomain: "amg-service.firebaseapp.com",
    // projectId: "amg-service",
    // storageBucket: "amg-service.appspot.com",
    // messagingSenderId: "28828673156",
    // appId: "1:28828673156:web:acfa44989597aff11cced1",
    // measurementId: "G-5WPKDTQF8H"
    apiKey: "AIzaSyD30AhadOm9q5bt71cY_QvxdKt57J229dc",
    authDomain: "test-firebase-c2300.firebaseapp.com",
    projectId: "test-firebase-c2300",
    storageBucket: "test-firebase-c2300.appspot.com",
    messagingSenderId: "60592064919",
    appId: "1:60592064919:web:ff767ff18ee784a8825cd2"
};

//inicializando firebase
firebase.initializeApp(configuracionFirebase);

// Accesos directos
const db = firebase.firestore();

const auth = firebase.auth();

//collections references
const usersCollection = db.collection("usuarios");

export {
  db,
  auth,
  usersCollection,
  firebase
}