import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import GlobalStyles from "@/styles/GlobalStyles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function MoodInput() {
  const [moodTags, setMoodTags] = useState<string[]>([]);
  const [newMood, setNewMood] = useState("");

  // Add the mood to the list, prevent empty or duplicate moods
  const handleAddMood = () => {
    const trimmedMood = newMood.trim();
    if (trimmedMood && !moodTags.includes(trimmedMood)) {
      setMoodTags([...moodTags, trimmedMood]);
      setNewMood("");
    }
  };

  // Remove a specific mood by index
  const handleRemoveMood = (index: number) => {
    setMoodTags(moodTags.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="If this reverb was a single mood it would be..."
        value={newMood}
        onChangeText={setNewMood}
        onSubmitEditing={handleAddMood} // Add mood on keyboard submit
        style={GlobalStyles.formInput}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="done"
      />

      <View style={styles.pillBox}>
        {moodTags.map((mood, index) => (
          <TouchableOpacity
            key={`${mood}-${index}`}
            onPress={() => handleRemoveMood(index)}
            style={GlobalStyles.pillTabs}
          >
            <Text>{mood} </Text>
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={20}
              color="#21102F"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  pillBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 4,
    marginHorizontal: 12,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8, // optional if supported for spacing between pills
  },
});
