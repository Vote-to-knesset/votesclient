import React, { useState, useEffect } from "react";
import { useLawsBills } from "../../../atoms/atomBills";
import Chart from "chart.js/auto";
import Header from "./Header";

const partyNamesShort = {
  "סיעת הליכוד ": "הליכוד",
  "סיעת יהדות התורה": "יהדות התורה",
  'סיעת התאחדות הספרדים שומרי תורה תנועתו של מרן הרב עובדיה יוסף זצ"ל': "שס",
  'סיעת רע"ם': "רעם",
  "סיעת יש עתיד": "יש עתיד",
  'סיעת חד"ש-תע"ל': "חדש תעל",
  "סיעת נעם - בראשות אבי מעוז": "נעם",
  "סיעת ישראל ביתנו": "ישראל ביתנו",
  "סיעת המחנה הממלכתי ": "המחנה הממלכתי",
  "סיעת הציונות הדתית בראשות בצלאל סמוטריץ'": "ציונות דתית",
  "סיעת עוצמה יהודית בראשות איתמר בן גביר": "עוצמה יהודית",
};

const VoteDetails = () => {
  const [voteDataArray] = useLawsBills();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [chartInstances, setChartInstances] = useState([]);
  

  const handleToggle = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  useEffect(() => {
    chartInstances.forEach((chart) => chart.destroy());
    setChartInstances([]);

    voteDataArray.forEach((voteData, index) => {
      if (expandedIndex === index) {
        const partyVotes = {};

        voteData.VoteDetails.forEach((detail) => {
          const party = detail.FactionName;
          const voteType = detail.Title;

          if (!partyVotes[party]) {
            partyVotes[party] = {
              בעד: 0,
              נגד: 0,
              totalVotes: 0,
              namesInFavor: [],
              namesAgainst: [],
            };
          }

          if (voteType === "בעד") {
            partyVotes[party]["בעד"]++;
            partyVotes[party].namesInFavor.push(detail.MkName);
          } else if (voteType === "נגד") {
            partyVotes[party]["נגד"]++;
            partyVotes[party].namesAgainst.push(detail.MkName);
          }

          partyVotes[party].totalVotes++;
        });

        const partyNames = Object.keys(partyVotes);

        const totalVotesArray = partyNames.map(
          (party) => partyVotes[party].totalVotes
        );
        totalVotesArray.sort((a, b) => a - b);

        const maxTotalVotes = totalVotesArray[totalVotesArray.length - 1];

        const newPartyNames = []


        partyNames.forEach((party)=>{
          const key = Object.keys(partyNamesShort).find(
            (key) => key === party
          );
        
          if (key) {
            newPartyNames.push(partyNamesShort[key])
          }
          else{
            newPartyNames.push(key)
          }
        })
        

        const datasetData = partyNames.map((party) => {
          const shortPartyName = partyNamesShort[party] || party;

          return {
            label: shortPartyName,
            data: [partyVotes[party]["בעד"], partyVotes[party]["נגד"]],
            backgroundColor: ["rgba(0, 255, 0, 0.6)", "rgba(255, 0, 0, 0.6)"],
            hoverBackgroundColor: ["rgba(0, 255, 0, 1)", "rgba(255, 0, 0, 1)"],
            namesInFavor: partyVotes[party].namesInFavor,
            namesAgainst: partyVotes[party].namesAgainst,
            totalVotes: partyVotes[party].totalVotes,
          };
        });

        const ctx = document.getElementById(`factionChart-${index}`);
        const newChartInstance = new Chart(ctx, {
          type: "bar",
          data: {
            labels: newPartyNames,
            datasets: [
              {
                data: datasetData.map((data) => data.data[0]),
                backgroundColor: datasetData.map(
                  (data) => data.backgroundColor[0]
                ),
                hoverBackgroundColor: datasetData.map(
                  (data) => data.hoverBackgroundColor[0]
                ),
                label: "בעד ",
              },
              {
                data: datasetData.map((data) => data.data[1]),
                backgroundColor: datasetData.map(
                  (data) => data.backgroundColor[1]
                ),
                hoverBackgroundColor: datasetData.map(
                  (data) => data.hoverBackgroundColor[1]
                ),
                label: "נגד ",
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                max: maxTotalVotes,
                ticks: {
                  stepSize: Math.ceil(1),
                },
                title: {
                  display: true,
                  text: "",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "",
                },
                ticks: {
                  autoSkip: false,
                  // maxRotation: 90,
                  // minRotation: 90,
                },
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const namesInFavor =
                      datasetData[context.dataIndex].namesInFavor.join(", ");
                    const namesAgainst =
                      datasetData[context.dataIndex].namesAgainst.join(", ");
                    return `בעד: (${namesInFavor}) | נגד: (${namesAgainst})`;
                  },
                },
              },
            },
          },
        });

        setChartInstances((prevInstances) => [
          ...prevInstances,
          newChartInstance,
        ]);
      }
    });
  }, [voteDataArray, expandedIndex]);

  return (
    < >
    <h2 dir="rtl">חוקים שהצבעת עליהם :</h2>
      {voteDataArray.map((voteData, dataIndex) => (
        <div className="overflow-scroll">
          <div
            dir="rtl"
            key={dataIndex}
            className="bg-white shadow-md rounded my-4 p-2"
          >
            <div className="p-4" onClick={() => handleToggle(dataIndex)}>
              <h2 className="text-xl font-bold mb-2">{voteData.ItemTitle}</h2>
              <p className="text-sm mb-4">{voteData.Decision}</p>
              <p>ההצבעה שלך :{voteData.userVote}</p>

              {expandedIndex === dataIndex && (
                <div className="flex flex-wrap justify-between mb-4">
                  {voteData.VoteCounters.map((counter, index) => (
                    <div key={index} className="w-1/2 sm:w-auto mb-2">
                      <span
                        className="inline-block w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: counter.ColorName }}
                      ></span>
                      <span>
                        {counter.Title}: {counter.countOfResult}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {expandedIndex === dataIndex && (
              <div className="border-t border-gray-300 pt-4">
                <h3 className="text-lg font-bold mb-2">פרטי ההצבעה :</h3>
                <p className="mt-4">סוג ההצבעה : {voteData.VoteType}</p>
                <p className="mt-2">
                  תאריך ההצעה :{" "}
                  {new Date(voteData.VoteDate).toLocaleDateString()}
                </p>
                <p className="mt-2"> סטטוס : {voteData.AcceptedText}</p>
                <canvas
                  id={`factionChart-${dataIndex}`}
                  width="400"
                  height="200"
                ></canvas>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default VoteDetails;
