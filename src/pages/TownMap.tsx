import React from 'react';
import townBg from '../assets/map-town.png';

const TownMap: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${townBg})`,
        backgroundSize: 'cover',
      }}
    />
  );
};

export default TownMap;
