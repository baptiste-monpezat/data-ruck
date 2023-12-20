/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  pathPrefix: "/",
  siteMetadata: {
    title: `Data Ruck`,
    description: `A blog about Rugby data analytics`,
    author: `Baptiste Monpezat`,
    keywords: `rugby, data science, data analytics, machine learning, sport analytics`,
    url: `https://baptiste-monpezat.github.io/data-ruck`,
    ogImage: 'static/og-image.png',
    lang: `en`

  },
  flags: {
    DEV_SSR: false
  },
  plugins: ["gatsby-plugin-postcss", `gatsby-plugin-image`,
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
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
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
      }}


  ]
};