import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function Landing() {
  const auth = useSelector((state) => state.auth)
  return auth.isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/auth/login" />
}

export default Landing
