import React from 'react'
import { connect } from 'react-redux'
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
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <VoteButton
            anecdote={anecdote}
            handleClick={() => {
              props.createVote(anecdote.id)
              props.setNotification(`you voted '${anecdote.content}'`, 5)
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
const mapDispatchToPropsAnecdoteList = {
  createVote,
  setNotification,
}
const ConnectedAnecdoteList = connect(
  mapStateToPropsAnecdoteList,
  mapDispatchToPropsAnecdoteList,
)(AnecdoteList)

const AnecdoteForm = (props) => {
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    props.createNote(content)
    props.setNotification(`you created '${content}'`, 5)
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
const mapDispatchToPropsAnecdoteForm = {
  createNote,
  setNotification,
}
const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToPropsAnecdoteForm,
)(AnecdoteForm)

export {
  AnecdoteForm,
  AnecdoteList,
  ConnectedAnecdoteList,
  ConnectedAnecdoteForm,
}
