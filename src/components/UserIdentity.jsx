
import React, { Component } from 'react';


class UserIdentity extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        selectedOption: null
      };
    }
  
    handleOptionChange = (event) => {
      this.setState({
        selectedOption: event.target.value
      });
    }
  
    render() {
      const { options } = this.props;
      const { selectedOption } = this.state;
  
      return (
        <div className="p-4 border rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Select an option:</h2>
          {options.map((option) => (
            <div key={option.value} className="mb-2">
              <input
                type="radio"
                id={option.value}
                value={option.value}
                checked={selectedOption === option.value}
                onChange={this.handleOptionChange}
                className="mr-2"
              />
              <label htmlFor={option.value} className="text-sm">{option.label}</label>
            </div>
          ))}
        </div>
      );
    }
  }
  
  export default UserIdentity;
  