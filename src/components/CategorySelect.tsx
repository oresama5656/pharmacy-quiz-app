import React from 'react';
import { BACKGROUND_IMAGES } from '../constants';
import { quizData } from '../data/quizData';

interface CategorySelectProps {
  onCategorySelect: (category: keyof typeof quizData) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ onCategorySelect }) => {
  return (
    <div 
      className="min-h-screen relative flex items-center justify-center p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${BACKGROUND_IMAGES.category})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/80 to-indigo-900/80"></div>
      
      <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">⚗️</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            薬剤師クイズRPG
          </h1>
          <p className="text-gray-600 text-lg">
            知識を武器に敵を倒そう！
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => onCategorySelect('brand2generic')}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2 border-blue-300/50"
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">💊</span>
              <span>商品名 → 一般名</span>
            </div>
          </button>
          
          <button
            onClick={() => onCategorySelect('brand2effect')}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2 border-green-300/50"
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">🎯</span>
              <span>商品名 → 効果</span>
            </div>
          </button>
          
          <button
            onClick={() => onCategorySelect('generic2effect')}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2 border-purple-300/50"
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">🧪</span>
              <span>一般名 → 効果</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelect;