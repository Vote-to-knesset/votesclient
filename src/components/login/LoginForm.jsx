import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [serverResponse, setServerResponse] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigatBills = useNavigate();

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    if (id === 'username') {
      setUsername(value);
    } else if (id === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username.trim() !== '' && password.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:5050/users/login', {
          userName: username,
          password: password,
        });

        if (response.status === 200) {

          const { token } = response.data;

          localStorage.setItem('tokenVote', token);


          navigatBills("/billsFeed");
          setServerResponse('Login Successful!');
          setIsSubmitted(true);
        } else {
          setServerResponse('Login Failed. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        setServerResponse('An error occurred. Please try again later.');
      }
    } else {
      setServerResponse('Please enter username and password');
      setIsSubmitted(true);
    }
  };

  return (
    <form
      className="login-form flex flex-col items-center bg-transparent rounded-xl p-5 m-5 animate-fromButton"
      onSubmit={handleSubmit}
    >
      <input
        id="username"
        type="text"
        placeholder="שם משתמש"
        autoComplete="username"
        className="rounded-lg border-none p-3 mb-3 text-right"
        onChange={handleInputChange}
      />
      <input
        id="password"
        type="password"
        placeholder="סיסמה"
        autoComplete="current-password"
        className="rounded-lg border-none p-3 mb-3 text-right"
        onChange={handleInputChange}
      />
      <button
        id="log-in"
        type="submit"
        className="  rounded-2xl px-5 py-2 bg-blue-500 text-white hover:bg-blue-700"
      >
        התחבר
      </button>
      {isSubmitted && <p>{serverResponse}</p>}
    </form>
  );
};

export default LoginForm;
