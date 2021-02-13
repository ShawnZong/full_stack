import React, { useEffect, useRef } from 'react'
// components
import { Blog, BlogDetail, NewBlogForm } from './components/Blog'
import { LoginForm } from './components/LoginOut'
import { Notification } from './components/Notification'
import Togglable from './components/Togglable'
import { UserList, IndiUserView } from './components/User'
import { Menu } from './components/Menu'
import { ReturnButton } from './components/ReturnButton'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs, insertBlog } from './reducers/blogsReducer'
import { initUser } from './reducers/loginReducer'

// react router
import { Switch, Route, useRouteMatch } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const userList = useSelector((state) => state.userList)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUser())
  }, [])
  // const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const userMatch = useRouteMatch('/users/:id')
  const userToBeViewd = userMatch
    ? userList.find((tmp) => tmp.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogToBeViewd = blogMatch
    ? blogs.find((tmp) => tmp.id === blogMatch.params.id)
    : null

  const addBlog = async (newBlog) => {
    try {
      dispatch(insertBlog(newBlog))
      dispatch(
        setNotification(`a new blog ${newBlog.title} added`, 'success', 5),
      )
    } catch (error) {
      console.log(error)
    }
  }

  if (user === null) {
    return (
      <div className="container">
        <LoginForm />
      </div>
    )
  }

  return (
    <div className="container">
      <Menu />
      <h2>Blog App</h2>
      <Notification />
      <Switch>
        <Route path="/blogs/:id">
          <ReturnButton />
          <BlogDetail blog={blogToBeViewd} user={user} />
        </Route>
        <Route path="/users/:id">
          <IndiUserView user={userToBeViewd} />
        </Route>
        <Route path="/users">
          <UserList />
        </Route>
        <Route path="/">
          <div>
            <Togglable
              showLabel="create new blog"
              hideLabel="cancel"
              ref={blogFormRef}
            >
              <NewBlogForm addBlog={addBlog} />
            </Togglable>
            {blogs.map((tmpblog) => (
              <div key={tmpblog.id}>
                <Blog key={tmpblog.id} blog={tmpblog} />
              </div>
            ))}
          </div>
        </Route>
      </Switch>
    </div>
  )
}

export default App
