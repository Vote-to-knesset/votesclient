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
  const identity = [
    "Ultra-Orthodox",
    "National Religious",
    "Traditional",
    "Secular",
    "Arab",
    "Druze",
    "Other",
  ];

  const gender = ["Other", "Female", "Male"];

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
      console.log({ ...userDetails, gender: choice });
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
      setUserDetails({
        ...userDetails,
        [step.toLowerCase()]: identity[steps[1].choices.indexOf(choice)],
      });
      setCurrentStep(3);
    } else if (step === "gender") {
      await updateUserDetailsAndSubmit(
        gender[steps[2].choices.indexOf(choice)],
        step
      );
      navigatLogin("/login")
    }
  };

  return (
    <div dir="rtl"
      className="h-screen bg-cover bg-no-repeat bg-fixed flex items-center justify-center bg-gray-100"
     
    >
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-8 ">
          {steps[currentStep - 1].title}
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {steps[currentStep - 1].choices.map((choice, index) => (
            <button
              key={index}
              className="px-20 py-10 bg-blue-300 text-white rounded cursor-pointer"
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

export default MainApp;




 