import React, { Component } from "react";
import Heading from "../components/heading";
import SelectPlayers from "../components/select-players";
import ShowWinner from "../components/show-winner";
import Toggle from "../components/toggle";
import options from "../data/options";
import { css } from "@emotion/core"

const canvasSize = 226;
const cssContainer = css`
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const cssLayoutTop = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;
const cssLayoutMiddle = css`
  height: ${canvasSize}px;
`;
const cssLayoutBottom = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;
const cssCalculateButton = css`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  margin: -50px;
  background: rgba(255,255,255,.1);
  border-radius: 50%;
  font-size: 22px;
  cursor: pointer;
  font-weight: normal;
`;
const cssErrorMessage = css`
  color: #e71f0f;
  font-size: 13px;
  text-transform: none;
  height: 30px;
  margin-bottom: 10px;
  font-weight: normal;
`;

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeView: "colour",
      pool: options.map(v => ({ ...v, selected: false })),
      winner: "",
      error: false
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleSelectPlayer = this.handleSelectPlayer.bind(this);
    this.handleGetWinner = this.handleGetWinner.bind(this);
    this.handleResetView = this.handleResetView.bind(this);
  }

  render() {
    const { activeView, pool, winner,error } = this.state;

    let errorMessage;
    if (error) {
      errorMessage = 
        activeView === "colour" ? "You must select at least two colours" : "Select the total no. of people playing";
    }

    console.log(winner);

    const cssSelectPlayers = css`
      display: ${winner ? "none" : "block"}
    `;
    const cssShowWinner = css`
      display: ${winner ? "block" : "none"}
    `;

    return (
      <div css={cssContainer}>
        <div css={cssLayoutTop}>
          <Heading activeView={activeView} />
        </div>
        <div css={cssLayoutMiddle}>
          <div css={cssSelectPlayers}>
            <SelectPlayers 
              activeView={activeView} 
              pool={pool} 
              selectFunc={this.handleSelectPlayer}
              canvasSize={canvasSize}
            />
            <button css={cssCalculateButton} onClick={this.handleGetWinner}>GO</button>
          </div>
          <div css={cssShowWinner}>
            <ShowWinner activeView={activeView} winner={winner} canvasSize={canvasSize} />
          </div>
        </div>
        <div css={cssLayoutBottom}>
          <div css={cssErrorMessage}>{errorMessage}</div>
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

  handleSelectPlayer(i) {
    const { activeView, pool } = this.state;

    this.setState({ error: false });

    if (activeView === "colour") {
      pool[i].selected = !pool[i].selected;
      this.setState({ pool });
    } else {
      pool.forEach(player => player.selected = false);
      for (let j = 0; j <= i; j++) {
        pool[j].selected = true;
      }
    }
  }

  handleGetWinner() {
    const { activeView, pool } = this.state;
    const poolToChoose = pool.filter(player => player.selected);

    if (poolToChoose.length > 1) {
      const winner = Math.floor(Math.random() * poolToChoose.length);

      this.setState({ 
        winner: activeView === "colour" ? {
          name: poolToChoose[winner].name,
          hex: poolToChoose[winner].hex
        } : winner + 1
      });
    } else {
      this.setState({ error: true });
    }
  }

  handleResetView() {
    const { pool } = this.state;

    this.setState({
      pool: pool.map(v => ({ ...v, selected: false })),
      winner: "",
      error: false
    });
  }
}

export default Index;