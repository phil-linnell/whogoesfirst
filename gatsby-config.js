module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Start Player",
        short_name: "Start Player",
        start_url: "/",
        background_color: "#222",
        theme_color: "#111",
        display: "minimal-ui",
        icon: "static/favicon.png",
        icons: [
          {
            src: `static/icon-192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `static/icon-512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ]
      },
    },
    `gatsby-plugin-offline`
  ]
};
