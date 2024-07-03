import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tierlist from './pages/Tierlist';
import Champion from './pages/Champion'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/tierlist' element={<Tierlist />} />
      <Route path='/champion/:id' element={<Champion />} />
    </Routes>
  )
}

export default App