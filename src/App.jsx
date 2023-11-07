import { useState } from 'react'
import './App.css'

import {   Routes ,Route } from "react-router-dom";
import Home from './Components/home/Home';
import Profile from './Components/profile/Profile';


function App() {

  return (
   <>
   <Routes>
        <Route index element={<Home></Home>}></Route>
        <Route   path="profile/:id" element={<Profile></Profile>}></Route>
        </Routes>
    </>
  )
}

export default App
