import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TownMap from './pages/TownMap';
import CategoryList from './pages/CategoryList';
import GameScreen from './components/GameScreen';

const Root: React.FC = () => (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<TownMap />} />
        <Route path="/guild/:guildId" element={<CategoryList />} />
        <Route path="/battle/:guildId/:catId/:starLvl" element={<GameScreen />} />
      </Routes>
  </BrowserRouter>
);

export default Root;
