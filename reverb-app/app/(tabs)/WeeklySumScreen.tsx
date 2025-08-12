import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import GlobalStyles from "@/styles/GlobalStyles";
import ReverbCards from "@/components/ui/ReverbCards";

import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { ScrollView, TextInput } from "react-native-gesture-handler";

const WeeklySumScreen = () => {
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
            Wrap-up
          </Text>
          <Text style={[GlobalStyles.textInfo, GlobalStyles.spacerSmall]}>
            View your REVERB weekly wrap.
          </Text>
        </View>
      </View>
      <View style={styles.bottomOut}>
        <ScrollView style={{ width: "100%" }}>
          <TouchableOpacity style={styles.custCard}>
            <Text
              style={[
                GlobalStyles.pillTabs,
                GlobalStyles.headerText,
                styles.cardBadge,
                { fontSize: 12 },
              ]}
            >
              REVERB #00
            </Text>
            <Text>Mon, 01/09/25</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.custCard}>
            <Text
              style={[
                GlobalStyles.pillTabs,
                GlobalStyles.headerText,
                styles.cardBadge,
                { fontSize: 12 },
              ]}
            >
              REVERB #01
            </Text>
            <Text>Mon, 01/09/25</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default WeeklySumScreen;

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
    padding: 8,
  },
  custCard: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 20,
    padding: 12,
    elevation: 4,
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
    borderRadius: 8,
  },
  cardBadge: {
    textAlign: "center",
    justifyContent: "center",
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
