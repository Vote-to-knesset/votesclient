import React from 'react';
import VoteDetails from './VoteDetails';
import Header from './Header';
const UserZone = () => {
  return (
    <div  className="bg-gray-100 min-h-screen">
        <Header/>


  
      <main className="w-full  md:w-3/5 mx-auto p-8">
        {/* Your dashboard content goes here */}
        <VoteDetails/>
        {/* Add various widgets, graphs, user data, etc. */}
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center p-4 mt-8">
        {/* Footer content */}
        &copy; 2023 . All rights reserved.
      </footer>
    </div>
  );
};

export default UserZone;
