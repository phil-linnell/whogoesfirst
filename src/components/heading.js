import React from "react";
import { css } from "@emotion/core"

const cssH1 = css`
  font-size: 18px;
  color: white;
  font-weight: 700;
  margin-bottom: 30px;
  text-transform: uppercase;
`;
const cssExtraText = css`
  color: #aaa;
  font-size: 15px;
  max-width: 280px;
  margin: 0 auto;
`;

const Heading = ({ activeView, winner }) => (
  <div>
    <h1 css={cssH1}>Who goes first?</h1>
    {winner ? (
      <div />
    ) : (
      <div css={cssExtraText}>
        {activeView === "colour" ? (
          <p>Select a colour for each player, <br />then press 'GO'.</p>
        ) : (
          <p>Select no. of players, assign a number to each player: 1, 2, 3..., then press 'GO'.</p>
        )}
      </div>
    )}
  </div>
);


export default Heading;