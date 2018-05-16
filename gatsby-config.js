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
        short_name: "Who Goes First?",
        start_url: "/",
        background_color: "#222",
        theme_color: "#222",
        display: "minimal-ui",
        icons: [
          {
            src: "static/icon-192.png",
            sizes: "192x192",
          },
          {
            src: "static/icon-512.png",
            sizes: "512x512"
          }
        ]
      },
    },
    `gatsby-plugin-offline`
  ]
};
