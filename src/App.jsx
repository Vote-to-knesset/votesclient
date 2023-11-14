import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Search from "./components/Search";
import BillsFeed from "./components/BillsFeed";

import useBills from '../atoms/atomBills.js'
// test
import dbTest from "../db/dbTest.js";

import axios from "axios";
import Header from "./components/Header";
async function getBills() {
  try {
    const response = await axios.get("http://127.0.0.1:5000/api/data_bills");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [bills,setBills] = useBills()
  setBills(dbTest)

  useEffect(() => {
    const fetchBills = async () => {
      const data = await getBills();
      setBills(data);
    };

    fetchBills();
  }, []);

  
  
  

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="billsFeed" element={<BillsFeed/>} />
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
