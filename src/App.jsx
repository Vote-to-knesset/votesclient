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
import LoginEntry from "./components/connctWebPages/LoginEntry.jsx";
import BillsFeed from "./components/biilsShow/BillsFeed.jsx";
import MainApp from "./components/sign-up/MainApp.jsx";



function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<LoginEntry />} />
        <Route path="login" element={<LoginEntry />} />
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
