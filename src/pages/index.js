import * as React from 'react'
import Layout from "../components/layout"

import { Link } from "gatsby"



const Home = () => (
    <Layout >

        <div class="flex flex-col mx-auto w-full px-10 py-40 sm:px-40 font-bold text-3xl text-black dark:text-white gap-5">
            <p class="text-7xl text-red-900 dark:text-white">🏉 Welcome to Data Ruck! </p>
            <p> Where Data Analytics Meets the Rugby Field! </p>
            <p>Enter the ruck 👉 <Link class="hover:text-red-900 dark:hover:text-red-500" to="/blog/">Read the articles!</Link></p>
        </div>

    </Layout>

)

export default Home