let lastTimer = null

const resetNotification = () => {
  return { type: 'RESET' }
}

const setNotification = (message, color, time) => {
  return async (dispatch) => {
    await dispatch({ type: 'SET_NOTIFICATION', message: message, color: color })
    if (lastTimer !== null) {
      clearTimeout(lastTimer)
    }
    lastTimer = setTimeout(() => {
      dispatch(resetNotification())
    }, time * 1000)
  }
}

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'RESET':
      return null
    case 'SET_NOTIFICATION':
      return { message: action.message, color: action.color }
    default:
      return state
  }
}

export default notificationReducer
export { resetNotification, setNotification }
