import React from 'react'
import { Outlet } from 'react-router-dom'

function Auth() {
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Learning Tutorial</h1>
          <h4>Keep track of what you learn and progress!</h4>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Auth
