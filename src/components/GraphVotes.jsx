import React, { useEffect, useRef } from 'react';

function GraphVotes({ voteData }) {
  const totalVotes = voteData.in_favor + voteData.against;
  const percentInFavor = (voteData.in_favor / totalVotes) * 100;
  const percentAgainst = (voteData.against / totalVotes) * 100;


  const greenBarStyle = {
    width: `${percentInFavor}%`,
    animation: 'fillGreen 2s ease-in-out', 
  };

  const redBarStyle = {
    width: `${percentAgainst}%`,
    animation: 'fillRed 2s ease-in-out', 
  };

  return (
    <div>
      <style>
        {`
          @keyframes fillGreen {
            from {
              width: 0;
              background-color: transparent;
            }
            to {
              width: ${percentInFavor}%;
              background-color: green;
            }
          }

          @keyframes fillRed {
            from {
              width: 0;
              background-color: transparent;
            }
            to {
              width: ${percentAgainst}%;
              background-color: red;
            }
          }
        `}
      </style>
      <div className="bg-green-400 text-white w-32 h-16 rounded-md m-2" style={greenBarStyle}>
        {`${percentInFavor.toFixed(2)}% בעד`}
      </div>
      <div className="bg-red-400 text-white w-32 h-16 rounded-md m-2" style={redBarStyle}>
        {`${percentAgainst.toFixed(2)}% נגד`}
      </div>
    </div>
  );
}

export default GraphVotes;
