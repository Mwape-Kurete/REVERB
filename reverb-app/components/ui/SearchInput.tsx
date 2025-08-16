import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { searchTracks, TrackInfo } from "@/services/lastfmService";
import GlobalStyles from "@/styles/GlobalStyles";

const DEBOUNCE_DELAY = 300; // ms debounce delay

export default function SearchInput({
  onSelect,
}: {
  onSelect: (track: TrackInfo) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TrackInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout> | null>(
    null
  );
  const [selected, setSelected] = useState<TrackInfo | null>(null);

  useEffect(() => {
    // Clear previous timer if query changes within debounce period
    if (timerId) clearTimeout(timerId);

    if (query.length < 2) {
      setResults([]); // Clear results if query too short
      setLoading(false);
      return;
    }

    // Set new debounce timer
    const newTimerId = setTimeout(async () => {
      setLoading(true);
      const tracks = await searchTracks(query);
      setResults(tracks);
      setLoading(false);
    }, DEBOUNCE_DELAY);

    setTimerId(newTimerId);

    // Cleanup on unmount or query changes
    return () => {
      clearTimeout(newTimerId);
    };
  }, [query]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={"Search for a song"}
        value={selected ? `${selected.name} by ${selected.artist}` : query}
        onChangeText={(text) => {
          setSelected(null); // clearing selection when searching (activiting text input)
          setQuery(text);
        }}
        style={GlobalStyles.formInput}
        autoCorrect={false}
        autoCapitalize="none"
      />

      {loading && <ActivityIndicator style={{ marginVertical: 8 }} />}

      {results.length > 0 && query.length >= 2 && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.url}
          keyboardShouldPersistTaps="handled"
          style={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelected(item);
                onSelect(item);
                setResults([]);
              }}
              style={styles.listItem}
            >
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.image} />
              ) : null}
              <Text style={styles.text}>
                {item.name} - {item.artist}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  input: {
    borderWidth: 1,
    borderColor: "#9D4EDD",
    padding: 10,
    fontSize: 16,
  },
  list: {
    maxHeight: 200,
    borderBottomWidth: 1,
    borderColor: "#9D4EDD",
    backgroundColor: "#fff",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#D8B8F1",
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
  },
});
