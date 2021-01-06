import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createVote,createNote } from '../reducers/anecdoteReducer'
const VoteButton=({ anecdote,handleClick }) => {
  return (<div>
        has {anecdote.votes}
    <button onClick={handleClick}>vote</button>
  </div>)
}
const AnecdoteList=() => {
  const anecdotes=useSelector(state => state)
  const dispatch=useDispatch()
  return (<div>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <VoteButton anecdote={anecdote} handleClick={() => dispatch(createVote(anecdote.id))} />
      </div>
    )}
  </div>)
}
const AnecdoteForm=() => {
  const dispatch = useDispatch()

  const addNote=(event) => {
    event.preventDefault()
    const content=event.target.note.value
    dispatch(createNote(content))
  }
  return (
    <div>
      <h2>create new</h2>
      <form  onSubmit={addNote}>
        <div><input name='note' /></div>
        <button type='submit' >create</button>
      </form>
    </div>
  )
}
export { AnecdoteForm,AnecdoteList  }