import { useState } from 'react'
import RegisterPage from './pages/RegisterPage'
import LandingPage from './pages/LandingPage'
import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<LandingPage></LandingPage>}></Route>
        <Route path="/Registration" element={<RegisterPage></RegisterPage>}></Route>
        <Route path="/Login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/Home" element={<HomePage></HomePage>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
