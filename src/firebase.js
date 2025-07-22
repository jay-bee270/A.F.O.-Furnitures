import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBWRc4z23U8qUbmdLwfi3q0rIEwppG1DDc",
    authDomain: "afo-furnitures-1e11d.firebaseapp.com",
    projectId: "afo-furnitures-1e11d",
    storageBucket: "afo-furnitures-1e11d.firebasestorage.app",
    messagingSenderId: "78834158041",
    appId: "1:78834158041:web:dfdc0cca27bf77279c31c8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };