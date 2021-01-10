import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  filter: filterReducer,
  notes: anecdoteReducer,
  notification: notificationReducer,
})
const store = createStore(reducer, composeWithDevTools())

export { store }
