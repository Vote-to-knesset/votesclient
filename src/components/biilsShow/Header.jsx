import * as React from "react";
import { useState } from "react";
import Search from "./Search";
import BillsFeed from "./BillsFeed";
import UserDetails from "./UserDetails";



function Header() {

    const [showUserDetails, setShowUserDetails] = useState(false);



    const openUserDetails = () => {
      setShowUserDetails(! showUserDetails);
    };
  



  return (
    <header className="bg-blue-800 p-4 text-white flex justify-between items-center">
      <div className="flex items-center">
        <button className="mr-4"
        onClick={openUserDetails}>
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="2.5em"
            width="2.5em"
          >
            <path d="M12 2A10.13 10.13 0 002 12a10 10 0 004 7.92V20h.1a9.7 9.7 0 0011.8 0h.1v-.08A10 10 0 0022 12 10.13 10.13 0 0012 2zM8.07 18.93A3 3 0 0111 16.57h2a3 3 0 012.93 2.36 7.75 7.75 0 01-7.86 0zm9.54-1.29A5 5 0 0013 14.57h-2a5 5 0 00-4.61 3.07A8 8 0 014 12a8.1 8.1 0 018-8 8.1 8.1 0 018 8 8 8 0 01-2.39 5.64z" />
            <path d="M12 6a3.91 3.91 0 00-4 4 3.91 3.91 0 004 4 3.91 3.91 0 004-4 3.91 3.91 0 00-4-4zm0 6a1.91 1.91 0 01-2-2 1.91 1.91 0 012-2 1.91 1.91 0 012 2 1.91 1.91 0 01-2 2z" />
          </svg>
        </button>
        <Search  />
      </div>
     
        <button className="mr-4 ml-8"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="2.5em"
            width="2.5em"
            

          >
            <path d="M18 13l3 3v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4l3-3h.83l2 2H6.78L5 17h14l-1.77-2h-1.91l2-2H18m1 7v-1H5v1h14m-7.66-5l-4.95-4.93a.996.996 0 010-1.41l6.37-6.37a.975.975 0 011.4.01l4.95 4.95c.39.39.39 1.02 0 1.41L12.75 15a.962.962 0 01-1.41 0m2.12-10.59L8.5 9.36l3.55 3.54L17 7.95l-3.54-3.54z" />
          </svg>


        </button>


        <UserDetails show={showUserDetails}  />

     
    </header>
  );
}

export default Header;
