import React from 'react';
import VoteDetails from './VoteDetails';
import Header from './Header';
import Maching from './Maching';

const UserZone = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col rg:flex-row">
      <div dir='rtl' className="w-full rg:w-2/6 p-2">
          <Maching />
        </div>
        <div className="w-full lg:w-3/6 p-2">
          <VoteDetails />
        </div>
        
      </div>
      <footer className="bg-gray-200 text-center p-4">
        &copy; 2023. All rights reserved.
      </footer>
    </div>
  );
};

export default UserZone;
