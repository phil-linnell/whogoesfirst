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
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Who Goes First?",
        short_name: "Who First?",
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
