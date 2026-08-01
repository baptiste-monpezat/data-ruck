import * as React from "react"
import "katex/dist/katex.min.css"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import Seo from "../../components/seo"

const wrap = { maxWidth: '860px', margin: '0 auto', padding: '0 32px' }

const BlogPost = ({ data, children }) => {
    const { title, datePublished, lang, langAlternate } = data.mdx.frontmatter
    return (
        <Layout>
            {/* Article header */}
            <div style={{ ...wrap, paddingTop: '56px', paddingBottom: '32px', borderBottom: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
                    <Link
                        to="/blog"
                        style={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: '11px',
                            letterSpacing: '.16em',
                            textTransform: 'uppercase',
                            color: 'var(--muted)',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--chalk)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                    >
                        ← Articles
                    </Link>
                    {lang && langAlternate && (
                        <Link
                            to={`/blog/${langAlternate}`}
                            style={{
                                fontFamily: "'Space Mono', monospace",
                                fontSize: '11px',
                                letterSpacing: '.14em',
                                textTransform: 'uppercase',
                                color: 'var(--muted)',
                                textDecoration: 'none',
                                border: '1px solid var(--line)',
                                borderRadius: '999px',
                                padding: '5px 14px',
                                transition: 'color .15s, border-color .15s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.color = 'var(--chalk)'; e.currentTarget.style.borderColor = 'var(--chalk)' }}
                            onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--line)' }}
                        >
                            {lang === 'fr' ? 'EN →' : 'FR →'}
                        </Link>
                    )}
                </div>
                <div className="oa-eyebrow" style={{ marginBottom: '14px' }}>{datePublished}</div>
                <h1 style={{
                    fontFamily: "'Anton', sans-serif",
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    fontSize: 'clamp(28px, 5vw, 48px)',
                    lineHeight: 1,
                    letterSpacing: '.01em',
                    color: 'var(--chalk)',
                    margin: 0,
                    transform: 'skewX(-6deg)',
                    transformOrigin: 'left',
                }}>
                    {title}
                </h1>
            </div>

            {/* Article body */}
            <div style={{ ...wrap, paddingTop: '48px', paddingBottom: '96px' }}>
                <div className="oa-prose">
                    {children}
                </div>
            </div>
        </Layout>
    )
}

export const Head = ({ data }) => (
    <Seo
        page={`${data.mdx.frontmatter.title} — Data Ruck`}
        description={data.mdx.excerpt || "Analyse de données rugby par Baptiste Monpezat — statistiques, machine learning et prédictions TOP 14 / PRO D2."}
        type="article"
        path={`/blog/${data.mdx.frontmatter.slug}`}
    />
)

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      excerpt(pruneLength: 160)
      frontmatter {
        title
        slug
        datePublished(formatString: "MMMM D, YYYY")
        lang
        langAlternate
      }
    }
  }
`

export default BlogPost
