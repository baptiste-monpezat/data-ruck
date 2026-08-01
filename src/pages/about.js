import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

const wrap = { maxWidth: '1000px', margin: '0 auto', padding: '0 32px' }

const About = () => (
    <Layout>
        {/* Page header */}
        <div className="oa-page-header">
            <div style={wrap}>
                <div className="oa-eyebrow">Sport Data Analyst</div>
                <h1>About</h1>
                <p>Senior Data Analyst at Betclic and rugby fan — I explore the game through code and statistics.</p>
            </div>
        </div>

        {/* Bio section */}
        <div style={{ ...wrap, paddingTop: '64px', paddingBottom: '96px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '56px', alignItems: 'start' }}>
                {/* Photo */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <div style={{ borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--line)', width: '140px', height: '140px', flexShrink: 0 }}>
                        <StaticImage
                            style={{ width: '140px', height: '140px' }}
                            imgStyle={{ transition: 'none', opacity: 1, willChange: 'none' }}
                            alt="Baptiste Monpezat"
                            src="../images/baptiste.jpeg"
                            layout="fixed"
                            width={140}
                            height={140}
                        />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '16px', color: 'var(--chalk)', margin: '0 0 4px' }}>
                            Baptiste Monpezat
                        </p>
                        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--accent)', margin: 0 }}>
                            Sport Data Analyst
                        </p>
                    </div>
                </div>

                {/* Text */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <p style={{ fontSize: '19px', color: 'var(--chalk)', margin: 0, lineHeight: 1.6 }}>
                        Senior Data Analyst at Betclic and rugby fan — I explore the game through code and statistics.
                    </p>
                    {[
                        "Data Ruck is a personal blog where I publish my rugby analyses: match predictions, player ratings, statistical models. A personal playground as much as a tool for understanding the game better.",
                        "I build these models in evenings and weekends, out of curiosity and love for the sport. If an analysis caught your eye or you want to chat about rugby and data, feel free to reach out.",
                    ].map((text, i) => (
                        <p key={i} style={{ fontSize: '16px', color: 'var(--muted)', margin: 0, lineHeight: 1.75 }}>
                            {text}
                        </p>
                    ))}

                    <div style={{ display: 'flex', gap: '16px', marginTop: '8px', flexWrap: 'wrap' }}>
                        <a
                            href="/#contact"
                            style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: 600,
                                fontSize: '14px',
                                borderRadius: '999px',
                                padding: '11px 22px',
                                background: 'var(--accent)',
                                color: 'var(--ink)',
                                textDecoration: 'none',
                            }}
                        >
                            Get in touch →
                        </a>
                        <a
                            href="/blog"
                            style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: 600,
                                fontSize: '14px',
                                borderRadius: '999px',
                                padding: '11px 22px',
                                border: '1px solid var(--line)',
                                color: 'var(--chalk)',
                                textDecoration: 'none',
                            }}
                        >
                            Read the articles
                        </a>
                        <a
                            href="https://www.linkedin.com/in/baptiste-monpezat-898074129/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: 600,
                                fontSize: '14px',
                                borderRadius: '999px',
                                padding: '11px 22px',
                                border: '1px solid var(--line)',
                                color: 'var(--chalk)',
                                textDecoration: 'none',
                            }}
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </div>

        {/* Maroon band */}
        <div style={{ background: 'var(--maroon)', padding: '56px 32px', textAlign: 'center' }}>
            <p style={{
                fontFamily: "'Anton', sans-serif",
                fontWeight: 400,
                textTransform: 'uppercase',
                fontSize: 'clamp(20px, 3vw, 30px)',
                lineHeight: 1.2,
                letterSpacing: '.01em',
                margin: 0,
                transform: 'skewX(-5deg)',
                color: 'var(--chalk)',
            }}>
                Data that speaks rugby.<br />
                <span style={{ color: 'var(--accent)' }}>Built by someone who lives it.</span>
            </p>
        </div>
    </Layout>
)

export const Head = () => (
    <Seo page="About — Data Ruck" description="Senior Data Analyst at Betclic and rugby fan — I explore the game through code and statistics." type="website" path="/about" />
)

export default About
