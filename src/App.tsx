import React, { useState } from 'react';
import { GameState } from './types';
import { getQuizzesByCategory, shuffleQuizzes, shuffleChoices } from './data/quizManager';
import CategorySelect from './components/CategorySelect';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import { Quiz } from './types';
import { ENEMY_IMAGES } from './constants';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'category' | 'game' | 'result'>('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [attackEffect, setAttackEffect] = useState<'player-attack' | 'enemy-attack' | null>(null);
<<<<<<< codex/階層制バトルの実装とui更新
  const getEnemyHpForFloor = (floor: number) => (floor % 10 === 0 ? 20 : 5);

  const [gameState, setGameState] = useState<GameState>({
    playerHp: 20,
    enemyHp: getEnemyHpForFloor(1),
=======
  const [shuffledQuizzes, setShuffledQuizzes] = useState<Quiz[]>([]);
  const [selectedEnemyImage, setSelectedEnemyImage] = useState<string>("");
  const [gameState, setGameState] = useState<GameState>({
    playerHp: 20,
    enemyHp: 1000,
>>>>>>> main
    currentQuizIndex: 0,
    score: 0,
    isGameOver: false,
    playerWon: false,
    currentFloor: 1,
    maxFloorReached: 1
  });

  // ランダムに敵の画像を選択する関数
  const selectRandomEnemyImage = () => {
    const randomIndex = Math.floor(Math.random() * ENEMY_IMAGES.length);
    return ENEMY_IMAGES[randomIndex];
  };

  const handleCategorySelect = (categoryId: string) => {
    // カテゴリ選択時に一度だけクイズをシャッフル
    const quizzes = getQuizzesByCategory(categoryId);
    const shuffled = shuffleQuizzes(quizzes).map(quiz => shuffleChoices(quiz));
    setShuffledQuizzes(shuffled);
    
    // ランダムな敵の画像を選択
    setSelectedEnemyImage(selectRandomEnemyImage());
    
    setSelectedCategory(categoryId);
    setGameState({
      playerHp: 20,
      enemyHp: getEnemyHpForFloor(1),
      currentQuizIndex: 0,
      score: 0,
      isGameOver: false,
      playerWon: false,
      currentFloor: 1,
      maxFloorReached: 1
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
      newEnemyHp = Math.max(0, gameState.enemyHp - 2);
      newScore = gameState.score + 1;
    } else {
      setAttackEffect('enemy-attack');
      newPlayerHp = Math.max(0, gameState.playerHp - 10);
    }

    // 0.5秒後にエフェクトを消す
    setTimeout(() => {
      setAttackEffect(null);
    }, 500);

    let newCurrentFloor = gameState.currentFloor;
    let newMaxFloor = gameState.maxFloorReached;
    if (newEnemyHp <= 0) {
      newCurrentFloor += 1;
      newEnemyHp = getEnemyHpForFloor(newCurrentFloor);
      if (newCurrentFloor > newMaxFloor) {
        newMaxFloor = newCurrentFloor;
      }
    }

    const nextQuizIndex = gameState.currentQuizIndex + 1;
<<<<<<< codex/階層制バトルの実装とui更新
    const isLastQuiz = nextQuizIndex >= quizzes.length;
    const gameOver = newPlayerHp <= 0 || isLastQuiz;
    const playerWon = isLastQuiz && newPlayerHp > 0;
=======
    const isLastQuiz = nextQuizIndex >= shuffledQuizzes.length;
    const gameOver = newPlayerHp <= 0 || newEnemyHp <= 0 || isLastQuiz;
    const playerWon = newEnemyHp <= 0 || (isLastQuiz && newPlayerHp > 0);
>>>>>>> main

    // ゲーム状態の更新を少し遅らせる（エフェクトを見せるため）
    setTimeout(() => {
      setGameState({
        playerHp: newPlayerHp,
        enemyHp: newEnemyHp,
        currentQuizIndex: isLastQuiz ? gameState.currentQuizIndex : nextQuizIndex,
        score: newScore,
        isGameOver: gameOver,
        playerWon: playerWon,
        currentFloor: newCurrentFloor,
        maxFloorReached: newMaxFloor
      });

      if (gameOver) {
        setTimeout(() => setCurrentScreen('result'), 1000);
      }
    }, 100);
  };

  const handleRestart = () => {
    // リスタート時に新しい敵の画像を選択
    setSelectedEnemyImage(selectRandomEnemyImage());
    
    setAttackEffect(null);
    setGameState({
      playerHp: 20,
      enemyHp: getEnemyHpForFloor(1),
      currentQuizIndex: 0,
      score: 0,
      isGameOver: false,
      playerWon: false,
      currentFloor: 1,
      maxFloorReached: 1
    });
    setCurrentScreen('game');
  };

  const handleBackToCategory = () => {
    setAttackEffect(null);
    setCurrentScreen('category');
    setSelectedCategory(null);
    setShuffledQuizzes([]);
  };

  // 画面の表示制御
  if (currentScreen === 'category') {
    return <CategorySelect onCategorySelect={handleCategorySelect} />;
  }

  if (currentScreen === 'game' && selectedCategory) {
    return (
      <GameScreen
        quizzes={shuffledQuizzes}
        gameState={gameState}
        onAnswer={handleAnswer}
        attackEffect={attackEffect}
        enemyImage={selectedEnemyImage}
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