const nib = require("nib");

module.exports = {
  siteMetadata: {
    title: "Start Player"
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-stylus",
      options: {
        use: [nib()]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Start Player",
        short_name: "Start Player",
        start_url: "/",
        background_color: "#222",
        theme_color: "#111",
        display: "minimal-ui",
        icon: "static/icon-256.png"
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-119881794-1",
        // Puts tracking script in the head instead of the body
        head: true
      }
    }
  ]
};
