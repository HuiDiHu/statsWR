import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tierlist from './pages/Tierlist';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/tierlist' element={<Tierlist />} />
    </Routes>
  )
}

export default App