import React, { useState } from 'react';
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';
import useUserDetails from '../../../atoms/atomUser.js';
const NotRegisteredModal = ({setShowModal}) => {
//   const [showModal, setShowModal] = useState(true);
const [userDetails, setUserDetails] = useUserDetails();

  const navigateBills = useNavigate()
  const navigateChoice = useNavigate()
  const navigateEntry = useNavigate()
  const userIsRegistered =  false;


  const responseMessage = async (response) => {
    let googleToken = response.credential;
    try {
      const response = await axios.post(
        "https://sever-users-node-js.vercel.app/users/googleLogin",
        {},
        {
          headers: {
            Authorization: googleToken,
          },
        }
      );
      if (response.status === 200) {
        if (response.data.token) {
          const { token } = response.data;

          localStorage.setItem("tokenVote", token);

          navigateBills("/billsFeed");
        } else {
          setUserDetails({
            ...userDetails,
            google: true,
            userName: response.data.userName,
            email: response.data.email,
          });

          navigateChoice("/choice");
        }
      } else {
        console.error("Failed to fetch google accounte");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const errorMessage = (error) => {
    console.log(error);
  };


  const handleShowRegistration =()=>{
    navigateEntry('/login')
  }
  const closeModal = () => {

    setShowModal(false);
  };


  return (
    <>
      
        <div dir='rtl' className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeModal}></div>
            <div className="bg-white rounded-lg p-8 z-10">
              <p className="text-xl mb-4">אופססס אתה לא רשום עדיין</p>
              <p className=' text-sm'>כדי לבצע פעולות המשך עם :</p>
              <div class="flex items-center justify-center  bg-gray-100 mt-6 mb-4">
                      <GoogleLogin
                        onSuccess={responseMessage}
                        onError={errorMessage}
                      />
                       
                    </div>
                    <div className='flex justify-center mt-6'>
                    <p >או</p>
                    </div>
                    <div className=' flex  justify-center items-center mt-6'>
                    
                    <button
                        className=" mt -6 py-2 px-8 bg-blue-500 text-white hover:bg-blue-700 rounded-2xl"
                        onClick={handleShowRegistration}
                      >
                        עבור להרשמה {" "}
                      </button>
                      </div>
              {/* <button
                onClick={closeModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                סגור
              </button> */}
            </div>
          </div>
        </div>
   
    </>
  );
};

export default NotRegisteredModal;
