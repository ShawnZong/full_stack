import React, { useEffect, useState } from 'react'
import { Notification } from '../components/Notification'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { resetNotification } from '../reducers/notificationReducer'
import { userLogin, userLogout } from '../reducers/loginReducer'

import { Button } from 'react-bootstrap'

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
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="loginUsername"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="loginPwd"
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button id="loginButton" type="submit">
          login
        </Button>
      </form>
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
