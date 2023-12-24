import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
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

    // Process the vote data
    voteDataArray.forEach(voteObj => {
        let partyVotesCount = {};

        voteObj.VoteDetails.forEach(vote => {
            if (partisNames[vote.FactionName]) {
                let partyShortName = partisNames[vote.FactionName];
                partyVotesCount[partyShortName] = partyVotesCount[partyShortName] || { "בעד": 0, "נגד": 0 };
                partyVotesCount[partyShortName][vote.Title]++;
            }
        });

        Object.keys(partyVotesCount).forEach(party => {
            let majorityVote = partyVotesCount[party]["בעד"] > partyVotesCount[party]["נגד"] ? "בעד" : "נגד";
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
    const sortedParties = Object.keys(matchPercentages).sort((a, b) => matchPercentages[b] - matchPercentages[a]);

    // Chart data
    const chartData = {
        labels: sortedParties,
        datasets: [{
            label: 'Match Percentage',
            data: sortedParties.map(party => matchPercentages[party]),
            backgroundColor: 'skyblue',
            borderColor: 'blue',
            borderWidth: 1
        }]
    };

    // Chart options
    const chartOptions = {
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Match Percentage (%)'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return <Bar data={chartData} options={chartOptions} />;
};

export default Maching;
