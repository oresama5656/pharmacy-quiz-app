import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GameScreen from '../components/GameScreen';
import { GameState } from '../types';

const BattleWrapper: React.FC = () => {
  const { state } = useLocation() as { state: any };
  const navigate = useNavigate();

  if (!state) return <p className="text-red-500">state is missing</p>;

  /* ----------------- 受け取る値 ----------------- */
  const { quizzes, floors, starLevel } = state;

  /* ----------------- gameState を管理 ----------------- */
  const [gameState, setGameState] = useState<GameState>({
    playerHp: 20,
    enemyHp: floors % 10 === 0 ? 20 : 5,
    currentQuizIndex: 0,
    score: 0,
    isGameOver: false,
    playerWon: false,
    currentFloor: 1,
    maxFloorReached: 1,
    clearFloor: floors,
  });

  /* ----------------- 回答ハンドラ ----------------- */
  const handleAnswer = (answer: string) => {
    const correct = quizzes[gameState.currentQuizIndex].correct;
    const isCorrect = answer === correct;

    setGameState(prev => {
      const nextIndex = prev.currentQuizIndex + 1;
      const nextFloor  = prev.currentFloor + 1;
      const enemyHp = isCorrect ? prev.enemyHp - 5 : prev.enemyHp;
      const playerHp = isCorrect ? prev.playerHp : prev.playerHp - 5;
      const isLast   = nextFloor > floors;
      const playerWon = isLast && enemyHp > 0;

      /* クリア判定 → アラート後に前画面へ戻る */
      if (isLast || enemyHp <= 0 || playerHp <= 0) {
        alert('CLEAR!');
        navigate(-1);
      }

      return {
        ...prev,
        enemyHp,
        playerHp,
        currentQuizIndex: nextIndex,
        currentFloor: nextFloor,
        maxFloorReached: Math.max(prev.maxFloorReached, nextFloor),
        isGameOver: playerHp <= 0,
        playerWon,
      };
    });
  };

  /* ----------------- ランダム敵画像など任意で決定 ----------------- */
  const enemyImage = '/assets/enemy1.png';

  return (
    <GameScreen
      quizzes={quizzes}
      gameState={gameState}
      onAnswer={handleAnswer}
      enemyImage={enemyImage}
    />
  );
};

export default BattleWrapper;
