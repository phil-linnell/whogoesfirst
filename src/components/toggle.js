import React from "react";
import { css } from "@emotion/core"

const Toggle = ({ activeView, toggleView }) => {
  const toggleWrapper = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  
    button {
      cursor: pointer;
      font-weight: 600;
    }
  `;
  const toggleButton = css`
    position: relative;
    display: inline-block;
    width: 50px;
    margin: 0 10px;
    height: 30px;
    background: #444;
    border-radius: 15px;

    > div {
      position: absolute;
      left: 2px;
      left: ${activeView === "number" && "22px"};
      top: 2px;
      height: 26px;
      width: 26px;
      border-radius: 50%;
      background-color: #999;
      transition: left .2s ease-in-out;
    }
  `;

  return (
    <div css={toggleWrapper}>
      <button onClick={toggleView}>
        Colour
      </button>
      <button css={toggleButton} onClick={toggleView}>
        <div />
      </button>
      <button onClick={toggleView}>
        No. of <br />players
      </button>
    </div>
  );
}

export default Toggle;