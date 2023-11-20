import React, { useState } from "react";
import axios from "axios";
import useUserDetails from "../../../atoms/atomUser";

const RegistrationForm = () => {
  const [userDetails, setUserDetails] = useUserDetails();

  const [state, setState] = useState({
    email: "",
    code: "",
    username: "",
    password: "",
    serverResponse: "",
    isEmailSubmitted: false,
    isCodeSubmitted: false,
    isSubmitted: false,
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setState({ ...state, [id]: value });


  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    const { email } = state; 
    if (email.includes("@") && email.includes(".")) {
      try {
        const response = await axios.post(
          "http://localhost:5050/users/signup",
          { email }
        );
      

        if (response.status === 200) {
          setUserDetails({ ...userDetails, email: email });
          setState({
            ...state,
            serverResponse: `Code sent to ${email}`,
            isEmailSubmitted: true,
          });
        } else {
          setState({
            ...state,
            serverResponse: "Failed to send code. Please try again.",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        setState({
          ...state,
          serverResponse: "An error occurred. Please try again later.",
        });
      }
    } else {
      setState({
        ...state,
        serverResponse: "Please enter a valid email address",
      });
    }
  };

  const handleCodeSubmit = async (event) => {
    event.preventDefault();
    const { email, code } = state;


    try {
      const response = await axios.post(
        "http://localhost:5050/users/verifyEmail",
        {email, code }
      );

      if (response.status === 200) {
        setUserDetails({ ...userDetails, code: code });
        setState({
          ...state,
          serverResponse: "Verification Successful!",
          isCodeSubmitted: true,
        });
      } else {
        setState({
          ...state,
          serverResponse: "Invalid code. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setState({
        ...state,
        serverResponse: "An error occurred. Please try again later.",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = state;

    try {
      const response = await axios.post(
        "http://localhost:5050/users/user",
        { username }
      );

      if (response.status === 200) {
        setUserDetails({ ...userDetails, username: username });
        setUserDetails({ ...userDetails, password: password });
        setState({
          ...state,
          serverResponse: "Registration Successful!",
          isSubmitted: true,
        });
      } else {
        setState({
          ...state,
          serverResponse: "Registration Failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setState({
        ...state,
        serverResponse: "An error occurred. Please try again later.",
      });
    }
  };

  const { serverResponse, isEmailSubmitted, isCodeSubmitted, isSubmitted } =
    state;

  return (
    <div>
      {!isEmailSubmitted && (
        <form
          className="registration-form flex flex-col items-center bg-transparent rounded-xl p-5 m-5 animate-fromButton"
          onSubmit={handleEmailSubmit}
        >
          <input
            id="email"
            type="email"
            placeholder="אימייל"
            autoComplete="email"
            className="rounded-lg border-none p-3 mb-3 text-right"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="rounded-full px-5 py-2 bg-blue-500 text-white"
          >
            שלח קוד
          </button>
          {serverResponse && <p>{serverResponse}</p>}
        </form>
      )}

      {isEmailSubmitted && !isCodeSubmitted && (
        <form
          className="registration-form flex flex-col items-center bg-transparent rounded-xl p-5 m-5 animate-fromButton"
          onSubmit={handleCodeSubmit}
        >
          <input
            id="code"
            type="text"
            placeholder="אשר קוד"
            autoComplete="off"
            className="rounded-lg border-none p-3 mb-3 text-right"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="rounded-full px-5 py-2 bg-blue-500 text-white"
          >
            אשר קוד
          </button>
          {serverResponse && <p>{serverResponse}</p>}
        </form>
      )}
      {isCodeSubmitted && !isSubmitted && (
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
            type="submit"
            className="rounded-full px-5 py-2 bg-blue-500 text-white"
          >
            התחבר
          </button>
          {isSubmitted && <p>{serverResponse}</p>}
        </form>
      )}

      {isSubmitted && <p>Registration Successful!</p>}
    </div>
  );
};

export default RegistrationForm;
