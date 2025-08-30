import * as React from "react"

import { StaticImage } from "gatsby-plugin-image"


import Layout from "../components/layout"
import Seo from "../components/seo"


const About = () => {

    return (
        <>
            <Layout pageTitle="About">
                <div className="flex flex-grow flex-col  items-center mx-auto w-full max-w-[1200px] p-12 gap-10 md:flex-row">
                    <div className="flex-none overflow-hidden rounded-full isolate">
                        <StaticImage className="h-36 w-36" alt="Baptiste Monpezat" src="../images/baptiste.jpeg" />
                    </div>

                    <div className="flex flex-col font-semibold whitespace-normal text-ellipsis max-w-[800px] text-justify text-red-900 dark:text-white gap-3">

                        <p>Hi ! I'm Baptiste Monpezat ! </p>
                        <p>I'm excited to introduce Data Ruck, the blog I have dedicated to the thrilling world of Rugby Data Analytics.</p>
                        <p>I'm a Senior Sports Data Analyst at Betclic, and I'm more than obsessed with mixing my love for data with my passion for rugby.</p>
                        <p>Whether it’s spotting the next big thing on the pitch through clever stats, or guessing who's going to win the next big match based on player performance and past data, Data Ruck digs deep into the science behind our beloved sport.</p>
                        <p>So if you are up for some sports talks with a statistical twist, then Data Ruck is the place for you ! </p>
                    </div>

                </div>
            </Layout >
        </>
    )


}

export const Head = () => <Seo page="About Data Ruck" description="About Data Ruck" type="website" path="/about" />

export default About