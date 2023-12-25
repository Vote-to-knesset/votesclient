import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { useStatistic } from "../../../atoms/atomBills.js";
import axios from "axios";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import Header from "./Header.jsx";

const partyNames = [
  "Likud",
  "YeshAtidNationalUnity",
  "OtzmaYehudit",
  "Mafdal_ReligiousZionism",
  "Shas",
  "UnitedTorahJudaism",
  "YisraelBeiteinu",
  "UnitedArabList",
  "Hadash_Taal",
  "LaborParty",
];

const partyN = [
  "הליכוד",
  "יש עתיד",
  "הציונות הדתית",
  "המחנה הממלכתי",
  "שס",
  "יהדות התורה",
  "ישראל ביתנו",
  "רעמ",
  "הרשימה המשותפת",
  "העבודה",
];

export default function BillStatistic() {
    const location = useLocation();
    const { search } = location;
    const queryParams = qs.parse(search);
    const billId = queryParams.billId;



  const [statistic, setStatistic] = useStatistic();
  const [partyVotes, setPartyVotes] = useState([]);

  useEffect(() => {

    setStatistic({ BillID: billId });
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://kns-data-votes.onrender.com/api/data_parties?BillID=${billId}`
        );
        console.log("Data received:", response.data);
        setPartyVotes(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [billId]);

  // Generate pie chart data for each party
  const pieCharts = partyNames.map((partyName, index) => {
    const forVotes = (partyVotes[0] && partyVotes[0][`${partyName}_For`]) || 0;
    const againstVotes =
      (partyVotes[0] && partyVotes[0][`${partyName}_Against`]) || 0;
if(forVotes > 0 || againstVotes >0){
    const data = [
      {
        id: "בעד ",
        label: "In-favor",
        value: forVotes,
      },
      {
        id: "נגד",
        label: "Againts",
        value: againstVotes,
     },
    ];

    return (
      <div>
     
      <div
        key={index}
        className="chart-container"
        style={{ height: "350px", width: "350px", marginBottom: "20px", textAlign: "center"}}
      >
        <div className="chart-title" style={{ fontSize: "18px", marginBottom: "10px" ,marginTop: "40px"}}>{partyN[index]}</div>
        <ResponsivePie
          data={data}
          margin={{ top: 10, right: 40, bottom: 40, left: 40 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          arcLabelsTextColor={"white"}
          activeOuterRadiusOffset={8}
          colors={["rgb(102, 187, 106)", "rgb(239, 83, 80)"]}
          borderWidth={2}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          enableArcLinkLabels={false}
        />
      </div>
      </div>
    )};
  });

  return (
    <div> <Header/>
    <div
      className="chart-wrapper bg-gray-100"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {pieCharts}
    </div>
    </div>
  );
}