import React from 'react';
import { Question, UserAnswer } from '../types';

interface ResultProps {
  questions: Question[];
  answers: UserAnswer[];
  onRestart: () => void;
}

const Result: React.FC<ResultProps> = ({ questions, answers, onRestart }) => {
  // 正解数を計算
  const correctCount = answers.filter((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    return question && question.correctAnswer === answer.selectedAnswer;
  }).length;

  const totalQuestions = questions.length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  // スコアに応じたメッセージと絵文字
  const getScoreMessage = () => {
    if (percentage === 100) {
      return { emoji: '🎉', message: '完璧です！', color: 'text-yellow-500' };
    } else if (percentage >= 80) {
      return { emoji: '🌟', message: '素晴らしい！', color: 'text-blue-500' };
    } else if (percentage >= 60) {
      return { emoji: '👍', message: 'よくできました！', color: 'text-green-500' };
    } else if (percentage >= 40) {
      return { emoji: '📚', message: 'もう少し頑張りましょう', color: 'text-orange-500' };
    } else {
      return { emoji: '💪', message: '復習が必要です', color: 'text-red-500' };
    }
  };

  const scoreInfo = getScoreMessage();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* スコア表示 */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{scoreInfo.emoji}</div>
          <h2 className={`text-3xl font-bold mb-2 ${scoreInfo.color}`}>
            {scoreInfo.message}
          </h2>
          <div className="text-5xl font-bold text-gray-800 my-4">
            {correctCount} / {totalQuestions}
          </div>
          <div className="text-xl text-gray-600">
            正答率: {percentage}%
          </div>
        </div>

        {/* 各問題の詳細 */}
        <div className="space-y-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 border-b-2 pb-2">
            解答と解説
          </h3>
          {questions.map((question) => {
            const userAnswer = answers.find((a) => a.questionId === question.id);
            const isCorrect =
              userAnswer && userAnswer.selectedAnswer === question.correctAnswer;
            const userSelectedOption = userAnswer
              ? question.options[userAnswer.selectedAnswer]
              : '';
            const correctOption = question.options[question.correctAnswer];

            return (
              <div
                key={question.id}
                className={`border-2 rounded-lg p-6 ${
                  isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
                }`}
              >
                {/* 問題番号と結果 */}
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold text-gray-800">
                    問題 {question.id}
                  </h4>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {isCorrect ? '✓ 正解' : '✗ 不正解'}
                  </span>
                </div>

                {/* 問題文 */}
                <p className="text-gray-700 mb-4 whitespace-pre-wrap">
                  {question.question}
                </p>

                {/* 解答 */}
                <div className="space-y-2 mb-4">
                  <div>
                    <span className="font-medium text-gray-700">あなたの解答: </span>
                    <span
                      className={`font-medium ${
                        isCorrect ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {userSelectedOption}
                    </span>
                  </div>
                  {!isCorrect && (
                    <div>
                      <span className="font-medium text-gray-700">正解: </span>
                      <span className="font-medium text-green-600">
                        {correctOption}
                      </span>
                    </div>
                  )}
                </div>

                {/* 解説 */}
                <div className="bg-white rounded p-4 border border-gray-200">
                  <h5 className="font-medium text-gray-700 mb-2">📖 解説</h5>
                  <p className="text-gray-600 whitespace-pre-wrap">
                    {question.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 最初に戻るボタン */}
        <button
          onClick={onRestart}
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
        >
          新しい問題にチャレンジ
        </button>
      </div>
    </div>
  );
};

export default Result;
