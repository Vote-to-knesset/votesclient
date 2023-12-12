// UserDetails.js

import React from "react";

const UserDetails = ({ show }) => {
  const userDetailsStyles = {
    transform: show ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 3s ease-in-out",
    position: "fixed",
    top: 50,
    left: 5,
    height: "fit-content",
    width: "fit-content", 
    zIndex: 1000, 
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
  };

  if (!show) {
    return null;
  }

  const stylesButtons = {display: 'block', marginBottom: '8px'}
  const classNameButtons="bg-gray-200 hover:bg-gray-400 flex items-center"

  return(
    <div style={userDetailsStyles} className="bg-gray-200">
      <div style={{ borderBottom: '2px solid black', fontSize: "20px"}} className="px-4 py-2 text-center text-gray-700">
        איזור אישי
      </div>
      <div className="text-black" style={{fontSize:"40px", marginTop: "10px"}}>
      <button style={stylesButtons} className={classNameButtons}>
      📊 סטטיסטיקות 
      </button>
      <button style={stylesButtons} className={classNameButtons}>
      👤 נגישות 
      </button>
      <div style={stylesButtons} className={classNameButtons}>
      תמיכה טכנית  
      <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
    >
      <path d="M15 12 A3 3 0 0 1 12 15 A3 3 0 0 1 9 12 A3 3 0 0 1 15 12 z" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
      </div>
      <button style={stylesButtons} className={classNameButtons}>
      🚪 התנתק 
      </button>
      </div>
    </div>
  );
};

export default UserDetails;
