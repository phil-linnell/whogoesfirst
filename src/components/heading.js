import React from "react";
import { css } from "@emotion/core"

const cssH1 = css`
  font-size: 18px;
  color: white;
  font-weight: bold;
  margin-bottom: 30px;
`;
const extraText = css`
  color: #aaa;
  font-size: 15px;
  font-weight: normal;
  max-width: 280px;
  margin: 0 auto;
`;

const Heading = ({ activeView }) => (
  <div>
    <h1 css={cssH1}>Who goes first?</h1>
    <div css={extraText}>
      {activeView === "colour" ? (
        <p>Select a colour for each player, <br />then press 'GO'.</p>
      ) : (
          <p>Select no. of players, assign a number to each player: 1, 2, 3..., then press 'GO'.</p>
      )}
    </div>
  </div>
);


export default Heading;