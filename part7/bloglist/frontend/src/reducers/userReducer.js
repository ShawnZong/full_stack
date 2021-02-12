import loginService from '../services/login'

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
    const returnedUser = await loginService.login({
      username: credential.username,
      password: credential.password,
    })
    window.localStorage.setItem('loggedUser', JSON.stringify(returnedUser))
    loginService.setToken(returnedUser.token)
    dispatch({ type: 'SET_USER', user: returnedUser })
  }
}

const userLogout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedUser')

    dispatch({ type: 'RESET_USER' })
  }
}

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'RESET_USER':
      return null
    case 'SET_USER':
      return action.user
    default:
      return state
  }
}

export default userReducer
export { initUser, userLogin, userLogout }
