import React, { useState, useEffect, useRef } from 'react'
import { Blog, NewBlogForm } from './components/Blog'
import { LoginForm, LogOutButton } from './components/LoginOut'
import blogService from './services/blogs'
import loginService from './services/login'
import { Notification } from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  // const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  const addBlog = async (newBlog) => {
    // event.preventDefault();
    try {
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      dispatch(setNotification(`a new blog ${newBlog.title} added`, 'green', 5))
      // setNotification({
      //   type: 'green',
      //   message: `a new blog ${newBlog.title} added`,
      // })
      // setTimeout(() => {
      //   setNotification(null)
      // }, 5000)
    } catch (error) {
      console.log(error)
    }
    // blogFormRef.current.toggleVisibility()
  }
  useEffect(() => {
    ;(async () => {
      const blogsInDB = await blogService.getAll()
      blogsInDB.sort((blog1, blog2) => blog2.likes - blog1.likes)
      setBlogs(blogsInDB)
    })()

    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (loggedUser) {
      setUser(loggedUser)
      loginService.setToken(loggedUser.token)
    }
  }, [])

  // useEffect(() => {
  //   const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
  //   if (loggedUser) {
  //     setUser(loggedUser)
  //     loginService.setToken(loggedUser.token)
  //   }
  // }, [])

  if (user === null) {
    return <LoginForm setUser={setUser} />
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        <LogOutButton username={user.name} setUser={setUser} />
      </div>
      <div>
        <Togglable
          showLabel="create new blog"
          hideLabel="cancel"
          ref={blogFormRef}
        >
          <NewBlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            setNotification={setNotification}
            addBlog={addBlog}
          />
        </Togglable>
        {blogs.map((blog, index) => (
          <Blog
            key={blog.id}
            index={index}
            blogs={blogs}
            setBlogs={setBlogs}
            blog={blog}
            user={user}
          />
        ))}
      </div>
    </div>
  )
}

export default App
