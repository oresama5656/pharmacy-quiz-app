import React from 'react';
import { GameState } from '../types';
import { BACKGROUND_IMAGES } from '../constants';

interface ResultScreenProps {
  gameState: GameState;
  onRestart: () => void;
  onBackToCategory: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ gameState, onRestart, onBackToCategory }) => {
  return (
    <div 
      className="min-h-screen relative flex items-center justify-center p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${BACKGROUND_IMAGES.result})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-blue-900/80 to-purple-900/80"></div>
      
      <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md text-center border border-white/20">
        <div className="text-8xl mb-6 animate-bounce">
          {gameState.playerWon ? '🏆' : '💀'}
        </div>
        
        <h1 className={`text-4xl font-bold mb-6 ${
          gameState.playerWon 
            ? 'bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent' 
            : 'bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent'
        }`}>
          {gameState.playerWon ? 'VICTORY!' : 'DEFEAT...'}
        </h1>
        
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-8 border border-gray-200">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">正解数:</span>
              <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {gameState.score}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">プレイヤーHP:</span>
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {gameState.playerHp}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">敵HP:</span>
              <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {gameState.enemyHp}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2 border-blue-300/50"
          >
            <div className="flex items-center justify-center space-x-2">
              <span>🔄</span>
              <span>再挑戦</span>
            </div>
          </button>
          
          <button
            onClick={onBackToCategory}
            className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2 border-gray-300/50"
          >
            <div className="flex items-center justify-center space-x-2">
              <span>🏠</span>
              <span>カテゴリ選択</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;