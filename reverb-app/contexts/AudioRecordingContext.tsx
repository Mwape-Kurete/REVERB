import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { ReverbEntry } from "@/interface/Entries";

// Only metadata fields needed when adding an entry
interface RecordingMetadata {
  songTitle: string;
  songArtist: string;
  moodTags: string[];
  reflection: string;
}

// this interface describes the stuff inside the context that components will "consume" (use)
interface AudioRecordingContextType {
  recordings: ReverbEntry[];
  loading: boolean;
  error: string | null;
  fetchRecordings: () => Promise<void>;
  fetchRecordingsById: (entryId: string) => Promise<ReverbEntry | null>;
  addRecording: (audioBlob: Blob, metadata: RecordingMetadata) => Promise<void>;
  deleteRecording: (entryId: string) => Promise<void>;
}

// Create the context in React
const AudioRecordingContext = createContext<
  AudioRecordingContextType | undefined
>(undefined);

// Custom hook for easy access to recording context
export function useAudioRecording() {
  const context = useContext(AudioRecordingContext);
  if (!context) {
    throw new Error(
      "useAudioRecording must be used within an AudioRecordingProvider"
    );
  }
  return context;
}

// Provider component that wraps app or relevant screen
export const AudioRecordingProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [recordings, setRecordings] = useState<ReverbEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user?.uid;

  const db = getFirestore();
  const storage = getStorage();

  // Fetch all recordings for the signed-in user
  const fetchRecordings = async () => {
    if (!userId) {
      setError("User not authenticated");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const entriesRef = collection(db, "users", userId, "entries");
      const snapshot = await getDocs(entriesRef);

      // Match Firestore fields to ReverbEntry interface
      const loadedRecordings: ReverbEntry[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          songTitle: data.songTitle,
          songArtist: data.songArtist,
          moodTags: data.moodTags || [],
          reflection: data.reflection,
          timestamp:
            typeof data.timestamp === "number"
              ? data.timestamp
              : data.timestamp?.toMillis?.() ?? Date.now(), // handle missing or firestore Timestamp
          audioUrl: data.audioUrl,
          userId: data.userId || userId,
        };
      });

      // Sort by most recent
      loadedRecordings.sort((a, b) => b.timestamp - a.timestamp);

      setRecordings(loadedRecordings);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch recoridings by entry ID for the signed in user
  const fetchRecordingsById = async (
    entryId: string
  ): Promise<ReverbEntry | null> => {
    if (!userId) {
      setError("User not authenticated");
      return null;
    }
    setLoading(true);
    setError(null);

    try {
      const docRef = doc(db, "users", userId, "entries", entryId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return null;
      }

      const data = docSnap.data();
      const entry: ReverbEntry = {
        id: docSnap.id,
        songTitle: data.songTitle,
        songArtist: data.songArtist,
        moodTags: data.moodTags || [],
        reflection: data.reflection,
        timestamp:
          typeof data.timestamp === "number"
            ? data.timestamp
            : data.timestamp?.toMillis?.() ?? Date.now(),
        audioUrl: data.audioUrl,
        userId: data.userId || userId,
      };

      return entry;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Add a new recording (Firestore + Storage)
  const addRecording = async (audioBlob: Blob, metadata: RecordingMetadata) => {
    if (!userId) {
      setError("User not authenticated");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // Create Firestore entry first and get ID
      const entriesRef = collection(db, "users", userId, "entries");
      const newDocRef = await addDoc(entriesRef, {
        ...metadata,
        audioUrl: "",
        timestamp: Date.now(), // Use client timestamp, or serverTimestamp if preferred
        userId,
      });

      // Upload audio to Storage with entry ID
      const storageRef = ref(storage, `audio/${userId}/${newDocRef.id}.mp3`);
      await uploadBytes(storageRef, audioBlob);

      // Get Storage URL and update Firestore entry
      const downloadUrl = await getDownloadURL(storageRef);
      await updateDoc(doc(db, "users", userId, "entries", newDocRef.id), {
        audioUrl: downloadUrl,
      });

      // Refresh recordings to reflect new entry
      await fetchRecordings();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete an existing recording (Firestore + Storage)
  const deleteRecording = async (entryId: string) => {
    if (!userId) {
      setError("User not authenticated");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Delete entry document
      await deleteDoc(doc(db, "users", userId, "entries", entryId));

      // Delete associated audio in Storage
      const storageRef = ref(storage, `audio/${userId}/${entryId}.mp3`);
      await deleteObject(storageRef);

      // Optimistically update state
      setRecordings((prev) => prev.filter((entry) => entry.id !== entryId));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // The context value provided to consumers
  return (
    <AudioRecordingContext.Provider
      value={{
        recordings,
        loading,
        error,
        fetchRecordings,
        fetchRecordingsById,
        addRecording,
        deleteRecording,
      }}
    >
      {children}
    </AudioRecordingContext.Provider>
  );
};
