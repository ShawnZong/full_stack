/* eslint-disable no-case-declarations */
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
const createVote=(id) => {
  return {
    type:'VOTE',
    id:id
  }
}
const createNote=(content) => {
  return {
    type:'ADD_NOTE',
    content:content,

  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  let updatedState=state
  switch(action.type){
  case 'VOTE':{
    const newNote=state.find(tmp => tmp.id===action.id)
    newNote.votes=newNote.votes+1
    updatedState= state.map(tmp => tmp.id===action.id?newNote:tmp)
    break
  }

  case 'ADD_NOTE':{
    updatedState= state.concat(asObject(action.content))
    break
  }

  default:
    break
  }
  return updatedState.sort((a,b) => b.votes-a.votes)
}

export default reducer
export { createVote ,createNote }