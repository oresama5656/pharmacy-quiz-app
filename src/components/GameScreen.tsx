import React, { useEffect, useRef, useState } from 'react';
import { CHARACTER_IMAGES, BACKGROUND_IMAGES, BGM } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Quiz, GameState } from '../types';
import { playAttackSound, playWarningSound } from '../utils/sound';


interface GameScreenProps {
  quizzes: Quiz[];
  gameState: GameState;
  onAnswer: (selectedAnswer: string) => void;
  attackEffect?: 'player-attack' | 'enemy-attack' | null;
  enemyImage: string;
  showWarning?: boolean;
}

const GameScreen: React.FC<GameScreenProps> = ({ quizzes, gameState, onAnswer, attackEffect, enemyImage, showWarning }) => {
  const currentQuiz = quizzes[gameState.currentQuizIndex];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const audio = new Audio(BGM.game);
    audio.loop = true;
    audioRef.current = audio;
    audio.play().catch(() => {});
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);
  
  if (!currentQuiz) {
    return <div>クイズデータがありません</div>;
  }

  const playerHpPercentage = (gameState.playerHp / 20) * 100;
  const getEnemyHpForFloor = (floor: number) => (floor % 10 === 0 ? 20 : 5);
  const enemyMaxHp = getEnemyHpForFloor(gameState.currentFloor);
  const enemyHpPercentage = (gameState.enemyHp / enemyMaxHp) * 100;

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
  }, [currentQuiz]);

  const handleChoiceClick = (choice: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(choice);
    setIsAnswerCorrect(choice === currentQuiz.correct);
    onAnswer(choice);
  };

  useEffect(() => {
    if (attackEffect) {
      playAttackSound(attackEffect);
    }
  }, [attackEffect]);

  useEffect(() => {
    if (showWarning) {
      playWarningSound();
    }
  }, [showWarning]);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* 戦闘シーン上半分 */}
      <div
        className="flex-1 relative overflow-hidden"
        style={{
          backgroundImage: `url(${BACKGROUND_IMAGES.battle})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '50vh'
        }}
      >

        {/* ボス出現警告 */}
        {showWarning && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/70">
            <h1 className="text-red-600 text-5xl sm:text-6xl font-extrabold animate-pulse">WARNING</h1>
          </div>
        )}
        
        {/* 攻撃エフェクト */}
        {attackEffect === 'player-attack' && (
          <>
            {/* 太刀筋エフェクト - 敵キャラクター上 */}
            <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-8 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 pointer-events-none z-10">
              {/* 斜め太刀筋 */}
              <div className="absolute top-1/4 left-1/4 w-3/4 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent transform rotate-45 animate-pulse shadow-lg" 
                   style={{ boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)' }}></div>
              <div className="absolute top-1/3 left-1/5 w-2/3 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent transform rotate-45 animate-pulse delay-100"></div>
              {/* 逆斜め太刀筋 */}
              <div className="absolute top-1/2 left-1/6 w-2/3 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent transform -rotate-45 animate-pulse delay-200 shadow-lg"
                   style={{ boxShadow: '0 0 8px rgba(34, 211, 238, 0.6)' }}></div>
            </div>
          </>
        )}
        
        {attackEffect === 'enemy-attack' && (
          <>
            {/* 爪痕エフェクト - プレイヤーキャラクター上 */}
            <div className="absolute bottom-4 sm:bottom-5 right-4 sm:right-8 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 pointer-events-none z-10">
              {/* 3本の爪痕 */}
              <div className="absolute top-1/4 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent transform -rotate-12 animate-pulse shadow-lg"
                   style={{ boxShadow: '0 0 6px rgba(239, 68, 68, 0.8)' }}></div>
              <div className="absolute top-1/3 left-1/5 w-3/5 h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent transform -rotate-12 animate-pulse delay-100 shadow-lg"
                   style={{ boxShadow: '0 0 6px rgba(239, 68, 68, 0.8)' }}></div>
              <div className="absolute top-2/5 left-1/6 w-2/3 h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent transform -rotate-12 animate-pulse delay-200 shadow-lg"
                   style={{ boxShadow: '0 0 6px rgba(239, 68, 68, 0.8)' }}></div>
            </div>
          </>
        )}
        
        {/* キャラクター配置 */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end px-4 sm:px-8 pb-4 sm:pb-5">
          {/* 敵側（左下） */}
          <div className="flex flex-col items-center space-y-2 sm:space-y-3">
            <div className="flex items-end" style={{ height: '256px' }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={enemyImage}
                  src={enemyImage}
                  alt="敵"
                  className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain object-bottom transition-all duration-300"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.8))',
                    backgroundColor: 'transparent',
                    imageRendering: 'auto'
                  }}
                  // 敵が攻撃されたら右に移動（より高速化）
                  animate={attackEffect === 'enemy-attack' ? { x: [0, 1000, 0] } : { x: 0, opacity: 1 }}
                  initial={{ x: -200, opacity: 0 }}
                  // 退場エフェクトを高速化（scale, blurエフェクトを削除してシンプルに）
                  exit={{ opacity: 0, x: 200 }}
                  transition={{ 
                    duration: attackEffect === 'enemy-attack' ? 0.15 : 0.2,  // より高速化
                    ease: "easeOut"
                  }}
                />
              </AnimatePresence>
            </div>
            {/* 敵HPバー */}
            <div className="bg-black/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-red-400/50 shadow-xl">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-300">
                  <span>感染モンスター</span>
                  <span>{gameState.enemyHp}/{enemyMaxHp}</span>
                </div>
                <div className="w-32 sm:w-40 h-2 sm:h-3 bg-gray-800 rounded-full border border-gray-600 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-400 via-orange-400 to-red-400 transition-all duration-500 ease-out shadow-inner relative"
                    style={{ width: `${enemyHpPercentage}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* プレイヤー側（右下） */}
          <div className="flex flex-col items-center space-y-2 sm:space-y-3">
            <div className="flex items-end" style={{ height: '256px' }}>
              <motion.img
                src={CHARACTER_IMAGES.player}
                alt="プレイヤー"
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain object-bottom transition-all duration-300"
                style={{
                  filter: 'drop-shadow(0 0 15px rgba(34, 211, 238, 0.7))',
                  backgroundColor: 'transparent',
                  imageRendering: 'auto'
                }}
                // プレイヤーが攻撃されたら左に移動（より高速化）
                animate={attackEffect === 'player-attack' ? { x: [0, -1000, 0] } : { x: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}  // より高速化
              />
            </div>
            {/* プレイヤーHPバー */}
            <div className="bg-black/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-cyan-400/50 shadow-xl">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-300">
                  <span>プレイヤー</span>
                  <span>{gameState.playerHp}/20</span>
                </div>
                <div className="w-32 sm:w-40 h-2 sm:h-3 bg-gray-800 rounded-full border border-gray-600 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 transition-all duration-500 ease-out shadow-inner relative"
                    style={{ width: `${playerHpPercentage}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* クイズUI下半分 */}
      <div className="h-1/2 bg-gradient-to-b from-gray-900 to-black border-t-4 border-yellow-400 flex flex-col">
        <div className="flex-1 flex flex-col p-3 sm:p-4 overflow-hidden">
          {/* 問題表示エリア */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 border border-gray-600 shadow-xl flex-shrink-0">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold">
                  QUIZ {gameState.currentQuizIndex + 1}/{quizzes.length}
                </span>
                <span className="text-yellow-400 text-lg sm:text-xl">🧬</span>
              </div>
              <span className="text-white text-xs sm:text-sm">Floor: {gameState.currentFloor}/{gameState.clearFloor}</span>
            </div>
            
            <h2 className="text-white text-base sm:text-lg md:text-xl font-bold mb-2 leading-tight">
              {currentQuiz.question}
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm">
              🎯 正解して敵にダメージを与えよう！
            </p>
          </div>

          {/* 選択肢エリア */}
          <div className="flex-1 min-h-0">
            <div className="grid grid-cols-2 gap-2 sm:gap-3 h-full">
              {currentQuiz.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleChoiceClick(choice)}
                  className={`relative bg-gradient-to-r from-gray-700 to-gray-800 hover:from-blue-600 hover:to-purple-600 border-2 border-gray-600 hover:border-yellow-400 rounded-xl p-2 sm:p-3 text-left transition-all duration-200 transform hover:scale-105 hover:shadow-2xl flex flex-col justify-center items-center space-y-1 sm:space-y-2 ${
                    isAnswerCorrect === false && choice === currentQuiz.correct
                      ? 'ring-2 ring-yellow-300 animate-pulse'
                      : ''
                  }`}
                >
                  {selectedAnswer === choice && isAnswerCorrect === false && (
                    <span className="absolute inset-0 rounded-xl bg-red-600/70 animate-[ping_0.6s_ease-out] pointer-events-none" />
                  )}
                  <div className="flex-shrink-0">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg">
                      {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                  <span className="text-white font-medium text-xs sm:text-sm md:text-base text-center leading-tight overflow-hidden">
                    {choice}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;