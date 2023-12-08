import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../common/auth-context/AuthContext.js';
import "./RegisterForm.css"

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleSurnameChange = (e) => {
        setSurname(e.target.value);
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:8081/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    surname: surname,
                    username: username,
                    email: email,
                    password: password,
                }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }
            navigate('/login');
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <input
                    type="text"
                    id="register_input"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Enter your name"
                    required />
            </label>

            <label>
                <input
                    type="text"
                    id="register_input"
                    value={surname}
                    onChange={handleSurnameChange}
                    placeholder="Enter your surname"
                    required />
            </label>

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
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
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

            <button type="submit">Register</button>
        </form>
    );
}

export default RegisterForm;