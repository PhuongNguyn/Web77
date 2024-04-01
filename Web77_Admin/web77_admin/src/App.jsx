import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router'
import NonAuthLayout from './layouts/NonAuthLayout'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'
import SignUp from './pages/SignUp'

function App() {

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<NonAuthLayout />}>
          <Route path='' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Route>
      </Routes>
    </>

  )
}

export default App
