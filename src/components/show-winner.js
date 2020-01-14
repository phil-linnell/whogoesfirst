import React from "react";
import IconMeeple from "../assets/meeple";
import { css } from "@emotion/core"

const ShowWinner = ({ activeView, winner, canvasSize }) => {
  const cssShowWinner = css`
    position: relative;
    width: ${canvasSize}px;
    height: ${canvasSize}px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  const cssWinnerCircle = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 150px;
    background: rgba(0,0,0,.3);
    border-radius: 50%;

    &:after {
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -75px;
      width: 150px;
      height: 150px;
      line-height: 150px;
      text-align: center;
      display: block;
      content: "${activeView === "number" && winner}"
    }
    
    svg {
      width: 70px;
      margin-top: -5px;
      fill: ${activeView === "colour" ? winner.hex : "#777"}
    }
  `;

  return (
    <div css={cssShowWinner}>
      <div css={cssWinnerCircle}>
        <IconMeeple />
      </div>
    </div>
  );
}

export default ShowWinner;