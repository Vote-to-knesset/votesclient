import React, { useState, useEffect } from "react";
import LoginForm from "../login/LoginForm";
import RegistrationForm from "../register/RegistrationForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginEntry = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const navigateBills = useNavigate();

  debugger;



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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-3xl w-full mx-auto p-4">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8 bg-white rounded-lg shadow-md overflow-hidden"
         style={{
            backgroundImage: `url(${'/kns-img.jpg'})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          <div className="flex-1 py-8 px-4 md:px-8">
            <h1 className="text-4xl font-bold text-center mb-8">
              הצביעו עכשיו
            </h1>
            <svg
              viewBox="0 0 24 24"
              fill="gray-200"
              className="h-20 w-20 mx-auto mb-8"
            >
              <path d="M18 13l3 3v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4l3-3h.83l2 2H6.78L5 17h14l-1.77-2h-1.91l2-2H18m1 7v-1H5v1h14m-7.66-5l-4.95-4.93a.996.996 0 010-1.41l6.37-6.37a.975.975 0 011.4.01l4.95 4.95c.39.39.39 1.02 0 1.41L12.75 15a.962.962 0 01-1.41 0m2.12-10.59L8.5 9.36l3.55 3.54L17 7.95l-3.54-3.54z" />
            </svg>
          </div>
          <div className="flex-1 px-4 md:px-0">
            <div className="w-full max-w-md mx-auto bg-gray-100 rounded-lg shadow-md p-8">
              <div className="mb-4 text-xl text-center">רישום והתחברות</div>
              {showRegistrationForm && <RegistrationForm />}
              {showLoginForm && <LoginForm />}
              {showLoginForm && (
                <>
                <div dir="rtl">
                  <h2  className="text-center mb-4">אין לך חשבון ?</h2>
                  <button
                    className="block w-full rounded-full py-3 bg-blue-500 text-white hover:bg-blue-700"
                    onClick={handleShowRegistrationForm}
                  >
הרשמה                  </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginEntry;
