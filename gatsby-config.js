const nib = require("nib");

module.exports = {
  siteMetadata: {
    title: "Who goes first?"
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-stylus",
      options: {
        use: [nib()]
      }
    }
  ]
};
