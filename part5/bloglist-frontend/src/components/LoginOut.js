import React, { useState } from 'react'
import loginService from '../services/login'
import { Notification } from '../components/Notification'
import PropTypes from 'prop-types'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const returnedUser = await loginService.login({
        username: username,
        password: password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(returnedUser))
      loginService.setToken(returnedUser.token)
      setUser(returnedUser)
    } catch (exception) {
      setNotification({
        message: 'wrong username or password',
        type: 'red'
      })
      // debugger;
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      console.log('notification')
      // debugger;
      console.log(exception)
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification notification={notification} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const LogOutButton = ({ username, setUser }) => {
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  return (
    <div>
      {username} logged in <button onClick={handleLogout}>logout</button>
    </div>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired
}

LogOutButton.propTypes = {
  username: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired
}
export { LoginForm, LogOutButton }
