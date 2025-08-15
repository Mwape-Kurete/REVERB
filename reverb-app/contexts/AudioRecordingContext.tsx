import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  updateDoc,
  DocumentData,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";

interface RecordingMetadata {
  mood: string;
  timestamp: string;
  song: string;
  reflection: string;
}

export interface RecordingEntry extends RecordingMetadata {
  id: string;
  audioUrl: string;
}

interface AudioRecordingContextType {
  recordings: RecordingEntry[];
  loading: boolean;
  error: string | null;
  fetchRecordings: () => Promise<void>;
  addRecording: (audioBlob: Blob, metadata: RecordingMetadata) => Promise<void>;
  deleteRecording: (entryId: string) => Promise<void>;
}

const AudioRecordingContext = createContext<
  AudioRecordingContextType | undefined
>(undefined);

export function useAudioRecording() {
  const context = useContext(AudioRecordingContext);
  if (!context) {
    throw new Error(
      "useAudioRecording must be used within an AudioRecordingProvider"
    );
  }
  return context;
}

export const AudioRecordingProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [recordings, setRecordings] = useState<RecordingEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user?.uid;

  const db = getFirestore();
  const storage = getStorage();

  // Fetch all recordings for current user
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

      const loadedRecordings: RecordingEntry[] = snapshot.docs.map(
        (docSnap) => {
          const data = docSnap.data() as DocumentData;
          return {
            id: docSnap.id,
            audioUrl: data.audioUrl,
            mood: data.mood,
            timestamp: data.timestamp,
            song: data.song,
            reflection: data.reflection,
          };
        }
      );

      // Optional: sort recordings by timestamp descending
      loadedRecordings.sort((a, b) => b.timestamp.localeCompare(a.timestamp));

      setRecordings(loadedRecordings);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add new recording: upload audio, create firestore record with metadata & audioUrl
  const addRecording = async (audioBlob: Blob, metadata: RecordingMetadata) => {
    if (!userId) {
      setError("User not authenticated");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // 1. Create Firestore entry without audioUrl first to get entryId
      const entriesRef = collection(db, "users", userId, "entries");
      const newDocRef = await addDoc(entriesRef, { ...metadata, audioUrl: "" });

      // 2. Upload audio file to storage path `/audio/userId/entryId.mp3`
      const storageRef = ref(storage, `audio/${userId}/${newDocRef.id}.mp3`);
      await uploadBytes(storageRef, audioBlob);

      // 3. Get download URL and update Firestore entry
      const downloadUrl = await getDownloadURL(storageRef);
      await updateDoc(doc(db, "users", userId, "entries", newDocRef.id), {
        audioUrl: downloadUrl,
      });

      // Refresh recordings after add
      await fetchRecordings();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a recording completely (Firestore + Storage)
  const deleteRecording = async (entryId: string) => {
    if (!userId) {
      setError("User not authenticated");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Delete Firestore document
      await deleteDoc(doc(db, "users", userId, "entries", entryId));

      // Delete Storage audio file
      const storageRef = ref(storage, `audio/${userId}/${entryId}.mp3`);
      await deleteObject(storageRef);

      // Refresh recordings after delete
      setRecordings((prev) => prev.filter((entry) => entry.id !== entryId));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AudioRecordingContext.Provider
      value={{
        recordings,
        loading,
        error,
        fetchRecordings,
        addRecording,
        deleteRecording,
      }}
    >
      {children}
    </AudioRecordingContext.Provider>
  );
};
