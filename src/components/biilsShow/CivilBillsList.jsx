import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';

const CivilBillsList = () => {
  const [civilBills, setCivilBills] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    summery: '',
  });

  const { name, summery } = formData;

  useEffect(() => {
    const fetchCivilBills = async () => {
      const token = localStorage.getItem('tokenVote');
      try {
        const response = await axios.get('https://sever-users-node-js.vercel.app/votes/getcivilbills', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCivilBills(response.data.data);
      } catch (error) {
        console.error('Error fetching civil bills:', error);
      }
    };

    fetchCivilBills();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedDate = currentDate.toString();
    const updatedFormData = { ...formData, date: formattedDate };

    try {
      const token = localStorage.getItem('tokenVote');
      const response = await axios.post(
        'https://sever-users-node-js.vercel.app/votes/setcivilbills',
        updatedFormData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFormData({ name: '', summery: '' });
    } catch (error) {
      console.error('Error creating civil bill:', error);
    }
  };
  
  const handleVoteClickFor = (bill, voteType) => {
    // Handle vote for
    // Implementation as per your requirements
  };

  const handleVoteClickAgainst = (bill, voteType) => {
    // Handle vote against
    // Implementation as per your requirements
  };

  return (
    <div>
      <Header />

      <div className="flex flex-col  md:flex-row justify-center items-center h-full  bg-gray-200">
        <div className="w-full md:w-3/5 flex flex-col justify-center items-start ">
          <div
            dir="rtl"
            className="bill-feed md:mr-2 mt-2 overflow-y-auto p-4 h-[650px]"
          >
           
        <div className="md:col-span-1">
          <h1 className="text-3xl font-bold mb-4">הצעות חוק אזרחיות</h1>
          <ul className="max-w-3xl mx-auto mt-8 grid grid-cols-1 gap-8">
            {civilBills.map((bill) => (
              <li key={bill.BillID} className="bg-white rounded-lg shadow-md p-6 pb-2 mb-8">
                <h3 className="text-xl font-semibold mb-2">
                  הצעת חוק : {bill.name || bill.Name}
                </h3>
                {bill.summery && <p className="mb-2">{bill.summery}</p>}
                {bill.parson && (
                  <div>
                    <h5 className="text-lg font-semibold mb-2">
                      מציע החוק: {bill.parson}{' '}
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
                    {bill.date}
                  </p>
                </div>

                <div className="flex  items-center mt-4">
                  <button
                    onClick={() => handleVoteClickFor(bill, "in_favor")}
                    className="bg-green-400 hover:bg-green-600 text-white w-full h-14 rounded-md m-2 transition duration-300 ease-in-out"
                  >
                    בעד
                  </button>
                  <button
                    onClick={() => handleVoteClickAgainst(bill, "against")}
                    className="bg-red-400 hover:bg-red-600 text-white w-full  h-14 rounded-md m-2 transition duration-300 ease-in-out"
                  >
                    נגד
                  </button>
                </div>

                <p>סך כל ההצבעות : {bill.votesInFavor.length + bill.votesAgainst.length}</p>
              </li>
            ))}
          </ul>
        </div>
          </div>
        </div>
        <div dir='rtl' className=" hidden lg:block p-2 md:w-2/6 overflow-y-auto bg-white rounded-lg shadow-md border border-gray-300 ml-4 md:mt-8">
        <form onSubmit={handleSubmit} className="mb-8">
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="שם ההצעת חוק"
              className="border border-gray-400 rounded-md p-2 mb-2 mr-2 w-full"
            />
            <input
              type="text"
              name="summery"
              value={summery}
              onChange={handleChange}
              placeholder="סכם את הצעת החוק"
              className="border border-gray-400 rounded-md p-2 mb-2 mr-2 w-full"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              פרסם
            </button>
          </form>
         
        </div>
      </div>
      <footer className="bg-gray-200 text-center p-4 mt-auto">
        &copy; {new Date().getFullYear()}. All rights reserved.
      </footer>
    </div>
  );
}




export default CivilBillsList;
