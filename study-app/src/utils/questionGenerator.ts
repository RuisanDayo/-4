import { Question } from '../types';

// シンプルな問題生成ロジック
// 実際のプロダクションではAI APIを使用することを推奨
export const generateQuestions = (text: string): Question[] => {
  const questions: Question[] = [];
  
  // テキストを文に分割
  const sentences = text
    .split(/[。\n]/)
    .filter(s => s.trim().length > 10)
    .slice(0, 5); // 最大5問

  sentences.forEach((sentence, index) => {
    // キーワードを抽出（名詞っぽい単語）
    const words = sentence.match(/[\u4e00-\u9faf\u3040-\u309f\u30a0-\u30ff]{2,}/g) || [];
    
    if (words.length >= 2) {
      const keyword = words[Math.floor(Math.random() * words.length)];
      const questionText = sentence.replace(keyword, '____');
      
      // 選択肢を生成（正解 + ダミー）
      const dummyOptions = [
        'わからない',
        '該当なし',
        '不明',
      ];
      
      const options = [keyword, ...dummyOptions.slice(0, 3)];
      // シャッフル
      const shuffledOptions = options.sort(() => Math.random() - 0.5);
      const correctIndex = shuffledOptions.indexOf(keyword);

      questions.push({
        id: index + 1,
        question: `次の文の空欄に入る適切な語句を選んでください：\n\n${questionText}`,
        options: shuffledOptions,
        correctAnswer: correctIndex,
        explanation: `正解は「${keyword}」です。\n\n原文：${sentence}`,
      });
    }
  });

  // 最低1問は生成する（テキストが短い場合の対策）
  if (questions.length === 0) {
    questions.push({
      id: 1,
      question: `次のテキストの内容について正しいものを選んでください：\n\n${text.substring(0, 100)}...`,
      options: [
        '上記の内容は社会科の資料である',
        '上記の内容は数学の資料である',
        '上記の内容は理科の資料である',
        '上記の内容は英語の資料である',
      ],
      correctAnswer: 0,
      explanation: 'このテキストは社会科の学習資料から抽出されたものです。',
    });
  }

  return questions;
};

// より高度な問題生成が必要な場合は、以下のようなAPI呼び出しを実装
export const generateQuestionsWithAI = async (text: string): Promise<Question[]> => {
  // OpenAI API や Google Gemini API などを使用
  // この実装は別途APIキーとバックエンドが必要
  throw new Error('AI問題生成は未実装です。generateQuestions()を使用してください。');
};
