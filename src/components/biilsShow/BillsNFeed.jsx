import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Header from "./Header";
import GraphVotes from "./GraphVotes";
import BillComments from "./BillComments";
import { useBills, useSelectedBills } from "../../../atoms/atomBills";
import { useSearchTerm } from "../../../atoms/atomBills";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useStatistic } from "../../../atoms/atomBills.js";
import qs from "query-string";
import InterestingBills from "./InterestingBills.jsx";
import NotRegisteredModal from "./NotRegisteredModal.jsx";
import HeaderN from "./HeaderN.jsx";

async function getBills(skip) {


  const selectedHover = []
  try {
    const response = await axios.post(
      `https://kns-data-votes.onrender.com/api/data_bills?skip=${skip}`,{selectedHover:selectedHover}
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}


function useStatisticNavigation() {
  return useNavigate();
}

function BillsNFeed() {
  const [comment1, setComment1] = useState("");
  const [openComments, setOpenComments] = useState({});
  const [openStatistic, setopenStatistic] = useState({});
  const [searchTerm, setSearchTerm] = useSearchTerm();
  const [statistic, setStatistic] = useStatistic();
  const [Sbills, setSbills] = useState([]);
  const [bills, setBills] = useState([]);
  const [selecteBills, setSelecteBills] = useState([]);
  const [skip, setSkip] = useState(0);
  const [isLoadingFeed, setIsLoadingFeed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [NotRegistered,setNotRegistered] = useState(false)
  const navigateBills = useNavigate()

  useLayoutEffect(() => {

    const token = localStorage.getItem("tokenVote")
    if(token){
        navigateBills('/billsFeed')
    }
    if (!isMounted) {
      setIsLoadingFeed(true);
      const fetchData = async () => {
        

        const billsData = await getBills(skip);
        
      
       
        setBills(billsData);
        setIsLoadingFeed(false)
        
      };

      fetchData();
      setIsMounted(true);
    }
  }, [isMounted, skip]);

  useEffect(() => {
    async function fetchData() {
      if (searchTerm) {
        try {
          const data = { name: searchTerm };
          const response = await axios.post(
            "https://kns-data-votes.onrender.com/api/search",
            data
          );
          const billsSearch = response.data;
          console.log(response);
          setBills(billsSearch);
          setSearchTerm("");
        } catch (error) {
          console.error(error);
        }
      }
    }

    fetchData();
  }, [searchTerm]);


  const handleVoteClickFor = (bill) => {
    setNotRegistered(true)
  };

  const handleVoteClickAga = (bill) => {
    setNotRegistered(true)
  };

  const toggleComment = (bill) => {
    setNotRegistered(true)
  };



  const handleClickOutside = () => {
    setOpenComments({});
  };
  const navigate = useStatisticNavigation();
  const location = useLocation();

  const handlestatistic = (bill) => {
    setStatistic(bill);
    const queryParams = qs.stringify({ billId: bill.BillID });
    navigate(`/billsFeed/statistic?${queryParams}`, {
      state: { fromStatistic: true },
    });
  };

  return (
    <div>
      <HeaderN />

      <div className="flex flex-col  md:flex-row justify-center items-center h-full  bg-gray-200">
        <div className="w-full md:w-3/5 flex flex-col justify-center items-start ">
          <div
            dir="rtl"
            className="bill-feed md:mr-2 mt-2 overflow-y-auto p-4 h-[650px]"
          >
            {isLoadingFeed && (
              <div className="w-80 md:w-full  bg-gray-200">
                <div className="w-full bg-gray-200 ">
                  <div className="p-20 bg-white border border-primary rounded-md">
                    <div className="flex">
                      <div className="mr-4 bg-gray-200 border border-gray-200 h-16 w-40 rounded animate-pulse"></div>
                      <div className="space-y-1 flex flex-col w-full">
                        <div className=" w-full flex items-center">
                          <div className="bg-gray-200 border border-gray-200 w-60 h-5 animate-pulse"></div>
                          <div className="ml-4 bg-ternary w-12 h-5 animate-pulse"></div>
                        </div>
                        <div className="bg-gray-200 border border-gray-200 w-36 h-5 animate-pulse"></div>
                        <div className="bg-gray-200 border border-gray-200 w-full h-44 animate-pulse"></div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-200 border border-gray-200 w-16 h-5 animate-pulse"></div>
                        <span className="bg-tertiary h-1 w-1 rounded animate-pulse"></span>
                        <div className="bg-gray-200 border border-gray-200 w-16 h-5 animate-pulse"></div>
                      </div>
                      <div className="bg-gray-200 border border-gray-200 w-16 h-5 animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <div className="w-full mx-auto bg-gray-200 mt-8 ">
                  <div className="p-4 bg-white border border-primary rounded-md">
                    <div className="flex">
                      <div className="mr-4 bg-gray-200 border border-gray-200 h-16 w-16 rounded animate-pulse"></div>
                      <div className="space-y-1 flex flex-col w-full">
                        <div className=" w-full flex items-center">
                          <div className="bg-gray-200 border border-gray-200 w-60 h-5 animate-pulse"></div>
                          <div className="ml-4 bg-ternary w-12 h-5 animate-pulse"></div>
                        </div>
                        <div className="bg-gray-200 border border-gray-200 w-36 h-5 animate-pulse"></div>
                        <div className="bg-gray-200 border border-gray-200 w-full h-44 animate-pulse"></div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-200 border border-gray-200 w-16 h-5 animate-pulse"></div>
                        <span className="bg-tertiary h-1 w-1 rounded animate-pulse"></span>
                        <div className="bg-gray-200 border border-gray-200 w-16 h-5 animate-pulse"></div>
                      </div>
                      <div className="bg-gray-200 border border-gray-200 w-16 h-5 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {bills.map((bill) => (
              <div
                key={bill.BillID}
                className=" bg-white rounded-lg shadow-md p-6 pb-2 mb-8"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {bill.name || bill.Name}
                </h3>
                {bill.SummaryLaw && <p className="mb-2">{bill.SummaryLaw}</p>}
                {bill.present && (
                  <div>
                    <h5 className="text-lg font-semibold mb-2">
                      מציע החוק: {bill.present}{" "}
                    </h5>
                  </div>
                )}
                <div className="flex items-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="1.5em"
                    width="1.5em"
                    className="mr-2"
                    color="gray"
                  >
                    <path d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1a6.887 6.887 0 000 9.8c2.73 2.7 7.15 2.7 9.88 0 1.36-1.35 2.04-2.92 2.04-4.9h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58a8.987 8.987 0 0112.65 0L21 3v7.12M12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z" />
                  </svg>
                  <p className="mr-2">
                    {new Date(bill.LastUpdatedDate).toLocaleString()}
                  </p>
                </div>
                {bill.document && (
                  <div className="flex items-center mt-2">
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      height="1.5em"
                      width="1.5em"
                      className="mr-2"
                      color="gray"
                    >
                      <path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494zM504 618H320c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM312 490v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H320c-4.4 0-8 3.6-8 8z" />
                    </svg>
                    <a
                      href={bill.document}
                      className="text-blue-500 mr-2 hover:underline  "
                    >
                      קישור למסמך הסבר הצעת החוק
                    </a>
                  </div>
                )}
                <div className="flex items-center mt-2 mr-2 hover:underline ">
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    height="1.5em"
                    width="1.5em"
                    color="gray"
                  >
                    <path d="M864 518H506V160c0-4.4-3.6-8-8-8h-26a398.46 398.46 0 00-282.8 117.1 398.19 398.19 0 00-85.7 127.1A397.61 397.61 0 0072 552a398.46 398.46 0 00117.1 282.8c36.7 36.7 79.5 65.6 127.1 85.7A397.61 397.61 0 00472 952a398.46 398.46 0 00282.8-117.1c36.7-36.7 65.6-79.5 85.7-127.1A397.61 397.61 0 00872 552v-26c0-4.4-3.6-8-8-8zM705.7 787.8A331.59 331.59 0 01470.4 884c-88.1-.4-170.9-34.9-233.2-97.2C174.5 724.1 140 640.7 140 552c0-88.7 34.5-172.1 97.2-234.8 54.6-54.6 124.9-87.9 200.8-95.5V586h364.3c-7.7 76.3-41.3 147-96.6 201.8zM952 462.4l-2.6-28.2c-8.5-92.1-49.4-179-115.2-244.6A399.4 399.4 0 00589 74.6L560.7 72c-4.7-.4-8.7 3.2-8.7 7.9V464c0 4.4 3.6 8 8 8l384-1c4.7 0 8.4-4 8-8.6zm-332.2-58.2V147.6a332.24 332.24 0 01166.4 89.8c45.7 45.6 77 103.6 90 166.1l-256.4.7z" />
                  </svg>
                  <button
                    className=" font-bold mr-2 "
                    onClick={() => handlestatistic(bill)}
                  >
                    התפלגות ההצבעות לפי מפלגות
                  </button>
                </div>
               
                  <div className="flex  items-center mt-4">
                    <button
                      onClick={() => handleVoteClickFor(bill, "in_favor")}
                      className="bg-green-400 hover:bg-green-600 text-white w-32 h-14 rounded-md m-2 transition duration-300 ease-in-out"
                    >
                      בעד
                    </button>
                    <button
                      onClick={() => handleVoteClickAga(bill, "against")}
                      className="bg-red-400 hover:bg-red-600 text-white w-32 h-14 rounded-md m-2 transition duration-300 ease-in-out"
                    >
                      נגד
                    </button>
                  </div>
                
                <p>סך כל ההצבעות : {bill.in_favor + bill.against}</p>

                <div className="flex justify-center border-t border-gray-300 mt-6 ">
                  <button onClick={() => toggleComment(bill)}>
                    <svg
                      className="mt-2 hover:scale-110 "
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="1.5em"
                      width="1.5em"
                      color="gray"
                    >
                      <path d="M7 7h10v2H7zm0 4h7v2H7z" />
                      <path d="M20 2H4c-1.103 0-2 .897-2 2v18l5.333-4H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14H6.667L4 18V4h16v12z" />
                    </svg>
                  </button>
                </div>

                {openComments[bill.BillID] && (
                  <BillComments
                    billId={comment1}
                    billName={bill.Name || bill.name}
                    onClose={handleClickOutside}
                  />
                )}
              </div>
            ))}
          </div>
         {NotRegistered && <NotRegisteredModal setShowModal={setNotRegistered}/>}
        </div>
        <div className=" hidden lg:block p-2 md:w-2/6 overflow-y-auto bg-white rounded-lg shadow-md border border-gray-300 ml-4 md:mt-8">
          <InterestingBills setBills={setBills} bills={bills} />
        </div>
      </div>
      <footer className="bg-gray-200 text-center p-4 mt-auto">
        &copy; {new Date().getFullYear()}. All rights reserved.
      </footer>
    </div>
  );
}
export default BillsNFeed;
