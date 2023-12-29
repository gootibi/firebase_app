import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBUlqv8aRB6bD_zIPtM0IWLZCLda4j2ywY",
  authDomain: "fir-course-5caed.firebaseapp.com",
  projectId: "fir-course-5caed",
  storageBucket: "fir-course-5caed.appspot.com",
  messagingSenderId: "269643341478",
  appId: "1:269643341478:web:beaf07cfc0ffd982eb1e67",
  measurementId: "G-27MGX8WBN5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);