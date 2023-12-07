import * as React from "react";

import { Link } from "gatsby"
import { StaticImage, getSrc } from "gatsby-plugin-image"

import DropDown from "./dropdown"
import Toggle from "./toggle"




const Navbar = () => {


    return (
        <div className="flex flex-row items-center  dark:bg-slate-800">
            <Link to="/"><StaticImage className="block ml-3 dark:hidden" imgStyle={{ "transition": "none", "opacity": 1, "willChange": "none" }} width={90} height={90} layout="fixed" alt="Data Ruck Logo" src="../images/DataRuckLight.png" /></Link>
            <Link to="/"><StaticImage className="hidden ml-3 dark:block" imgStyle={{ "transition": "none", "opacity": 1, "willChange": "none" }} width={90} height={90} layout="fixed" alt="Data Ruck Logo" src="../images/DataRuckDark.png" /></Link>
            <div className="flex basis-full justify-center">
                <nav>
                    <ul className="hidden md:flex md:flex-row">
                        <Link to="/blog"><li className="font-bold px-6 py-3 rounded-lg text-red-900 dark:text-white hover:bg-red-50 dark:hover:bg-slate-500">ARTICLES</li></Link>
                        <Link to="/about"><li className="font-bold px-6 py-3 rounded-lg text-red-900 dark:text-white hover:bg-red-50 dark:hover:bg-slate-500">ABOUT</li></Link>
                    </ul>
                </nav>
            </div>
            <div className="w-[90px]">
                <Toggle />
            </div>
            <DropDown />
        </div>
    )

}

export default Navbar