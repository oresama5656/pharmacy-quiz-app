import React, { useState } from 'react';
import { GameState } from './types';
import { getQuizzesByCategory, shuffleQuizzes, shuffleChoices, getCategoryById } from './data/quizManager';
import CategorySelect from './components/CategorySelect';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import { Quiz } from './types';
import { ENEMY_IMAGES, BOSS_IMAGES, getEnemyHpForFloor, GAME_CONFIG } from './constants';
import { handleQuestClear, getGuildIdByCategoryId } from './utils/questStatus';

// 不正解時に次の問題へ進むまでのウェイト時間（ms）
// 適宜この値を変更して表示時間を調整できる
export const INCORRECT_WAIT_MS = 2000;

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'category' | 'game' | 'result'>('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [attackEffect, setAttackEffect] = useState<'player-attack' | 'enemy-attack' | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  // Controls whether the CategorySelect component should display the start screen.
  // Once the start screen is shown and the user taps START, this becomes false
  // so that returning from the result screen skips the start screen.
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [questRefreshKey, setQuestRefreshKey] = useState(0);
  const [shuffledQuizzes, setShuffledQuizzes] = useState<Quiz[]>([]);
  const [selectedEnemyImage, setSelectedEnemyImage] = useState<string>("");
  const [gameState, setGameState] = useState<GameState>({
    playerHp: GAME_CONFIG.PLAYER_MAX_HP,
    enemyHp: getEnemyHpForFloor(1),
    currentQuizIndex: 0,
    score: 0,
    isGameOver: false,
    playerWon: false,
    currentFloor: 1,
    maxFloorReached: 1,
    clearFloor: 10
  });

  const saveProgress = (floor: number) => {
    if (!selectedCategory) return;
    try {
      localStorage.setItem(
        `progress_${selectedCategory}`,
        JSON.stringify({ currentFloor: floor })
      );
    } catch {
      // ignore write errors
    }
  };

  // ランダムに敵の画像を選択する関数
  const selectRandomEnemyImage = () => {
    const randomIndex = Math.floor(Math.random() * ENEMY_IMAGES.length);
    return ENEMY_IMAGES[randomIndex];
  };

  // ランダムにボスの画像を選択する関数
  const selectRandomBossImage = () => {
    const randomIndex = Math.floor(Math.random() * BOSS_IMAGES.length);
    return BOSS_IMAGES[randomIndex];
  };

  const handleCategorySelect = (categoryId: string) => {
    // カテゴリ選択時に一度だけクイズをシャッフル
    const quizzes = getQuizzesByCategory(categoryId);
    const shuffled = shuffleQuizzes(quizzes).map(quiz => shuffleChoices(quiz));
    setShuffledQuizzes(shuffled);

    const categoryInfo = getCategoryById(categoryId);
    const clearFloor = categoryInfo ? categoryInfo.clearFloor : 10;

    // ランダムな敵の画像を選択
    setSelectedEnemyImage(selectRandomEnemyImage());
    setShowWarning(false);

    setSelectedCategory(categoryId);
    setGameState({
      playerHp: GAME_CONFIG.PLAYER_MAX_HP,
      enemyHp: getEnemyHpForFloor(1),
      currentQuizIndex: 0,
      score: 0,
      isGameOver: false,
      playerWon: false,
      currentFloor: 1,
      maxFloorReached: 1,
      clearFloor
    });
    setCurrentScreen('game');
  };

  const handleAnswer = (selectedAnswer: string) => {
    if (!selectedCategory || shuffledQuizzes.length === 0) return;

    const currentQuiz = shuffledQuizzes[gameState.currentQuizIndex];
    const isCorrect = selectedAnswer === currentQuiz.correct;
    
    let newPlayerHp = gameState.playerHp;
    let newEnemyHp = gameState.enemyHp;
    let newScore = gameState.score;

    // 攻撃エフェクトを表示
    if (isCorrect) {
      setAttackEffect('player-attack');
      newEnemyHp = Math.max(0, gameState.enemyHp - 10);
      newScore = gameState.score + 1;
    } else {
      setAttackEffect('enemy-attack');
      newPlayerHp = Math.max(0, gameState.playerHp - 6);
    }

    // 攻撃エフェクトを短時間で消す（300ms → 200ms）
    setTimeout(() => {
      setAttackEffect(null);
    }, 200);

    let newCurrentFloor = gameState.currentFloor;
    let newMaxFloor = gameState.maxFloorReached;
    const nextIndexRaw = gameState.currentQuizIndex + 1;
    const nextQuizIndex = nextIndexRaw >= shuffledQuizzes.length ? 0 : nextIndexRaw;
    const gameOver = newPlayerHp <= 0;
    const playerWon = false;

    if (newEnemyHp <= 0) {
      if (newCurrentFloor >= gameState.clearFloor) {
        // クリア階層の敵を倒した場合
        setTimeout(() => {
          setGameState({
            ...gameState,
            playerHp: newPlayerHp,
            enemyHp: 0,
            score: newScore,
            isGameOver: true,
            playerWon: true
          });
          saveProgress(newCurrentFloor);
          
          // クエストクリア処理
          if (selectedCategory) {
            const guildId = getGuildIdByCategoryId(selectedCategory);
            if (guildId) {
              handleQuestClear(guildId, selectedCategory);
            }
          }
          
          setTimeout(() => setCurrentScreen('result'), 500);
        }, 250);
        return;
      }

      // 敵を倒した場合：即座に次のフロアに進む
      const nextFloor = newCurrentFloor + 1;
      const enemyHpAfter = getEnemyHpForFloor(nextFloor);
      if (nextFloor > newMaxFloor) {
        newMaxFloor = nextFloor;
      }

      const isBossFloor = nextFloor % 10 === 0;
      const newEnemyImage = isBossFloor ? selectRandomBossImage() : selectRandomEnemyImage();

      if (isBossFloor) {
        setShowWarning(true);
        setTimeout(() => {
          setShowWarning(false);
          setSelectedEnemyImage(newEnemyImage);
          setGameState({
            playerHp: newPlayerHp,
            enemyHp: enemyHpAfter,
            currentQuizIndex: nextQuizIndex,
            score: newScore,
            isGameOver: gameOver,
            playerWon: false,
            currentFloor: nextFloor,
            maxFloorReached: newMaxFloor,
            clearFloor: gameState.clearFloor
          });
          saveProgress(newMaxFloor);

          if (gameOver) {
            setTimeout(() => setCurrentScreen('result'), 500);
          }
        }, 1000);
      } else {
        setSelectedEnemyImage(newEnemyImage);
        setTimeout(() => {
          setGameState({
            playerHp: newPlayerHp,
            enemyHp: enemyHpAfter,
            currentQuizIndex: nextQuizIndex,
            score: newScore,
            isGameOver: gameOver,
            playerWon: false,
            currentFloor: nextFloor,
            maxFloorReached: newMaxFloor,
            clearFloor: gameState.clearFloor
          });
          saveProgress(newMaxFloor);

          if (gameOver) {
            setTimeout(() => setCurrentScreen('result'), 500);
          }
        }, 250);
      }
    } else {
      // 敵がまだ生きている場合は演出後に更新
      // 不正解時のウェイトは INCORRECT_WAIT_MS で調整する
      const delay = isCorrect ? 600 : INCORRECT_WAIT_MS; // 正解時は従来通り0.6秒、不正解時のみ待機時間を延長
      setTimeout(() => {
        setGameState({
          playerHp: newPlayerHp,
          enemyHp: newEnemyHp,
          currentQuizIndex: nextQuizIndex,
          score: newScore,
          isGameOver: gameOver,
          playerWon: playerWon,
          currentFloor: newCurrentFloor,
          maxFloorReached: newMaxFloor,
          clearFloor: gameState.clearFloor
        });
        saveProgress(newMaxFloor);

        if (gameOver) {
          setTimeout(() => setCurrentScreen('result'), 500);
        }
      }, delay);
    }
  };

  const handleRestart = () => {
    // リスタート時に新しい敵の画像を選択
    setSelectedEnemyImage(selectRandomEnemyImage());
    setShowWarning(false);
    
    setAttackEffect(null);
    saveProgress(gameState.maxFloorReached);
    setGameState({
      playerHp: GAME_CONFIG.PLAYER_MAX_HP,
      enemyHp: getEnemyHpForFloor(1),
      currentQuizIndex: 0,
      score: 0,
      isGameOver: false,
      playerWon: false,
      currentFloor: 1,
      maxFloorReached: 1,
      clearFloor: gameState.clearFloor
    });
    setCurrentScreen('game');
  };

  const handleBackToCategory = () => {
    setAttackEffect(null);
    saveProgress(gameState.maxFloorReached);
    setCurrentScreen('category');
    setSelectedCategory(null);
    setShuffledQuizzes([]);
    setShowWarning(false);
    setQuestRefreshKey(prev => prev + 1); // クエストステータスを更新
  };

  // 画面の表示制御
  if (currentScreen === 'category') {
    return (
      <CategorySelect
        onCategorySelect={handleCategorySelect}
        showStartScreen={showStartScreen}
        onStart={() => setShowStartScreen(false)}
        refreshKey={questRefreshKey}
      />
    );
  }

  if (currentScreen === 'game' && selectedCategory) {
    return (
      <GameScreen
        quizzes={shuffledQuizzes}
        gameState={gameState}
        onAnswer={handleAnswer}
        attackEffect={attackEffect}
        enemyImage={selectedEnemyImage}
        showWarning={showWarning}
      />
    );
  }

  if (currentScreen === 'result') {
    return (
      <ResultScreen
        gameState={gameState}
        onRestart={handleRestart}
        onBackToCategory={handleBackToCategory}
      />
    );
  }

  return <div>エラーが発生しました</div>;
};

export default App;