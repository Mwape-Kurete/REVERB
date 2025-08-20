export interface QuizQuestion {
  id: string;
  question: string;
  options: string[]; //yes or no
  followUpQuestion?: string; //nullable, not necessary
}

export interface QuizResponse {
  questionId: string;
  answer: string;
  followUpAnswer?: string; //nullable, not necessary
}
