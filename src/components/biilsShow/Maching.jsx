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
    'הליכוד': [0, 0],
    "המחנה הממלכתי": [0, 0],
    "יהדות התורה": [0, 0],
    "יש עתיד": [0, 0],
    "עוצמה יהודית": [0, 0],
    'רע"מ': [0, 0],
    'חד"ש-תע"ל': [0, 0],
    "הציונות הדתית": [0, 0],
    "ישראל ביתנו": [0, 0],
    'העבודה': [0, 0],
  };


voteDataArray.forEach(voteObj => {
  let partyVotesCount = {};

  // Count the votes for each party
  voteObj.VoteDetails.forEach(vote => {
      if (partisNames[vote.FactionName]) {
          let partyShortName = partisNames[vote.FactionName];
          partyVotesCount[partyShortName] = partyVotesCount[partyShortName] || { "בעד": 0, "נגד": 0 };
          partyVotesCount[partyShortName][vote.Title]++;
      }
  });

  // Determine majority and update PartiesDict
  Object.keys(partyVotesCount).forEach(party => {
      let majorityVote = partyVotesCount[party]["בעד"] > partyVotesCount[party]["נגד"] ? "בעד" : "נגד";
      if (majorityVote === voteObj.userVote) {
          PartiesDict[party][0] = (PartiesDict[party][0] || 0) + 1;
      } else {
          PartiesDict[party][1] = (PartiesDict[party][1] || 0) + 1;
      }
  });
});

// Adjusting negative counts
let minCount = Math.min(...Object.values(PartiesDict));
if (minCount < 0) {
  Object.keys(PartiesDict).forEach(key => {
      PartiesDict[key] += Math.abs(minCount);
  });
}

console.log("Adjusted Counts:", PartiesDict);




