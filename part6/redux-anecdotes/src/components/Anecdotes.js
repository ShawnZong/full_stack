import React from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import { createVote, createNote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const VoteButton = ({ anecdote, handleClick }) => {
  return (
    <div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  )
}

const AnecdoteList = (props) => {
  const anecdotes = props.notes
  // const anecdotes = useSelector((state) => state.notes)
  // const filter = useSelector((state) => state.filter)

  const dispatch = useDispatch()
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <VoteButton
            anecdote={anecdote}
            handleClick={() => {
              dispatch(createVote(anecdote.id))
              dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
            }}
          />
        </div>
      ))}
    </div>
  )
}
const mapStateToPropsAnecdoteList = (state) => {
  return {
    notes: state.notes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase()),
    ),
  }
}
const ConnectedAnecdoteList = connect(mapStateToPropsAnecdoteList)(AnecdoteList)

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
    dispatch(setNotification(`you created '${content}'`, 5))
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
export { AnecdoteForm, AnecdoteList, ConnectedAnecdoteList }
