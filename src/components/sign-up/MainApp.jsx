import React, { useState } from "react";
import useUserDetails from "../../../atoms/atomUser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const MainApp = () => {
  const [userDetails, setUserDetails] = useUserDetails();
  const [currentStep, setCurrentStep] = useState(1);
  console.log(userDetails);

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

  const gender = [
    "else",
    "woman",
    "man"
  ]
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
      if (userDetails.google){
        console.log(choice);
        setUserDetails({ ...userDetails,  gender: choice })
        const response = await axios.post(
          "https://sever-users-node-js.vercel.app/users/signupWithGoogle",
          userDetails
        );
        console.log(userDetails);
          if (response.status === 200){
            const { token } = response.data;

            localStorage.setItem('tokenVote', token);
            navigatLogin('/billsFeed')
          }
      }
      else{
      const response = await axios.post(
        "https://sever-users-node-js.vercel.app/users/signupUser",
        { ...userDetails, gender: choice }
      );
      }
      console.log(response);
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
    <div dir="rtl" className="min-h-screen bg-cover bg-no-repeat bg-fixed flex items-center justify-center bg-gray-100">
    <div className="text-center text-black">
      <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-8">
        {steps[currentStep - 1].title}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {steps[currentStep - 1].choices.map((choice, index) => (
          <button
            key={index}
            className="w-full sm:px-20 py-4 sm:py-10 bg-blue-500 text-white rounded cursor-pointer"
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




 