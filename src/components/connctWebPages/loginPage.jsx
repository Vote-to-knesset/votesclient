import React, { Component } from "react";
import LoginForm from "../login/LoginForm";
import RegistrationForm from "../register/RegistrationForm";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRegistrationForm: false,
      showLoginForm: true,
      buttonsVisible: false,
    };
  }

  handleShowRegistrationForm = () => {
    this.setState({
      showRegistrationForm: true,
      showLoginForm: false,
      buttonsVisible: false,
    });
  };

  handleShowLoginForm = () => {
    this.setState({
      showLoginForm: false,
      showRegistrationForm: true,
      buttonsVisible: false,
    });
  };

  render() {
    return (
      <div
        className="flex justify-center items-center min-h-screen bg-cover bg-center bg-fixed bg-no-repeat "
        style={{ backgroundImage: "url('./src/kn-image.png')" }}
      >
        <span className="text-5xl text-black absolute bottom-0 left-0 w-full animate-riseBottom">
          ברוכים הבאים לאתר שלנו
        </span>
        <div
          id="login-box"
          className="w-96 h-96 border-2 border-black rounded-2xl bg-black bg-opacity-40 text-center flex ml-60 flex-col justify-between "
        >
          <div>רישום והתחברות</div>

          {this.state.showRegistrationForm && <RegistrationForm />}
          {this.state.showLoginForm && <LoginForm />}

          {this.state.showLoginForm && (<>
            <h2>או</h2>
            <button
              className="login-button rounded-full p-5 mr-20 ml-20 mb-20 py-2 bg-blue-500 text-white mb-4 "
              onClick={this.handleShowLoginForm}
            >
              הירשם
            </button>
          </>)}
        </div>
      </div>
    );
  }
}

export default LoginPage;
