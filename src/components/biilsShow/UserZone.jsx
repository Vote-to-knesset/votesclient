import React from 'react';
import VoteDetails from './VoteDetails';
import Header from './Header';
import Maching from './Maching';
// Add imports for any other necessary components or data sources

const UserZone = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col md:flex-row md:justify-center overflow-y-auto">
        <div className="w-full mt-10 md:mt-0 md:w-2/5 lg:w-1/4 px-4 py-0 mr-4" >
          <Maching />
        </div>
        <div className="w-full lg:w-2/4 px-8 py-2 md:py-6">
          <VoteDetails />
        </div>
        {/* New section for another chart/graph */}
        <div className="w-full lg:w-1/4 px-4 py-2 md:py-6">
          <div className="bg-white shadow-md rounded mb-4 p-4">
            <h2 className="text-2xl mb-4 text-center">Additional Chart</h2>
            {/* Insert your additional chart/graph component here */}
            {/* For example, use Chart.js or any other library to render the graph */}
            {/* Replace this section with your additional chart/graph */}
            {/* Example: */}
            <div className="flex justify-center">
              {/* Your additional chart/graph code here */}
              {/* Example: */}
              {/* <canvas id="additionalChart" width="400" height="200"></canvas> */}
            </div>
          </div>
        </div>
        {/* ... */}
      </div>
      <footer className="bg-gray-200 text-center p-4 mt-auto">
        &copy; 2023. All rights reserved.
      </footer>
    </div>
  );
};

export default UserZone;
