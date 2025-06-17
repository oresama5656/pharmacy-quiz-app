import React, { useEffect, useRef, useState } from 'react';
import { GameState } from '../types';
import { BACKGROUND_IMAGES, BGM, CHARACTER_IMAGES } from '../constants';

interface ResultScreenProps {
  gameState: GameState;
  onRestart: () => void;
  onBackToCategory: () => void;
}

// 設定可能なアセット（後で差し替え可能）
const RESULT_ASSETS = {
  // 背景画像
  backgroundImage: BACKGROUND_IMAGES.result,
  // ロゴ・テキスト画像（後で差し替え用）
  congratulationsLogo: "https://github.com/oresama5656/GameData_Public/blob/main/logo/congrratulations.png?raw=true", // 画像URL or null（nullの場合はテキスト表示）
  defeatLogo: null,          // 敗北時ロゴ画像URL ← ここを追加
  // キャラクター画像（後で差し替え用）
  characterImages: {
    victory: CHARACTER_IMAGES.player, // 勝利時キャラクター画像URL
    defeat: null,  // 敗北時キャラクター画像URL
  },
  // 装飾オブジェクト
  decorativeElements: {
    particles: true,      // パーティクルエフェクト
    lightRays: true,      // 光線エフェクト
    frameDecoration: true // フレーム装飾
  }
};

const ResultScreen: React.FC<ResultScreenProps> = ({ gameState, onRestart, onBackToCategory }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [animateFloor, setAnimateFloor] = useState(false);
  const [animateButtons, setAnimateButtons] = useState(false);

  useEffect(() => {
    const src = gameState.playerWon ? BGM.win : BGM.lose;
    const audio = new Audio(src);
    audioRef.current = audio;
    audio.loop = false;
    audio.play().catch(() => {});
    
    // アニメーション開始
    setTimeout(() => setShowContent(true), 300);
    setTimeout(() => setAnimateFloor(true), 800);
    setTimeout(() => setAnimateButtons(true), 1400);
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [gameState.playerWon]);

  const achievedFloor = gameState.score;

  return (
    <div className="w-full h-screen overflow-hidden relative flex flex-col">
      {/* 背景 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${RESULT_ASSETS.backgroundImage})`,
        }}
      />
      
      {/* 光線エフェクト */}
      {RESULT_ASSETS.decorativeElements.lightRays && (
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-yellow-300/80 via-transparent to-transparent transform rotate-12 animate-pulse"></div>
          <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-amber-300/60 via-transparent to-transparent transform -rotate-12 animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-0 left-1/2 w-2 h-full bg-gradient-to-b from-white/40 via-transparent to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      )}

      {/* パーティクルエフェクト */}
      {RESULT_ASSETS.decorativeElements.particles && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-pulse"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${1.5 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* メインコンテンツエリア */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
        
        {/* Congratulations ロゴ部分 */}
        <div className={`mb-4 sm:mb-6 md:mb-8 transition-all duration-1000 ${
          showContent ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-0 transform translate-y-4 scale-95'
        }`}>
          {(gameState.playerWon ? RESULT_ASSETS.congratulationsLogo : RESULT_ASSETS.defeatLogo) ? (
            <img 
              src={gameState.playerWon ? RESULT_ASSETS.congratulationsLogo : RESULT_ASSETS.defeatLogo || ""} 
              alt={gameState.playerWon ? "Congratulations" : "Game Over"} 
              className="max-w-full h-auto max-h-16 sm:max-h-20 md:max-h-24"
            />
          ) : (
            <div className="text-center">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-300 tracking-wider drop-shadow-2xl">
                {gameState.playerWon ? 'CONGRATULATIONS!' : 'GAME OVER'}
              </h1>
              {RESULT_ASSETS.decorativeElements.frameDecoration && (
                <div className="flex justify-center items-center mt-2 space-x-2">
                  <div className="w-8 sm:w-12 md:w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-400"></div>
                  <div className="text-amber-300 text-lg sm:text-xl">✦</div>
                  <div className="w-8 sm:w-12 md:w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-400"></div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 到達フロア表示 */}
        <div className={`text-center mb-6 sm:mb-8 md:mb-10 transition-all duration-1000 delay-300 ${
          animateFloor ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-0 transform translate-y-6 scale-90'
        }`}>
          {/* フロア数メイン表示 */}
          <div className="relative">
            {RESULT_ASSETS.decorativeElements.frameDecoration && (
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-yellow-300/20 to-amber-400/20 rounded-2xl transform rotate-2 scale-110"></div>
            )}
            <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-amber-400/50 shadow-2xl">
              <div className="text-amber-200 text-sm sm:text-base md:text-lg font-semibold mb-2 tracking-widest">
                到達フロア
              </div>
              <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 leading-none">
                {achievedFloor}
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-300 mt-1">
                F
              </div>
            </div>
          </div>
        </div>

        {/* 詳細情報（コンパクト表示） */}
        <div className={`grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8 w-full max-w-md transition-all duration-800 delay-500 ${
          animateFloor ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}>
          <div className="bg-blue-900/70 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center border border-blue-400/30">
            <div className="text-blue-200 text-xs sm:text-sm font-semibold mb-1">HP</div>
            <div className="text-white font-bold text-sm sm:text-base">{gameState.playerHp}</div>
          </div>
          <div className="bg-green-900/70 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center border border-green-400/30">
            <div className="text-green-200 text-xs sm:text-sm font-semibold mb-1">正解</div>
            <div className="text-white font-bold text-sm sm:text-base">{gameState.score}</div>
          </div>
          <div className="bg-red-900/70 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center border border-red-400/30">
            <div className="text-red-200 text-xs sm:text-sm font-semibold mb-1">敵HP</div>
            <div className="text-white font-bold text-sm sm:text-base">{gameState.enemyHp}</div>
          </div>
        </div>

        {/* ボタン */}
        <div className={`space-y-3 w-full max-w-sm transition-all duration-800 delay-700 ${
          animateButtons ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}>
          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 hover:via-yellow-400 hover:to-amber-500 text-gray-900 font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-amber-300/50 text-sm sm:text-base"
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="text-lg">🔄</span>
              <span className="tracking-wide">再挑戦</span>
            </div>
          </button>
          
          <button
            onClick={onBackToCategory}
            className="w-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 hover:from-gray-600 hover:via-gray-500 hover:to-gray-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-gray-400/30 text-sm sm:text-base"
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="text-lg">🏠</span>
              <span className="tracking-wide">カテゴリ選択</span>
            </div>
          </button>
        </div>
      </div>

      {/* キャラクター画像表示エリア（後で追加用） */}
      {(RESULT_ASSETS.characterImages.victory || RESULT_ASSETS.characterImages.defeat) && (
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          {gameState.playerWon && RESULT_ASSETS.characterImages.victory && (
            <img 
              src={RESULT_ASSETS.characterImages.victory}
              alt="Victory Character"
              className="max-h-48 sm:max-h-64 md:max-h-80 mx-auto"
            />
          )}
          {!gameState.playerWon && RESULT_ASSETS.characterImages.defeat && (
            <img 
              src={RESULT_ASSETS.characterImages.defeat}
              alt="Defeat Character"
              className="max-h-48 sm:max-h-64 md:max-h-80 mx-auto"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ResultScreen;