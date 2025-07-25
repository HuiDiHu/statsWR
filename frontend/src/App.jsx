import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tierlist from './pages/Tierlist';
import Champion from './pages/Champion'
import Test from './pages/Test'
import WrChat from './pages/WrChat'

const App = () => {
  const [logged, setLogged] = useState(window.sessionStorage.getItem('token') !== null)

  return (
    <Routes>
      <Route path='/' element={<Home props={{logged, setLogged}} />} />
      <Route path='/tierlist' element={<Tierlist props={{logged, setLogged}} />} />
      <Route path='/champion/:id' element={<Champion props={{logged, setLogged}} />} />
      <Route path='/test' element={<Test />} />
      <Route path='/chat' element={<WrChat props={{logged, setLogged}} />} />
    </Routes>
  )
}

export default App