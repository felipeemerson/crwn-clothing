import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDoXd-xGyDXHi6yfBjpxOCG2woFksGA5gk",
    authDomain: "crwn-db-c0508.firebaseapp.com",
    projectId: "crwn-db-c0508",
    storageBucket: "crwn-db-c0508.appspot.com",
    messagingSenderId: "933088733107",
    appId: "1:933088733107:web:8f53ed9271807920454dc6",
    measurementId: "G-PKZJRXXE0R"

};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;