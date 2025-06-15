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

  const playerHpPercentage = (gameState.playerHp / 20) * 100;
  const enemyHpPercentage = (gameState.enemyHp / 10) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* 戦闘シーン上半分 */}
      <div 
        className="flex-1 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${BACKGROUND_IMAGES.battle})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '50vh'
        }}
      >
        {/* 戦闘エフェクトオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-black/60"></div>
        
        {/* キャラクター配置 */}
        <div className="relative h-full flex items-end justify-between px-8 pb-8">
          {/* プレイヤー側（左下） */}
          <div className="flex flex-col items-start space-y-4">
            <div className="relative transform scale-110">
              <img 
                src={CHARACTER_IMAGES.player}
                alt="プレイヤー"
                className="w-32 h-32 rounded-full border-4 border-cyan-400 shadow-2xl bg-white/90 animate-pulse"
                style={{ filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.7))' }}
              />
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold shadow-lg">
                👨‍⚕️
              </div>
              {/* 戦闘エフェクト */}
              <div className="absolute inset-0 rounded-full bg-cyan-400/30 animate-ping"></div>
            </div>
          </div>
          
          {/* 敵側（右下、より大きく） */}
          <div className="flex flex-col items-end space-y-4">
            <div className="relative transform scale-150">
              <img 
                src={CHARACTER_IMAGES.enemy}
                alt="敵"
                className="w-32 h-32 rounded-full border-4 border-red-500 shadow-2xl bg-white/90"
                style={{ filter: 'drop-shadow(0 0 30px rgba(239, 68, 68, 0.8))' }}
              />
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold shadow-lg">
                🦠
              </div>
              {/* 敵の威圧エフェクト */}
              <div className="absolute inset-0 rounded-full bg-red-500/30 animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* HPバー表示エリア（FF風） */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          {/* プレイヤーHP */}
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-cyan-400/50 shadow-xl">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-cyan-400 font-bold text-lg">プレイヤー</span>
              <span className="text-white text-sm bg-cyan-600 px-2 py-1 rounded">Lv.1</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-300">
                <span>HP</span>
                <span>{gameState.playerHp}/20</span>
              </div>
              <div className="w-48 h-3 bg-gray-800 rounded-full border border-gray-600 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 transition-all duration-1000 ease-out shadow-inner relative"
                  style={{ width: `${playerHpPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 敵HP */}
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-red-400/50 shadow-xl">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-red-400 font-bold text-lg">感染モンスター</span>
              <span className="text-white text-sm bg-red-600 px-2 py-1 rounded">Lv.2</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-300">
                <span>HP</span>
                <span>{gameState.enemyHp}/10</span>
              </div>
              <div className="w-48 h-3 bg-gray-800 rounded-full border border-gray-600 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-400 via-orange-400 to-red-400 transition-all duration-1000 ease-out shadow-inner relative"
                  style={{ width: `${enemyHpPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* バトル状態表示 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-center">
            <div className="text-6xl animate-bounce mb-2">⚔️</div>
            <div className="bg-black/80 text-white font-bold text-xl px-6 py-3 rounded-full border-2 border-yellow-400 shadow-2xl">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                MEDICAL BATTLE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* クイズUI下半分 */}
      <div className="h-1/2 bg-gradient-to-b from-gray-900 to-black border-t-4 border-yellow-400">
        <div className="h-full flex flex-col p-6">
          {/* 問題表示エリア */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 mb-4 border border-gray-600 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  QUIZ {gameState.currentQuizIndex + 1}/{quizzes.length}
                </span>
                <span className="text-yellow-400 text-xl">🧬</span>
              </div>
            </div>
            
            <h2 className="text-white text-xl font-bold mb-3 leading-relaxed">
              {currentQuiz.question}
            </h2>
            <p className="text-gray-300 text-sm">
              🎯 正解して敵にダメージを与えよう！間違えるとダメージを受けます。
            </p>
          </div>

          {/* 選択肢エリア */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-full">
              {currentQuiz.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => onAnswer(choice)}
                  className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-blue-600 hover:to-purple-600 border-2 border-gray-600 hover:border-yellow-400 rounded-xl p-4 text-left transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-4 h-full"
                >
                  <div className="flex-shrink-0">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                      {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                  <span className="text-white font-medium text-lg flex-1 leading-relaxed">
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