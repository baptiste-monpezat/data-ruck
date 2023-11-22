import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'



const Seo = ({ page, description, type, path }) => {

    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    description
                    author
                    keywords
                    url
                    ogImage
                    favicon {
                        ico
                        sm
                        lg
                        }
                    lang
                }
            }
        }
    `
    )



    return (
        <>
            <title>{`${page} | ${data.site.siteMetadata.title}`}</title>
            <html lang={data.site.siteMetadata.lang} />
            <meta name="description" content={description} />
            <meta name="image" content={`${data.site.siteMetadata.url}/${data.site.siteMetadata.ogImage}`} />
            <meta name="image:alt" content={description} />
            <meta name="keywords" content={data.site.siteMetadata.keywords} />

            <link rel="icon" type="image/png" sizes="16x16" href={`${data.site.siteMetadata.url}/${data.site.siteMetadata.favicon.ico}`} />
            <link rel="icon" type="image/png" sizes="16x16" href={`${data.site.siteMetadata.url}/${data.site.siteMetadata.favicon.sm}`} />
            <link rel="icon" type="image/png" sizes="32x32" href={`${data.site.siteMetadata.url}/${data.site.siteMetadata.favicon.lg}`} />

            {/* Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={page} />
            <meta property="og:url" content={`${data.site.siteMetadata.url}${path}`} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${data.site.siteMetadata.url}/${data.site.siteMetadata.ogImage}`} />
            <meta property="og:image:alt" content={description}></meta>

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={page} />
            <meta name="twitter:url" content={`${data.site.siteMetadata.url}${path}`} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`${data.site.siteMetadata.url}/${data.site.siteMetadata.ogImage}`} />
            <meta name="twitter:image:alt" content={description}></meta>
        </>
    )
}

export default Seo