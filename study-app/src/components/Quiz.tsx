import React, { useState } from 'react';
import { Question, UserAnswer } from '../types';

interface QuizProps {
  questions: Question[];
  onComplete: (answers: UserAnswer[]) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) {
      alert('選択肢を選んでください');
      return;
    }

    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: selectedOption,
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (isLastQuestion) {
      onComplete(newAnswers);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    }
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* プログレスバー */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>問題 {currentQuestionIndex + 1} / {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* 問題文 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            問題 {currentQuestion.id}
          </h2>
          <p className="text-lg text-gray-700 whitespace-pre-wrap">
            {currentQuestion.question}
          </p>
        </div>

        {/* 選択肢 */}
        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedOption === index
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedOption === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedOption === index && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </div>
                <span className="text-gray-800">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* 次へボタン */}
        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
            selectedOption === null
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'
          }`}
        >
          {isLastQuestion ? '結果を見る' : '次の問題へ'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
