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
            "http://localhost:5050/votes/userexist",
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
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-fixed bg-no-repeat" style={{ backgroundImage: "url('./src/kn-image.png')" }}>
      <span className="text-5xl text-black absolute bottom-0 left-0 w-full animate-riseBottom">
        ברוכים הבאים לאתר שלנו
      </span>
      <div id="login-box" className="w-96 h-96 border-2 border-black rounded-2xl bg-black bg-opacity-40 text-center flex ml-60 flex-col justify-between">
        <div>רישום והתחברות</div>
        
        {showRegistrationForm && <RegistrationForm />}
        {showLoginForm && <LoginForm />}

        {showLoginForm && (
          <>
            <h2>או</h2>
            <button className="login-button rounded-full p-5 mr-20 ml-20 mb-20 py-2 bg-blue-500 text-white" onClick={handleShowRegistrationForm}>
              הירשם
            </button>
          </>
        )}
        {!showLoginForm && (
          <button className="login-button rounded-full p-5 mr-20 ml-20 mb-20 py-2 bg-blue-500 text-white " onClick={handleShowLoginForm}>
            התחבר
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginEntry;
