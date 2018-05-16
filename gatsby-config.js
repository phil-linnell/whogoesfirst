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
        short_name: "whogoesfirst.app",
        start_url: "/",
        background_color: "#222",
        theme_color: "#222",
        display: "minimal-ui",
        icon: "static/icon.png",
      },
    }
  ]
};
