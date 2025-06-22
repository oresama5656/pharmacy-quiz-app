// 型定義
export interface Quiz {
    question: string;
    correct: string;
    choices: string[];
  }
  
export interface GameState {
    playerHp: number;
    enemyHp: number;
    currentQuizIndex: number;
    score: number;
    isGameOver: boolean;
    playerWon: boolean;
    currentFloor: number;
    maxFloorReached: number;
    clearFloor: number;
}

// クエストステータス型定義
export type QuestStatus = "locked" | "justUnlocked" | "unlocked" | "cleared";

// クエスト情報の型定義
export interface QuestInfo {
  id: string;
  level: number;
  status: QuestStatus;
  title: string;
  guildId: string;
}

// ギルドのクエスト進行状況
export interface GuildProgress {
  guildId: string;
  questStatuses: Record<string, QuestStatus>; // categoryId -> status
}
