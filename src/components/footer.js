import * as React from "react"
import { Link } from "gatsby"

const Footer = () => (
    <footer
        className="blog-footer"
        style={{
            padding: '32px 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
        }}
    >
        <Link
            to="/"
            style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: '17px',
                color: 'var(--chalk)',
                textDecoration: 'none',
                letterSpacing: '.012em',
                transform: 'skewX(-9deg)',
                display: 'inline-block',
            }}
        >
            DATA <span style={{ color: 'var(--accent)' }}>RUCK</span>
        </Link>
        <span
            style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
            }}
        >
            AI match intelligence for rugby
        </span>
        <a
            href="https://www.linkedin.com/in/baptiste-monpezat-898074129/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                textDecoration: 'none',
            }}
        >
            LinkedIn
        </a>
        <span
            style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
            }}
        >
            © 2026 Data Ruck
        </span>
    </footer>
)

export default Footer
