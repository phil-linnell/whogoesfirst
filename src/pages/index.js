import React, { Component } from "react";
import Helmet from "react-helmet";
import Heading from "../components/heading";
import SelectPlayers from "../components/select-players";
import Toggle from "../components/toggle";
import options from "../data/options";
import faviconICO from "../../static/icon.ico";
import faviconPNG from "../../static/icon-32.png";
import faviconPNG128 from "../../static/icon-128.png";
import "./index.css";
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
  font-weight: 700;
  color: #fff;
`;
const cssErrorMessage = css`
  color: #e71f0f;
  font-size: 14px;
  text-transform: none;
  height: 30px;
  margin-bottom: 10px;
`;
const cssActionButton = css`
  display: block;
  color: #fff;
  background: rgba(255,255,255,.1);
  border-radius: 20px;
  height: 40px;
  min-width: 60px;
  padding: 0 20px;
  margin: 0 auto;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
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

    return (
      <div css={cssContainer}>
        <Helmet>
          <title>Start Player App</title>
          <meta name="description" content="App to choose the starting player of a game" />
          <link rel="icon" type="image/png" sizes="128x128" href={faviconPNG128} />
          <link rel="icon" type="image/png" sizes="32x32" href={faviconPNG} />
          <link rel="shortcut icon" href={faviconICO} />
          <meta name="viewport" content="width=device-width" />
        </Helmet>
        <div css={cssLayoutTop}>
          <Heading activeView={activeView} winner={winner} />
        </div>
        <div css={cssLayoutMiddle}>
          <SelectPlayers 
            activeView={activeView} 
            pool={pool} 
            selectFunc={this.handleSelectPlayer}
            canvasSize={canvasSize}
            winner={winner}
          />
          {!winner && <button css={cssCalculateButton} onClick={this.handleGetWinner}>GO</button>}
        </div>
        <div css={cssLayoutBottom}>
          <div css={cssErrorMessage}>{errorMessage}</div>
          {winner ? (
            <button onClick={() => this.handleResetView()} css={cssActionButton}>Reset</button>
          ) : (
            <Toggle activeView={activeView} toggleView={this.handleToggle} />
          )}
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