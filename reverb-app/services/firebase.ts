// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDp5n4zxhvIqNwUBmjeaT6DrnrAvh5vgmk",
  authDomain: "reverb-e461b.firebaseapp.com",
  projectId: "reverb-e461b",
  storageBucket: "reverb-e461b.firebasestorage.app",
  messagingSenderId: "354194026770",
  appId: "1:354194026770:web:4a15dbcf8e1cdad95083cb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
