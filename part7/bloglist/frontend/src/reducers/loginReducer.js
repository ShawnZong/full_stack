import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const initUser = () => {
  return async (dispatch) => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (loggedUser) {
      loginService.setToken(loggedUser.token)
      dispatch({ type: 'SET_USER', user: loggedUser })
    }
  }
}

const userLogin = (credential) => {
  return async (dispatch) => {
    try {
      const returnedUser = await loginService.login({
        username: credential.username,
        password: credential.password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(returnedUser))
      loginService.setToken(returnedUser.token)
      dispatch({ type: 'SET_USER', user: returnedUser })
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'danger', 5))
    }
  }
}

const userLogout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedUser')

    dispatch({ type: 'RESET_USER' })
  }
}

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'RESET_USER':
      return null
    case 'SET_USER':
      return action.user
    default:
      return state
  }
}

export default loginReducer
export { initUser, userLogin, userLogout }
