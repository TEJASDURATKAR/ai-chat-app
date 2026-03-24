import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0d0eIuYXTemJ4ieT0Wqns7I12cXAJKko",
  authDomain: "tejas-ai-7d4e9.firebaseapp.com",
  projectId: "tejas-ai-7d4e9",
  storageBucket: "tejas-ai-7d4e9.firebasestorage.app",
  messagingSenderId: "493294760415",
  appId: "1:493294760415:web:d8b54bfff684d7721a946a",
  measurementId: "G-4HGDQ5GCBL"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);