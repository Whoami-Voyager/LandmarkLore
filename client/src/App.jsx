import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Singup from './components/Signup'
import Map from './components/Map'
import Profile from './components/Profile'
import Error from './components/Error'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/singup' element={<Singup />} />
        <Route path='/' element={<Map />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
