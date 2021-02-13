import React, { useEffect, useState } from 'react'
import { Notification } from '../components/Notification'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { resetNotification } from '../reducers/notificationReducer'
import { userLogin, userLogout } from '../reducers/loginReducer'

import { Button, Form } from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetNotification())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(userLogin({ username: username, password: password }))
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            required
            id="loginUsername"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>Password:</Form.Label>
          <Form.Control
            required
            id="loginPwd"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button id="loginButton" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

const LogOutButton = ({ username }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetNotification())
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(userLogout())
  }
  return (
    <div>
      {username} logged in <Button onClick={handleLogout}>logout</Button>
    </div>
  )
}

LogOutButton.propTypes = {
  username: PropTypes.string.isRequired,
}
export { LoginForm, LogOutButton }
