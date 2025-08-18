import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useAudioRecording } from "@/contexts/AudioRecordingContext";
import ReverbAudioPlayer from "@/components/ReverbAudioPlayer";
import GlobalStyles from "@/styles/GlobalStyles";
import { ReverbEntry } from "@/interface/Entries";
import { SafeAreaView } from "react-native-safe-area-context";

const ReverbViewScreen = () => {
  const { entryId } = useLocalSearchParams<{ entryId: string }>();
  const { fetchRecordingsById } = useAudioRecording();
  const [entry, setEntry] = useState<ReverbEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!entryId) return;

    const loadEntry = async () => {
      setLoading(true);
      const fetchedEntry = await fetchRecordingsById(entryId);
      setEntry(fetchedEntry);
      setLoading(false);
    };

    loadEntry();
  }, [entryId]);

  if (loading) {
    return (
      <View style={GlobalStyles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!entry) {
    return (
      <View style={GlobalStyles.container}>
        <Text>Recording not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <Text style={[GlobalStyles.headerText, { fontSize: 20 }]}>
        {entry.songTitle} - {entry.songArtist}
      </Text>

      <ReverbAudioPlayer source={entry.audioUrl} />

      <View style={[GlobalStyles.container, { marginTop: 16 }]}>
        <Text style={[GlobalStyles.subHeaderText, GlobalStyles.spacerXSmall]}>
          Mood Tags:
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          {entry.moodTags.map((tag, i) => (
            <View key={i} style={GlobalStyles.pillTabs}>
              <Text>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[GlobalStyles.container, { marginTop: 4 }]}>
        <Text style={GlobalStyles.subHeaderText}>Reflection:</Text>
        <Text style={{ marginTop: 2 }}>{entry.reflection}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ReverbViewScreen;
