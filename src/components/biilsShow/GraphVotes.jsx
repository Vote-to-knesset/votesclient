import React, { useState, useEffect } from 'react';

function GraphVotes({ voteData }) {
  const [percentInFavor, setPercentInFavor] = useState(0);
  const [percentAgainst, setPercentAgainst] = useState(0);

  useEffect(() => {
    const totalVotes = voteData.in_favor + voteData.against;
    setPercentInFavor((voteData.in_favor / totalVotes) * 100);
    setPercentAgainst((voteData.against / totalVotes) * 100);
  }, [voteData]);

  const greenBarStyle = {
    width: `${percentInFavor}%`,
    transition: 'width 1s ease-in-out',
    background: `linear-gradient(to right, #00cc00, #33cc33)`, 
  };

  const redBarStyle = {
    width: `${percentAgainst}%`,
    transition: 'width 1s ease-in-out',
    background: `linear-gradient(to right, #ff3333, #ff6666)`, 
  };

  return (
    <div className="flex flex-col w-full md:w-1/2">
       <div className="bg-green-200 text-white h-16 rounded-md m-2 relative" style={{ width: '100%' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          {`${percentInFavor.toFixed(2)}% בעד`}
        </div>
        <div className="h-16 rounded-md" style={greenBarStyle}></div>
      </div>
      <div className="bg-red-200 text-white h-16 rounded-md m-2 relative" style={{ width: '100%' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          {`${percentAgainst.toFixed(2)}% נגד`}
        </div>
        <div className="h-16 rounded-md" style={redBarStyle}></div>
      </div>
     
    </div>
  );
}

export default GraphVotes;
