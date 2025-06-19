import React from 'react';
import { useParams } from 'react-router-dom';

const StarSelect: React.FC = () => {
  const { guildId, catId } = useParams();
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center text-white bg-slate-800 gap-4">
      <h1 className="text-2xl font-bold">StarSelect Placeholder</h1>
      <p>guild: {guildId}</p>
      <p>category: {catId}</p>
    </div>
  );
};

export default StarSelect;
