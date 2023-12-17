import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const Notifications = ({msg}) => {
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    navigate('/billsFeed/votedata')
   
  };

  return (
    <div className="fixed  z-50" style={{top: "50px"}}>
      <div
        className="bg-white rounded-lg shadow-md p-4 cursor-pointer w-72 transition-all duration-300 ease-in-out hover:shadow-lg"
        onClick={handleNotificationClick}
      >
        <p className="text-lg text-black mb-2">
          {msg}
        </p>
        <p className="text-sm text-gray-500">
         
        </p>
        {/* Additional content or details can be added here */}
      </div>
    </div>
  );
};

export default Notifications;
