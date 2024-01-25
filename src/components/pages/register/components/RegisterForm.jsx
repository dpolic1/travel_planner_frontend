import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./RegisterForm.css"
import {useLocalization} from "../../../../context/LocalizationContext";

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const { t } = useLocalization();
    
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

    const handleAdminChange = (e) => {
        setIsAdmin(e.target.checked);
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
                    isAdmin: isAdmin
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
        <form className="register_input" onSubmit={handleSubmit}>
            <label>
                <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder={t("register_name")}
                    required />
            </label>

            <label>
                <input
                    type="text"
                    value={surname}
                    onChange={handleSurnameChange}
                    placeholder={t("register_surname")}
                    required />
            </label>

            <label>
                <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder={t("register_username")}
                    required />
            </label>

            <label>
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder={t("register_email")}
                    required />
            </label>

            <label>
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder={t("register_password")}
                    required />
            </label>

            <label>
                <input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={handleAdminChange}
                />
                {t("register_admin")}
            </label>

            <button type="submit">{t("register_submit")}</button>
        </form>
    );
}

export default RegisterForm;