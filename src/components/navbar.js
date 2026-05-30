import * as React from "react"
import { Link } from "gatsby"

const NAV_LINKS = [
    { label: "Articles",  to: "/blog" },
    { label: "Analytics", to: "/predictions" },
    { label: "About Us",  to: "/about" },
]

const linkStyle = {
    fontFamily: "'Space Grotesk', system-ui, sans-serif",
    fontWeight: 600,
    fontSize: '13px',
    letterSpacing: '.08em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: 'var(--muted)',
    transition: 'color .15s',
}

const Navbar = () => {
    const [open, setOpen] = React.useState(false)

    return (
        <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            background: 'rgba(21,17,14,.9)',
            borderBottom: '1px solid var(--line)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
        }}>
            <div style={{
                maxWidth: '1180px',
                margin: '0 auto',
                padding: '0 32px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Brand */}
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <span style={{
                        fontFamily: "'Anton', sans-serif",
                        fontSize: '19px',
                        color: 'var(--chalk)',
                        letterSpacing: '.012em',
                        transform: 'skewX(-9deg)',
                        display: 'inline-block',
                        whiteSpace: 'nowrap',
                    }}>
                        OFFLOAD <span style={{ color: 'var(--accent)' }}>AI</span>
                    </span>
                </Link>

                {/* Desktop tabs */}
                <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {NAV_LINKS.map(({ label, to }) => (
                        <Link
                            key={to}
                            to={to}
                            activeClassName="oa-nav-active"
                            partiallyActive
                            style={linkStyle}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--chalk)'}
                            onMouseLeave={e => { if (!e.currentTarget.classList.contains('oa-nav-active')) e.currentTarget.style.color = 'var(--muted)' }}
                            className="hidden md:inline-block"
                        >
                            {label}
                        </Link>
                    ))}
                    <a
                        href="/#contact"
                        className="hidden md:inline-flex"
                        style={{
                            marginLeft: '18px',
                            fontFamily: "'Space Grotesk', system-ui, sans-serif",
                            fontWeight: 600,
                            fontSize: '13px',
                            borderRadius: '999px',
                            padding: '9px 18px',
                            background: 'var(--accent)',
                            color: 'var(--ink)',
                            textDecoration: 'none',
                            letterSpacing: '.04em',
                            transition: 'transform .12s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = ''}
                    >
                        Book a call
                    </a>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden"
                        onClick={() => setOpen(o => !o)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', marginLeft: '8px' }}
                        aria-label="Menu"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--chalk)" strokeWidth="2" strokeLinecap="round">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </nav>
            </div>

            {/* Mobile dropdown */}
            {open && (
                <div style={{
                    background: 'var(--ink-2)',
                    borderTop: '1px solid var(--line)',
                    padding: '16px 32px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                }}>
                    {NAV_LINKS.map(({ label, to }) => (
                        <Link
                            key={to}
                            to={to}
                            onClick={() => setOpen(false)}
                            style={{
                                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                                fontWeight: 600,
                                fontSize: '15px',
                                letterSpacing: '.06em',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                                color: 'var(--chalk)',
                                padding: '10px 0',
                                borderBottom: '1px solid var(--line)',
                            }}
                        >
                            {label}
                        </Link>
                    ))}
                    <a
                        href="/#contact"
                        onClick={() => setOpen(false)}
                        style={{
                            marginTop: '16px',
                            fontFamily: "'Space Grotesk', system-ui, sans-serif",
                            fontWeight: 600,
                            fontSize: '14px',
                            borderRadius: '999px',
                            padding: '12px 20px',
                            background: 'var(--accent)',
                            color: 'var(--ink)',
                            textDecoration: 'none',
                            textAlign: 'center',
                        }}
                    >
                        Book a call →
                    </a>
                </div>
            )}
        </header>
    )
}

export default Navbar
