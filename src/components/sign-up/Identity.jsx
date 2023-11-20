import React from 'react';
import useUserDetails from "../../../atoms/atomUser";

class IdentityChoice extends React.Component {
  constructor() {
    super();
    this.handleIdentityChoice = this.handleIdentityChoice.bind(this);
  }

 async handleIdentityChoice(identity) {
  const [userDetails, setUserDetails] = useUserDetails();
    setUserDetails({ ...userDetails, identity: identity });
    // You can perform any action when an identity is chosen
    // For now, we'll go back to the home view
    
    try {
      const response = await axios.post(
        "http://localhost:5050/users/signupUser",
        {userDetails}
      );}
      catch (error){
        console.log(error);
      }
    this.props.onViewChange('home');
  }

  render() {

    const identities = ["חרדי", "דתי לאומי", "מסורתי", "חילוני", "ערבי", "דרוזי", "אחר"];

    return (
      <div
        className="h-screen bg-cover bg-no-repeat bg-fixed flex items-center justify-center"
        style={{ backgroundImage: 'url("https://www.idi.org.il/media/9162/knesset.jpg")' }}
      >
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-8">בחר את הזהות שלך</h1>
          <div className="flex justify-center gap-4">
            {identities.map((identity, index) => (
              <button
                key={index}
                className="px-20 py-10 bg-blue-500 text-white rounded cursor-pointer"
                onClick={() => this.handleIdentityChoice(identity)}
              >
                {identity}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default IdentityChoice;
