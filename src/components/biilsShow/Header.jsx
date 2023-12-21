import * as React from "react";
import { useState, useLayoutEffect } from "react";
import Search from "./Search";
import BillsFeed from "./BillsFeed";
import UserDetails from "./UserDetails";
import { useNavigate } from "react-router-dom";
import Notifications from "./Notifications";
import axios from "axios";
import { useLawsBills } from "../../../atoms/atomBills";

async function getNotifications() {
  try {
    const token = localStorage.getItem("tokenVote");

    if (token) {
      const response = await axios.get(
        "https://sever-users-node-js.vercel.app/votes/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Failed to fetch note");
      }
    } else {
      console.error("Token not found");
    }
  } catch (error) {
    console.error(error);
  }
}

function Header() {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const [showUserDetails, setShowUserDetails] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [voteData, setVoteData] = useLawsBills();

  const navigatBills = useNavigate();

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getNotifications();
        setVoteData(fetchedData.data);

        voteData && setServerMessage("חוקים שהצבעת עליהם עלו להצבעה בכנסת");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    setShowUserDetails(false);
    setNotifications(false);
  };

  const openUserDetails = () => {
    setShowUserDetails(!showUserDetails);
    setNotifications(false);
  };

  const openNote = () => {
    setNotifications(!notifications);
    setShowUserDetails(false);
  };

  const returnFeed = () => {
    navigatBills("/billsFeed");
  };

  return (
    <header className="bg-white p-1 text-white flex items-center fixed top-0 w-full z-10  md:sticky md:top-0">
      <div className="flex items-center flex-grow">
        <button className=" mr-2 ml-2" onClick={openUserDetails}>
          <svg
            className="hover:scale-100 rounded-full  transition duration-300 ease-in-out"
            viewBox="0 0 224 224"
            height="2.5em"
            width="2.5em"
            preserveAspectRatio="xMidYMid meet"
            version="1.1"
            x="0px"
            y="0px"
            enableBackground="new 0 0 212 212"
          >
            <path
              fill="#DFE5E7 "
              className="background"
              d="M106.251,0.5C164.653,0.5,212,47.846,212,106.25S164.653,212,106.25,212C47.846,212,0.5,164.654,0.5,106.25 S47.846,0.5,106.251,0.5z"
            ></path>
            <g>
              <path
                fill="#FFFFFF"
                className="primary"
                d="M173.561,171.615c-0.601-0.915-1.287-1.907-2.065-2.955c-0.777-1.049-1.645-2.155-2.608-3.299 c-0.964-1.144-2.024-2.326-3.184-3.527c-1.741-1.802-3.71-3.646-5.924-5.47c-2.952-2.431-6.339-4.824-10.204-7.026 c-1.877-1.07-3.873-2.092-5.98-3.055c-0.062-0.028-0.118-0.059-0.18-0.087c-9.792-4.44-22.106-7.529-37.416-7.529 s-27.624,3.089-37.416,7.529c-0.338,0.153-0.653,0.318-0.985,0.474c-1.431,0.674-2.806,1.376-4.128,2.101 c-0.716,0.393-1.417,0.792-2.101,1.197c-3.421,2.027-6.475,4.191-9.15,6.395c-2.213,1.823-4.182,3.668-5.924,5.47 c-1.161,1.201-2.22,2.384-3.184,3.527c-0.964,1.144-1.832,2.25-2.609,3.299c-0.778,1.049-1.464,2.04-2.065,2.955 c-0.557,0.848-1.033,1.622-1.447,2.324c-0.033,0.056-0.073,0.119-0.104,0.174c-0.435,0.744-0.79,1.392-1.07,1.926 c-0.559,1.068-0.818,1.678-0.818,1.678v0.398c18.285,17.927,43.322,28.985,70.945,28.985c27.678,0,52.761-11.103,71.055-29.095 v-0.289c0,0-0.619-1.45-1.992-3.778C174.594,173.238,174.117,172.463,173.561,171.615z"
              ></path>
              <path
                fill="#FFFFFF"
                className="primary"
                d="M106.002,125.5c2.645,0,5.212-0.253,7.68-0.737c1.234-0.242,2.443-0.542,3.624-0.896 c1.772-0.532,3.482-1.188,5.12-1.958c2.184-1.027,4.242-2.258,6.15-3.67c2.863-2.119,5.39-4.646,7.509-7.509 c0.706-0.954,1.367-1.945,1.98-2.971c0.919-1.539,1.729-3.155,2.422-4.84c0.462-1.123,0.872-2.277,1.226-3.458 c0.177-0.591,0.341-1.188,0.49-1.792c0.299-1.208,0.542-2.443,0.725-3.701c0.275-1.887,0.417-3.827,0.417-5.811 c0-1.984-0.142-3.925-0.417-5.811c-0.184-1.258-0.426-2.493-0.725-3.701c-0.15-0.604-0.313-1.202-0.49-1.793 c-0.354-1.181-0.764-2.335-1.226-3.458c-0.693-1.685-1.504-3.301-2.422-4.84c-0.613-1.026-1.274-2.017-1.98-2.971 c-2.119-2.863-4.646-5.39-7.509-7.509c-1.909-1.412-3.966-2.643-6.15-3.67c-1.638-0.77-3.348-1.426-5.12-1.958 c-1.181-0.355-2.39-0.655-3.624-0.896c-2.468-0.484-5.035-0.737-7.68-0.737c-21.162,0-37.345,16.183-37.345,37.345 C68.657,109.317,84.84,125.5,106.002,125.5z"
              ></path>
            </g>
          </svg>
        </button>
        <button
          onClick={openNote}
          className="relative inline-flex items-center  text-sm font-medium text-center text-white  "
        >
          {notifications && <Notifications msg={serverMessage} />}
          <svg
            className="bg-gray-300 hover:bg-gray-400 p-1.5 rounded-full transition duration-300 ease-in-out"
            viewBox="0 0 512 512"
            fill="currentColor"
            height="2.5em"
            width="2.5em"
            color="black"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Original path */}
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={32}
              d="M427.68 351.43C402 320 383.87 304 383.87 217.35 383.87 138 343.35 109.73 310 96c-4.43-1.82-8.6-6-9.95-10.55C294.2 65.54 277.8 48 256 48s-38.21 17.55-44 37.47c-1.35 4.6-5.52 8.71-9.95 10.53-33.39 13.75-73.87 41.92-73.87 121.35C128.13 304 110 320 84.32 351.43 73.68 364.45 83 384 101.61 384h308.88c18.51 0 27.77-19.61 17.19-32.57zM320 384v16a64 64 0 01-128 0v-16"
            />
          </svg>
          {serverMessage && (
            <div>
              <span className="sr-only">Notifications</span>
              <div className="absolute inline-flex items-center justify-center w-3 h-3 text-xs   text-white bg-red-500  border-white rounded-full -top-0.5 -end-1 "></div>
            </div>
          )}
        </button>
      
      <div className="flex items-center flex-grow md:hidden">
        {showSearchBar ? (
          <>
         <div
          className="fixed top-0 left-0 w-full h-full flex  bg-black bg-opacity-80 z-50"
  
        >
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 ">
            <div className=" flex flex-row items-start ">
              <Search />
              <button
                onClick={toggleSearchBar}
                
              >
                <div className="">
                <svg
                className="absolute text-current top-1  bg-gray-300 p-1 ml-2 rounded-full transition duration-300 ease-in-out"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="2em"
                  width="2em"
                >
                  <path transform="scale(-1, 1) translate(-24, 0)" d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z" />
                </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
          </>
         
        ) : (
          <button
            onClick={toggleSearchBar}
            className="bg-gray-300 ml-2 hover:bg-gray-400 p-1 rounded-full transition duration-300 ease-in-out"
          >
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="1.75em"
              width="1.75em"
              color="black"
            >
              <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
            </svg>
          </button>
        )}
      </div>
      </div>
      <div className="hidden md:block">
        <Search />
        </div>
      <button
        className="mr-4 ml-4  bg-gray-300  hover:bg-gray-400 p-1 rounded-full transition duration-300 ease-in-out"
        onClick={returnFeed}
        // onClick={skip}
      >
        <svg viewBox="0 0 24 24" fill="gray-200" height="2em" width="2em">
          <path d="M18 13l3 3v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4l3-3h.83l2 2H6.78L5 17h14l-1.77-2h-1.91l2-2H18m1 7v-1H5v1h14m-7.66-5l-4.95-4.93a.996.996 0 010-1.41l6.37-6.37a.975.975 0 011.4.01l4.95 4.95c.39.39.39 1.02 0 1.41L12.75 15a.962.962 0 01-1.41 0m2.12-10.59L8.5 9.36l3.55 3.54L17 7.95l-3.54-3.54z" />
        </svg>
      </button>

      <UserDetails show={showUserDetails} />
     
    </header>
  );
}

export default Header;
