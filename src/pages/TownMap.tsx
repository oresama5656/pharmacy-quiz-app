import React from 'react';
// 画像を静的インポート
// アセットは相対パスで読み込む
import townBg from '../assets/map-town.png';

const TownMap: React.FC = () => (
  <div
    className="w-screen h-screen flex items-center justify-center text-2xl text-white"
    style={{
      backgroundImage: `url(${townBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  >
    TownMap Placeholder
  </div>
);

export default TownMap;
