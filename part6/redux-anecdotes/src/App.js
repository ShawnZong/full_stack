import React from 'react'
import { AnecdoteForm, AnecdoteList } from './components/Anecdotes'
import Filter from './components/Filter'
import Notification from './components/Notification'
const App = () => {
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
