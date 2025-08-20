import { QuizQuestion, QuizResponse } from "@/interface/Quiz";
import { useState } from "react";

export function useMoodLoopQuiz(initalQuestions: QuizQuestion[]) {
  const [currentQuestIndex, setCurrentQuestIndex] = useState(0);
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const [awaitFollowUp, setAwaitFollowUp] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = initalQuestions[currentQuestIndex];

  const answerCurrentQuest = (answer: string) => {
    // this is for if the current question has a follow up
    if (currentQuestion.followUpQuestion && !awaitFollowUp) {
      setAwaitFollowUp(true);
      setResponses((prev) => [
        ...prev,
        { questionId: currentQuestion.id, answer }, //savving the initial answer
      ]);
    } else {
      // saving the follow up answer as needed
      setResponses((prev) => {
        const updated = [...prev];
        const lastIndex = updated.findIndex(
          (r) => r.questionId === currentQuestion.id
        );
        if (lastIndex !== -1 && awaitFollowUp) {
          updated[lastIndex].followUpAnswer = answer;
        } else {
          updated.push({ questionId: currentQuestion.id, answer });
        }
        return updated;
      });
      setAwaitFollowUp(false);

      if (currentQuestIndex + 1 < initalQuestions.length) {
        setCurrentQuestIndex(currentQuestIndex + 1);
      } else {
        setIsComplete(true);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestIndex(0);
    setResponses([]);
    setAwaitFollowUp(false);
    setIsComplete(false);
  };

  return {
    isComplete,
    currentQuestIndex: awaitFollowUp
      ? {
          id: currentQuestion.id,
          question: currentQuestion.followUpQuestion || "",
          options: [],
        }
      : currentQuestion,
    awaitFollowUp,
    responses,
    answerCurrentQuest,
    resetQuiz,
  };
}
