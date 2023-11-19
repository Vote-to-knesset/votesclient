import React from 'react';

class GenderChoice extends React.Component {
  constructor() {
    super();
    this.handleGenderChoice = this.handleGenderChoice.bind(this);
  }

  handleGenderChoice(gender) {
    this.props.onViewChange('identity');
  }

  render() {

    const genders = [ "אחר", "נקבה", "זכר"];

    return (
      <div
        className="h-screen bg-cover bg-no-repeat bg-fixed flex items-center justify-center"
        style={{ backgroundImage: 'url("https://www.idi.org.il/media/9162/knesset.jpg")' }}
      >
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-8">בחר את המגדר שלך</h1>
          <div className="flex justify-center gap-4">
            {genders.map((gender, index) => (
              <button
                key={index}
                className="px-20 py-10 bg-blue-500 text-white rounded cursor-pointer"
                onClick={() => this.handleGenderChoice(gender)}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default GenderChoice;
