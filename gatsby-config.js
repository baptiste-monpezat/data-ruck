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
    ogImage: 'images/og-image.png',
    favicon: {
      ico: 'images/favicon.ico',
      sm: 'images/favicon-16x16.png',
      lg: 'images/favicon-32x32.png'
    },
    lang: `en`

  },
  plugins: ["gatsby-plugin-postcss", "gatsby-plugin-mdx", `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`, `gatsby-plugin-react-helmet`, {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "articles",
        "path": `${__dirname}/src/articles/`
      },
      __key: "pages"
    }]
};