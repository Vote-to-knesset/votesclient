import React from 'react';
import VoteDetails from './VoteDetails';
import Header from './Header';
import Maching from './Maching';
// Add imports for any other necessary components or data sources

const UserZone = () => {
  return (
    <div className='bg-gray-200'>
      <Header />
      <div className="flex flex-col md:flex-row md:justify-center mt-6 md:mt-10">
        <div className="flex  p-8  md:w-max md:h-max bg-white rounded-lg shadow-md border border-gray-300 md:ml-4 overflow-y-auto">
          {/* Adjust Maching component styling */}
          <Maching />
        </div>
        <div className="w-full lg:w-2/4  md:ml-4 md:mt-0 mt-4 px-4 md:px-8 py-4 md:py-6 bg-white rounded-lg shadow-md border border-gray-300 overflow-y-auto">
          {/* Adjust VoteDetails component styling */}
          <VoteDetails />
        </div>
        {/* New section for another chart/graph */}
        <div className="w-full lg:w-1/4 px-4 md:px-4 py-4 md:py-6 overflow-y-auto">
          <div className="bg-white shadow-md rounded-lg mb-4 p-4">
            <h2 className="text-2xl mb-4 text-center">Additional Chart</h2>
            {/* Placeholder for additional chart/graph */}
            <div className="flex justify-center">
              {/* Add your additional chart/graph component here */}
              {/* For example, using Chart.js */}
              {/* <canvas id="additionalChart" width="400" height="200"></canvas> */}
              {/* Placeholder example */}
              <p>Placeholder for Chart</p>
            </div>
          </div>
        </div>
        {/* ... */}
      </div>
      <footer className="bg-gray-200 text-center p-4 mt-auto">
        &copy; {new Date().getFullYear()}. All rights reserved.
      </footer>
    </div>
  );
};

export default UserZone;
