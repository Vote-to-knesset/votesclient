// UserDetails.js

import React from "react";

const UserDetails = ({ show }) => {
  const userDetailsStyles = {
    transform: show ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 3s ease-in-out",
    position: "fixed",
    top: 85,
    left: 0,
    height: "100%",
    width: "40%", 
    zIndex: 1000, 
    background: "white", 
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
  };

  if (!show) {
    return null;
  }

  return(
    <div style={userDetailsStyles}>
      <div className="px-4 py-2 font-medium text-center text-gray-700">
        איזור אישי
      </div>
      {/* Other content */}
    </div>
  );
};

export default UserDetails;
