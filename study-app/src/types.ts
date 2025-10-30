// アプリケーションの型定義

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface UserAnswer {
  questionId: number;
  selectedAnswer: number;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  answers: UserAnswer[];
  questions: Question[];
}

export type AppStep = 'upload' | 'loading' | 'quiz' | 'result';
