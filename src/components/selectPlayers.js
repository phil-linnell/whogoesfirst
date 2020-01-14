import React from "react";
import IconMeeple from "../assets/meeple";
import { css } from "@emotion/core"

const SelectPlayers = ({ activeView, pool, numberOfPlayers, selectFunc }) => {
  const canvas = 226;
  const cssOptions = css`
    position: relative;
    width: ${canvas}px;
    height: ${canvas}px;
    margin: 0 auto;
  `;

  if (activeView === "number") {
    pool.unshift({
      name: "one",
      hex: "",
      selected: false
    });
    pool.splice(-1, 1);
  }

  return (
    <ul css={cssOptions}>
      {pool.map((colour, i) => {
        const player = 46;
        const durationPositionSet = ".1s";
        const angle = 360 / pool.length;
        const offset = 90; // Make the first item at the top of the circle
        const selectedOption = colour.selected || numberOfPlayers > i + 1;
        const invertedMeeple = 
          activeView === "colour" && (colour.name === "white" || colour.name === "yellow");
        const selectedBoxShadow = selectedOption && `inset 0 0 0 2px rgba(${
          invertedMeeple ? "0,0,0,.2" : "255,255,255,.3"
        })`;

        const cssOption = css`
          position: absolute;
          top: 50%;
          left: 50%;
          animation: ${selectedOption ? "pop" : "popBack"} .2s ease-in-out 1;
          animation-fill-mode: forwards;
          
          .optionButton {
            width: ${player}px;
            height: ${player}px;
            margin: -${player / 2}px;
            cursor: pointer;
            transition: all ${durationPositionSet} ease-in-out;
            background: ${selectedOption ? "transparent" : activeView === "colour" ? colour.hex : "#444"};
            border-radius: ${player * .5}px;
            transform: rotate(${angle * i - offset}deg) translate(${canvas / 2}px);
            // box-shadow: ${selectedBoxShadow};

            &:after {
              position: absolute;
              left: 0;
              top: 0;
              display: block;
              content: "${i + 2}";
              opacity: ${activeView === "colour" ? 0 : 1};
              width: ${player}px;
              height: ${player}px;
              font-size: 16px;
              line-height: ${player}px;
              transition: opacity ${durationPositionSet} ease-in-out;
              transform: rotate(-${angle * i + (360 - offset)}deg);
            }
          }

          .optionMeepleWrapper {
            height: ${player}px;
            
            svg {
              margin-top: 3px;
              height: ${player - 6}px;
              transform: rotate(-${angle * i + (360 - offset)}deg);
              fill: ${selectedOption ? activeView === "colour" ? colour.hex : "#777" : "transparent"}
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
          <li key={`option-${i + 1}`} css={cssOption}>
            <button className="optionButton" onClick={() => selectFunc(i)}>
              <div className="optionMeepleWrapper"><IconMeeple /></div>
            </button>
          </li>
        );
      })}
    </ul>
  )
}

export default SelectPlayers;