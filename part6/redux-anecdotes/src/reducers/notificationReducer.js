const initialState = null
let lastTimer = null

const resetNotification = () => {
  return { type: 'RESET' }
}
const setNotification = (notification, time) => {
  return async (dispatch) => {
    await dispatch({ type: 'SET_NOTIFICATION', notification: notification })
    if (lastTimer !== null) {
      clearTimeout(lastTimer)
    }
    lastTimer = setTimeout(() => {
      dispatch(resetNotification())
    }, time * 1000)
  }
}
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET':
      return null
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}
export default notificationReducer
export { resetNotification, setNotification }
