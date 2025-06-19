import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { guilds } from '../data/guilds';
import { quizData } from '../data/quizManager';

const CategoryList: React.FC = () => {
  const { guildId } = useParams();
  const nav = useNavigate();
  const guild = guilds.find(g => g.id === guildId);

  if (!guild) return <p className="text-red-500">Guild not found</p>;

  return (
    <div className="min-h-screen bg-slate-900 p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">{guild.name}</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        {guild.categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              const star = cat.star;
              const floors = star === 1 ? 10 : 20;
              const quizzes = (quizData as any)[cat.id] ?? [];

              nav(`/battle/${guildId}/${cat.id}/${star}`, {
                state: {
                  quizzes,
                  floors,
                  currentQuizIndex: 0,
                  starLevel: star,
                  categoryName: cat.name,
                },
              });
            }}
            className="relative flex items-start gap-3 p-4 rounded-lg bg-white/10 hover:bg-white/20"
          >
            <span className="text-3xl">{cat.icon}</span>
            <div className="text-left">
              <h2 className="font-semibold">{cat.name}</h2>
              <p className="text-sm text-gray-300">{cat.description}</p>
            </div>
            <div className="absolute top-2 right-2 text-yellow-400 text-sm">
              {'★'.repeat(cat.star).padEnd(5, '☆')}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
