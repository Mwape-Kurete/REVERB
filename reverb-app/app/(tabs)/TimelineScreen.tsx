import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";

import GlobalStyles from "@/styles/GlobalStyles";
import ReverbCards from "@/components/ui/ReverbCards";

import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useAudioRecording } from "@/contexts/AudioRecordingContext";
import { useRouter } from "expo-router";

const TimelineScreen = () => {
  const router = useRouter();
  const { recordings, loading, error, fetchRecordings } = useAudioRecording();

  // fetch recordings when scren loads
  useEffect(() => {
    fetchRecordings();
  }, []);

  // Helper to format timestamp to a readable date strin
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toDateString(); // "Mon, 01/08/23"
  };

  //navigation to ReverbViewScreen
  const handleCardSelect = (entryId: string) => {
    router.push({
      pathname: "/(tabs)/ReverbViewScreen",
      params: { entryId },
    });
  };

  return (
    <SafeAreaView style={[GlobalStyles.container]}>
      <View style={styles.topSect}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text
            style={[
              GlobalStyles.subHeaderText,
              GlobalStyles.spacerSmaller,
              { fontWeight: 400 },
            ]}
          >
            Your{" "}
            <Text style={[GlobalStyles.headerText, { fontSize: 16 }]}>
              REVERB
            </Text>{" "}
            Timeline
          </Text>
          <Text style={[GlobalStyles.textInfo, GlobalStyles.spacerSmall]}>
            Find all your past REVERBs here.
          </Text>
          <TextInput
            style={[GlobalStyles.formInput, { marginVertical: 32 }]}
            placeholder="Search through your REVERBs"
            placeholderTextColor="#D8B8F1"
          />
        </View>
      </View>
      <View style={styles.bottomOut}>
        <ScrollView style={{ width: "100%" }}>
          {loading && <Text>Loading...</Text>}
          {error && <Text style={{ color: "red" }}>{error}</Text>}

          {!loading &&
            recordings.map((entry, index) => (
              <ReverbCards
                onPress={() => handleCardSelect(entry.id)}
                style={styles.custCard}
                key={entry.id}
              >
                <Text
                  style={[
                    GlobalStyles.badges,
                    GlobalStyles.headerText,
                    styles.cardBadge,
                    { fontSize: 12 },
                  ]}
                >
                  REVERB #{index + 1}
                </Text>
                <Text>{formatDate(entry.timestamp)}</Text>
                <Text>
                  {entry.songTitle} - {entry.songArtist}
                </Text>
                {/* You may add more details like mood tags, reflection excerpt, etc. */}
              </ReverbCards>
            ))}

          {recordings.length === 0 && !loading && (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No recordings found
            </Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TimelineScreen;

const styles = StyleSheet.create({
  topSect: {
    flexDirection: "column",
    width: "100%",
    height: "45%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 32,
  },
  bottomOut: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    marginTop: 24,
    borderTopWidth: 1,
    borderColor: "#020103",
    backgroundColor: "#ffffff",
    padding: 12,
  },
  custCard: {
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    height: 150,
  },
  cardBadge: {
    textAlign: "center",
    justifyContent: "center",
    color: "#ffffff",
  },
  medButton: {
    backgroundColor: "#21102F",
    color: "#ffffff",
    height: 56,
    minWidth: "48%",
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
