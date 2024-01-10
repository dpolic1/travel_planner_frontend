import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../common/auth-context/AuthContext.js';
import "./LoginForm.css"

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { successfulLogin } = useAuth();

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
        localStorage.setItem('jwtToken', data.jwtToken);
        successfulLogin(data.isAdmin);
        navigate('/');
      } catch (error) {
        console.error('Error:', error.message);
      }
  };

  return (
    <form className="login_form" onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter your username"
          required />
      </label>

      <label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
          required />
      </label>

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;