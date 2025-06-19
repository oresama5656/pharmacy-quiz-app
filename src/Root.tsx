import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TownMap from './pages/TownMap';
import App from './App';

const Root: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<TownMap />} />
      <Route path="/game" element={<App />} />
    </Routes>
  </BrowserRouter>
);

export default Root;
