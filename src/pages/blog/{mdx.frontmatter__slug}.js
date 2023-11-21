import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

const BlogPost = ({ data, children }) => {

  return (
    <Layout >


      <div class="prose prose-light my-20 mx-auto w-full max-w-[1000px] dark:prose-invert">
        <h1>{data.mdx.frontmatter.title}</h1>
        <h3>{data.mdx.frontmatter.datePublished}</h3>
        {children}</div>

    </Layout>

  )
}

export const query = graphql`
  query ($id:String){
  mdx(id: {eq:$id}) {
    frontmatter {
      title
      datePublished(formatString: "MMMM D, YYYY")
    }
  }
}`

export const Head = () => <Seo title="Super Cool Blog Posts" />
export default BlogPost