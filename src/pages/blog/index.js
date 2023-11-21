import * as React from "react"
import { graphql } from 'gatsby'
import { Link } from 'gatsby'

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import BlogPost from "../../components/blogpost"


const IndexPage = ({ data }) => {
  return (
    <Layout pageTitle="Home">
      <div class="mx-auto flex w-full max-w-[820px] flex-col p-6 sm:p-16 gap-10">
        <p class="font-bold text-5xl relative left-0 text-red-900 dark:text-white">Articles</p>
        {data.allMdx.nodes.map((node) => {
          return <Link key={node.id} to={`/blog/${node.frontmatter.slug}`}><BlogPost key={node.id} title={node.frontmatter.title} date={node.frontmatter.datePublished} excerpt={node.excerpt} categories={node.frontmatter.categories} /></Link>
        })}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx (sort : {frontmatter: {datePublished:DESC}}){
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
  }}`

export const Head = () => <Seo title="Home Page" />
export default IndexPage


