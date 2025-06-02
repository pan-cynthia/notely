import React from 'react'
import {Routes, Route} from 'react-router-dom'
import SignUp from './pages/SignUp'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
  )
}

export default App
