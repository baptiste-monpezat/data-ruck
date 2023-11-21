/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Data Ruck`,
    description: `Blog about Rugby Data analytics`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: ["gatsby-plugin-postcss", "gatsby-plugin-mdx", `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`, {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "articles",
        "path": `${__dirname}/src/articles/`
      },
      __key: "pages"
    }]
};