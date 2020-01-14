import React, { Component } from "react";
import Toggle from "../components/toggle";
import Heading from "../components/heading";
import IconMeeple from "../assets/meeple";
import options from "../data/options";
import { css } from "@emotion/core"

const canvas = 226;
const player = 46;
const durationPositionSet = ".2s"

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeView: "colour",
      pool: options.map(v => ({ ...v, selected: false })),
      numberOfPlayers: 0
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  render() {
    const { activeView, pool, numberOfPlayers } = this.state;
    const cssContainer = css`
      margin: 0 auto;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `;
    const cssOptions = css`
      position: relative;
      width: ${canvas}px;
      height: ${canvas}px;
      margin: 0 auto;
    `;

    console.log(pool);
    console.log(numberOfPlayers);

    return (
      <div css={cssContainer}>
        <Heading activeView={activeView} />
        <ul css={cssOptions}>
          {pool.map((colour, i) => {
            const angle = 360 / pool.length;
            const offset = 90; // Make the first item at the top of the circle
            const invertedMeeple = colour.name === "white" || colour.name === "yellow";
            const selectedBoxShadow = (colour.selected || numberOfPlayers === i + 2) && `inset 0 0 0 2px rgba(${
              invertedMeeple ? "0,0,0,.2" : "255,255,255,.3"
            })`;
            const cssOption = css`
              position: absolute;
              top: 50%;
              left: 50%;
              animation: ${(colour.selected || numberOfPlayers === i + 2) ? "pop" : "popBack"} .2s ease-in-out 1;
              animation-fill-mode: forwards;
              
              .optionWrapper {
                width: ${player}px;
                height: ${player}px;
                margin: -${player / 2}px;
                cursor: pointer;
                transition: all ${durationPositionSet} ease-in-out;
                background: ${activeView === "colour" ? colour.hex : "#444"};
                border-radius: ${player * .5}px;
                transform: rotate(${angle * i - offset}deg) translate(${canvas / 2}px);
                box-shadow: ${selectedBoxShadow};

                &:after {
                  position: absolute;
                  left: 0;
                  top: 0;
                  content: "${i + 2}";
                  opacity: ${activeView === "colour" ? 0 : 1};
                  display: block;
                  width: ${player}px;
                  height: ${player}px;
                  line-height: ${player + 3}px;
                  transition: opacity ${durationPositionSet} ease-in-out;
                  transform: rotate(-${angle * i + (360 - offset)}deg);
                }
              }

              .optionMeepleWrapper {
                display: flex;
                align-items: center;
                justify-content: center;
                width: ${player}px;
                height: ${player}px;
                
                svg {
                  width: 20px;
                  fill: ${invertedMeeple ? "black" : "white"};
                  opacity: ${colour.selected ? invertedMeeple ? .2 : .3 : 0};
                  transform: rotate(-${angle * i + (360 - offset)}deg);
                }
              }

              @keyframes pop {
                50% {
                  transform: scale(1.2);
                }
                100% {
                  transform: scale(1.1);
                }
              }
              @keyframes popBack {
                0% {
                  transform: scale(1.1);
                }
                100% {
                  transform: scale(1);
                }
              }
            `;

            return (
              <li
                key={`option-${i + 1}`}
                onClick={() => this.handleSelect(i)}
                css={cssOption}
              >
                <div className="optionWrapper">
                  {activeView === "colour" && <div className="optionMeepleWrapper"><IconMeeple /></div>}
                </div>
              </li>
            );
          })}
        </ul>
        <Toggle activeView={activeView} toggleView={this.handleToggle} />
      </div>
    );
  }

  handleToggle() {
    const { activeView, pool } = this.state;

    this.setState({
      activeView: activeView === "colour" ? "number" : "colour",
      pool: pool.map(v => ({ ...v, selected: false })),
      numberOfPlayers: 0
    });
  }

  handleSelect(i) {
    const { activeView, pool } = this.state;

    if (activeView === "colour") {
      pool[i].selected = !pool[i].selected;
      this.setState({ pool });
    } else {
      this.setState({
        numberOfPlayers: i + 2
      });
    }
  }
}

export default Index;