const initialState = null
const resetNotification = () => {
  return { type: 'RESET' }
}
const setNotification = (notification) => {
  return { type: 'SET_NOTIFICATION', notification: notification }
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
