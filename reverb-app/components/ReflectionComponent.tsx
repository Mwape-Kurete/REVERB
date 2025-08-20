import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

interface ReflectionProps {
  lastResponse: { answer: string; followUpAnswer?: string };
  onSaveFutureNote: (note: string) => void;
}

const ReflectionComponent = ({
  lastResponse,
  onSaveFutureNote,
}: ReflectionProps) => {
  const [futureNote, setFutureNote] = useState("");
  const [saved, setSaved] = useState(false);

  const reflectionMap: Record<string, string> = {
    Yes: "It’s normal to be surprised by feelings. Reflecting helps you become more emotionally aware.",
    No: "Well done recognizing your mood patterns. Awareness is key to self-growth.",
  };

  const baseReflection = reflectionMap[lastResponse.answer] || "";

  const handleSaveNote = () => {
    if (futureNote.trim()) {
      onSaveFutureNote(futureNote.trim());
      setSaved(true);
    }
  };

  if (saved) {
    return (
      <View style={styles.container}>
        <Text style={styles.thankYou}>
          Your note to your future self has been saved! 🎉
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: undefined })}
      style={styles.container}
    >
      <Text style={styles.reflectionText}>{baseReflection}</Text>
      {lastResponse.followUpAnswer && (
        <>
          <Text style={styles.userThoughtsTitle}>Your thoughts:</Text>
          <Text style={styles.userThoughts}>
            &quot;{lastResponse.followUpAnswer}&quot;
          </Text>
        </>
      )}
      <Text style={styles.futureNotePrompt}>
        Send a 10-second voice or text memo to your future self for next week:
      </Text>

      <TextInput
        placeholder="Write a note to your future self..."
        style={styles.textInput}
        value={futureNote}
        onChangeText={setFutureNote}
        multiline
        numberOfLines={3}
        maxLength={200}
      />
      <TouchableOpacity
        style={[styles.saveButton, !futureNote.trim() && styles.disabledButton]}
        disabled={!futureNote.trim()}
        onPress={handleSaveNote}
      >
        <Text style={styles.saveButtonText}>Save Note</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ReflectionComponent;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: "#E7D1F2",
    borderRadius: 12,
  },
  reflectionText: {
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 12,
    color: "#21102F",
  },
  userThoughtsTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  userThoughts: {
    fontStyle: "italic",
    marginBottom: 12,
  },
  futureNotePrompt: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "600",
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#9B34F1",
    paddingVertical: 12,
    borderRadius: 30,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  thankYou: {
    fontSize: 16,
    fontWeight: "600",
    color: "#21102F",
    textAlign: "center",
  },
});
