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
import { ScrollView } from "react-native-gesture-handler";

const HomeScreen = () => {
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
            Quote of the Day
          </Text>
          <Text style={[GlobalStyles.textInfo]}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Text>
        </View>
        <View>
          <TouchableOpacity style={GlobalStyles.TertiaryButton}>
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
          <ReverbCards style={styles.custCard}>
            <Text style={GlobalStyles.subHeaderText}>REVERB Timeline</Text>
            <AntDesign name="arrowright" size={40} color="#CB4955" />
          </ReverbCards>
          <ReverbCards style={styles.custCard}>
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
