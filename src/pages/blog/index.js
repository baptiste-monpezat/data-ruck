import * as React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import BlogPost from "../../components/blogpost"

const wrap = { maxWidth: '860px', margin: '0 auto', padding: '0 32px' }

const BlogIndex = ({ data }) => (
    <Layout>
        {/* Page header */}
        <div className="oa-page-header">
            <div style={wrap}>
                <div className="oa-eyebrow">Research &amp; Analysis</div>
                <h1>Articles</h1>
                <p>Data-driven insights into French rugby — match predictions, player analysis, and statistical deep-dives.</p>
            </div>
        </div>

        {/* Article list */}
        <div style={{ ...wrap, paddingTop: '48px', paddingBottom: '80px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {data.allMdx.nodes.map(node => (
                <Link key={node.id} to={`/blog/${node.frontmatter.slug}`} className="oa-article-card">
                    <BlogPost
                        title={node.frontmatter.title}
                        date={node.frontmatter.datePublished}
                        excerpt={node.excerpt}
                        categories={node.frontmatter.categories}
                    />
                </Link>
            ))}
        </div>
    </Layout>
)

export const query = graphql`
  query {
    allMdx(
      sort: { frontmatter: { datePublished: DESC } }
      filter: { frontmatter: { lang: { eq: "fr" } } }
    ) {
      nodes {
        id
        excerpt
        frontmatter {
          title
          slug
          datePublished(formatString: "MMMM D, YYYY")
          categories
        }
      }
    }
  }
`

export const Head = () => (
    <Seo page="Articles — Data Ruck" description="Data-driven rugby analysis articles." type="website" path="/blog/" />
)

export default BlogIndex
