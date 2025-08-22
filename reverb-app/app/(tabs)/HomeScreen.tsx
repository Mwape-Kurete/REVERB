import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import React from "react";

import GlobalStyles from "@/styles/GlobalStyles";
import ReverbCards from "@/components/ui/ReverbCards";

import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { ScrollView } from "react-native-gesture-handler";

const HomeScreen = () => {
  const router = useRouter();

  const navWithLoader = (destinationPath: string, message: string) => {
    router.push(
      `/FeedbackScreen?destination=${encodeURIComponent(
        destinationPath
      )}&message=${encodeURIComponent(message)}`
    );
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
            Welcome to{" "}
            <Text
              style={[
                GlobalStyles.textSecondary,
                {
                  fontFamily: "Michroma_400Regular",
                  color: "#020103",
                  fontSize: 14,
                },
              ]}
            >
              REVERB
            </Text>
          </Text>
          <Text style={[GlobalStyles.textInfo, { textAlign: "center" }]}>
            This app is all about introspection through audio journaling, Record
            REVERBs, view weekly summaries and learn more about yourself
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={GlobalStyles.secondaryButton}
            onPress={() =>
              navWithLoader("/(tabs)/NewScreen", "Ready to record a REVERB?")
            }
          >
            <Text
              style={[
                GlobalStyles.textSecondary,
                {
                  fontFamily: "Michroma_400Regular",
                  color: "#020103",
                  fontSize: 14,
                },
              ]}
            >
              Record a REVERB
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomOut}>
        <View style={styles.bottomCardRow}>
          <ReverbCards
            style={styles.custCard}
            onPress={() =>
              navWithLoader(
                "/(tabs)/TimelineScreen",
                "Fetching all your REVERBs"
              )
            }
          >
            <Text style={GlobalStyles.subHeaderText}>REVERB Timeline</Text>
            <AntDesign name="arrowright" size={40} color="#CB4955" />
          </ReverbCards>
          <ReverbCards
            style={styles.custCard}
            onPress={() =>
              navWithLoader(
                "/(tabs)/WeeklySumScreen",
                "Compiling your weekly REVERB recap..."
              )
            }
          >
            <Text style={GlobalStyles.subHeaderText}>Weekly REVERB Recap</Text>
            <AntDesign name="arrowright" size={40} color="#CB4955" />
          </ReverbCards>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  topSect: {
    flexDirection: "column",
    width: "100%",
    height: "45%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 32,
  },
  bottomSect: {
    width: "100%",
    paddingRight: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bottomCardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 16,
    gap: 16,
    width: "95%",
  },
  bottomOut: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 24,
    borderTopWidth: 1,
    borderColor: "#020103",
    backgroundColor: "#ffffff",
    padding: 12,
  },
  custCard: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 240,
    width: 175,
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
