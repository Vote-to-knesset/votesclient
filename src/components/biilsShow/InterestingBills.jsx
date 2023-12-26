import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchTerm } from "../../../atoms/atomBills";

const InterestingBills = ({setBills,bills}) => {
  const [interests, setInterests] = useState([]);


  const handleVote = (Bill) => {
    setBills([Bill, ...bills]); 
  };
  

  useEffect(() => {
    async function fetchData() {
      try {
        const interestUser = ["2198907", "2199298", "2196654"];
        const data = { bills: interestUser };

        const response = await axios.post(
          "https://kns-data-votes.onrender.com/api/data_bills/by_id",
          data
        );
        const bills = response.data;
        setInterests(bills);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div dir="rtl" className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 p-2">
        הצעות חוק שאולי יעניינו אותך
      </h1>
      {interests.length > 0 ? (
        <div className="w-full">
          {interests.map((interest) => (
            <div key={interest.id} className="p-4 border rounded-lg mb-4">
              <h2 className="text-lg font-semibold mb-2">
                {interest.name || interest.Name}
              </h2>
              <p className="text-gray-600 mb-2">
                {" "}
                {interest.total_vote} אנשים הצביעו כבר{" "}
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
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default InterestingBills;
