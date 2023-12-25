import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserDetails from "../../../atoms/atomUser";

const RegistrationForm = () => {
  const [userDetails, setUserDetails] = useUserDetails();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
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
    setFormData({ ...formData, [id]: value });
  };

  const handleCodeSubmit = async (event) => {
    event.preventDefault();
    const { email, code } = formData;

    try {
      const response = await axios.post(
        "https://sever-users-node-js.vercel.app/users/verifyEmail",
        { email, code }
      );

      if (response.status === 200) {
        setUserDetails({ ...userDetails, emailCode: code });
        setFormData({
          ...formData,
          serverResponse: "Verification Successful!",
          isCodeSubmitted: true,

        });
      } else {
        setFormData({
          ...formData,
          serverResponse: "Invalid code. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setFormData({
        ...formData,
        serverResponse: "An error occurred. Please try again later.",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, username, password } = formData;
    if (email.includes("@") && email.includes(".")) {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "https://sever-users-node-js.vercel.app/users/signup",
          { email }
        );

        if (response.status === 200) {
          setUserDetails({ ...userDetails, email: email });
          setFormData({
            ...formData,
            serverResponse: `קוד נשלח לאימייל שכתובתו ${email} אנא אשרו את הקוד`,
            isEmailSubmitted: true,
          });
          
          const userResponse = await axios.post(
            "https://sever-users-node-js.vercel.app/users/user",
            { username }
          );
          

          if (userResponse.status === 200) {
            setUserDetails({
              ...userDetails,
              email: email ,
              password: password,
              userName: username,
            });
            setFormData({
              ...formData,
              serverResponse: "Registration Successful!",
              isEmailSubmitted: true,

            });
          } else {
            setFormData({
              ...formData,
              serverResponse: "Registration Failed. Please try again.",
            });
          }
        } else {
          setFormData({
            ...formData,
            serverResponse: "Failed to send code. Please try again.",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        setFormData({
          ...formData,
          serverResponse: "An error occurred. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const { serverResponse, isEmailSubmitted, isCodeSubmitted } = formData;
  console.log(isEmailSubmitted);

  return (
    <div>
      {isEmailSubmitted && !isCodeSubmitted && (
        <form
          className="registration-form flex flex-col items-center bg-transparent rounded-xl p-5 m-5 animate-fromButton"
          onSubmit={handleCodeSubmit}
        >
          <input
            id="code"
            type="text"
            placeholder="Enter Code"
            autoComplete="off"
            className="rounded-lg border-none p-3 mb-3 text-right"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="rounded-full px-5 py-2 bg-blue-500 text-white hover:bg-blue-700"
          >
            אשר קוד
          </button>
          {serverResponse && <p>{serverResponse}</p>}
        </form>
      )}

      { !isEmailSubmitted && (
        <form
          className="login-form flex flex-col items-center bg-transparent rounded-xl p-5 m-5 animate-fromButton"
          onSubmit={handleSubmit}
        >
          <input
            id="email"
            type="email"
            placeholder="אימייל"
            autoComplete="email"
            className="rounded-lg border-none p-3 mb-3 text-right"
            onChange={handleInputChange}
          />
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
            className={`relative rounded-full px-5 py-2 bg-blue-500 text-white hover:bg-blue-700 ${
              isLoading ? "pointer-events-none" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-900"></div>
              </div>
            )}
            הירשם
          </button>


        </form>
      )}

      {isCodeSubmitted && (console.log("about to navigate"), navigate("/choice"))}
    </div>
  );
};

export default RegistrationForm;
