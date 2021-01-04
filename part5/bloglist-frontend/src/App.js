import React, { useState, useEffect, useRef } from 'react';
import { Blog, NewBlogForm } from './components/Blog';
import { LoginForm, LogOutButton } from './components/LoginOut';
import blogService from './services/blogs';
import loginService from './services/login';
import { Notification } from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
  const blogFromRef = useRef();

  const addBlog = async (newBlog) => {
    // event.preventDefault();
    try {
      const savedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(savedBlog));
      setNotification({
        type: 'green',
        message: `a new blog ${newBlog.title} added`
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
    blogFromRef.current.toggleVisibility();
  };

  useEffect(() => {
    (async () => {
      const blogsInDB = await blogService.getAll();
      console.log(blogsInDB);
      setBlogs(blogsInDB);
    })();
    // .then((tmp) => setBlogs(tmp));
  }, []);
  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'));
    if (loggedUser) {
      setUser(loggedUser);
      loginService.setToken(loggedUser.token);
    }
  }, []);

  if (user === null) {
    return (
      <LoginForm
        setUser={setUser}
        notification={notification}
        setNotification={setNotification}
      />
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <div>
        <LogOutButton username={user.name} setUser={setUser} />
      </div>
      <div>
        <Togglable
          showLabel="create new blog"
          hideLabel="cancel"
          ref={blogFromRef}
        >
          <NewBlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            setNotification={setNotification}
            addBlog={addBlog}
          />
        </Togglable>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;
