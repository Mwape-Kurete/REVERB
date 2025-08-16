export interface ReverbEntry {
  id: string; // unique entry ID, for example Firestore auto ID
  songTitle: string;
  songArtist: string;
  moodTags: string[]; // array of mood tag strings
  reflection: string; // long text
  timestamp: number; // Unix milliseconds (Date.now()) for timeline sorting and summaries
  audioUrl: string; // URL to the actual audio file stored in Firebase Storage
  userId: string; // ID of user owning this entry
}
