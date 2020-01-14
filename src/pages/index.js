import React, { Component } from "react";
import Heading from "../components/heading";
import SelectPlayers from "../components/selectPlayers";
import Toggle from "../components/toggle";
import options from "../data/options";
import { css } from "@emotion/core"

const cssContainer = css`
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const cssLayoutTop = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  height: 150px;
`;
const cssLayoutMiddle = css`

`;
const cssLayoutBottom = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  height: 150px;
`;
const cssCalculateButton = css`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90px;
  height: 90px;
  margin: -45px;
  background: rgba(255,255,255,.1);
  border-radius: 50%;
  font-size: 22px;
  cursor: pointer;
  font-weight: normal;
`;
const cssErrorMessage = css`
  opacity: .7;
  color: #e71f0f;
  font-size: 12px;
  text-transform: none;
`;

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeView: "colour",
      pool: options.map(v => ({ ...v, selected: false })),
      numberOfPlayers: 0,
      winner: "",
      errorColour: false,
      errorNumber: false
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
    this.handleResetView = this.handleResetView.bind(this);
  }

  render() {
    const { 
      activeView, 
      pool, 
      numberOfPlayers, 
      winner,
      errorColour,
      errorNumber
    } = this.state;

    console.log(winner);

    return (
      <div css={cssContainer}>
        <div css={cssLayoutTop}>
          <Heading activeView={activeView} />
        </div>
        <div css={cssLayoutMiddle}>
          <SelectPlayers 
            activeView={activeView} 
            pool={pool} 
            numberOfPlayers={numberOfPlayers} 
            selectFunc={this.handleSelect}
          />
          <button css={cssCalculateButton} onClick={this.handleCalculate}>GO</button>
        </div>
        <div css={cssLayoutBottom}>
          <div css={cssErrorMessage}>
            {errorColour && "You must select at least two colours"}
            {errorNumber && "Select the total no. of people playing"}
          </div>
          <Toggle activeView={activeView} toggleView={this.handleToggle} />
        </div>
      </div>
    );
  }

  handleToggle() {
    const { activeView } = this.state;

    this.setState({
      activeView: activeView === "colour" ? "number" : "colour",
    });
    this.handleResetView();
  }

  handleSelect(i) {
    const { activeView, pool } = this.state;

    this.setState({
      errorColour: false,
      errorNumber: false
    });

    if (activeView === "colour") {
      pool[i].selected = !pool[i].selected;
      this.setState({ pool });
    } else {
      this.setState({
        numberOfPlayers: i + 2
      });
    }
  }

  handleCalculate() {
    const { activeView, pool, numberOfPlayers } = this.state;
    const poolToChoose = pool.filter(colour => colour.selected);

    let winner;
    if (activeView === "colour") {
      if (poolToChoose.length > 1) {
        winner = poolToChoose[Math.floor(Math.random() * poolToChoose.length)].name;
      } else {
        this.setState({ errorColour: true });
      }
    } else {
      if (numberOfPlayers > 1) {
        winner = Math.floor(Math.random() * numberOfPlayers) + 1;
      } else {
        this.setState({ errorNumber: true });
      }
    }

    this.setState({ winner });
  }

  handleResetView() {
    const { pool } = this.state;

    this.setState({
      pool: pool.map(v => ({ ...v, selected: false })),
      numberOfPlayers: 0,
      winner: "",
      errorColour: false,
      errorNumber: false
    });
  }
}

export default Index;