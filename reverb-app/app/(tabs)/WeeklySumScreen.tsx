import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ReverbEntry } from "@/interface/Entries";
import { useAudioRecording } from "@/contexts/AudioRecordingContext";
import GlobalStyles from "@/styles/GlobalStyles";

const WeekStartsOn = 1; // Monday

const WeeklySumScreen = () => {
  const { recordings, fetchRecordings } = useAudioRecording();
  const [weekReverbs, setWeekReverbs] = useState<ReverbEntry[]>([]);

  useEffect(() => {
    fetchRecordings();
  }, []);

  useEffect(() => {
    // Filter recordings for the current week
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(
      now.getDate() - ((now.getDay() + 7 - WeekStartsOn) % 7)
    );
    startOfWeek.setHours(0, 0, 0, 0);

    const filtered = recordings.filter(
      (r) => r.timestamp >= startOfWeek.getTime()
    );
    setWeekReverbs(filtered);
  }, [recordings]);

  const allMoods: string[] = weekReverbs.flatMap((r) => r.moodTags);

  const moodCount: Record<string, number> = allMoods.reduce(
    (acc: Record<string, number>, mood: string) => {
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    },
    {}
  );

  const mostFrequentMood = Object.entries(moodCount).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0];

  // Choose longest reflection as highlight (or empty string)
  const favReflection =
    weekReverbs.sort((a, b) => b.reflection.length - a.reflection.length)[0]
      ?.reflection || "";

  return (
    <SafeAreaView style={[GlobalStyles.container]}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.topSect}>
          <Text style={[GlobalStyles.headerText, { fontSize: 20 }]}>
            ✨ Your Week in REVERB ✨
          </Text>
          <Text style={[GlobalStyles.textInfo, { marginVertical: 8 }]}>
            “Looking back, what stands out about your moods and reflections?”
          </Text>
        </View>

        {/* Analytics Section */}
        <View style={styles.introBox}>
          <Text style={styles.sectionTitle}>Mood Trends</Text>
          <Text>
            Top mood:{" "}
            <Text style={styles.highlight}>{mostFrequentMood || "–"}</Text>
          </Text>
          <Text>
            You created{" "}
            <Text style={styles.highlight}>{weekReverbs.length}</Text> REVERBs
            this week.
          </Text>
        </View>

        {/* Mood Cloud */}
        <View
          style={[
            styles.introBoxMood,
            { flexDirection: "row", flexWrap: "wrap" },
          ]}
        >
          {Object.entries(moodCount).map(([mood, count]) => (
            <View key={mood} style={[GlobalStyles.pillTabs, { margin: 4 }]}>
              <Text style={{ fontSize: 12 + count * 2 }}>{mood}</Text>
            </View>
          ))}
        </View>

        {/* Reflection Snippet */}
        {favReflection && (
          <View style={styles.introBoxTertiary}>
            <Text style={styles.sectionTitle}>Reflection Highlight</Text>
            <Text style={styles.reflection}>
              “{favReflection.slice(0, 160)}
              {favReflection.length > 160 ? "…" : ""}”
            </Text>
          </View>
        )}

        {/* REVERBs of the week */}
        <View style={{ marginTop: 28 }}>
          <Text style={styles.sectionTitle}>Your REVERBs This Week</Text>
          {weekReverbs.length ? (
            weekReverbs.map((item, i) => (
              <TouchableOpacity key={item.id} style={styles.custCard}>
                <Text
                  style={[
                    GlobalStyles.badges,
                    GlobalStyles.headerText,
                    styles.cardBadge,
                    { fontSize: 12 },
                  ]}
                >
                  REVERB #{i + 1}
                </Text>
                <Text>{new Date(item.timestamp).toLocaleDateString()}</Text>
                <Text style={styles.track}>
                  {item.songTitle} – {item.songArtist}
                </Text>
                <Text style={styles.moods}>
                  Tags: {item.moodTags.join(", ")}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ marginTop: 16 }}>
              No REVERBs this week. Try recording your next reflection!
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topSect: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  introBox: {
    backgroundColor: "#FEEFF0",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  introBoxMood: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  introBoxTertiary: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  sectionTitle: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 16,
  },
  highlight: {
    color: "#F45B69",
    fontWeight: "500",
  },
  reflection: {
    fontStyle: "italic",
    marginTop: 4,
  },
  custCard: {
    marginBottom: 16,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#FCCED2",
  },
  cardBadge: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    paddingTop: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    alignSelf: "flex-start",
    justifyContent: "center",
    marginBottom: 8,
  },
  track: { fontWeight: "500", marginTop: 4 },
  moods: { color: "#CB4955", marginTop: 2 },
});

export default WeeklySumScreen;
