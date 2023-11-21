import * as React from "react";

import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import DropDown from "./dropdown"
import Toggle from "./toggle"




const Navbar = () => {


    return (
        <div class="flex flex-row items-center  dark:bg-slate-800">
            <Link to="/"><StaticImage class="block ml-3 dark:hidden" width={90} height={90} layout="fixed" alt="Data Ruck Logo" src="../images/DataRuckLight.png" /></Link>
            <Link to="/"><StaticImage class="hidden ml-3 dark:block" width={90} height={90} layout="fixed" alt="Data Ruck Logo" src="../images/DataRuckDark.png" /></Link>

            <div class="flex basis-full justify-center">
                <nav>
                    <ul class="hidden md:flex md:flex-row">
                        <Link to="/blog"><li class="font-bold px-6 py-3 rounded-lg text-red-900 dark:text-white hover:bg-red-50 dark:hover:bg-slate-500">ARTICLES</li></Link>
                        <Link to="/about"><li class="font-bold px-6 py-3 rounded-lg text-red-900 dark:text-white hover:bg-red-50 dark:hover:bg-slate-500">ABOUT</li></Link>
                    </ul>
                </nav>
            </div>
            <Toggle />
            <DropDown />
        </div>
    )

}

export default Navbar