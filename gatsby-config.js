const nib = require("nib");

module.exports = {
  siteMetadata: {
    title: "Start player"
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
        name: "Start player?",
        short_name: "Start player?",
        start_url: "/",
        background_color: "#222",
        theme_color: "#222",
        display: "minimal-ui",
        icon: "static/favicon.png"
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
