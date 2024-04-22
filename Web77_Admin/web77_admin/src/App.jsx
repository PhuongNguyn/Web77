import React, { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router'
import NonAuthLayout from './layouts/NonAuthLayout'
import { Toaster } from 'react-hot-toast'
import AuthLayout from './layouts/AuthLayout'
import { useSelector } from 'react-redux'
import isObjectEmpty from './utils/isObjectEmpty'

const Login = React.lazy(() => import('./pages/Login'))
const Dashboard = React.lazy(() => import("./pages/Dashboard"))
const SignUp = React.lazy(() => import('./pages/SignUp'))

function App() {
  const user = useSelector((state) => state.users.user)
  return (
    <>
      <Toaster />
      <Routes>
        {isObjectEmpty(user) ? <Route path='/' element={<NonAuthLayout />}>
          <Route path='' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Route> :
          <Route path='/' element={<AuthLayout />}>
            <Route path='' element={<Dashboard />} />
          </Route>}
      </Routes>
    </>

  )
}

export default App
