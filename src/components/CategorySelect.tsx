import React, { useEffect, useRef, useState } from 'react';
import { getCategories, Category } from '../data/quizManager';
import { BGM, SOUND_EFFECTS, BACKGROUND_IMAGES } from '../constants';

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

// ギルド定義（CategorySelect内の定数）
const guilds = [
  {
    id: 'pharmacy',
    name: '調剤ギルド',
    icon: '💊',
    position: { top: '30%', left: '25%' },
    categories: ['brand2generic', 'brand2effect', 'generic2effect', 'brand2generic_diabetes', 'antibiotics']
  },
  {
    id: 'math',
    name: '数学ギルド',
    icon: '🔢',
    position: { top: '60%', left: '50%' },
    categories: [
      'simple_math',
      'single_digit_subtraction',
      'single_digit_multiplication',
      'single_digit_division',
      'double_digit_addition',
      'double_digit_subtraction',
      'double_digit_multiplication',
      'double_digit_division',
      'single_digit_mixed',
      'double_digit_mixed'
    ]
  },
  {
    id: 'english',
    name: '英語ギルド',
    icon: '📜',
    position: { top: '40%', left: '80%' },
    categories: ['text_length']
  },
  {
    id: 'advanced',
    name: '熟練ギルド',
    icon: '💯',
    position: { top: '70%', left: '35%' },
    categories: ['p2d_best30_ayame', 'p2d_best31to60_ayame', 'p2d_best61to90_ayame', 'p2d_best91to120_ayame', 'p2d_best121to150_ayame']
  }
] as const;

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
  const [activeGuild, setActiveGuild] = useState<typeof guilds[number] | null>(null);
  const [audioReady, setAudioReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const seAudiosRef = useRef<Record<keyof typeof SE, HTMLAudioElement>>({
    uiStart: new Audio(SE.uiStart),
    clickGuild: new Audio(SE.clickGuild),
    clickCard: new Audio(SE.clickCard)
  });

  useEffect(() => {
    Object.values(seAudiosRef.current).forEach((audio) => {
      audio.volume = 0.3;
      audio.preload = 'auto';
      audio.load();
    });
  }, []);
  
  const allCategories = getCategories();

  // カテゴリIDからカテゴリ情報を取得
  const getCategoryInfo = (categoryId: string): Category | undefined => {
    return allCategories.find(cat => cat.id === categoryId);
  };

  // ギルドのカテゴリ情報を取得（存在するもののみ）
  const getGuildCategories = (guild: typeof guilds[number]): Category[] => {
    return guild.categories
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
  const handleGuildSelect = (guild: typeof guilds[number]) => {
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
            <button
              key={guild.id}
              onClick={() => handleGuildSelect(guild)}
              className="absolute bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 flex items-center justify-center text-2xl border-4 border-yellow-600"
              style={{
                top: guild.position.top,
                left: guild.position.left,
                minWidth: '44px',
                minHeight: '44px',
                width: '60px',
                height: '60px'
              }}
              title={guild.name}
            >
              {guild.icon}
            </button>
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
          className="bg-amber-50 rounded-lg shadow-2xl relative z-20 w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()} // ボード内クリックで閉じるのを防ぐ
          style={{
            backgroundImage: "linear-gradient(rgba(139, 69, 19, 0.1), rgba(160, 82, 45, 0.2)), url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><rect width=\"100\" height=\"100\" fill=\"%23DEB887\"/><path d=\"M0 0h100v100H0z\" fill=\"url(%23grain)\"/><defs><pattern id=\"grain\" width=\"4\" height=\"4\" patternUnits=\"userSpaceOnUse\"><circle cx=\"1\" cy=\"1\" r=\"0.5\" fill=\"%23CD853F\" opacity=\"0.3\"/><circle cx=\"3\" cy=\"3\" r=\"0.3\" fill=\"%23D2691E\" opacity=\"0.2\"/></pattern></defs></svg>')"
          }}
        >
          {/* 閉じるボタン */}
          <button
            onClick={handleBoardBackdrop}
            className="absolute top-4 right-4 bg-amber-200 hover:bg-amber-300 text-amber-800 font-bold w-8 h-8 rounded-full flex items-center justify-center text-lg transition-colors z-30"
          >
            ×
          </button>

          <div className="p-6 h-full flex flex-col">
            {/* ヘッダー */}
            <div className="text-center mb-6 flex-shrink-0">
              <h1 className="text-3xl font-bold text-amber-900 mb-2">
                {activeGuild.icon} {activeGuild.name}
              </h1>
              <p className="text-amber-700">クエストを選択してください</p>
            </div>

            {/* カテゴリカード */}
            <div className="grid gap-4 md:grid-cols-2 overflow-y-auto flex-1 p-2" style={{ maxHeight: 'calc(90vh - 200px)' }}>
              {guildCategories.map((category) => {
                const progress = getProgress(category.id);
                const current = progress.currentFloor ?? 0;
                const total = category.clearFloor;
                const stars = generateStars(category.difficulty);
                
                return (
                  <div
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className="bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 hover:border-amber-500 rounded-lg p-4 cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    style={{ maxWidth: '300px', margin: '0 auto' }}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-amber-900 mb-1">
                          {category.name}
                        </h3>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-orange-600 font-mono text-sm">
                            {stars}
                          </span>
                          <span className="bg-amber-200 px-2 py-1 rounded-full text-amber-800 font-semibold text-xs">
                            {current} / {total}F
                          </span>
                        </div>
                        <p className="text-sm text-amber-700">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* フッター */}
            <div className="text-center mt-6 text-amber-600 text-sm flex-shrink-0">
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