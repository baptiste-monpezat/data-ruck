
import * as React from 'react'
import "katex/dist/katex.min.css";

import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

const BlogPost = ({ data, children }) => {

  return (
    <Layout >


      <div className="flex flex-grow flex-col text-ellipsis line-clamp-2 text-lg max-w-prose prose prose-light dark:prose-dark my-20 mx-auto w-full max-w-[1000px] p-6 sm:p-6">
        <h1 className="text-red-900 dark:text-white">{data.mdx.frontmatter.title}</h1>
        <h3 className="text-red-900 dark:text-white">{data.mdx.frontmatter.datePublished}</h3>
        {children}</div>

    </Layout>

  )
}

export const Head = ({ data }) => <Seo page={data.mdx.frontmatter.title} description="Page with all written articles" type="website" path={`/blog/${data.mdx.frontmatter.slug}`} />

export const query = graphql`
  query ($id:String){
  mdx(id: {eq:$id}) {
    frontmatter {
      title
      slug
      datePublished(formatString: "MMMM D, YYYY")
    }
  }
}`

export default BlogPost