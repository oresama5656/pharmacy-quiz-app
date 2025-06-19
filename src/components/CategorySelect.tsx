import React, { useEffect, useRef } from 'react';
import { getCategories, Category } from '../data/quizManager';
import { BACKGROUND_IMAGES, BGM } from '../constants';

interface CategorySelectProps {
  onCategorySelect: (categoryId: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ onCategorySelect }) => {
  const categories = getCategories();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(BGM.category);
    audio.loop = true;
    audioRef.current = audio;
    audio.play().catch(() => {});
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col bg-black text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${BACKGROUND_IMAGES.title})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* ヘッダー */}
      <header className="p-4 sm:p-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          薬学クイズバトル
        </h1>
        <p className="mt-2 text-gray-300">知識を武器に戦おう！</p>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-purple-500/30 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-yellow-400">
              カテゴリを選択
            </h2>
            
            <div className="space-y-3">
              {categories.map((category: Category) => (
                <button
                  key={category.id}
                  onClick={() => onCategorySelect(category.id)}
                  className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-blue-600 hover:to-purple-600 p-3 sm:p-4 rounded-lg border border-gray-700 hover:border-yellow-400 transition-all duration-300 flex items-center group"
                >
                  <span className="text-2xl mr-3">{category.icon}</span>
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-white group-hover:text-yellow-200">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-200">
                      {category.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end text-xs space-y-1">
                    <span className="bg-gray-700 px-2 py-1 rounded-full text-gray-300 group-hover:bg-yellow-500 group-hover:text-black">
                      {category.difficulty}
                    </span>
                    <span className="text-gray-400 group-hover:text-gray-200">
                      {`Clear: ${category.clearFloor}F`}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="p-4 text-center text-gray-500 text-sm">
        <p>© 2023 薬学クイズバトル</p>
      </footer>
    </div>
  );
};

export default CategorySelect;