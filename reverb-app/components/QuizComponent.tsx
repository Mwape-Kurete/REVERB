import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import { QuizQuestion } from "@/interface/Quiz";

interface QuizProps {
  question: QuizQuestion | null;
  onAnswer: (answer: string) => void;
}

const QuizComponent = ({ question, onAnswer }: QuizProps) => {
  const [textAnswer, setTextAnswer] = useState("");

  if (!question) return null;

  //if there's no follow up
  const isOpenEnded = !question.options || question.options.length === 0;

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.question}</Text>

      {isOpenEnded ? (
        <>
          <TextInput
            style={styles.textInput}
            value={textAnswer}
            onChangeText={setTextAnswer}
            placeholder="Write your thoughts here..."
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity
            style={[
              styles.optionButton,
              textAnswer.trim() ? {} : styles.disabledButton,
            ]}
            disabled={!textAnswer.trim()}
            onPress={() => {
              onAnswer(textAnswer.trim());
              setTextAnswer("");
            }}
          >
            <Text style={styles.optionText}>Submit</Text>
          </TouchableOpacity>
        </>
      ) : (
        question.options.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => onAnswer(option)}
            style={styles.optionButton}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
};

export default QuizComponent;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    padding: 12,
    backgroundColor: "#FDDEE1",
    borderRadius: 12,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  optionButton: {
    backgroundColor: "#F45B69",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 30,
  },
  disabledButton: {
    backgroundColor: "#edcbceff",
  },
  optionText: {
    color: "white",
    fontWeight: "500",
    textAlign: "center",
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    minHeight: 80,
    textAlignVertical: "top",
    borderColor: "#edcbceff",
    borderWidth: 1,
  },
});
