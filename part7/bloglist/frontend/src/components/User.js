import React, { useEffect } from 'react'
// components
import { ReturnButton } from './ReturnButton'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { initUserList } from '../reducers/userListReducer'

// react router
import { Link } from 'react-router-dom'

// style
import { Table, ListGroup } from 'react-bootstrap'

const UserList = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initUserList())
  }, [])

  const userList = useSelector((state) => state.userList)
  if (!userList) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>
      <ReturnButton />
      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}> {user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

const IndiUserView = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <h2>added blogs</h2>
      <ReturnButton />
      <ListGroup>
        {user.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}
export { UserList, IndiUserView }
