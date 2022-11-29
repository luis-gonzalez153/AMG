import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// configuración firebase
const configuracionFirebase = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_DATABASE_URL,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID,
    measurementId: process.env.VUE_APP_MEASUREMENT_ID,
};

//inicializando firebase
firebase.initializeApp(configuracionFirebase);

// Accesos directos
const db = firebase.firestore();

const auth = firebase.auth();

const storage = firebase.storage();

export { db, auth, firebase, storage };
import { load } from 'recaptcha-v3'

load('6LfRyz8jAAAAAElQ9_lRSpogepV_nw4ltxakJqOu').then((recaptcha) => {
  recaptcha.execute('registrarUsuarioAction', 'iniciarSesionAction').then((token) => {
      console.log(token) // Will print the token
    })
})