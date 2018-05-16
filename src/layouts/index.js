import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import faviconPNG from "../../static/icon-32.png";
import faviconPNG128 from "../../static/icon-128.png";
import "./index.css";

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        {
          name: "description",
          content: "App to determine the first player of a board game"
        }
      ]}
    >
      <link rel="icon" type="image/png" sizes="128x128" href={faviconPNG128} />
      <link rel="icon" type="image/png" sizes="32x32" href={faviconPNG} />
    </Helmet>
    {children()}
  </div>
);

Layout.propTypes = {
  children: PropTypes.func
};

export default Layout;

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
