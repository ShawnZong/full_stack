import axios from 'axios'
const baseURl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURl)
  return response.data
}
const createNew = async (content) => {
  const newObj = { content, votes: 0 }
  const response = await axios.post(baseURl, newObj)
  return response.data
}
export default { getAll, createNew }
