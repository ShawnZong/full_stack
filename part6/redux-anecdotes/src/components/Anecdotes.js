import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createVote, createNote } from '../reducers/anecdoteReducer'
import {
  resetNotification,
  setNotification,
} from '../reducers/notificationReducer'
import noteService from '../services/anecdotes'

const VoteButton = ({ anecdote, handleClick }) => {
  return (
    <div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  )
}
const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.notes)
  const filter = useSelector((state) => state.filter)

  const dispatch = useDispatch()
  return (
    <div>
      {anecdotes
        .filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase()),
        )
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <VoteButton
              anecdote={anecdote}
              handleClick={() => {
                dispatch(createVote(anecdote.id))
                dispatch(setNotification(`you voted '${anecdote.content}'`))
                setTimeout(() => {
                  dispatch(resetNotification())
                }, 5000)
              }}
            />
          </div>
        ))}
    </div>
  )
}
const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    const response = await noteService.createNew(content)
    dispatch(createNote(response))
    dispatch(setNotification(`you created '${content}'`))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div>
          <input name="note" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
export { AnecdoteForm, AnecdoteList }
