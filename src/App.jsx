import { useEffect, useState } from "react";

import axios from "axios";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { useBills, useSelectedBills } from "../atoms/atomBills.js";
import dbTest from "../db/dbTest.js";
import LoginPage from "./components/connctWebPages/loginPage.jsx";
import BillsFeed from "./components/biilsShow/BillsFeed.jsx";
import MainApp from "./components/sign-up/MainApp.jsx";

async function getBills() {
  try {
    const response = await axios.get(
      "https://kns-data-votes.onrender.com/api/data_bills"
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
        "http://localhost:5050/votes/selectedBills",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
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

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [bills, setBills] = useBills();
  const [selecteBills, setSelecteBills] = useSelectedBills();

  useEffect(() => {
    const fetchSelectedBills = async () => {
      const data = await getSelectedBills();

      setSelecteBills(data);
    };

    fetchSelectedBills();
  }, []);

  useEffect(() => {
    const fetchBills = async () => {
      const data = await getBills();
      let sortedBills = [];
      let selectedBills = []
      let unselectedBills = []

      if (selecteBills.length > 0) {
        const selectedSet = new Set(selecteBills);
        data.map((bill)=>{
          if (selectedSet.has(bill.BillID)){
            
            selectedBills.push(bill)
          }
          else{
            
            unselectedBills.push(bill)
          }
          

        })
        sortedBills = [...unselectedBills, ...selectedBills];


      } else {
        sortedBills = [];
      }
      setBills(sortedBills)

    };

    fetchBills();
  }, [selecteBills]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="billsFeed" element={<BillsFeed />} />
        <Route path="choice" element={<MainApp />} />
      </Route>
    )
  );
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
