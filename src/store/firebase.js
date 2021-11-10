import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA362021jfcnvDKmjeRajETBcMp5Gd2Cjo",
  authDomain: "svelte-clone-1b289.firebaseapp.com",
  projectId: "svelte-clone-1b289",
  storageBucket: "svelte-clone-1b289.appspot.com",
  messagingSenderId: "54411062936",
  appId: "1:54411062936:web:537b3fb447f973ce03aaed"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const provider = new GoogleAuthProvider();
export const auth = getAuth();