import React, { useEffect, useRef } from 'react'
import { Blog, NewBlogForm } from './components/Blog'
import { LoginForm, LogOutButton } from './components/LoginOut'
import { Notification } from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs, insertBlog } from './reducers/blogsReducer'
import { initUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  // const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const addBlog = async (newBlog) => {
    try {
      dispatch(insertBlog(newBlog))
      dispatch(setNotification(`a new blog ${newBlog.title} added`, 'green', 5))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUser())
    // const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
    // if (loggedUser) {
    //   setUser(loggedUser)
    //   loginService.setToken(loggedUser.token)
    // }
  }, [])

  if (user === null) {
    return <LoginForm />
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        <LogOutButton username={user.name} />
      </div>
      <div>
        <Togglable
          showLabel="create new blog"
          hideLabel="cancel"
          ref={blogFormRef}
        >
          <NewBlogForm addBlog={addBlog} />
        </Togglable>
        {blogs.map((blog, index) => (
          <Blog key={blog.id} index={index} blog={blog} user={user} />
        ))}
      </div>
    </div>
  )
}

export default App
