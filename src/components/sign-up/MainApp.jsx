import React, { useState } from "react";
import useUserDetails from "../../../atoms/atomUser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const MainApp = () => {
  const [userDetails, setUserDetails] = useUserDetails();
  const [currentStep, setCurrentStep] = useState(1);

  const navigatLogin = useNavigate()


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
  const steps = [
    {
      component: "Party",
      title: "לאיזו מפלגה אתה משתייך?",
      choices: [
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
      ],
    },
    {
      component: "Identity",
      title: "בחר את הזהות שלך",
      choices: [
        "חרדי",
        "דתי לאומי",
        "מסורתי",
        "חילוני",
        "ערבי",
        "דרוזי",
        "אחר",
      ],
    },
    {
      component: "gender",
      title: "בחר את המגדר שלך",
      choices: ["אחר", "נקבה", "זכר"],
    },
  ];

  const updateUserDetailsAndSubmit = async (choice, step) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/users/signupUser",
        { ...userDetails, gender: choice }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleChoice = async (choice, step) => {
    if (step === "Party") {
      setUserDetails({
        ...userDetails,
        [step.toLowerCase()]: parties[steps[0].choices.indexOf(choice)],
      });
      setCurrentStep(2);
    } else if (step === "Identity") {
      setUserDetails({ ...userDetails, [step.toLowerCase()]: choice });
      setCurrentStep(3);
    } else if (step === "gender") {
      await updateUserDetailsAndSubmit(choice, step);
      navigatLogin("/login")
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-no-repeat bg-fixed flex items-center justify-center"
      style={{
        backgroundImage: 'url("https://www.idi.org.il/media/9162/knesset.jpg")',
      }}
    >
      <div className="text-center text-white">
        <h1 className="text-3xl font-bold mb-8">
          {steps[currentStep - 1].title}
        </h1>
        <div className="flex justify-center gap-4">
          {steps[currentStep - 1].choices.map((choice, index) => (
            <button
              key={index}
              className="px-20 py-10 bg-blue-500 text-white rounded cursor-pointer"
              onClick={() =>
                handleChoice(choice, steps[currentStep - 1].component)
              }
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainApp;
