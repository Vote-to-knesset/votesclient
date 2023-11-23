import React, { useState, useEffect } from 'react';
import Header from './Header';
import GraphVotes from './GraphVotes';
import BillComments from './BillComments';
import {useBills, useSelectedBills} from '../../../atoms/atomBills'
import { useSearchTerm } from '../../../atoms/atomBills';
import axios from 'axios';


function calculateVoteData(bill) {
  const inFavor = bill.in_favor;
  const against = bill.against;
  return { in_favor: inFavor, against: against };
}

function BillsFeed() {
  const [comment1,setComment1] = useState('')
  const [openComments, setOpenComments] = useState({}); 
  const [bills] = useBills()
  const [searchTerm] = useSearchTerm()
  const [selecteBills,setSelectedBills] = useSelectedBills();
  const [ Sbills, setSbills] = useState([]);
  const submitVoteToServer = async (billId, vote, token) => {
    try {
      const response = await axios.post(
        'http://localhost:5050/votes/submitVote',
        { billId, vote },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      


      if (response.status === 200) {
        console.log('Vote submitted successfully');
      } else {
        console.error('Failed to submit vote');
      }
    } catch (error) {
      console.error('Error submitting vote:', error);

    }
  };



  const handleVoteClickFor = (bill) => {
    bill.in_favor += 1;
    setSbills([...Sbills, bill]);

    const token = localStorage.getItem('tokenVote');
    submitVoteToServer(bill.BillID, 'in_favor', token);
  };

  const handleVoteClickAga = (bill) => {

    bill.against += 1;
    
    setSbills([...Sbills, bill]);

    const token = localStorage.getItem('tokenVote');
    submitVoteToServer(bill.BillID, 'against', token);
  };

  const toggleComment = (bill) => {
    setComment1(bill.BillID)
    setOpenComments((prevComments) => ({
      ...prevComments,
      [bill.BillID]: !prevComments[bill.BillID],
    }));
  };
  const filteredBills = bills.filter((bill) =>
  (bill.name && bill.name.includes(searchTerm)) || (bill.Name && bill.Name.includes(searchTerm)))


  return (
    <div>
      <Header />
      <div dir="rtl" className="bill-feed overflow-y-auto p-4 h-[600px] text-white bg-gray-300">
        {filteredBills.map((bill) => (
          <div key={bill.BillID} className=" bg-gray-600 rounded p-4 m-4 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">{bill.name ||bill.Name}</h3>
            {bill.SummaryLaw && <p>{bill.SummaryLaw}</p>}
            {bill.present && (
              <h5 className="text-lg font-semibold mb-2">מציע החוק: {bill.present} </h5>
            )}
            <p>תאריך עדכון: {new Date(bill.LastUpdatedDate).toLocaleString()}</p>
            {bill.document && (
              <a href={bill.document} className="text-blue-500">
                קישור למסמך הסבר הצעת החוק
              </a>
            )}
            {selecteBills.includes(bill.BillID) || Sbills.includes(bill)? (
              <GraphVotes voteData={calculateVoteData(bill)} />
            ) : (
              <div>
                <button
                  onClick={() => handleVoteClickFor(bill, 'in_favor')}
                  className="bg-green-500 text-white w-32 h-16 rounded-md m-2"
                >
                  בעד
                </button>
                <button
                  onClick={() => handleVoteClickAga(bill, 'against')}
                  className="bg-red-500 text-white w-32 h-16 rounded-md m-2"
                >
                  נגד
                </button>
              </div>
            )}
            <p>סך כל ההצבעות : {bill.in_favor + bill.against}</p>
        <div className='flex justify-center border-t dark:border-gray-400 mt-6'>
            <button onClick={() => toggleComment(bill)}>
              <svg className='mt-2 mb-2' viewBox="0 0 24 24" fill="currentColor" height="1.5em" width="1.5em">
                <path d="M7 7h10v2H7zm0 4h7v2H7z" />
                <path d="M20 2H4c-1.103 0-2 .897-2 2v18l5.333-4H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14H6.667L4 18V4h16v12z" />
                
              </svg>
            </button>
            </div>
            {openComments[bill.BillID] && (
                
              <BillComments billId={comment1} />
            )}
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default BillsFeed;
