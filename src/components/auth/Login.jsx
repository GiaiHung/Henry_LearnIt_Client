import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { login } from '../../redux/authSlice'
import { apiUrl } from '../../config/constantsURL'
import setAuthToken from '../../utils/setAuthToken'

function Login() {
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const { username, password } = loginForm

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth)

  const onChangeLoginForm = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post(`${apiUrl}/auth/login`, loginForm)
      dispatch(login(data))
      if (data.success) {
        navigate('/dashboard')
        setAuthToken(data.user.accessToken)
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return auth.isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={onChangeLoginForm}
            required
            autoComplete="username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChangeLoginForm}
            required
            autoComplete="password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div className="guiding-register">
        <p>
          Don't have an account{' '}
          <span>
            <Link to="/auth/register">Register now</Link>
          </span>
        </p>
      </div>
    </>
  )
}

export default Login
