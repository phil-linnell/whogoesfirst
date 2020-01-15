module.exports = {
  siteMetadata: {
    title: "Start Player App",
    siteUrl: "https://startplayer.app",
    description: "App to choose the starting player of a game",
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Raleway`,
            variants: [`400`, `700`]
          },
        ],
      },
    },
    `gatsby-plugin-preact`,
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
