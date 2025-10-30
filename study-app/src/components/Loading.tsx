import React from 'react';

interface LoadingProps {
  progress?: number;
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ 
  progress, 
  message = '処理中...' 
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center space-y-6">
          {/* アニメーションアイコン */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-500"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl">
                📚
              </div>
            </div>
          </div>

          {/* メッセージ */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {message}
            </h3>
            <p className="text-gray-600">
              しばらくお待ちください
            </p>
          </div>

          {/* プログレスバー */}
          {progress !== undefined && (
            <div className="w-full">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>進行状況</span>
                <span>{Math.round(progress * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* ローディングステップ */}
          <div className="text-left space-y-2 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center text-sm">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-600">画像を読み込み中</span>
            </div>
            <div className="flex items-center text-sm">
              <span className={`mr-2 ${progress && progress > 0.3 ? 'text-green-500' : 'text-gray-400'}`}>
                {progress && progress > 0.3 ? '✓' : '○'}
              </span>
              <span className="text-gray-600">テキストを抽出中</span>
            </div>
            <div className="flex items-center text-sm">
              <span className={`mr-2 ${progress && progress > 0.7 ? 'text-green-500' : 'text-gray-400'}`}>
                {progress && progress > 0.7 ? '✓' : '○'}
              </span>
              <span className="text-gray-600">問題を生成中</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
