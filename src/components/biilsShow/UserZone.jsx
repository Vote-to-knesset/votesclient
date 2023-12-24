import React from 'react';
import VoteDetails from './VoteDetails';
import Header from './Header';
const UserZone = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />


      
      <div className="w-3/5 p-2 ml-2">
      
          <VoteDetails />

          </div>
       

      <footer className="bg-gray-200 text-center p-4 mt-8">
        &copy; 2023. All rights reserved.
      </footer>
    </div>
  );
};

export default UserZone;
