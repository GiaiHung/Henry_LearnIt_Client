import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { apiUrl } from '../../config/constantsURL'
import toast from 'react-hot-toast'
import axios from 'axios'

function Register() {
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })
  const { username, password, confirmPassword } = registerForm

  const navigate = useNavigate()

  const onChangeRegisterForm = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword)
      return alert('Please make sure your confirm password is identical to password')

    try {
      const { data } = await axios.post(`${apiUrl}/auth/register`, registerForm)
      if (data.success) {
        toast.success('New user created successfully!')
        navigate('/auth/login')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter username"
            required
            name="username"
            value={username}
            onChange={onChangeRegisterForm}
            autoComplete="username"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChangeRegisterForm}
            required
            autoComplete="password"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChangeRegisterForm}
            required
            autoComplete="password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create account
        </Button>
      </Form>
      <div className="guiding-register">
        <p>
          Already have an account?{' '}
          <span>
            <Link to="/auth/login">Log in</Link>
          </span>
        </p>
      </div>
    </>
  )
}

export default Register
