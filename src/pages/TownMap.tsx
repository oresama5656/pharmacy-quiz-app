import React from 'react';
import { Link } from 'react-router-dom';
import townBg from '../assets/map-town.png';
import { guilds } from '../data/guilds';

const TownMap: React.FC = () => (
  <div
    className="relative w-screen h-screen"
    style={{
      backgroundImage: `url(${townBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    {guilds.map(guild => (
      <Link
        key={guild.id}
        to={`/guild/${guild.id}`}
        className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-105"
        style={{ top: guild.position.top, left: guild.position.left }}
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-4xl drop-shadow">{guild.icon}</span>
          <span className="text-xs text-white bg-black/60 px-2 py-0.5 rounded">
            {guild.name}
          </span>
        </div>
      </Link>
    ))}
  </div>
);

export default TownMap;
