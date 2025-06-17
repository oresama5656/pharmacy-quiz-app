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
}
