import React from "react";
import IconMeeple from "../assets/meeple";
import { css } from "@emotion/core"

const SelectPlayers = ({ activeView, pool, selectFunc, canvasSize }) => {
  const cssPlayersList = css`
    position: relative;
    width: ${canvasSize}px;
    height: ${canvasSize}px;
    margin: 0 auto;
  `;

  return (
    <ul css={cssPlayersList}>
      {pool.map((player, i) => {
        const playerSize = 46;
        const durationPositionSet = ".1s";
        const angle = 360 / pool.length;
        const offset = 90; // Make the first item at the top of the circle

        const cssPlayerItem = css`
          position: absolute;
          top: 50%;
          left: 50%;
          animation: ${player.selected ? "pop" : "popBack"} .2s ease-in-out 1;
          animation-fill-mode: forwards;
          
          .selectButton {
            width: ${playerSize}px;
            height: ${playerSize}px;
            margin: -${playerSize / 2}px;
            cursor: pointer;
            transition: all ${durationPositionSet} ease-in-out;
            background: ${player.selected ? "transparent" : activeView === "colour" ? player.hex : "#444"};
            border-radius: ${playerSize * .5}px;
            transform: rotate(${angle * i - offset}deg) translate(${canvasSize / 2}px);

            &:after {
              position: absolute;
              left: 0;
              top: 0;
              display: block;
              content: "${i + 1}";
              opacity: ${activeView === "colour" ? 0 : 1};
              width: ${playerSize}px;
              height: ${playerSize}px;
              font-size: 16px;
              line-height: ${playerSize}px;
              transition: opacity ${durationPositionSet} ease-in-out;
              transform: rotate(-${angle * i + (360 - offset)}deg);
            }
          }

          .selectMeepleWrapper {
            height: ${playerSize}px;
            
            svg {
              margin-top: 3px;
              height: ${playerSize - 6}px;
              transform: rotate(-${angle * i + (360 - offset)}deg);
              fill: ${player.selected ? activeView === "colour" ? player.hex : "#777" : "transparent"}
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
          <li key={`player-${i + 1}`} css={cssPlayerItem}>
            <button className="selectButton" onClick={() => selectFunc(i)}>
              <div className="selectMeepleWrapper"><IconMeeple /></div>
            </button>
          </li>
        );
      })}
    </ul>
  )
}

export default SelectPlayers;