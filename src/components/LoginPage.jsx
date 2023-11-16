import React, { Component } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRegistrationForm: false,
      showLoginForm: false,
      buttonsVisible: true,
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
      showLoginForm: true,
      showRegistrationForm: false,
      buttonsVisible: false,
    });
  };

  render() {
    return (
      <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-fixed bg-no-repeat " style={{ backgroundImage: "url('./src/kn-image.png')" }}>
        <span className="text-5xl text-black absolute bottom-0 left-0 w-full animate-riseBottom">
          ברוכים הבאים לאתר שלנו
        </span>
        <div id="login-box" className="w-96 h-96 border-2 border-black rounded-2xl bg-transparent text-center flex ml-60 flex-col justify-between">
          <div>רישום והתחברות</div>
          <div className="button-container">
            {this.state.buttonsVisible && (
              <>
                <button className="register-button rounded-full px-5 py-2 bg-blue-500 text-white mb-2 mr-2" onClick={this.handleShowRegistrationForm}>
                  הירשם
                </button>
                <button className="login-button rounded-full px-5 py-2 bg-blue-500 text-white ml-2" onClick={this.handleShowLoginForm}>
                  התחבר
                </button>
              </>
            )}
          </div>

          {this.state.showRegistrationForm && <RegistrationForm />}
          {this.state.showLoginForm && <LoginForm />}
        </div>
      </div>
    );
  }
}

export default LoginPage;