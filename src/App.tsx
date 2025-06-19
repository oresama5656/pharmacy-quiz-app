import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TownMap from './pages/TownMap';
import CategoryList from './pages/CategoryList';
import StarSelect from './pages/StarSelect';
import Quiz from './pages/Quiz';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<TownMap />} />
      <Route path="/guild/:guildId" element={<CategoryList />} />
      <Route path="/guild/:guildId/category/:catId" element={<StarSelect />} />
      <Route path="/quiz/:guildId/:catId/:starLvl" element={<Quiz />} />
    </Routes>
  </BrowserRouter>
);

export default App;
