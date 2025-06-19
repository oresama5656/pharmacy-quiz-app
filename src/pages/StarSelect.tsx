import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const StarSelect: React.FC = () => {
  const { guildId, catId } = useParams();
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-slate-800 text-white flex flex-col items-center p-6 gap-4">
      <h1 className="text-xl font-bold">Select Difficulty</h1>
      {[1, 2, 3, 4, 5].map(level => (
        <button
          key={level}
          onClick={() => nav(`/quiz/${guildId}/${catId}/${level}`)}
          className="w-48 py-2 rounded-lg bg-yellow-600/80 hover:bg-yellow-500 transition"
        >
          {"★".repeat(level).padEnd(5, "☆")}
        </button>
      ))}
    </div>
  );
};

export default StarSelect;
