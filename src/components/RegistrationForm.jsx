import React, { Component } from 'react';


class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      serverResponse: '',
      isSubmitted: false,
    };
  }

  handleInputChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password, confirmPassword } = this.state;
    if (password === confirmPassword) {

      this.setState({ serverResponse: 'Validation Successful!', isSubmitted: true });

    } else {
      this.setState({ serverResponse: 'Passwords do not match', isSubmitted: true });
    }
  };

  render() {
    const { serverResponse, isSubmitted } = this.state;

    return (
      <form
        className="registration-form flex flex-col items-center bg-transparent rounded-xl p-5 m-5 animate-fromButton"
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
          autoComplete="new-password"
          className="rounded-lg border-none p-3 mb-3 text-right"
          onChange={this.handleInputChange}
        />
        <input
          id="confirmPassword"
          type="password"
          placeholder="אישור סיסמה"
          autoComplete="new-password"
          className="rounded-lg border-none p-3 mb-3 text-right"
          onChange={this.handleInputChange}
        />
        <button id="register" type="submit" className="rounded-full px-5 py-2 bg-blue-500 text-white">
          הירשם
        </button>
  
        {isSubmitted && <p>{serverResponse}</p>}
      </form>
    );
  }
}

export default RegistrationForm;
