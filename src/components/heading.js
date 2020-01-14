import React from "react";
import { css } from "@emotion/core"

const heading = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 150px;
`;
const extraText = css`
  color: #999;
  font-size: 15px;
  margin-top: 10px;
`;

const Heading = ({ activeView }) => (
  <div css={heading}>
    <div>
      {activeView === "number" ? (
        <p>Assign numbers to <br />each player: 1, 2, 3...</p>
      ) : (
        <p>Select a colour <br />for each player</p>
      )}
      {activeView === "number" && <div css={extraText}>Select no. of players and 'Go'</div>}
    </div>
  </div>
);

export default Heading;