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
      <div 
        className="rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto border-4 border-amber-800"
        style={{
          backgroundImage: `url('/background/wood-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#DEB887',
          boxShadow: `
            inset 0 0 0 2px #D2B48C,
            0 8px 24px rgba(0, 0, 0, 0.4),
            0 4px 12px rgba(0, 0, 0, 0.3)
          `
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 
            className="text-xl font-bold text-amber-900"
            style={{
              fontFamily: '"Noto Serif JP", "Yu Mincho", "YuMincho", "Hiragino Mincho Pro", serif',
              textShadow: '1px 1px 2px rgba(245, 222, 179, 0.8)'
            }}
          >
            セーブデータ管理
          </h2>
          <button
            onClick={onClose}
            className="text-amber-800 hover:text-amber-900 text-2xl font-bold transition-colors duration-200"
            disabled={isLoading}
            style={{
              textShadow: '1px 1px 2px rgba(245, 222, 179, 0.8)'
            }}
          >
            ×
          </button>
        </div>

        {message && (
          <div 
            className={`mb-4 p-3 rounded-lg border-2 ${
              messageType === 'success' ? 'border-green-600 text-green-800' :
              messageType === 'error' ? 'border-red-600 text-red-800' :
              'border-yellow-600 text-yellow-800'
            }`}
            style={{
              backgroundColor: 'rgba(245, 222, 179, 0.9)',
              fontFamily: '"Noto Serif JP", "Yu Mincho", "YuMincho", "Hiragino Mincho Pro", serif',
              textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)',
              fontWeight: 'bold'
            }}
          >
            {message}
          </div>
        )}

        {showClearConfirm ? (
          <div 
            className="mb-4 p-4 rounded-lg border-4 border-red-600"
            style={{
              backgroundColor: 'rgba(245, 222, 179, 0.95)',
              boxShadow: 'inset 2px 2px 4px rgba(245, 222, 179, 0.9), inset -2px -2px 4px rgba(139, 69, 19, 0.4)'
            }}
          >
            <h3 
              className="font-bold text-red-800 mb-2"
              style={{
                fontFamily: '"Noto Serif JP", "Yu Mincho", "YuMincho", "Hiragino Mincho Pro", serif',
                textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
              }}
            >
              ⚠️ 確認
            </h3>
            <p 
              className="text-red-700 mb-4"
              style={{
                fontFamily: '"Noto Serif JP", "Yu Mincho", "YuMincho", "Hiragino Mincho Pro", serif',
                textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
              }}
            >
              全てのセーブデータを削除します。この操作は元に戻せません。
              本当に削除しますか？
            </p>
            <div className="flex gap-2">
              <button
                onClick={confirmClear}
                className="px-4 py-2 text-white rounded-lg font-bold border-2 border-red-800 hover:scale-105 transition-all duration-200"
                disabled={isLoading}
                style={{
                  backgroundColor: '#DC2626',
                  background: 'linear-gradient(145deg, #DC2626 0%, #B91C1C 50%, #991B1B 100%)',
                  boxShadow: 'inset 2px 2px 4px rgba(248, 113, 113, 0.9), inset -2px -2px 4px rgba(127, 29, 29, 0.4)',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                  fontFamily: '"Noto Serif JP", "Yu Mincho", "YuMincho", "Hiragino Mincho Pro", serif'
                }}
              >
                削除する
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-lg font-bold border-2 border-amber-800 hover:scale-105 transition-all duration-200"
                disabled={isLoading}
                style={{
                  backgroundColor: '#DEB887',
                  background: 'linear-gradient(145deg, #D2B48C 0%, #DEB887 25%, #F5DEB3 50%, #DEB887 75%, #D2B48C 100%)',
                  boxShadow: 'inset 2px 2px 4px rgba(245, 222, 179, 0.9), inset -2px -2px 4px rgba(139, 69, 19, 0.4)',
                  color: '#8B4513',
                  textShadow: '1px 1px 2px rgba(245, 222, 179, 0.8)',
                  fontFamily: '"Noto Serif JP", "Yu Mincho", "YuMincho", "Hiragino Mincho Pro", serif'
                }}
              >
                キャンセル
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div 
              className="p-4 rounded-lg border-3 border-blue-600"
              style={{
                backgroundColor: 'rgba(245, 222, 179, 0.9)',
                boxShadow: 'inset 2px 2px 4px rgba(245, 222, 179, 0.9), inset -2px -2px 4px rgba(139, 69, 19, 0.4)'
              }}
            >
              <h3 
                className="font-bold text-blue-800 mb-2"
                style={{
                  fontFamily: '"Noto Serif JP", "Yu Mincho", "YuMincho", "Hiragino Mincho Pro", serif',
                  textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
                }}
              >
                💾 バックアップ
              </h3>
              <p 
                className="text-blue-700 text-sm mb-3"
                style={{
                  fontFamily: '"Noto Serif JP", "Yu Mincho", "YuMincho", "Hiragino Mincho Pro", serif',
                  textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
                }}
              >
                進行状況をファイルに保存して、データ消失を防ぎましょう
              </p>
              <button
                onClick={handleExport}
                disabled={isLoading}
                className="w-full px-4 py-2 text-white rounded-lg font-bold border-2 border-blue-800 hover:scale-105 transition-all duration-200 disabled:opacity-50"
                style={{
                  backgroundColor: '#2563EB',
                  background: 'linear-gradient(145deg, #3B82F6 0%, #2563EB 50%, #1D4ED8 100%)',
                  boxShadow: 'inset 2px 2px 4px rgba(147, 197, 253, 0.9), inset -2px -2px 4px rgba(30, 58, 138, 0.4)',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                  fontFamily: '"Noto Serif JP", "Yu Mincho", "YuMincho", "Hiragino Mincho Pro", serif'
                }}
              >
                {isLoading ? '処理中...' : 'セーブデータをエクスポート'}
              </button>
            </div>

            <div 
              className="p-4 rounded-lg border-3 border-green-600"
              style={{
                backgroundColor: 'rgba(245, 222, 179, 0.9)',
                boxShadow: 'inset 2px 2px 4px rgba(245, 222, 179, 0.9), inset -2px -2px 4px rgba(139, 69, 19, 0.4)'
              }}
            >
              <h3 
                className="font-bold text-green-800 mb-2"
                style={{
                  fontFamily: '"Noto Serif JP", "Yu Mincho", "YuMincho", "Hiragino Mincho Pro", serif',
                  textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
                }}
              >
                📂 復元
              </h3>
              <p 
                className="text-green-700 text-sm mb-3"
                style={{
                  fontFamily: '"Noto Serif JP", "Yu Mincho", "YuMincho", "Hiragino Mincho Pro", serif',
                  textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
                }}
              >
                以前にエクスポートしたファイルから進行状況を復元
              </p>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                ref={fileInputRef}
                disabled={isLoading}
                className="w-full px-4 py-2 border-2 border-green-600 rounded-lg focus:outline-none focus:border-green-700 font-bold"
                style={{
                  backgroundColor: 'rgba(245, 222, 179, 0.95)',
                  color: '#166534',
                  fontFamily: '"Noto Serif JP", "Yu Mincho", "YuMincho", "Hiragino Mincho Pro", serif'
                }}
              />
            </div>

            <div 
              className="p-4 rounded-lg border-3 border-yellow-600"
              style={{
                backgroundColor: 'rgba(245, 222, 179, 0.9)',
                boxShadow: 'inset 2px 2px 4px rgba(245, 222, 179, 0.9), inset -2px -2px 4px rgba(139, 69, 19, 0.4)'
              }}
            >
              <h3 
                className="font-bold text-yellow-800 mb-2"
                style={{
                  fontFamily: '"Noto Serif JP", "Yu Mincho", "YuMincho", "Hiragino Mincho Pro", serif',
                  textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
                }}
              >
                🔄 緊急復元
              </h3>
              <p 
                className="text-yellow-700 text-sm mb-3"
                style={{
                  fontFamily: '"Noto Serif JP", "Yu Mincho", "YuMincho", "Hiragino Mincho Pro", serif',
                  textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
                }}
              >
                インポート前の状態に戻す（最後のインポート時のみ）
              </p>
              <button
                onClick={handleRestore}
                disabled={isLoading}
                className="w-full px-4 py-2 text-white rounded-lg font-bold border-2 border-yellow-800 hover:scale-105 transition-all duration-200 disabled:opacity-50"
                style={{
                  backgroundColor: '#D97706',
                  background: 'linear-gradient(145deg, #F59E0B 0%, #D97706 50%, #B45309 100%)',
                  boxShadow: 'inset 2px 2px 4px rgba(251, 191, 36, 0.9), inset -2px -2px 4px rgba(120, 53, 15, 0.4)',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                  fontFamily: '"Noto Serif JP", "Yu Mincho", "YuMincho", "Hiragino Mincho Pro", serif'
                }}
              >
                {isLoading ? '処理中...' : 'バックアップから復元'}
              </button>
            </div>

            <div 
              className="p-4 rounded-lg border-3 border-red-600"
              style={{
                backgroundColor: 'rgba(245, 222, 179, 0.9)',
                boxShadow: 'inset 2px 2px 4px rgba(245, 222, 179, 0.9), inset -2px -2px 4px rgba(139, 69, 19, 0.4)'
              }}
            >
              <h3 
                className="font-bold text-red-800 mb-2"
                style={{
                  fontFamily: '"Noto Serif JP", "Yu Mincho", "YuMincho", "Hiragino Mincho Pro", serif',
                  textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
                }}
              >
                🗑️ データ削除
              </h3>
              <p 
                className="text-red-700 text-sm mb-3"
                style={{
                  fontFamily: '"Noto Serif JP", "Yu Mincho", "YuMincho", "Hiragino Mincho Pro", serif',
                  textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
                }}
              >
                全ての進行状況を削除します（元に戻せません）
              </p>
              <button
                onClick={handleClear}
                disabled={isLoading}
                className="w-full px-4 py-2 text-white rounded-lg font-bold border-2 border-red-800 hover:scale-105 transition-all duration-200 disabled:opacity-50"
                style={{
                  backgroundColor: '#DC2626',
                  background: 'linear-gradient(145deg, #EF4444 0%, #DC2626 50%, #B91C1C 100%)',
                  boxShadow: 'inset 2px 2px 4px rgba(248, 113, 113, 0.9), inset -2px -2px 4px rgba(127, 29, 29, 0.4)',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                  fontFamily: '"Noto Serif JP", "Yu Mincho", "YuMincho", "Hiragino Mincho Pro", serif'
                }}
              >
                {isLoading ? '処理中...' : '全データを削除'}
              </button>
            </div>
          </div>
        )}

        <div 
          className="mt-6 pt-4 border-t-2 border-amber-800"
          style={{
            borderColor: 'rgba(139, 69, 19, 0.6)'
          }}
        >
          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-full px-4 py-2 rounded-lg font-bold border-2 border-amber-800 hover:scale-105 transition-all duration-200 disabled:opacity-50"
            style={{
              backgroundColor: '#DEB887',
              background: 'linear-gradient(145deg, #D2B48C 0%, #DEB887 25%, #F5DEB3 50%, #DEB887 75%, #D2B48C 100%)',
              boxShadow: 'inset 2px 2px 4px rgba(245, 222, 179, 0.9), inset -2px -2px 4px rgba(139, 69, 19, 0.4)',
              color: '#8B4513',
              textShadow: '1px 1px 2px rgba(245, 222, 179, 0.8)',
              fontFamily: '"Noto Serif JP", "Yu Mincho", "YuMincho", "Hiragino Mincho Pro", serif'
            }}
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveDataManager; 