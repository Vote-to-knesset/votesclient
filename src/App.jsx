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
import BillStatistic from "./components/biilsShow/BillStatistic.jsx";
import VoteDetails from "./components/biilsShow/VoteDetails.jsx";
import UserZone from "./components/biilsShow/UserZone.jsx";
import CivilBillsList from "./components/biilsShow/CivilBillsList.jsx";
import BillsNFeed from "./components/biilsShow/BillsNFeed.jsx";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<BillsNFeed />} />
        <Route path="login" element={<LoginEntry />} />
        <Route path="billsFeed">
          <Route index element={<BillsFeed />} />
          <Route path="votedata" element={<UserZone />} />

          <Route path="statistic" element={<BillStatistic />} />
        </Route>
        <Route path="civilbills" element={<CivilBillsList/>}/>
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
