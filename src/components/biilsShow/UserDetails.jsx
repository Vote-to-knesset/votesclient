import React from "react";

const UserDetails = ({ show }) => {
  const userDetailsStyles = {
    transform: show ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 0.3s ease-in-out",
    position: "fixed",
    top: 50,
    left: 20,
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    zIndex: 1000,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const headerStyles = {
    border: "0.2px solid black",
    fontSize: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "10px",
  };

  if (!show) {
    return null;
  }

  const classNameButtons =
    "flex items-center text-black bg-gray-200 hover:bg-gray-400 rounded-md px-4 py-2 mr-4";
  const stylesButtons = {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
    fontSize: "18px",
  };

  return (
    <div style={userDetailsStyles} className="text-black">
      <div className="flex items-center text-lg mb-4 shadow-md px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-400 ">
        {" "}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          height="1em"
          width="1em"
          className="mr-2"
        >
          <path d="M11 9c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3m3 11H2v-2c0-2.21 2.69-4 6-4s6 1.79 6 4m8-6v2h-9v-2m9-4v2h-9V8m9-4v2h-9V4z" />
        </svg>
        איזור אישי
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <button style={stylesButtons} className={classNameButtons}>
        משוב
          <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" className="w-6 h-6 p-1 flex items-center justify-center rounded-full bg-gray-300 ml-2">
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M6.455 19L2 22.5V4a1 1 0 011-1h18a1 1 0 011 1v14a1 1 0 01-1 1H6.455zM4 18.385L5.763 17H20V5H4v13.385zM11 13h2v2h-2v-2zm0-6h2v5h-2V7z" />
          </svg>
          
        </button>
        <button style={stylesButtons} className={classNameButtons}>
          נגישות
          <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1em"
            width="1em"
            className="w-6 h-6 p-1 flex items-center justify-center rounded-full bg-gray-300 ml-2"
          >
            <path d="M421.6 379.9c-.664 0-1.35.063-2.049.195a177.696 177.696 0 01-33.32 3.17c-94.81 0-174.1-77.14-174.1-175.5 0-63.19 33.79-121.3 88.73-152.6 8.467-4.812 6.339-17.66-3.279-19.44-11.2-2.078-29.53-3.746-40.9-3.746C132.3 31.1 32 132.2 32 256c0 123.6 100.1 224 223.8 224 69.04 0 132.1-31.45 173.8-82.93 5.7-7.97-.5-17.17-8-17.17zM255.8 432C158.9 432 80 353 80 256c0-76.32 48.77-141.4 116.7-165.8-21.5 34.8-33.5 75.4-33.5 117.6 0 99.44 65.13 183.9 154.9 212.8-19.6 7.5-40.7 11.4-62.3 11.4z" />
          </svg>
        </button>
        <button style={stylesButtons} className={classNameButtons}>
          הגדרות
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            className="w-6 h-6 p-1 flex items-center justify-center rounded-full bg-gray-300 ml-2"
          >
            <path d="M15 12 A3 3 0 0 1 12 15 A3 3 0 0 1 9 12 A3 3 0 0 1 15 12 z" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </button>
        <button style={stylesButtons} className={classNameButtons}>
          התנתק
          <svg
            fill="none"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            className="w-6 h-6 p-1 flex items-center justify-center rounded-full bg-gray-300 ml-2"
          >
            <path
              fill="currentColor"
              d="M13.842 17.385l1.42-1.408-3.92-3.953h9.144a1 1 0 100-2h-9.162l3.98-3.947-1.408-1.42-6.391 6.337 6.337 6.391z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
