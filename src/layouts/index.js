import React from "react";
import Helmet from "react-helmet";
import faviconICO from "../../static/icon.ico";
import faviconPNG from "../../static/icon-32.png";
import faviconPNG128 from "../../static/icon-128.png";
import "./index.css";

const Layout = ({ children, data }) => (
  <div className="layout-wrapper">
    <Helmet
      title="Start Player App"
      meta={[
        {
          name: "description",
          content: "App to determine the first player of a board game"
        }
      ]}
    >
      <link rel="icon" type="image/png" sizes="128x128" href={faviconPNG128} />
      <link rel="icon" type="image/png" sizes="32x32" href={faviconPNG} />
      <link rel="shortcut icon" href={faviconICO} />
    </Helmet>
    {children}
  </div>
);

export default Layout;