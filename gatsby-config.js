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
        icons: [
          {
            src: "static/icon-128.png",
            sizes: "128x128",
          },
          {
            src: "static/icon-256.png",
            sizes: "256x256"
          }
        ]
      },
    },
    `gatsby-plugin-offline`
  ]
};
