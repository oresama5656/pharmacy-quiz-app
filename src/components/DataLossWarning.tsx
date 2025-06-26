import React, { useEffect, useState } from 'react';

interface DataLossWarningProps {
  onClose: () => void;
}

const DataLossWarning: React.FC<DataLossWarningProps> = ({ onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // セーブデータがある場合のみ警告を表示
    const hasData = localStorage.length > 0;
    if (hasData) {
      // 警告を表示済みかチェック
      const warningShown = localStorage.getItem('data_loss_warning_shown');
      if (!warningShown) {
        setShow(true);
      }
    }
  }, []);

  const handleClose = () => {
    // 警告を表示済みとしてマーク
    localStorage.setItem('data_loss_warning_shown', 'true');
    setShow(false);
    onClose();
  };

  const handleDontShowAgain = () => {
    // 今後表示しないとしてマーク
    localStorage.setItem('data_loss_warning_dismissed', 'true');
    handleClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">⚠️</div>
          <h2 className="text-xl font-bold text-red-600">重要なお知らせ</h2>
        </div>

        <div className="mb-6 space-y-3">
          <p className="text-gray-700">
            このゲームの進行状況は<strong>ブラウザのローカルストレージ</strong>に保存されています。
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
            <p className="text-yellow-800 font-semibold mb-2">以下の場合、データが消失する可能性があります：</p>
            <ul className="text-yellow-700 text-sm space-y-1">
              <li>• ブラウザのキャッシュ・データをクリア</li>
              <li>• プライベートブラウジングモード</li>
              <li>• 別のブラウザやデバイスでの使用</li>
              <li>• ブラウザの自動クリーンアップ</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-blue-800 font-semibold mb-2">💡 データについて：</p>
            <p className="text-blue-700 text-sm">
              進行状況は自動で保存されますが、上記の操作により<br/>
              データが失われる可能性があることをご了承ください
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={handleClose}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            理解しました
          </button>
          <button
            onClick={handleDontShowAgain}
            className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm"
          >
            今後この警告を表示しない
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataLossWarning; 