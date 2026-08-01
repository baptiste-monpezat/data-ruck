/**
 * @type {import('gatsby').GatsbyConfig}
 */

module.exports = {
  pathPrefix: "/",
  siteMetadata: {
    title: `Data Ruck`,
    description: `Analyses, prédictions et modèles data appliqués au rugby — TOP 14, PRO D2 et Coupe du monde. Par Baptiste Monpezat, Sport Data Analyst.`,
    author: `Baptiste Monpezat`,
    keywords: `rugby, data science, analyse rugby, prédiction rugby, machine learning, TOP 14, PRO D2, statistiques rugby, sport analytics, pronostics rugby`,
    url: `https://www.data-ruck.com`,
    siteUrl: `https://www.data-ruck.com`,
    ogImage: 'static/og-image.png',
    lang: `fr`
  },
  flags: {
    DEV_SSR: false
  },
  plugins: ["gatsby-plugin-postcss", `gatsby-plugin-image`, `gatsby-plugin-sitemap`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`, `gatsby-plugin-react-helmet`, {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "articles",
        "path": `${__dirname}/src/articles/`
      },
      __key: "pages"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Data Ruck`,
        short_name: `Data Ruck`,
        start_url: `/`,
        background_color: `#15110E`,
        theme_color: `#C6FF3A`,
        display: `standalone`,
        icon: `src/images/icon.png`
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },

        ],
      }
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-WVDJE6JNWN", // Google Analytics / GA

        ],
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ["/preview/**", "/do-not-track/me/too/"],

          // Delays processing pageview events on route update (in milliseconds)
          delayOnRouteUpdate: 0,
        },
      },
    },


  ]
};