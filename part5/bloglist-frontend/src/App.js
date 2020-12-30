import React, { useState, useEffect } from 'react';
import { Blog, NewBlogForm } from './components/Blog';
import { LoginForm, LogOutButton } from './components/LoginOut';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

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
    return <LoginForm setUser={setUser} />;
  }
  return (
    <div>
      <h2>blogs</h2>
      <div>
        <LogOutButton username={user.username} setUser={setUser} />
      </div>
      <div>
        <NewBlogForm blogs={blogs} setBlogs={setBlogs} />
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;
