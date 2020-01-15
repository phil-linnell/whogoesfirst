import React from "react";
import IconMeeple from "../assets/meeple";
import { css } from "@emotion/core"

const SelectPlayers = ({ activeView, pool, selectFunc, canvasSize, winner }) => {
  const playerSize = 46;
  const durationPositionSet = ".15s";
  const cssPlayersList = css`
    position: relative;
    width: ${canvasSize}px;
    height: ${canvasSize}px;
    margin: 0 auto;

    .playerItem {
      position: absolute;
      top: 50%;
      left: 50%;
      animation-fill-mode: forwards;
    }
    .selectButton {
      width: ${playerSize}px;
      height: ${playerSize}px;
      margin: -${playerSize / 2}px;
      cursor: pointer;
      transition: all ${durationPositionSet} ease-in-out;
      border-radius: 50%;

      &:after {
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        width: ${playerSize}px;
        height: ${playerSize}px;
        font-size: 16px;
        line-height: ${playerSize}px;
        transition: opacity ${durationPositionSet} ease-in-out;
        color: #fff;
        font-weight: 700;
        opacity: ${activeView === "colour" ? 0 : 1};
      }
      selectMeepleWrapper {        
        svg {
          margin-top: 3px;
          height: ${playerSize - 6}px;
        }
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
    @keyframes winnerThrob {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }
  `;

  return (
    <ul css={cssPlayersList}>
      {pool.map((player, i) => {
        const angle = 360 / pool.length;
        const offset = 90; // Make the first item at the top of the circle
        const isWinner = activeView === "colour" ? player.name === winner.name : i + 1 === winner;
        const cssPlayerItem = css`
          animation: ${player.selected ? "pop" : "popBack"} .2s ease-in-out 1;
          ${isWinner && "animation: winnerThrob 1.4s ease-in-out infinite;"}

          .selectButton {
            background: ${player.selected ? "transparent" : activeView === "colour" ? player.hex : "#444"};
            transform: rotate(${angle * i - offset}deg) ${winner ? "translate(0)" : `translate(${canvasSize / 2}px)`};
            opacity: ${winner && !isWinner ? 0 : 1};

            &:after {
              content: "${i + 1}"; 
              transform: rotate(-${angle * i + (360 - offset)}deg);
            }
          }
          .selectMeepleWrapper {            
            svg {
              transform: rotate(-${angle * i + (360 - offset)}deg) scale(${isWinner ? "1.3" : "1"});
              fill: ${player.selected ? activeView === "colour" ? player.hex : "#777" : "transparent"}
            }
          }
        `;
        const accessibleName = activeView === "colour" ? `${player.name} player` : `${i + 1} players`; 

        return (
          <li key={`player-${i + 1}`} css={cssPlayerItem} className="playerItem">
            <button className="selectButton" onClick={() => selectFunc(i)} aria-label={accessibleName}>
              <div className="selectMeepleWrapper"><IconMeeple /></div>
            </button>
          </li>
        );
      })}
    </ul>
  )
}

export default SelectPlayers;