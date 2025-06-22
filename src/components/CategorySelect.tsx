import React, { useEffect, useRef, useState } from 'react';
import { getCategories, Category } from '../data/quizManager';
import { BGM, SOUND_EFFECTS, BACKGROUND_IMAGES } from '../constants';
import guildsData from '../data/guilds.json';

interface CategorySelectProps {
  onCategorySelect: (categoryId: string) => void;
  /**
   * Whether the start screen should be displayed on mount.
   */
  showStartScreen: boolean;
  /**
   * Callback fired when the user taps the START button.
   * Used by the parent component to mark the start screen as shown
   * so it will not appear again during this session.
   */
  onStart: () => void;
}

type Screen = 'start' | 'map' | 'board';

// ギルド型定義
interface Guild {
  id: string;
  name: string;
  icon: string;
  position: { top: string; left: string };
  categoryIds: string[];
}

// 音源定数（index.tsから取得）
const SE = {
  uiStart: SOUND_EFFECTS.uiStart,
  clickGuild: SOUND_EFFECTS.clickGuild,
  clickCard: SOUND_EFFECTS.clickCard
};

const MUSIC = {
  map: BGM.category
};

const CategorySelect: React.FC<CategorySelectProps> = ({
  onCategorySelect,
  showStartScreen,
  onStart
}) => {
  const [screen, setScreen] = useState<Screen>(() =>
    showStartScreen ? 'start' : 'map'
  );
  const [activeGuild, setActiveGuild] = useState<Guild | null>(null);
  const [audioReady, setAudioReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const seAudiosRef = useRef<Record<keyof typeof SE, HTMLAudioElement>>({
    uiStart: new Audio(SE.uiStart),
    clickGuild: new Audio(SE.clickGuild),
    clickCard: new Audio(SE.clickCard)
  });

  // ギルドデータを読み込み
  const guilds = guildsData as Guild[];

  useEffect(() => {
    Object.values(seAudiosRef.current).forEach((audio) => {
      audio.volume = 0.3;
      audio.preload = 'auto';
      audio.load();
    });
  }, []);

  // カテゴリ画面に戻ってきた際の音楽再開処理
  useEffect(() => {
    // スタート画面をスキップしてカテゴリ画面に直接来た場合、音楽を開始
    if (!showStartScreen && screen === 'map' && !audioReady) {
      // AudioContextを初期化（ユーザー操作なしでは音は鳴らないが、準備だけする）
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      setAudioReady(true);
      startBGM();
    }
  }, [showStartScreen, screen, audioReady]);
  
  const allCategories = getCategories();

  // カテゴリIDからカテゴリ情報を取得
  const getCategoryInfo = (categoryId: string): Category | undefined => {
    return allCategories.find(cat => cat.id === categoryId);
  };

  // ギルドのカテゴリ情報を取得（存在するもののみ）
  const getGuildCategories = (guild: Guild): Category[] => {
    return guild.categoryIds
      .map(catId => getCategoryInfo(catId))
      .filter((cat): cat is Category => cat !== undefined);
  };

  // 進行状況を取得
  const getProgress = (categoryId: string) => {
    try {
      const saved = localStorage.getItem(`progress_${categoryId}`);
      return saved ? JSON.parse(saved) : { currentFloor: 0 };
    } catch {
      return { currentFloor: 0 };
    }
  };

  // 効果音再生
  const playSE = (key: keyof typeof SE) => {
    if (audioReady && audioContextRef.current?.state === 'running') {
      const audio = seAudiosRef.current[key];
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    }
  };

  // BGM開始
  const startBGM = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(MUSIC.map);
    audio.loop = true;
    audio.volume = 0.2;
    audioRef.current = audio;
    audio.play().catch(() => {});
  };

  // STARTボタン処理
  const handleStart = async () => {
    // AudioContext初期化
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }
    
    setAudioReady(true);
    playSE('uiStart');
    startBGM();
    setScreen('map');
    onStart();
  };

  // ギルド選択
  const handleGuildSelect = (guild: Guild) => {
    playSE('clickGuild');
    setActiveGuild(guild);
    setScreen('board');
  };

  // カテゴリ選択
  const handleCategorySelect = (categoryId: string) => {
    playSE('clickCard');
    onCategorySelect(categoryId);
  };

  // ボード外クリックで戻る
  const handleBoardBackdrop = () => {
    setScreen('map');
    setActiveGuild(null);
  };

  // 星表示を生成
  const generateStars = (difficulty: string): string => {
    const starCount = difficulty.length; // "★★" → 2個
    return '★'.repeat(starCount) + '☆'.repeat(5 - starCount);
  };

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // START画面
  if (screen === 'start') {
    return (
      <div className="min-h-screen flex items-center justify-center" 
        style={{ 
          backgroundImage: `url('${BACKGROUND_IMAGES.title}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <button
          onClick={handleStart}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-12 rounded-lg text-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
          style={{ minWidth: '200px', minHeight: '60px' }}
        >
          START
        </button>
      </div>
    );
  }

  // MAP画面
  if (screen === 'map') {
    return (
      <div 
        className="min-h-screen relative bg-cover bg-center"
        style={{
          backgroundImage: `url('${BACKGROUND_IMAGES.category}')`
        }}
      >
        {guilds.map((guild) => {
          const guildCategories = getGuildCategories(guild);
          // カテゴリが存在するギルドのみ表示
          if (guildCategories.length === 0) return null;
          
          return (
            <div
              key={guild.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                top: guild.position.top,
                left: guild.position.left,
              }}
            >
              {/* 木製看板風の吹き出し */}
              <button
                onClick={() => handleGuildSelect(guild)}
                className="guild-signboard group relative"
              >
                {/* メインの看板部分 */}
                <div className="relative px-4 py-2 min-w-[120px] text-center rounded-lg shadow-lg transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 border-2 border-amber-800"
                  style={{
                    backgroundColor: '#DEB887',
                    background: `
                      #DEB887,
                      linear-gradient(145deg, #D2B48C 0%, #DEB887 25%, #F5DEB3 50%, #DEB887 75%, #D2B48C 100%),
                      radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.3) 0%, rgba(139, 69, 19, 0.1) 50%, rgba(139, 69, 19, 0.05) 70%),
                      radial-gradient(circle at 80% 70%, rgba(160, 82, 45, 0.25) 0%, rgba(160, 82, 45, 0.1) 50%, rgba(160, 82, 45, 0.05) 70%),
                      radial-gradient(circle at 50% 20%, rgba(210, 180, 140, 0.5) 0%, rgba(210, 180, 140, 0.2) 30%, rgba(210, 180, 140, 0.1) 50%),
                      linear-gradient(90deg, rgba(139, 69, 19, 0.1) 0%, rgba(139, 69, 19, 0.15) 50%, rgba(139, 69, 19, 0.1) 100%),
                      repeating-linear-gradient(0deg, rgba(139, 69, 19, 0.05), rgba(139, 69, 19, 0.05) 1px, rgba(139, 69, 19, 0.08) 1px, rgba(139, 69, 19, 0.08) 2px)
                    `,
                    boxShadow: `
                      inset 2px 2px 4px rgba(245, 222, 179, 0.9),
                      inset -2px -2px 4px rgba(139, 69, 19, 0.4),
                      0 4px 12px rgba(0, 0, 0, 0.3),
                      0 2px 4px rgba(139, 69, 19, 0.2)
                    `
                  }}
                >
                  {/* ギルド名 */}
                  <div 
                    className="font-bold text-amber-900 text-sm leading-tight"
                    style={{
                      fontFamily: '"Noto Serif JP", "Yu Mincho", "YuMincho", "Hiragino Mincho Pro", serif',
                      textShadow: '1px 1px 2px rgba(139, 69, 19, 0.3)',
                      fontSize: '14px'
                    }}
                  >
                    {guild.name}
                  </div>
                </div>

                {/* 吹き出しの三角（下向き） */}
                <div 
                  className="absolute left-1/2 transform -translate-x-1/2"
                  style={{
                    top: '100%',
                    width: 0,
                    height: 0,
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderTop: '8px solid #DEB887',
                    filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.2))'
                  }}
                />
                
                {/* 三角の影とボーダー */}
                <div 
                  className="absolute left-1/2 transform -translate-x-1/2"
                  style={{
                    top: 'calc(100% + 1px)',
                    width: 0,
                    height: 0,
                    borderLeft: '7px solid transparent',
                    borderRight: '7px solid transparent',
                    borderTop: '7px solid #8B4513'
                  }}
                />
              </button>


            </div>
          );
        })}
      </div>
    );
  }

  // BOARD画面
  if (screen === 'board' && activeGuild) {
    const guildCategories = getGuildCategories(activeGuild);
    
    return (
      <div 
        className="fixed inset-0 z-10 flex items-center justify-center p-4"
        onClick={handleBoardBackdrop}
        style={{
          backgroundImage: `url('${BACKGROUND_IMAGES.category}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)'
        }}
      >
        {/* クエストボード */}
        <div 
          className="relative z-20 w-full max-w-6xl max-h-[90vh] overflow-hidden bg-cover bg-center"
          onClick={(e) => e.stopPropagation()} // ボード内クリックで閉じるのを防ぐ
          style={{
            backgroundImage: `url('/public/background/wood-bg.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* 閉じるボタン */}
          <button
            onClick={handleBoardBackdrop}
            className="absolute top-4 right-4 bg-amber-200 hover:bg-amber-300 text-amber-800 font-bold w-8 h-8 rounded-full flex items-center justify-center text-lg transition-colors z-30"
          >
            ×
          </button>

          <div className="p-8 h-full flex flex-col">
            {/* ヘッダー - 暗めの木板＋金枠装飾 */}
            <div className="text-center mb-4 flex-shrink-0 relative">
              <div 
                className="bg-amber-900 rounded-lg p-3 mx-auto max-w-lg relative"
                style={{
                  backgroundImage: `
                    linear-gradient(145deg, rgba(139, 69, 19, 0.9) 0%, rgba(101, 67, 33, 0.95) 50%, rgba(139, 69, 19, 0.9) 100%),
                    repeating-linear-gradient(90deg, rgba(160, 82, 45, 0.1), rgba(160, 82, 45, 0.1) 2px, rgba(139, 69, 19, 0.1) 2px, rgba(139, 69, 19, 0.1) 4px)
                  `,
                  border: '2px solid #B8860B',
                  boxShadow: `
                    inset 0 1px 2px rgba(218, 165, 32, 0.3),
                    inset 0 -1px 2px rgba(139, 69, 19, 0.5),
                    0 2px 6px rgba(0, 0, 0, 0.4)
                  `
                }}
              >
                <h1 
                  className="font-bold text-amber-100"
                  style={{
                    fontFamily: '"Noto Serif JP", "Yu Mincho", "YuMincho", "Hiragino Mincho Pro", serif',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
                    fontSize: '18px'
                  }}
                >
                  {activeGuild.icon} {activeGuild.name}
                </h1>
              </div>
            </div>

            {/* カテゴリカード - 縦5×横2列のグリッド */}
            <div className="grid grid-cols-2 gap-2 flex-1 overflow-y-auto p-2" style={{ maxHeight: 'calc(90vh - 250px)' }}>
              {guildCategories.map((category) => {
                const progress = getProgress(category.id);
                const current = progress.currentFloor ?? 0;
                const total = category.clearFloor;
                const stars = generateStars(category.difficulty);
                
                return (
                  <div
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className="cursor-pointer transition-all duration-300 transform hover:scale-105 rounded-lg shadow-inner bg-cover bg-center"
                    style={{
                      backgroundImage: `url('/public/background/paper-texture.png')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      minHeight: '60px',
                      maxHeight: '70px'
                    }}
                  >
                    <div className="p-1.5 h-full bg-amber-50 bg-opacity-70 rounded-lg hover:bg-opacity-85 transition-all duration-300">
                      <div className="h-full flex flex-col justify-between">
                        <div>
                          <h3 
                            className="font-bold text-amber-900 mb-0.5 leading-none"
                            style={{
                              fontFamily: '"Noto Serif JP", "Yu Mincho", "YuMincho", "Hiragino Mincho Pro", serif',
                              fontSize: window.innerWidth < 768 ? '10px' : '12px'
                            }}
                          >
                            {category.name}
                          </h3>
                          <p 
                            className="text-amber-700 leading-none mb-0.5"
                            style={{
                              fontFamily: '"Noto Serif JP", "Yu Mincho", "YuMincho", "Hiragino Mincho Pro", serif',
                              fontSize: window.innerWidth < 768 ? '7px' : '9px'
                            }}
                          >
                            {category.description}
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <span 
                            className="text-orange-600 font-mono"
                            style={{ fontSize: '8px' }}
                          >
                            {stars}
                          </span>
                          <span 
                            className="bg-amber-200 px-1 py-0.5 rounded text-amber-800 font-semibold"
                            style={{ fontSize: '8px' }}
                          >
                            {current} / {total}F
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* フッター */}
            <div 
              className="text-center mt-2 text-amber-200 flex-shrink-0"
              style={{
                fontFamily: '"Noto Serif JP", "Yu Mincho", "YuMincho", "Hiragino Mincho Pro", serif',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)',
                fontSize: '10px'
              }}
            >
              <p>タップしてクエストを開始</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CategorySelect;