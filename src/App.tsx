import React, { useState } from 'react';
import { GameState } from './types';
import { quizData } from './data/quizData';
import CategorySelect from './components/CategorySelect';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'category' | 'game' | 'result'>('category');
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof quizData | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    playerHp: 20,
    enemyHp: 10,
    currentQuizIndex: 0,
    score: 0,
    isGameOver: false,
    playerWon: false
  });

  const handleCategorySelect = (category: keyof typeof quizData) => {
    setSelectedCategory(category);
    setGameState({
      playerHp: 20,
      enemyHp: 10,
      currentQuizIndex: 0,
      score: 0,
      isGameOver: false,
      playerWon: false
    });
    setCurrentScreen('game');
  };

  const handleAnswer = (selectedAnswer: string) => {
    if (!selectedCategory) return;

    const currentQuiz = quizData[selectedCategory][gameState.currentQuizIndex];
    const isCorrect = selectedAnswer === currentQuiz.correct;
    
    let newPlayerHp = gameState.playerHp;
    let newEnemyHp = gameState.enemyHp;
    let newScore = gameState.score;

    if (isCorrect) {
      newEnemyHp = Math.max(0, gameState.enemyHp - 3);
      newScore = gameState.score + 1;
    } else {
      newPlayerHp = Math.max(0, gameState.playerHp - 2);
    }

    const nextQuizIndex = gameState.currentQuizIndex + 1;
    const isLastQuiz = nextQuizIndex >= quizData[selectedCategory].length;
    const gameOver = newPlayerHp <= 0 || newEnemyHp <= 0 || isLastQuiz;
    const playerWon = newEnemyHp <= 0 || (isLastQuiz && newPlayerHp > 0);

    setGameState({
      playerHp: newPlayerHp,
      enemyHp: newEnemyHp,
      currentQuizIndex: nextQuizIndex,
      score: newScore,
      isGameOver: gameOver,
      playerWon: playerWon
    });

    if (gameOver) {
      setTimeout(() => setCurrentScreen('result'), 1000);
    }
  };

  const handleRestart = () => {
    setGameState({
      playerHp: 20,
      enemyHp: 10,
      currentQuizIndex: 0,
      score: 0,
      isGameOver: false,
      playerWon: false
    });
    setCurrentScreen('game');
  };

  const handleBackToCategory = () => {
    setCurrentScreen('category');
    setSelectedCategory(null);
  };

  // 画面の表示制御
  if (currentScreen === 'category') {
    return <CategorySelect onCategorySelect={handleCategorySelect} />;
  }

  if (currentScreen === 'game' && selectedCategory) {
    return (
      <GameScreen
        quizzes={quizData[selectedCategory]}
        gameState={gameState}
        onAnswer={handleAnswer}
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