import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initUserList } from '../reducers/userListReducer'
import { Table } from 'react-bootstrap'

const UserList = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initUserList())
  })

  const userList = useSelector((state) => state.userList)

  return (
    <div>
      <h2>Users</h2>
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
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export { UserList }
