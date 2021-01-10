import React, { useEffect } from 'react'
import { AnecdoteForm, AnecdoteList } from './components/Anecdotes'
import Filter from './components/Filter'
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
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
