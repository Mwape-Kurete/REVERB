import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../services/firebase";
import { authService } from "@/services/authService";

// This defines what info is need to register a user
type RegisterParams = {
  email: string;
  password: string;
  fullName: string; //  want to save user's full name too
};

// This defines what the auth context will give to any component that uses it
type AuthContextType = {
  user: User | null; // The currently logged-in user, or null if no one is logged in
  loading: boolean; // Is the app currently checking or doing something with auth?
  login: (email: string, password: string) => Promise<void>; // Function to log in
  register: (params: RegisterParams) => Promise<void>; // Function to register a new user
  logout: () => Promise<void>; // Function to log out
};

// Create the auth context, start undefined so as to make sure it's used properly inside a provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This component provides the auth info and functions to all child components
export function AuthProvider({ children }: { children: ReactNode }) {
  // Keep track of who is logged in
  const [user, setUser] = useState<User | null>(null);

  // Track if the app is currently loading auth info, so UI can show a spinner or something (lottie animation)
  const [loading, setLoading] = useState(true);

  // When the app starts, listen for changes in authentication state
  useEffect(() => {
    // This function runs whenever user logs in or logs out
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr); // Save the current user info (or null if logged out)
      setLoading(false); // We’re done checking auth status
    });

    // Clean up the listener if the component unmounts
    return unsubscribe;
  }, []);

  // Function to log in with email and password
  const login = async (email: string, password: string) => {
    // Use Firebase’s built-in login function
    await signInWithEmailAndPassword(auth, email, password);
    // No need to update user here, it updates automatically above
  };

  // Function to sign up a new user with email, password, and full name
  const register = async ({ email, password, fullName }: RegisterParams) => {
    setLoading(true); // Show loading while registering
    // Call our service that handles creating user and saving profile
    await authService.register(email, password, fullName);
    setLoading(false); // Done with signup
    // User state updates automatically because of the listener
  };

  // Function to log out
  const logout = async () => {
    // Use Firebase to sign out
    await signOut(auth);
    // User state updates automatically after logout
  };

  // Provide user info and auth functions to any components inside this provider
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// This custom hook makes it easy to use auth context in any function component
export function useAuth() {
  const context = useContext(AuthContext);

  // If this is used outside the provider, throw an error to help debugging
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  // Return auth info and functions
  return context;
}
