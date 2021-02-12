import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import loginReducer from './reducers/loginReducer'
import userListReducer from './reducers/userListReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  user: loginReducer,
  userList: userListReducer,
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export { store }
