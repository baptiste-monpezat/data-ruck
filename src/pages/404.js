import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"


const NotFoundPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center m-10">
        <div className="font-semibold text-black mb-10 dark:text-white">Lost in the Ruck 👉 <Link className="hover:text-red-900 dark:hover:text-red-500" to="/blog">Go back to articles</Link></div>
        <iframe title="ubb giph" src="https://giphy.com/embed/9JwUjUAyLpIuNLg8ky" width="480" height="271" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
      </div>
    </Layout >
  )
}

export default NotFoundPage

export const Head = () => <title>Not found</title>
