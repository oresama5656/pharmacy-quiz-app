import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { quizData } from '../data/quizData';

const GameScreen: React.FC = () => {
  const location = useLocation() as { state?: any };
  const { guildId, catId, starLvl } = useParams();

  console.log('[GameScreen] location.state =', location.state);

  let { quizzes, floors, currentQuizIndex, starLevel } = location.state ?? {};

  if (!quizzes) {
    const star = Number(starLvl) || 1;
    starLevel = star;
    floors = star === 1 ? 10 : 20;
    quizzes = (quizData as any)[catId!] ?? [];
    currentQuizIndex = 0;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">
      <h1 className="text-xl font-bold mb-2">Game Screen Placeholder</h1>
      <p>guild: {guildId}</p>
      <p>category: {catId}</p>
      <p>starLevel: {starLevel}</p>
      <p>floors: {floors}</p>
      <p>quizzes: {quizzes.length}</p>
      <p>currentQuizIndex: {currentQuizIndex}</p>
    </div>
  );
};

export default GameScreen;
