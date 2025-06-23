import React, { useState, useRef } from 'react';
import { 
  exportSaveData, 
  importSaveData, 
  clearAllSaveData, 
  restoreBackup, 
  hasSaveData,
  recordBackupTime
} from '../utils/saveDataManager';

interface SaveDataManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged: () => void;
}

const SaveDataManager: React.FC<SaveDataManagerProps> = ({ isOpen, onClose, onDataChanged }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | 'warning'>('success');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const showMessage = (msg: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleExport = async () => {
    try {
      setIsLoading(true);
      if (!hasSaveData()) {
        showMessage('エクスポートするセーブデータがありません', 'warning');
        return;
      }
      exportSaveData();
      recordBackupTime(); // バックアップ時刻を記録
      showMessage('セーブデータをエクスポートしました！', 'success');
    } catch (error) {
      showMessage(error instanceof Error ? error.message : 'エクスポートに失敗しました', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      await importSaveData(file);
      showMessage('セーブデータをインポートしました！', 'success');
      onDataChanged();
    } catch (error) {
      showMessage(error instanceof Error ? error.message : 'インポートに失敗しました', 'error');
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClear = () => {
    if (!hasSaveData()) {
      showMessage('削除するセーブデータがありません', 'warning');
      return;
    }
    setShowClearConfirm(true);
  };

  const confirmClear = () => {
    try {
      clearAllSaveData();
      showMessage('全てのセーブデータを削除しました', 'success');
      setShowClearConfirm(false);
      onDataChanged();
    } catch (error) {
      showMessage('削除に失敗しました', 'error');
    }
  };

  const handleRestore = () => {
    try {
      const success = restoreBackup();
      if (success) {
        showMessage('バックアップから復元しました', 'success');
        onDataChanged();
      } else {
        showMessage('復元できるバックアップがありません', 'warning');
      }
    } catch (error) {
      showMessage('復元に失敗しました', 'error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">セーブデータ管理</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded ${
            messageType === 'success' ? 'bg-green-100 text-green-700' :
            messageType === 'error' ? 'bg-red-100 text-red-700' :
            'bg-yellow-100 text-yellow-700'
          }`}>
            {message}
          </div>
        )}

        {showClearConfirm ? (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
            <h3 className="font-bold text-red-800 mb-2">⚠️ 確認</h3>
            <p className="text-red-700 mb-4">
              全てのセーブデータを削除します。この操作は元に戻せません。
              本当に削除しますか？
            </p>
            <div className="flex gap-2">
              <button
                onClick={confirmClear}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                disabled={isLoading}
              >
                削除する
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                disabled={isLoading}
              >
                キャンセル
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-2">💾 バックアップ</h3>
              <p className="text-blue-700 text-sm mb-3">
                進行状況をファイルに保存して、データ消失を防ぎましょう
              </p>
              <button
                onClick={handleExport}
                disabled={isLoading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? '処理中...' : 'セーブデータをエクスポート'}
              </button>
            </div>

            <div className="bg-green-50 p-4 rounded border border-green-200">
              <h3 className="font-bold text-green-800 mb-2">📂 復元</h3>
              <p className="text-green-700 text-sm mb-3">
                以前にエクスポートしたファイルから進行状況を復元
              </p>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                ref={fileInputRef}
                disabled={isLoading}
                className="w-full px-4 py-2 border border-green-300 rounded focus:outline-none focus:border-green-500"
              />
            </div>

            <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
              <h3 className="font-bold text-yellow-800 mb-2">🔄 緊急復元</h3>
              <p className="text-yellow-700 text-sm mb-3">
                インポート前の状態に戻す（最後のインポート時のみ）
              </p>
              <button
                onClick={handleRestore}
                disabled={isLoading}
                className="w-full px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
              >
                {isLoading ? '処理中...' : 'バックアップから復元'}
              </button>
            </div>

            <div className="bg-red-50 p-4 rounded border border-red-200">
              <h3 className="font-bold text-red-800 mb-2">🗑️ データ削除</h3>
              <p className="text-red-700 text-sm mb-3">
                全ての進行状況を削除します（元に戻せません）
              </p>
              <button
                onClick={handleClear}
                disabled={isLoading}
                className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {isLoading ? '処理中...' : '全データを削除'}
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveDataManager; 