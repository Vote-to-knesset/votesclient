import React, { useState } from 'react';

function BillsFeed({ bills }) {
  const [voteData, setVoteData] = useState({});
  const [graphData, setGraphData] = useState(false);

  const openGraph = (billID, type) => {
    // Implement fetching and displaying graph data here
    // Update the voteData state to represent the votes
    const updatedVoteData = { ...voteData };
    updatedVoteData[billID] = {
      for: bills.find((bill) => bill.BillID === billID)?.in_favor || 0,
      against: bills.find((bill) => bill.BillID === billID)?.against || 0,
    };
    setVoteData(updatedVoteData);

    // Show the graph
    setGraphData(true);
  };

  return (
    <div className="law-feed overflow-y-auto p-4 h-[600px]">
      {bills.map((bill) => (
        <div key={bill.BillID} className="bg-white rounded p-4 m-4 shadow-lg">
          <h3 className="text-xl font-semibold mb-2">{bill.name}</h3>
          {bill.SummaryLaw && <p>{bill.SummaryLaw}</p>}
          {bill.present && <h5 className="text-lg font-semibold mb-2">מציע החוק: {bill.present} </h5>}
          <p>תאריך עדכון: {new Date(bill.LastUpdatedDate).toLocaleString()}</p>
          {bill.document && (
            <a href={bill.document} className="text-blue-500">
              קישור למסמך הסבר הצעת החוק
            </a>
          )}
          <div className="mt-2">
            <button
              className="bg-green-500 text-white p-3 rounded-md mr-2"
              onClick={() => openGraph(bill.BillID, 'for')}
            >
              {voteData[bill.BillID]?.for || 'בעד'}
            </button>
            <button
              className="bg-red-500 text-white p-3 rounded-md"
              onClick={() => openGraph(bill.BillID, 'against')}
            >
              {voteData[bill.BillID]?.against || 'נגד'}
            </button>
          </div>
        </div>
      ))}
      {graphData && (
        <div className="graph">
          {/* Display the graph here using graphData */}
          {/* You'll need to create a chart component to display the vote data */}
        </div>
      )}
    </div>
  );
}

export default BillsFeed;
