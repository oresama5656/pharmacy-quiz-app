import React from 'react';
// 画像を静的インポート
// アセットは相対パスで読み込む
import townBg from '../assets/map-town.png';

const TownMap: React.FC = () => (
  <div
    className="w-screen h-screen flex items-center justify-center text-2xl text-white relative"
    style={{
      backgroundImage: `url(${townBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  >
    {/* 調剤ギルドボタン */}
    <button
      onClick={() => console.log('chouzai')}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 text-white text-center"
    >
      <span className="text-5xl drop-shadow">💊</span>
      <span className="text-sm bg-black/60 px-2 py-0.5 rounded">調剤ギルド</span>
    </button>
  </div>
);

export default TownMap;
