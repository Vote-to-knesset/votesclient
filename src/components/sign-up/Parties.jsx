import React from "react";
import useUserDetails from "../../../atoms/atomUser";

function Parties() {
  const [userDetails, setUserDetails] = useUserDetails();

  const handleChoice = (party) => {
    setUserDetails({ ...userDetails, party: party });
    // Assuming onViewChange is a prop passed to this component
    this.props.onViewChange('gender');
  };

  const partiesHebrew = [
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

  const parties = [
    "Likud",
    "YeshAtid",
    "HatsionutHadatit",
    "HamachaneHamamlachti",
    "Shas",
    "YhadutHatora",
    "IsraelBeitenu",
    "Raam",
    "HarshimaHameshutefet",
    "Havoda",
  ];

  return (
    <div
      className="h-screen m-0 p-0 bg-cover bg-no-repeat bg-fixed"
      style={{
        backgroundImage:
          'url("https://www.idi.org.il/media/9162/knesset.jpg")',
      }}
    >
      <div className="flex justify-center">
        <h1 className="text-blue-500 bg-white bg-opacity-80 text-5xl border-4 border-black inline-block">
          לאיזו מפלגה אתה משתייך?
        </h1>
      </div>
      <div className="flex justify-center flex-wrap gap-8 mb-6">
        {parties.map((party, index) => (
          <button
            key={index}
            className={`w-80 h-40 min-w-60 rounded-2xl bg-cover bg-black bg-no-repeat bg-opacity-40 text-center text-white`}
            onClick={() => handleChoice(party)}
          >
            {partiesHebrew[index]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Parties;
