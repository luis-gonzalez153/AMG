import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


const configuracionFirebase = {
  apiKey: "AIzaSyAVKpY9mVYOyK0tR8HG9X0VSkikBd9icAg",
  authDomain: "amg-yopal.firebaseapp.com",
  databaseURL: "https://amg-yopal-default-rtdb.firebaseio.com",
  projectId: "amg-yopal",
  storageBucket: "amg-yopal.appspot.com",
  messagingSenderId: "343514686686",
  appId: "1:343514686686:web:42a33a9649268fac620e4f",
  measurementId: "G-CW40TFPMHQ"
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