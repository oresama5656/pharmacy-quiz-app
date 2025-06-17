import React, { useState } from 'react';
import { GameState } from './types';
import { getQuizzesByCategory } from './data/quizManager';
import CategorySelect from './components/CategorySelect';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'category' | 'game' | 'result'>('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [attackEffect, setAttackEffect] = useState<'player-attack' | 'enemy-attack' | null>(null);
  const getEnemyHpForFloor = (floor: number) => (floor % 10 === 0 ? 20 : 5);

  const [gameState, setGameState] = useState<GameState>({
    playerHp: 20,
    enemyHp: getEnemyHpForFloor(1),
    currentQuizIndex: 0,
    score: 0,
    isGameOver: false,
    playerWon: false,
    currentFloor: 1,
    maxFloorReached: 1
  });

  const handleCategorySelect = (categoryId: string) => {
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
    if (!selectedCategory) return;

    const quizzes = getQuizzesByCategory(selectedCategory);
    const currentQuiz = quizzes[gameState.currentQuizIndex];
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
    const isLastQuiz = nextQuizIndex >= quizzes.length;
    const gameOver = newPlayerHp <= 0 || isLastQuiz;
    const playerWon = isLastQuiz && newPlayerHp > 0;

    // ゲーム状態の更新を少し遅らせる（エフェクトを見せるため）
    setTimeout(() => {
      setGameState({
        playerHp: newPlayerHp,
        enemyHp: newEnemyHp,
        currentQuizIndex: nextQuizIndex,
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
  };

  // 画面の表示制御
  if (currentScreen === 'category') {
    return <CategorySelect onCategorySelect={handleCategorySelect} />;
  }

  if (currentScreen === 'game' && selectedCategory) {
    const quizzes = getQuizzesByCategory(selectedCategory);
    return (
      <GameScreen
        quizzes={quizzes}
        gameState={gameState}
        onAnswer={handleAnswer}
        attackEffect={attackEffect}
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