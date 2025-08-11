import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import GlobalStyles from "@/styles/GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TextInput } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

const PreviewScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={[GlobalStyles.container]}>
      <View style={styles.pageHeader}>
        <Text style={[GlobalStyles.headerText, { fontSize: 20 }]}>
          REVERB #00{" "}
        </Text>
        <MaterialCommunityIcons
          name="record-circle-outline"
          size={48}
          color="#21102F"
        />
      </View>
      <View style={styles.mainContent}>
        <View style={styles.infoContainer}>
          <TextInput
            style={[GlobalStyles.formInput, { marginVertical: 12 }]}
            placeholder="Search for a song assosciation"
          />
          <TextInput
            style={[GlobalStyles.formInput, { marginVertical: 12 }]}
            placeholder="Attatch a mood or emotion"
          />
        </View>
        <View style={styles.playbackContainer}>
          {/* Render the recording animation */}
          <View
            style={{
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={[GlobalStyles.headerText, { fontSize: 20 }]}>
              Recording Animation Goes Here
            </Text>

            {/* Show recording duration */}
            <Text style={[GlobalStyles.headerText, { fontSize: 20 }]}>
              02:00
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.medButton}>
          <MaterialCommunityIcons name="rewind" size={24} color="#21102F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.medButton}>
          <MaterialCommunityIcons name="play" size={24} color="#21102F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.medButton}>
          <MaterialCommunityIcons
            name="fast-forward"
            size={24}
            color="#21102F"
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={[GlobalStyles.ghostButton, { maxWidth: 24 }]}
          onPress={() => router.push("/(tabs)/TimelineScreen")}
        >
          <Text style={[GlobalStyles.textPrimary, { fontSize: 16 }]}>
            Save REVERB
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PreviewScreen;

const styles = StyleSheet.create({
  pageHeader: {
    flexDirection: "row",
    width: "100%",
    paddingBottom: 12,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#21102F",
  },
  mainContent: {
    flex: 1,
    width: "100%",
    height: "70%",
  },
  infoContainer: {
    width: "100%",
    height: "50%",
    paddingTop: 24,
  },
  playbackContainer: {
    width: "100%",
    height: "50%",
  },
  bottomContainer: {
    width: "100%",
    height: "15%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  medButton: {
    backgroundColor: "#D8B8F1",
    height: 56,
    width: 100,
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
