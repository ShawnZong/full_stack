import React, { useEffect, useState } from 'react'
import { Notification } from '../components/Notification'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import {
  setNotification,
  resetNotification,
} from '../reducers/notificationReducer'
import { userLogin, userLogout } from '../reducers/loginReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetNotification())
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(userLogin({ username: username, password: password }))
      // const returnedUser = await loginService.login({
      //   username: username,
      //   password: password,
      // })
      // window.localStorage.setItem('loggedUser', JSON.stringify(returnedUser))
      // loginService.setToken(returnedUser.token)
      // setUser(returnedUser)
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification('wrong username or password', 'red', 5))
    }
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
        <button id="loginButton" type="submit">
          login
        </button>
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
      {username} logged in <button onClick={handleLogout}>logout</button>
    </div>
  )
}

LogOutButton.propTypes = {
  username: PropTypes.string.isRequired,
}
export { LoginForm, LogOutButton }
