// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Workaround to cast the function to any (bypass TS error)
import * as firebaseAuth from "firebase/auth";
const getReactNativePersistence = (firebaseAuth as any)
  .getReactNativePersistence;

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

// Set up persistent Auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);
