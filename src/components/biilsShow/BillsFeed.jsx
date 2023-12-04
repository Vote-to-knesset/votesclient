import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Header from "./Header";
import GraphVotes from "./GraphVotes";
import BillComments from "./BillComments";
import { useBills, useSelectedBills } from "../../../atoms/atomBills";
import { useSearchTerm } from "../../../atoms/atomBills";
import axios from "axios";

function calculateVoteData(bill) {
  const inFavor = bill.in_favor;
  const against = bill.against;
  return { in_favor: inFavor, against: against };
}

async function getBills(skip) {
  try {
    const response = await axios.get(
      `https://kns-data-votes.onrender.com/api/data_bills?skip=${skip}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getSelectedBills() {
  try {
    const token = localStorage.getItem("tokenVote");

    if (token) {
      const response = await axios.get(
        "https://sever-users-node-js.vercel.app/votes/selectedBills",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response);
        return response.data.data || [];
      } else {
        console.error("Failed to fetch selected bills");
      }
    } else {
      console.error("Token not found");
    }
  } catch (error) {
    console.error("Error fetching selected bills:", error);
  }
}

function BillsFeed() {
  const [comment1, setComment1] = useState("");
  const [openComments, setOpenComments] = useState({});
  const [searchTerm] = useSearchTerm();
  const [Sbills, setSbills] = useState([]);
  const [bills, setBills] = useState([]);
  const [selecteBills, setSelecteBills] = useState([]);
  const [skip, setSkip] = useState(0);
console.log(comment1);


  const [isMounted, setIsMounted] = useState(false);


  useLayoutEffect(() => {
    if (!isMounted) {
      const fetchData = async () => {
        const selectedData = await getSelectedBills();
        setSelecteBills(selectedData);

        const billsData = await getBills(skip);
        console.log(billsData);
        let sortedBills = [];
        let selectedBills = [];
        let unselectedBills = [];

        if (selectedData.length > 0) {
          const selectedSet = new Set(selectedData);
          billsData.forEach((bill) => {
            if (selectedSet.has(bill.BillID)) {
              selectedBills.push(bill);
            } else {
              unselectedBills.push(bill);
            }
          });
          sortedBills = [...unselectedBills, ...selectedBills];
        } else {
          sortedBills = billsData;
        }

        setBills(sortedBills);
      };

      fetchData();
      setIsMounted(true);
    }
  }, [isMounted, skip]);
  const submitVoteToServer = async (billId, vote, token) => {
    try {
      const response = await axios.post(
       
        "https://sever-users-node-js.vercel.app/votes/submitVote",
        { billId, vote },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Vote submitted successfully");
      } else {
        console.error("Failed to submit vote");
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  const handleVoteClickFor = (bill) => {
    bill.in_favor += 1;
    setSbills([...Sbills, bill]);

    const token = localStorage.getItem("tokenVote");
    submitVoteToServer(bill.BillID, "in_favor", token);
  };

  const handleVoteClickAga = (bill) => {
    bill.against += 1;

    setSbills([...Sbills, bill]);

    const token = localStorage.getItem("tokenVote");
    submitVoteToServer(bill.BillID, "against", token);
  };
  const handleClickOutside = () => {
    setOpenComments({});

      
  };

  const toggleComment = (bill) => {
    const billID = bill.BillID;
    setComment1(billID);
    
    setOpenComments((prevComments) => ({
      ...prevComments,
      [billID]: !prevComments[billID],

    }));
  };
  const filteredBills = bills.filter(
    (bill) =>
      (bill.name && bill.name.includes(searchTerm)) ||
      (bill.Name && bill.Name.includes(searchTerm))
  );

  const handleLoadMore = async () => {
    const newSkip = skip + 50;
    setSkip(newSkip);
    try {
      const moreBillsData = await getBills(newSkip);
      let sortedBills = [];
      let selectedBills = [];
      let unselectedBills = [];

      const selectedSet = new Set(selecteBills);

      moreBillsData.forEach((bill) => {
        if (selectedSet.has(bill.BillID)) {
          selectedBills.push(bill);
        } else {
          unselectedBills.push(bill);
        }
      });

      sortedBills = [...unselectedBills, ...selectedBills];

      setBills(sortedBills);
    } catch (error) {
      console.error("Error fetching more bills:", error);
    }
  };

  return (
    <div>
      <Header skip={handleLoadMore} />
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <div className="flex-none w-full md:w-full flex flex-col justify-end items-end">
          <div
            dir="rtl"
            className="bill-feed overflow-y-auto p-4 h-[600px]"
          >
            {filteredBills.map((bill) => (
              <div
                key={bill.BillID}
                className=" bg-white-200 rounded p-4 m-4 shadow-lg border border-gray-300"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {bill.name || bill.Name}
                </h3>
                {bill.SummaryLaw && <p>{bill.SummaryLaw}</p>}
                {bill.present && (
                  <h5 className="text-lg font-semibold mb-2">
                    מציע החוק: {bill.present}{" "}
                  </h5>
                )}
                <p>
                  תאריך עדכון: {new Date(bill.LastUpdatedDate).toLocaleString()}
                </p>
                {bill.document && (
                  <a href={bill.document} className="text-white mt-8">
                    קישור למסמך הסבר הצעת החוק
                  </a>
                )}
                {selecteBills.includes(bill.BillID) || Sbills.includes(bill) ? (
                  <GraphVotes voteData={calculateVoteData(bill)} />
                ) : (
                  <div>
                    <button
                      onClick={() => handleVoteClickFor(bill, "in_favor")}
                      className="bg-green-400 hover:bg-green-600 text-white w-32 h-16 rounded-md m-2 transition duration-300 ease-in-out"
                    >
                      בעד
                    </button>
                    <button
                      onClick={() => handleVoteClickAga(bill, "against")}
                      className="bg-red-400 hover:bg-red-600 text-white w-32 h-16 rounded-md m-2 transition duration-300 ease-in-out"
                    >
                      נגד
                    </button>
                  </div>
                )}
                <p>סך כל ההצבעות : {bill.in_favor + bill.against}</p>

                <div className="flex justify-center border-t dark:border-gray-400 mt-6">
                  <button onClick={() => toggleComment(bill)}>
                    <svg
                      className="mt-2 mb-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="1.5em"
                      width="1.5em"
                    >
                      <path d="M7 7h10v2H7zm0 4h7v2H7z" />
                      <path d="M20 2H4c-1.103 0-2 .897-2 2v18l5.333-4H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14H6.667L4 18V4h16v12z" />
                    </svg>
                  </button>
                </div>
                
              {openComments[bill.BillID] && (
                <BillComments billId={comment1} onClose={handleClickOutside} />
              )}
            </div>
           
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillsFeed;
