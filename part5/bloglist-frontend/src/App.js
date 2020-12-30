import React, { useState, useEffect } from 'react';
import { Blog, NewBlogForm } from './components/Blog';
import { LoginForm, LogOutButton } from './components/LoginOut';
import blogService from './services/blogs';
import loginService from './services/login';
import { Notification } from './components/Notification';

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((tmp) => setBlogs(tmp));
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
        <LogOutButton username={user.username} setUser={setUser} />
      </div>
      <div>
        <NewBlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          setNotification={setNotification}
        />
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;
