import React, { useEffect } from 'react'
import {
  ConnectedAnecdoteList,
  ConnectedAnecdoteForm,
} from './components/Anecdotes'
import { ConnectedFilter } from './components/Filter'
import Notification from './components/Notification'
import { initializeNotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <ConnectedFilter />
      <Notification />
      <ConnectedAnecdoteList />
      <ConnectedAnecdoteForm />
    </div>
  )
}

export default App
