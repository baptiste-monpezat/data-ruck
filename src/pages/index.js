import * as React from 'react'
import Layout from "../components/layout"

import { Link } from "gatsby"

import Seo from "../components/seo"



const Home = () => (
    <Layout >

        <div className="flex flex-grow flex-col mx-auto w-full px-10 py-10 sm:px-40 sm:py-40 font-bold text-3xl text-black dark:text-white gap-5">
            <p className="text-7xl text-red-900 dark:text-white">🏉 Welcome to Data Ruck! </p>
            <p> Where Data Analytics Meets the Rugby Field! </p>
            <p>Enter the ruck 👉 <Link className="hover:text-red-900 dark:hover:text-red-500" to="/blog/">Read the articles!</Link></p>
        </div>

    </Layout>

)
export const Head = () => <Seo page="Home Page" description="Data Analytics blog home" type="website" path="" />


export default Home