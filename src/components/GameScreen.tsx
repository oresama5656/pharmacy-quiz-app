import React from 'react';
import { Quiz, GameState } from '../types';
import { CHARACTER_IMAGES, BACKGROUND_IMAGES } from '../constants';

interface GameScreenProps {
  quizzes: Quiz[];
  gameState: GameState;
  onAnswer: (selectedAnswer: string) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ quizzes, gameState, onAnswer }) => {
  const currentQuiz = quizzes[gameState.currentQuizIndex];
  
  if (!currentQuiz) {
    return <div>クイズデータがありません</div>;
  }

  return (
    <div 
      className="min-h-screen relative p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${BACKGROUND_IMAGES.battle})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/70 via-orange-900/70 to-yellow-900/70"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* バトル画面 */}
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-6 border border-white/20">
          <div className="flex justify-between items-center">
            {/* プレイヤー側 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img 
                  src={CHARACTER_IMAGES.player}
                  alt="プレイヤー"
                  className="w-24 h-24 rounded-full border-4 border-blue-400 shadow-lg bg-white/90"
                />
                <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  👨‍⚕️
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-white mb-2">薬剤師</h3>
                <div className="w-32 bg-black/50 rounded-full h-3 border border-blue-400">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-500 shadow-inner"
                    style={{ width: `${(gameState.playerHp / 20) * 100}%` }}
                  ></div>
                </div>
                <p className="text-blue-300 text-sm mt-1 font-semibold">{gameState.playerHp}/20 HP</p>
              </div>
            </div>
            
            {/* 中央のバトル表示 */}
            <div className="flex flex-col items-center space-y-2">
              <div className="text-4xl animate-pulse">⚔️</div>
              <div className="text-white font-bold text-lg bg-black/50 px-4 py-2 rounded-lg border border-white/20">
                BATTLE
              </div>
            </div>
            
            {/* 敵側 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img 
                  src={CHARACTER_IMAGES.enemy}
                  alt="敵"
                  className="w-24 h-24 rounded-full border-4 border-red-400 shadow-lg bg-white/90"
                />
                <div className="absolute -bottom-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  🦠
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-white mb-2">病原菌</h3>
                <div className="w-32 bg-black/50 rounded-full h-3 border border-red-400">
                  <div 
                    className="bg-gradient-to-r from-red-400 to-red-600 h-3 rounded-full transition-all duration-500 shadow-inner"
                    style={{ width: `${(gameState.enemyHp / 10) * 100}%` }}
                  ></div>
                </div>
                <p className="text-red-300 text-sm mt-1 font-semibold">{gameState.enemyHp}/10 HP</p>
              </div>
            </div>
          </div>
        </div>

        {/* クイズ部分 */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                問題 {gameState.currentQuizIndex + 1} / {quizzes.length}
              </span>
            </div>
            
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              {currentQuiz.question}
            </h2>
            <p className="text-gray-600 text-lg">正解を選んで敵にダメージを与えよう！</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuiz.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => onAnswer(choice)}
                className="bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 border-2 border-gray-200 hover:border-purple-300 rounded-xl p-6 text-left transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-center space-x-3">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-gray-800 font-medium text-lg">{choice}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;