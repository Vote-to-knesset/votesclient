// InterestingBills.js
import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useSearchTerm } from "../../../atoms/atomBills";

const fetchInterestBills = async () => {
  const response = await axios.get(
    "https://sever-users-node-js.vercel.app/votes/get3bills"
  );

    console.log(response);
  return response.data.bills
};

const fetchBills = async () => {
  try {
    const interestUser = await fetchInterestBills()
    const data = { bills: interestUser };

    const response = await axios.post(
      "https://kns-data-votes.onrender.com/api/data_bills/by_id",
      data
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const InterestingBills = ({ setBills, bills }) => {
  const { data: interests, isLoading } = useQuery("bills", fetchBills);

  const handleVote = (bill) => {
    setBills([bill, ...bills]);
  };

  return (
    <div dir="rtl" className="w-full  container mx-auto mt-8">
      <h1 className={`text-2xl font-bold mb-4 p-2 cursor-pointer `}>
        הצעות חוק שאולי יעניינו אותך
      </h1>
      {interests && (
        <div className="w-full">
          {interests.map((interest) => (
            <div key={interest.id} className="p-4 border rounded-lg mb-4">
              <h2 className="text-lg font-semibold mb-2">
                {interest.name || interest.Name}
              </h2>
              <p className="text-gray-600 mb-2">
                {interest.total_vote} אנשים הצביעו כבר
              </p>
              <button
                onClick={() => handleVote(interest)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                הצביעו עכשיו
              </button>
            </div>
          ))}
        </div>
      )}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default InterestingBills;
