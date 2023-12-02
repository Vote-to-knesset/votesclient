import React, { useState, useEffect } from "react";
import LoginForm from "../login/LoginForm";
import RegistrationForm from "../register/RegistrationForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginEntry = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const navigateBills = useNavigate();

  useEffect(() => {
    async function userExists() {
      try {
        const token = localStorage.getItem("tokenVote");
        if (token) {
          const response = await axios.post(
            "https://sever-users-node-js.vercel.app/votes/userexist",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            navigateBills("/billsFeed");
          } else {
            console.error("Failed to fetch selected bills");
          }
        } else {
          console.error("Token not found");
        }
      } catch (error) {
        console.error("Error fetching selected bills:", error);
      }
    }

    userExists();
  }, [navigateBills]);

  const handleShowRegistrationForm = () => {
    setShowRegistrationForm(true);
    setShowLoginForm(false);
  };

  const handleShowLoginForm = () => {
    setShowLoginForm(true);
    setShowRegistrationForm(false);
  };

  return (
    <div dir="trl" className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center bg-fixed bg-no-repeat bg-gray-200 ">
      <span className="text-5xl text-black mb-8 text-center">
        ברוכים הבאים לאתר שלנו
      </span>
      <div
        id="login-box"
        className="w-11/12 sm:w-96 h-auto border-2  rounded-2xl bg-gray-200 text-center flex  flex-col justify-between mb-8 "
        style={{ boxShadow: '0 4px 6px rgba(0, 0, 20, 0.1)' }}
        >
        <div className="mb-4">רישום והתחברות</div>

        {showRegistrationForm && <RegistrationForm />}
        {showLoginForm && <LoginForm />}

        {showLoginForm && (
          <>
            <h2>או</h2>
            <button
              className="login-button rounded-full p-5 mr-4 ml-4 mb-4 py-2 bg-blue-500 text-white hover:bg-blue-700"
              onClick={handleShowRegistrationForm}
            >
              הירשם
            </button>
          </>
        )}
    
      </div>
    </div>
  );
};

export default LoginEntry;
