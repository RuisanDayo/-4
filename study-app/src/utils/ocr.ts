import Tesseract from 'tesseract.js';

export const extractTextFromImage = async (
  imageFile: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  try {
    const result = await Tesseract.recognize(
      imageFile,
      'jpn+eng', // 日本語と英語の両方をサポート
      {
        logger: (m) => {
          if (m.status === 'recognizing text' && onProgress) {
            onProgress(m.progress);
          }
        },
      }
    );

    return result.data.text;
  } catch (error) {
    console.error('OCR処理エラー:', error);
    throw new Error('画像からテキストを抽出できませんでした');
  }
};
