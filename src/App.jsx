import { useEffect, useState } from "react";

import axios from "axios";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import useBills from "../atoms/atomBills.js";
// test
import dbTest from "../db/dbTest.js";

// components
import LoginPage from "./components/connctWebPages/loginPage.jsx";
import BillsFeed from "./components/biilsShow/BillsFeed.jsx";

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
  const [bills, setBills] = useBills();
  setBills(dbTest);

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
        <Route index element={<LoginPage />} />
        <Route path="billsFeed" element={<BillsFeed />} />
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
