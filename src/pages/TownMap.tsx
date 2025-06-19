import React from 'react';
// 画像を静的インポート
// アセットは相対パスで読み込む
import townBg from '../assets/map-town.png';
import { guilds } from '../data/guilds';

const TownMap: React.FC = () => (
  <div
    className="w-screen h-screen flex items-center justify-center text-2xl text-white relative"
    style={{
      backgroundImage: `url(${townBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  >
    {guilds.map(guild => (
      <button
        key={guild.id}
        onClick={() => console.log(guild.id)}
        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 text-white text-center transition-transform hover:scale-105"
        style={{ top: guild.position.top, left: guild.position.left }}
      >
        <span className="text-5xl drop-shadow">{guild.icon}</span>
        <span className="text-sm bg-black/60 px-2 py-0.5 rounded">
          {guild.name}
        </span>
      </button>
    ))}
  </div>
);

export default TownMap;
