import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryList: React.FC = () => {
  const { guildId } = useParams();
  return (
    <div className="w-screen h-screen flex items-center justify-center text-2xl text-white bg-slate-900">
      CategoryList Placeholder: {guildId}
    </div>
  );
};

export default CategoryList;
