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
            OFFLOAD <span style={{ color: 'var(--accent)' }}>AI</span>
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
        <span
            style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
            }}
        >
            © 2026 Offload AI
        </span>
    </footer>
)

export default Footer
