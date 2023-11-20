import React, { useState } from 'react';
import "./LoginForm.css"

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch('http://localhost:8081/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Login failed');
        }
  
        const data = await response.json();
        console.log('JWT Token:', data.jwtToken);
      } catch (error) {
        console.error('Error:', error.message);
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter your username"
          required
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
          required
        />
      </label>

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;