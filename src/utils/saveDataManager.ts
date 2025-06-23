// セーブデータ管理ユーティリティ
export interface SaveData {
  version: string;
  timestamp: string;
  guildProgresses: Record<string, any>;
  categoryProgresses: Record<string, any>;
}

// 全てのセーブデータを取得
export const getAllSaveData = (): SaveData => {
  const guildProgresses: Record<string, any> = {};
  const categoryProgresses: Record<string, any> = {};

  // localStorageから全てのデータを取得
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;

    const value = localStorage.getItem(key);
    if (!value) continue;

    try {
      const parsedValue = JSON.parse(value);
      
      if (key.startsWith('guild_progress_')) {
        const guildId = key.replace('guild_progress_', '');
        guildProgresses[guildId] = parsedValue;
      } else if (key.startsWith('progress_')) {
        const categoryId = key.replace('progress_', '');
        categoryProgresses[categoryId] = parsedValue;
      }
    } catch (error) {
      console.warn(`Failed to parse save data for key: ${key}`, error);
    }
  }

  return {
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    guildProgresses,
    categoryProgresses
  };
};

// セーブデータをエクスポート（ダウンロード）
export const exportSaveData = (): void => {
  try {
    const saveData = getAllSaveData();
    const dataStr = JSON.stringify(saveData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pharmacy-quiz-save-${new Date().toISOString().split('T')[0]}.json`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to export save data:', error);
    throw new Error('セーブデータのエクスポートに失敗しました');
  }
};

// セーブデータをインポート
export const importSaveData = (file: File): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const result = event.target?.result;
        if (typeof result !== 'string') {
          throw new Error('Invalid file format');
        }
        
        const saveData: SaveData = JSON.parse(result);
        
        // データの検証
        if (!saveData.version || !saveData.guildProgresses || !saveData.categoryProgresses) {
          throw new Error('Invalid save data format');
        }
        
        // 既存データをバックアップ
        const backupData = getAllSaveData();
        localStorage.setItem('backup_save_data', JSON.stringify(backupData));
        
        // 新しいデータをインポート
        Object.entries(saveData.guildProgresses).forEach(([guildId, progress]) => {
          localStorage.setItem(`guild_progress_${guildId}`, JSON.stringify(progress));
        });
        
        Object.entries(saveData.categoryProgresses).forEach(([categoryId, progress]) => {
          localStorage.setItem(`progress_${categoryId}`, JSON.stringify(progress));
        });
        
        resolve(true);
      } catch (error) {
        console.error('Failed to import save data:', error);
        reject(new Error('セーブデータのインポートに失敗しました。ファイル形式を確認してください。'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('ファイルの読み込みに失敗しました'));
    };
    
    reader.readAsText(file);
  });
};

// バックアップデータを復元
export const restoreBackup = (): boolean => {
  try {
    const backupDataStr = localStorage.getItem('backup_save_data');
    if (!backupDataStr) {
      return false;
    }
    
    const backupData: SaveData = JSON.parse(backupDataStr);
    
    // バックアップデータを復元
    Object.entries(backupData.guildProgresses).forEach(([guildId, progress]) => {
      localStorage.setItem(`guild_progress_${guildId}`, JSON.stringify(progress));
    });
    
    Object.entries(backupData.categoryProgresses).forEach(([categoryId, progress]) => {
      localStorage.setItem(`progress_${categoryId}`, JSON.stringify(progress));
    });
    
    return true;
  } catch (error) {
    console.error('Failed to restore backup:', error);
    return false;
  }
};

// セーブデータをクリア
export const clearAllSaveData = (): void => {
  const keysToRemove: string[] = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith('guild_progress_') || key.startsWith('progress_'))) {
      keysToRemove.push(key);
    }
  }
  
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
  });
};

// セーブデータの存在確認
export const hasSaveData = (): boolean => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith('guild_progress_') || key.startsWith('progress_'))) {
      return true;
    }
  }
  return false;
};

// 最後のバックアップ日時を記録
export const recordBackupTime = (): void => {
  localStorage.setItem('last_backup_time', new Date().toISOString());
};

// バックアップリマインダーが必要かチェック
export const shouldShowBackupReminder = (): boolean => {
  if (!hasSaveData()) return false;
  
  const lastBackup = localStorage.getItem('last_backup_time');
  const reminderDismissed = localStorage.getItem('backup_reminder_dismissed');
  
  // リマインダーが無効化されている場合
  if (reminderDismissed === 'true') return false;
  
  // 初回バックアップの場合
  if (!lastBackup) return true;
  
  try {
    const lastBackupDate = new Date(lastBackup);
    const now = new Date();
    const daysSinceBackup = (now.getTime() - lastBackupDate.getTime()) / (1000 * 60 * 60 * 24);
    
    // 7日以上経過している場合
    return daysSinceBackup >= 7;
  } catch (error) {
    return true;
  }
};

// バックアップリマインダーを無効化
export const dismissBackupReminder = (): void => {
  localStorage.setItem('backup_reminder_dismissed', 'true');
}; 