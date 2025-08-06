import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  DocumentData,
} from "firebase/firestore";

export interface UserProfile {
  uid: string;
  email: string | null;
  fullname?: string | null;
  username?: string | null;
  createdAt: Date;
}

//below is an example of a single exported object that contains all the methods related to authentication
//Better to keep all auth related methods in a single file for better organization
//This allows for easy import and usage in other parts of the application
//when importing it makes imports more meaningful, as opposed to importing individual functions
//better use of SOLID principles
export const authService = {
  //Registering the user profile in firestore
  register: async (
    email: string,
    password: string,
    fullname?: string
  ): Promise<UserProfile> => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Create user profile object
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email,
      fullname,
      createdAt: new Date(),
    };

    // Save user profile in Firestore
    await setDoc(doc(db, "users", user.uid), userProfile);

    //returning the newly created profile
    return userProfile;
  },

  //login method
  login: async (email: string, password: string): Promise<User> => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  },

  //logout method
  logout: async (): Promise<void> => {
    await signOut(auth);
  },

  //fething user profile from firestore
  getUserProfile: async (uid: string): Promise<UserProfile | null> => {
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    } else {
      return null;
    }
  },

  //perform partial user profile update -> specifically for username
  updateUserProfile: async (
    uid: string,
    updates: Partial<UserProfile>
  ): Promise<void> => {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, updates);
  },
};
