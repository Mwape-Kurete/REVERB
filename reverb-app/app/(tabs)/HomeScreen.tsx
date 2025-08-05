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
    <SafeAreaView style={GlobalStyles.container}>
      <View style={styles.topSect}>
        <Text style={[GlobalStyles.subHeaderText, { fontWeight: 400 }]}>
          Quote of the Day
        </Text>
        <Text style={[GlobalStyles.textInfo]}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Text>

        <TouchableOpacity style={GlobalStyles.TertiaryButton}>
          <Text style={GlobalStyles.subHeaderText}>Prompt Me</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomOut}>
        <View style={styles.bottomCardRow}>
          <ReverbCards style={styles.custCard}>
            <Text style={GlobalStyles.subHeaderText}>REVERB Timeline</Text>
            <AntDesign name="arrowright" size={40} color="#020103" />
          </ReverbCards>
          <ReverbCards style={styles.custCard}>
            <Text style={GlobalStyles.subHeaderText}>Weekly REVERB Recap</Text>
            <AntDesign name="arrowright" size={40} color="#020103" />
          </ReverbCards>
        </View>
        <View style={styles.bottomSect}>
          <TouchableOpacity style={styles.medButton}>
            <Entypo name="controller-record" size={24} color="white" />
            <Text style={{ color: "#ffffff" }}>
              Record a{" "}
              <Text style={{ fontWeight: "bold", color: "#ffffff" }}>
                REVERB
              </Text>
            </Text>
          </TouchableOpacity>
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
    height: "30%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
    paddingHorizontal: 20,
    gap: 8,
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
    marginBottom: 16,
    paddingHorizontal: 16,
    gap: 16,
    width: "95%",
  },
  bottomOut: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 24,
    borderColor: "#020103",
  },
  custCard: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  medButton: {
    backgroundColor: "#21102F",
    color: "#ffffff",
    height: 56,
    minWidth: "50%",
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
