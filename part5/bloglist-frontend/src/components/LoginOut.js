import React, { useState } from 'react';
import loginService from '../services/login';

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const returnedUser = await loginService.login({
        username: username,
        password: password
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(returnedUser));
      loginService.setToken(returnedUser.token);
      setUser(returnedUser);
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

const LogOutButton = ({ username, setUser }) => {
  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };
  return (
    <div>
      {username} logged in <button onClick={handleLogout}>logout</button>
    </div>
  );
};
export { LoginForm, LogOutButton };
