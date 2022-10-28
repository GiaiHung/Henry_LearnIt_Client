import { useState } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import './App.css'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Landing from './components/layout/Landing'
import NavbarMenu from './components/layout/Navbar'
import PrivateRoutes from './components/layout/PrivateRoutes'
import About from './components/views/About'
import Auth from './components/views/Auth'
import Dashboard from './components/views/Dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route
          element={
            <>
              <NavbarMenu />
              <Outlet />
            </>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
