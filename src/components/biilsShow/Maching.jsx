import React from "react";

import { useLawsBills } from "../../../atoms/atomBills";

const Maching = () => {
  const [voteDataArray] = useLawsBills();

  const partisNames = {
    'סיעת התאחדות הספרדים שומרי תורה תנועתו של מרן הרב עובדיה יוסף זצ"ל': 'ש"ס',
    "סיעת הליכוד ": "הליכוד",
    "סיעת המחנה הממלכתי ": "המחנה הממלכתי",
    "סיעת יהדות התורה": "יהדות התורה",
    "סיעת יש עתיד": "יש עתיד",
    "סיעת עוצמה יהודית בראשות איתמר בן גביר": "עוצמה יהודית",
    'סיעת רע"ם': 'רע"מ',
    'סיעת חד"ש-תע"ל': 'חד"ש-תע"ל',
    "סיעת הציונות הדתית בראשות בצלאל סמוטריץ'": "הציונות הדתית",
    "סיעת ישראל ביתנו": "ישראל ביתנו",
    "סיעת העבודה": "העבודה",
  };
  const PartiesDict = {
    'ש"ס': [0, 0],
    הליכוד: [0, 0],
    "המחנה הממלכתי": [0, 0],
    "יהדות התורה": [0, 0],
    "יש עתיד": [0, 0],
    "עוצמה יהודית": [0, 0],
    'רע"מ': [0, 0],
    'חד"ש-תע"ל': [0, 0],
    "הציונות הדתית": [0, 0],
    "ישראל ביתנו": [0, 0],
    העבודה: [0, 0],
  };

  // Process the vote data
  voteDataArray.forEach((voteObj) => {
    let partyVotesCount = {};

    voteObj.VoteDetails.forEach((vote) => {
      if (partisNames[vote.FactionName]) {
        let partyShortName = partisNames[vote.FactionName];
        partyVotesCount[partyShortName] = partyVotesCount[partyShortName] || {
          בעד: 0,
          נגד: 0,
        };
        partyVotesCount[partyShortName][vote.Title]++;
      }
    });

    Object.keys(partyVotesCount).forEach((party) => {
      let majorityVote =
        partyVotesCount[party]["בעד"] > partyVotesCount[party]["נגד"]
          ? "בעד"
          : "נגד";
      if (majorityVote === voteObj.userVote) {
        PartiesDict[party][0]++;
      } else {
        PartiesDict[party][1]++;
      }
    });
  });

  // Calculate match percentages
  const calculateMatchPercentages = () => {
    let percentages = {};
    for (let party in PartiesDict) {
      let [votesLike, votesUnlike] = PartiesDict[party];
      let totalVotes = votesLike + votesUnlike;
      percentages[party] = totalVotes ? (votesLike / totalVotes) * 100 : 0;
    }
    return percentages;
  };

  const matchPercentages = calculateMatchPercentages();
  const sortedParties = Object.keys(matchPercentages).sort(
    (a, b) => matchPercentages[b] - matchPercentages[a]
  );
  const getMaxMatchPercentage = () => {
    let maxPercentage = 0;
  
    for (let party in matchPercentages) {
      if (matchPercentages[party] > maxPercentage) {
        maxPercentage = matchPercentages[party];
      }
    }
  
    return maxPercentage;
  };
  
  const maxMatchPercentage = getMaxMatchPercentage();


    const getBarColor = (percentage) => {
        if (percentage >= 50 ) {
          return `linear-gradient(to left, #00cc00, #33cc33)`;
        } else {
          return `linear-gradient(to left, #ff3333, #ff6666)`;
        }
      };
    
      return (
        <>
          <div dir="rtl" className=" md:fixed bg-white shadow-md rounded mb-2 my-4 p-2 ">
            <div className="max-w-4xl mx-auto p-2 text-center ">
              <h2 className="text-2xl mb-2">אחוז ההתאמה שלך למפלגות:</h2>
              <div className="grid grid-cols-1  gap-4">
                {sortedParties.map((party) => (
                  <div
                    key={party}
                    className="bg-white shadow-md rounded-md  flex items-center"
                  >
                    <div className="w-full flex flex-row h-8">
                      <div className="text-xs font-bold w-20 ">{party}</div>
                      <div className="relative w-full bg-gray-200 h-4 rounded-full">
                        <div
                          className="absolute top-0 right-0 h-full rounded-full"
                          style={{
                            width: `${matchPercentages[party].toFixed(2)}%`,
                            background: getBarColor(matchPercentages[party]),
                          }}
                        ></div>
                        <div className="absolute top-0 right-0 h-full flex items-center pr-2">
                          {`${matchPercentages[party].toFixed(2)}%`}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      );
    };
    
    export default Maching;