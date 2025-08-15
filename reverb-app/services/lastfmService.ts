const API_KEY = "	ae01706575c9600550e98ec15c9bcc9c";
const API_URL = "https://ws.audioscrobbler.com/2.0/";

export interface TrackInfo {
  name: string;
  artist: string;
  url: string;
  image: string; // largest available image URL or empty
}

export async function searchTracks(
  query: string,
  limit = 10
): Promise<TrackInfo[]> {
  try {
    const params = new URLSearchParams({
      method: "track.search",
      track: query,
      api_key: API_KEY,
      format: "json",
      limit: limit.toString(),
    });

    const response = await fetch(`${API_URL}?${params.toString()}`);
    const data = await response.json();

    if (!data.results || !data.results.trackmatches) {
      return [];
    }

    const tracks = data.results.trackmatches.track;

    // Normalise to array of TrackInfo
    return tracks.map((track: any) => {
      // Get largest available image or fallback empty string
      const imageObj = (track.image || [])
        .reverse()
        .find((img: any) => img["#text"]);
      return {
        name: track.name,
        artist: track.artist,
        url: track.url,
        image: imageObj ? imageObj["#text"] : "",
      };
    });
  } catch (error) {
    console.error("Last.fm track search failed:", error);
    return [];
  }
}
