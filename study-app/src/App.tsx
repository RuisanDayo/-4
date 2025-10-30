import { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import Loading from './components/Loading';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { extractTextFromImage } from './utils/ocr';
import { generateQuestions } from './utils/questionGenerator';
import { Question, UserAnswer, AppStep } from './types';

function App() {
  const [step, setStep] = useState<AppStep>('upload');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleImageSelect = async (file: File) => {
    setIsProcessing(true);
    setStep('loading');
    setProgress(0);

    try {
      // OCRでテキストを抽出
      const extractedText = await extractTextFromImage(file, (p) => {
        setProgress(p * 0.8); // OCRの進捗を80%まで
      });

      console.log('抽出されたテキスト:', extractedText);

      if (!extractedText || extractedText.trim().length === 0) {
        alert('テキストを抽出できませんでした。別の画像を試してください。');
        setStep('upload');
        setIsProcessing(false);
        return;
      }

      // 問題を生成
      setProgress(0.85);
      const generatedQuestions = generateQuestions(extractedText);
      setProgress(1);

      if (generatedQuestions.length === 0) {
        alert('問題を生成できませんでした。別の画像を試してください。');
        setStep('upload');
        setIsProcessing(false);
        return;
      }

      setQuestions(generatedQuestions);
      
      // 少し遅延を入れて滑らかに遷移
      setTimeout(() => {
        setStep('quiz');
        setIsProcessing(false);
      }, 500);
    } catch (error) {
      console.error('エラー:', error);
      alert('処理中にエラーが発生しました。もう一度お試しください。');
      setStep('upload');
      setIsProcessing(false);
    }
  };

  const handleQuizComplete = (userAnswers: UserAnswer[]) => {
    setAnswers(userAnswers);
    setStep('result');
  };

  const handleRestart = () => {
    setStep('upload');
    setQuestions([]);
    setAnswers([]);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="container mx-auto">
        {step === 'upload' && (
          <ImageUpload
            onImageSelect={handleImageSelect}
            isProcessing={isProcessing}
          />
        )}

        {step === 'loading' && (
          <Loading
            progress={progress}
            message="画像を処理して問題を生成中..."
          />
        )}

        {step === 'quiz' && (
          <Quiz questions={questions} onComplete={handleQuizComplete} />
        )}

        {step === 'result' && (
          <Result
            questions={questions}
            answers={answers}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}

export default App;
