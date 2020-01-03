import React, { Component } from "react";
import "./index.styl";

const randomOptions = [
  "The last person to eat a KFC",
  "The person with the best Chewbacca impression",
  "The shortest man"
];

class RandomOption extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentOption: Math.floor(Math.random() * randomOptions.length)
    };
  }

  randomise() {
    const { currentOption } = this.state;
    const getNum = Math.floor(Math.random() * randomOptions.length);
    
    if (getNum !== currentOption) {
      this.setState({
        currentOption: getNum
      });
    } else {
      this.randomise();
    }
  }

  render() {
    const { currentOption } = this.state;

    return (
      <div className="getplayer random-option">
        <div className="copy result">The Start Player is...</div>
        <div className="copy result">{randomOptions[currentOption]}</div>
        <div className="copy result">
          <button className="randomise" onClick={() => this.randomise()}>Randomise</button>
        </div>
      </div>
    );
  }
}

export default RandomOption;