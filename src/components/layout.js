import * as React from "react"
import Navbar from "./navbar"
import Footer from "./footer"

const Layout = ({ children }) => (
    <div style={{ background: 'var(--ink)', color: 'var(--chalk)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
            {children}
        </main>
        <Footer />
    </div>
)

export default Layout
