import userListService from '../services/userList'

const initUserList = () => {
  return async (dispatch) => {
    const usersInDB = await userListService.getAll()
    dispatch({ type: 'INIT', users: usersInDB })
  }
}
const userListReducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT':
      return action.users
    case 'RESET':
      return null
    default:
      return state
  }
}

export default userListReducer
export { initUserList }
