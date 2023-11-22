import * as React from "react";

import Navbar from "./navbar"
import Footer from "./footer"


const Layout = ({ children }) => {
    return (
        <>

            <main className="dark:bg-slate-800 min-h-screen">
                <Navbar />
                {children}
                <Footer />
            </main>
        </>

    )
}

export default Layout