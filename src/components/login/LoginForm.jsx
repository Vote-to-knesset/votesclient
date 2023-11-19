import React, { Component } from 'react';
import axios from 'axios';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      serverResponse: '',
      isSubmitted: false,
    };
  }

  handleInputChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { username, password } = this.state;

    if (username.trim() !== '' && password.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:5050/users/login', {
          username,
          password,
        });

        if (response.status === 200) {

          this.setState({ serverResponse: 'Login Successful!', isSubmitted: true });
        } else {

          this.setState({ serverResponse: 'Login Failed. Please try again.' });
        }
      } catch (error) {
        console.error('Error:', error);
        this.setState({ serverResponse: 'An error occurred. Please try again later.' });
      }
    } else {
      this.setState({ serverResponse: 'Please enter username and password', isSubmitted: true });
    }
  };

  render() {
    const { serverResponse, isSubmitted } = this.state;

    return (
      <form
        className="login-form flex flex-col items-center bg-transparent rounded-xl p-5 m-5 animate-fromButton"
        onSubmit={this.handleSubmit}
      >
        <input
          id="username"
          type="text"
          placeholder="שם משתמש"
          autoComplete="username"
          className="rounded-lg border-none p-3 mb-3 text-right"
          onChange={this.handleInputChange}
        />
        <input
          id="password"
          type="password"
          placeholder="סיסמה"
          autoComplete="current-password"
          className="rounded-lg border-none p-3 mb-3 text-right"
          onChange={this.handleInputChange}
        />
        <button
          id="log-in"
          type="submit"
          className="rounded-full px-5 py-2 bg-blue-500 text-white"
        >
          התחבר
        </button>
        {isSubmitted && <p>{serverResponse}</p>}
      </form>
    );
  }
}

export default LoginForm;
