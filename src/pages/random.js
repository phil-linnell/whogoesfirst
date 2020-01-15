import React, { Component } from "react";

const randomOptions = [
  "The Last person to eat a KFC",
  "The Person with the best Chewbacca impression",
  "The Person wearing the brightest coloured socks",
  "The Person with the most tattoos",
  "The Last person to have eaten a burrito",
  "The Last person to sit down",
  "The Last person to share a snack",
  "The First person to grab the first player marker",
  "The Person wearing the fewest items of clothing",
  "The Person who woke the earliest today",
  "The Last person to have a full English",
  "The First person to suggest the soundtrack to the game",
  "The First person to say they’ll go last",
  "The Last person to make a wager",
  "Whoever has travelled the furthest distance",
  "The Last person to send an item of mail",
  "Whoever provided the drinks",
  "The Last person to have left the country",
  "The Person with the oldest phone",
  "The Person with the most cracked phone screen",
  "The Last person to enjoy a wee dram of Whisky",
  "The Last person to watch a Marvel film",
  "The Craziest fake laugh",
  "The person with the best Ving Rhames impression",
  "The Last person to play a non - boardgame game",
  "The First person to say a five - letter word starting with ‘D’",
  "The Last person to compliment someone",
  "The First person to clap three times",
  "The Last person to quit something",
  "The Last person to pet an animal",
  "The Last person to build an item of Ikea furniture",
  "The Last person to play with Lego",
  "The First person to sign something as ‘Reiner Knizia’",
  "The First person to blow a kiss at someone at the table",
  "The First person to name the capital city of Canada",
  "The Last person to pay for dinner",
  "The First person to name a recent football result",
  "The First person to explain the plot of Jurassic Park in under 10 words",
  "The First person to correctly answer who Taylor Swift is currently dating",
  "The last person to do a rules explanation before this game",
  "The Last person to play a game published before 2010",
  "The Last person to have been on a ferry",
  "The Last person to write a list",
  "The Last person to have rented a film or TV show",
  "The Last person to receive a Kickstarter",
  "The Last person to have ‘tried a new look’",
  "The Last person to see a live show",
  "The first person to name three H P Lovecraft stories",
  "The first person to quote from The Rise of Skywalker",
  "The person with the best William Riker impression",
  "The person with the best Emperor Palpatine impression",
  "Whoever downs their drink quickest",
  "The first person to name three games designed by Bruno Cathala"
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