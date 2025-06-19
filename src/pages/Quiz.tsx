import React from 'react';
import { useParams } from 'react-router-dom';

const Quiz: React.FC = () => {
  const { guildId, catId, starLvl } = useParams();
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-indigo-900 text-white gap-2">
      <h1 className="text-2xl font-bold">Quiz Placeholder</h1>
      <p>guild: {guildId}</p>
      <p>category: {catId}</p>
      <p>star: {starLvl}</p>
    </div>
  );
};

export default Quiz;
