import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import Seo from '../components/seo'
import Tag from '../components/tag'

const CONTACT_EMAIL = 'baptiste.monpezat@gmail.com'

// ── Translations ──────────────────────────────────────────────────────────────
const TRANSLATIONS = {
    fr: {
        nav: {
            articles: 'Articles', analytics: 'Analytics', about: 'À propos', cta: 'Prendre rendez-vous',
        },
        hero: {
            eyebrow: "L'IA au service de votre rugby",
            subBefore: 'Chaque ', subHl: 'phase', subAfter: ' compte.',
            lead: "Offload AI transforme vos données de match et d'entraînement en décisions claires — une équipe d'experts data qui s'appuie sur l'IA pour vous livrer des analyses adverses, un suivi de charge et une veille recrutement adaptés à votre rugby.",
            ctaPrimary: 'Prendre rendez-vous →', ctaGhost: 'Lire les articles',
        },
        insight: {
            title: "Pronostic du moment", live: 'En direct',
            home: 'Dom.', draw: 'Nul', away: 'Ext.',
            score: 'Score prédit',
            loading: 'Chargement…',
            newsletter: 'Recevoir les pronostics par e-mail',
            subscribed: 'Vous êtes inscrit·e ! Vous recevrez un e-mail à chaque nouvelle publication.',
            emailPh: 'votre@email.fr',
            subscribe: 'S\'inscrire',
        },
        articles: { empty: 'Aucun article pour le moment.' },
        analytics: {
            loading: 'Chargement…', empty: 'Aucune prédiction disponible.',
            goTo: 'Accéder aux pronostics →', season: 'Saison',
            viewFull: "Voir les pronostics complets & l'historique →",
            outcomes: { H: 'Dom.', D: 'Nul', A: 'Ext.' },
        },
        about: {
            founder: 'Fondateur',
            headline: "Analyste Senior Sports Data chez Betclic — passionné par la data science et le rugby.",
            bio: [
                "Offload AI est né d'un blog personnel, Data Ruck, où j'explorais par le code la prédiction de matchs, l'évaluation des joueurs et les statistiques rugby. Avec le temps, une évidence s'est imposée : les mêmes méthodes qui m'aidaient à mieux comprendre le jeu pouvaient aussi aider les clubs à mieux décider.",
                "Qu'il s'agisse de repérer les prochains talents, d'anticiper les résultats à partir des compositions et de l'historique des confrontations, ou de préparer un dossier d'analyse adverse — l'objectif est toujours le même : mettre des chiffres concrets derrière les décisions des entraîneurs.",
            ],
            cta: 'Prendre contact →',
        },
        services: {
            eyebrow: 'Ce que nous faisons',
            heading: 'Vos données, transformées en décisions.',
            sub: "Nous travaillons aux côtés de votre staff technique, de performance et de vos analystes vidéo — pas un tableau de bord de plus à apprendre, mais des réponses claires en langage rugby.",
            cards: [
                { title: 'Analyse adverse & match', body: "Décryptez n'importe quel adversaire — tendances sur mêlées et touches, menaces en ruck, profils de coup de pied et points faibles." },
                { title: 'Performance & charge joueur', body: "Transformez vos données GPS et d'entraînement en indicateurs de fatigue, de disponibilité et de risque de blessure — pour que les sélections reposent sur des faits, pas sur l'instinct." },
                { title: 'Veille recrutement', body: "Trouvez les joueurs qui correspondent vraiment à votre système et à votre budget, avec des données qui vont bien au-delà des vidéos de présentation." },
                { title: 'Unification des sources de données', body: "Opta, Hawkeye, GPS Catapult, vidéo taguée… Les clubs disposent de données riches mais éparpillées. Nous les centralisons et les mettons en forme pour que vos analystes puissent se concentrer sur l'essentiel." },
            ],
        },
        approach: {
            eyebrow: 'Comment ça marche',
            heading: 'Accessible à tous les clubs. Du Nationale au Top 14.',
            sub: "Pas besoin d'un département data ou d'un budget XXL. Si vous avez des données — même basiques — on peut travailler ensemble.",
            steps: [
                { num: '01', title: 'On évalue votre besoin', body: "Un échange simple pour cerner vos priorités : préparer un adversaire, suivre la charge de vos joueurs, identifier un profil de recrutement…" },
                { num: '02', title: 'On part de vos données', body: "Vidéos taguées, GPS, fichiers Excel, flux de stats — on s'adapte à ce que vous avez déjà, sans vous imposer de nouveaux outils." },
                { num: '03', title: 'Notre équipe analyse', body: "Data scientist et analyste vidéo travaillent ensemble selon le besoin. Nos experts s'appuient sur l'IA pour aller plus vite et plus loin — mais c'est toujours un regard humain qui valide chaque résultat." },
                { num: '04', title: 'On partage les résultats', body: "Rapport clair, tableau de bord ou présentation directe à votre staff — dans le format qui vous convient, au rythme de votre saison." },
            ],
        },
        band: { line1: 'La prochaine phase est déjà en route.', line2: "Assurez-vous d'être le premier à la voir." },
        contact: {
            eyebrow: 'Contactez-nous', heading: 'Parlons de votre saison.',
            lead: "Dites-nous quelques mots sur votre équipe et ce que vous cherchez à résoudre. Nous reviendrons dans les deux jours ouvrés pour organiser un échange court et sans engagement.",
            form: {
                nameLbl: 'Votre nom', namePh: 'Jean-Baptiste Dupont',
                clubLbl: 'Club / équipe', clubPh: 'ex. Stade Toulousain',
                roleLbl: 'Votre poste', rolePh: 'Responsable de la Performance',
                emailLbl: 'E-mail', emailPh: 'vous@club.fr',
                msgLbl: "Qu'est-ce que vous cherchez à résoudre ?",
                msgPh: "Quelques mots sur votre saison et les axes sur lesquels la data pourrait vous aider…",
                submit: 'Envoyer →',
                note: 'Vous préférez un e-mail direct ? Écrivez à',
                errName: 'Merci d\'indiquer votre nom.',
                errEmail: 'Merci d\'indiquer un e-mail valide.',
                successTitle: 'E-mail prêt !',
                successBody: "Votre application e-mail s'est ouverte avec le message pré-rempli — il ne reste plus qu'à l'envoyer. Nous vous répondrons sous deux jours ouvrés.",
                emailSubject: 'Nouvelle demande',
            },
        },
        footer: { tagline: "L'IA au service du rugby", copy: '© 2026 Offload AI' },
    },
    en: {
        nav: {
            articles: 'Articles', analytics: 'Analytics', about: 'About Us', cta: 'Book a call',
        },
        hero: {
            eyebrow: 'AI match intelligence for rugby',
            subBefore: 'Make every ', subHl: 'phase', subAfter: ' count.',
            lead: "Offload AI turns your match and training data into clear decisions — opposition analysis, player load, and recruitment, built with AI and read by people who know rugby.",
            ctaPrimary: 'Book a call →', ctaGhost: 'Read articles',
        },
        insight: {
            title: 'Latest prediction', live: 'Live',
            home: 'Home', draw: 'Draw', away: 'Away',
            score: 'Predicted score',
            loading: 'Loading…',
            newsletter: 'Get predictions by email',
            subscribed: "You're in! You'll receive an email each time new predictions are published.",
            emailPh: 'your@email.com',
            subscribe: 'Subscribe',
        },
        articles: { empty: 'No articles yet.' },
        analytics: {
            loading: 'Loading…', empty: 'No predictions available yet.',
            goTo: 'Go to predictions →', season: 'Season',
            viewFull: 'View full predictions & history →',
            outcomes: { H: 'Home', D: 'Draw', A: 'Away' },
        },
        about: {
            founder: 'Founder',
            headline: "Senior Sports Data Analyst at Betclic — obsessed with mixing data science and rugby.",
            bio: [
                "Offload AI started as a personal blog called Data Ruck, where I explored match prediction, player grading, and rugby analytics through code. Over time it became clear the same methods that help me understand the game could genuinely help clubs make better decisions.",
                "Whether it's spotting the next big thing on the pitch through clever stats, predicting match outcomes based on lineup experience and historical data, or building opposition dossiers — the goal is always the same: turn numbers into calls coaches can trust.",
            ],
            cta: 'Get in touch →',
        },
        services: {
            eyebrow: 'What we do',
            heading: 'Your data, turned into calls you can make.',
            sub: "We sit alongside your coaching, performance staff and video analysts — not another dashboard to learn, but answers in plain rugby language.",
            cards: [
                { title: 'Opposition & match analysis', body: "Break down any opponent — set-piece tendencies, breakdown threats, kick patterns and where they're vulnerable." },
                { title: 'Performance & player load', body: "Turn GPS and training data into fatigue, readiness and injury-risk signals — so selection is informed, not a hunch." },
                { title: 'Recruitment intelligence', body: "Find players who actually fit your system and budget, with data that goes beyond the highlight reel." },
                { title: 'Data source unification', body: "Opta, Hawkeye, GPS Catapult, tagged footage… Clubs sit on rich but scattered data. We bring it together so your analysts can focus on what matters." },
            ],
        },
        approach: {
            eyebrow: 'How it works',
            heading: 'Built for any club. From National to Top 14.',
            sub: "No data department or big budget required. If you have data — even basic — we can work together.",
            steps: [
                { num: '01', title: 'We assess your needs', body: "A simple conversation to understand your priorities: scouting an opponent, tracking player load, finding a recruitment target…" },
                { num: '02', title: 'We start from your data', body: "Tagged footage, GPS, spreadsheets, stats feeds — we adapt to what you already have, no new tools forced on you." },
                { num: '03', title: 'Our team analyses', body: "Data scientist and video analyst work together depending on the brief. AI structures, humans validate. There's always expert eyes behind every output." },
                { num: '04', title: 'We share the results', body: "Clear report, dashboard or a direct presentation to your staff — in the format that suits you, at the pace of your season." },
            ],
        },
        band: { line1: 'The next phase is already on its way.', line2: "Make sure you've seen it first." },
        contact: {
            eyebrow: 'Get in touch', heading: "Let's talk about your season.",
            lead: "Tell us a little about your team and what you're trying to solve. We'll come back within two working days to set up a short, no-obligation call.",
            form: {
                nameLbl: 'Your name', namePh: 'Jane Coombes',
                clubLbl: 'Club / team', clubPh: 'e.g. Bordeaux Bègles',
                roleLbl: 'Your role', rolePh: 'Head of Performance',
                emailLbl: 'Email', emailPh: 'you@club.com',
                msgLbl: 'What are you trying to solve?',
                msgPh: 'A line or two on your season and where data could help…',
                submit: 'Send message →',
                note: 'Prefer email? Write to',
                errName: 'Please add your name.',
                errEmail: 'Please add a valid email.',
                successTitle: 'Message ready',
                successBody: "Your email app should have opened with everything filled in — just hit send and we'll be in touch within two working days.",
                emailSubject: 'New enquiry',
            },
        },
        footer: { tagline: 'AI match intelligence for rugby', copy: '© 2026 Offload AI' },
    },
}

// ── Glitch logo ──────────────────────────────────────────────────────────────
const GlitchLogo = ({ variant = 'chrom sm', size = 'nav' }) => (
    <span
        className={`glogo ${variant}`}
        data-text="OFFLOAD AI"
        style={{ fontSize: size === 'hero' ? 'clamp(50px,8vw,104px)' : size === 'foot' ? '20px' : '21px' }}
    >
        OFFLOAD <span className="ai-lime">AI</span>
    </span>
)

// ── Insight card ──────────────────────────────────────────────────────────────
const BREVO_FORM_ID_INSIGHT = typeof process !== 'undefined' ? (process.env.GATSBY_BREVO_FORM_ID || "") : ""

const InsightCard = ({ t }) => {
    const [matches, setMatches] = React.useState([])
    const [idx,     setIdx]     = React.useState(0)
    const [email,   setEmail]   = React.useState("")
    const [status,  setStatus]  = React.useState(null)

    React.useEffect(() => {
        fetch('/predictions.json')
            .then(r => r.json())
            .then(data => {
                const all = []
                for (const [key, val] of Object.entries(data)) {
                    const src = val?.current
                    if (!src?.matches?.length) continue
                    const label = key === 'top14' ? 'TOP 14' : 'PRO D2'
                    src.matches.forEach(m => {
                        const p = m.lineup || m.base
                        all.push({ home: m.home, away: m.away, champ: label, day: src.day, prob_h: p.prob_h, prob_d: p.prob_d, prob_a: p.prob_a, pred_home: Math.round(p.pred_home), pred_away: Math.round(p.pred_away) })
                    })
                }
                setMatches(all)
            })
            .catch(() => {})
    }, [])

    React.useEffect(() => {
        if (matches.length <= 1) return
        const timer = setInterval(() => setIdx(i => (i + 1) % matches.length), 3500)
        return () => clearInterval(timer)
    }, [matches.length])

    const match = matches[idx] || null

    const submitEmail = async (e) => {
        e.preventDefault()
        if (!BREVO_FORM_ID_INSIGHT) { setStatus("error"); return }
        setStatus("loading")
        try {
            await fetch(BREVO_FORM_ID_INSIGHT, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ EMAIL: email, email_address_check: "", locale: "fr" }).toString() })
            setStatus("ok")
        } catch { setStatus("error") }
    }

    return (
        <div className="oa-insight">
            <div className="oa-insight-top">
                <div className="oa-insight-top-l">
                    <span className="cardmono">OA</span>
                    <b>{t.insight.title}</b>
                </div>
                <div className="oa-live">{t.insight.live}</div>
            </div>

            {match ? (
                <>
                    <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>
                        {match.champ} · J{match.day}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '14px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--chalk)', flex: 1 }}>{match.home}</span>
                        <span style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: "'Space Mono',monospace", flexShrink: 0 }}>vs</span>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--chalk)', flex: 1, textAlign: 'right' }}>{match.away}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '3px', marginBottom: '6px', borderRadius: '6px', overflow: 'hidden' }}>
                        <div style={{ flex: match.prob_h, height: '10px', background: 'var(--accent)' }} />
                        <div style={{ flex: match.prob_d, height: '10px', background: 'rgba(242,237,228,.22)' }} />
                        <div style={{ flex: match.prob_a, height: '10px', background: 'rgba(242,237,228,.09)' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: "'Space Mono',monospace", marginBottom: '10px' }}>
                        <span style={{ color: 'var(--accent)' }}>{t.insight.home} {match.prob_h}%</span>
                        <span style={{ color: 'var(--muted)' }}>{t.insight.draw} {match.prob_d}%</span>
                        <span style={{ color: 'var(--muted)' }}>{t.insight.away} {match.prob_a}%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--muted)', paddingBottom: '14px', borderBottom: '1px solid var(--line)' }}>
                        <span>{t.insight.score} <span style={{ fontFamily: "'Space Mono',monospace", color: 'var(--chalk)', fontWeight: 700 }}>{match.pred_home} – {match.pred_away}</span></span>
                        {matches.length > 1 && (
                            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                {matches.map((_, i) => (
                                    <button key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? '16px' : '6px', height: '6px', borderRadius: '999px', border: 'none', cursor: 'pointer', padding: 0, background: i === idx ? 'var(--accent)' : 'rgba(242,237,228,.25)', transition: 'all .2s' }} />
                                ))}
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div style={{ height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--line)', marginBottom: '0' }}>
                    <span style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: "'Space Mono',monospace" }}>{t.insight.loading}</span>
                </div>
            )}

            <div style={{ paddingTop: '14px' }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: '12px', color: 'var(--chalk)', marginBottom: '10px' }}>{t.insight.newsletter}</div>
                {status === 'ok' ? (
                    <p style={{ fontSize: '12px', color: 'var(--accent)', margin: 0 }}>{t.insight.subscribed}</p>
                ) : (
                    <form onSubmit={submitEmail} style={{ display: 'flex', gap: '6px' }}>
                        <input
                            type="email" required value={email} onChange={e => setEmail(e.target.value)}
                            placeholder={t.insight.emailPh}
                            style={{ flex: 1, fontSize: '12px', borderRadius: '6px', border: '1px solid var(--line)', background: 'rgba(242,237,228,.05)', color: 'var(--chalk)', padding: '7px 10px', outline: 'none', fontFamily: "'Space Grotesk',sans-serif" }}
                        />
                        <button type="submit" disabled={status === 'loading'}
                            style={{ padding: '7px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '6px', border: 'none', cursor: 'pointer', background: 'var(--accent)', color: 'var(--ink)', fontFamily: "'Space Grotesk',sans-serif", flexShrink: 0 }}
                        >{t.insight.subscribe}</button>
                    </form>
                )}
            </div>
        </div>
    )
}

// ── Contact form ──────────────────────────────────────────────────────────────
const ContactForm = ({ t }) => {
    const f = t.contact.form
    const [success, setSuccess] = React.useState(false)
    const [errors, setErrors]   = React.useState({})

    const handleSubmit = (e) => {
        e.preventDefault()
        const fd = new FormData(e.target)
        const name  = fd.get('name')?.trim()  || ''
        const email = fd.get('email')?.trim() || ''
        const club  = fd.get('club')?.trim()  || ''
        const role  = fd.get('role')?.trim()  || ''
        const msg   = fd.get('msg')?.trim()   || ''
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        const errs = {}
        if (!name)       errs.name  = true
        if (!validEmail) errs.email = true
        setErrors(errs)
        if (Object.keys(errs).length > 0) return
        const subject = `${f.emailSubject} — ${club || name}`
        const body = `Name: ${name}\nClub: ${club}\nRole: ${role}\nEmail: ${email}\n\n${msg}`
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        setSuccess(true)
    }

    if (success) {
        return (
            <div className="oa-form">
                <div className="oa-success">
                    <div className="oa-success-icon">
                        <svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>
                    </div>
                    <h3>{f.successTitle}</h3>
                    <p>{f.successBody}</p>
                </div>
            </div>
        )
    }

    return (
        <form className="oa-form" onSubmit={handleSubmit} noValidate>
            <div className="oa-frow">
                <div className="oa-field">
                    <label className="oa-label" htmlFor="name">{f.nameLbl}</label>
                    <input className="oa-input" id="name" name="name" type="text" placeholder={f.namePh} />
                    {errors.name && <div className="oa-err show">{f.errName}</div>}
                </div>
                <div className="oa-field">
                    <label className="oa-label" htmlFor="club">{f.clubLbl}</label>
                    <input className="oa-input" id="club" name="club" type="text" placeholder={f.clubPh} />
                </div>
            </div>
            <div className="oa-frow">
                <div className="oa-field">
                    <label className="oa-label" htmlFor="role">{f.roleLbl}</label>
                    <input className="oa-input" id="role" name="role" type="text" placeholder={f.rolePh} />
                </div>
                <div className="oa-field">
                    <label className="oa-label" htmlFor="email">{f.emailLbl}</label>
                    <input className="oa-input" id="email" name="email" type="email" placeholder={f.emailPh} />
                    {errors.email && <div className="oa-err show">{f.errEmail}</div>}
                </div>
            </div>
            <div className="oa-field full">
                <label className="oa-label" htmlFor="msg">{f.msgLbl}</label>
                <textarea className="oa-textarea" id="msg" name="msg" placeholder={f.msgPh} />
            </div>
            <button type="submit" className="oa-btn oa-btn-primary">{f.submit}</button>
            <p className="oa-formnote">
                {f.note}{' '}<a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
        </form>
    )
}

// ── Content tab: Articles ─────────────────────────────────────────────────────
function ArticlesSection({ posts, lang, t }) {
    const filtered = (posts || []).filter(n => (n.frontmatter.lang || 'fr') === lang)
    if (filtered.length === 0) {
        return <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '48px 0' }}>{t.articles.empty}</p>
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filtered.map(node => (
                <Link key={node.id} to={`/blog/${node.frontmatter.slug}`} className="oa-article-card">
                    <div className="oa-article-date">{node.frontmatter.datePublished}</div>
                    <div className="oa-article-title">{node.frontmatter.title}</div>
                    {node.excerpt && <div className="oa-article-excerpt">{node.excerpt}</div>}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '14px' }}>
                        {(node.frontmatter.categories || '').split('|').filter(Boolean).map(cat => (
                            <Tag key={cat} category={cat} />
                        ))}
                    </div>
                </Link>
            ))}
        </div>
    )
}

// ── Content tab: Analytics ────────────────────────────────────────────────────
const OUTCOME_BADGE_STYLE = {
    H: { background: 'rgba(198,255,58,.15)', color: '#C6FF3A', border: '1px solid rgba(198,255,58,.3)' },
    D: { background: 'rgba(255,200,58,.12)', color: '#FFD03A', border: '1px solid rgba(255,200,58,.3)' },
    A: { background: 'rgba(255,46,126,.12)', color: '#FF2E7E', border: '1px solid rgba(255,46,126,.3)' },
}
function OutcomeBadge({ outcome, labels }) {
    return (
        <span style={{
            display: 'inline-block', padding: '2px 8px', borderRadius: '999px',
            fontSize: '11px', fontWeight: 700,
            fontFamily: "'Space Mono',monospace", letterSpacing: '.08em',
            ...OUTCOME_BADGE_STYLE[outcome],
        }}>
            {labels[outcome]}
        </span>
    )
}

function AnalyticsSection({ t }) {
    const at = t.analytics
    const [predData, setPredData] = React.useState(null)
    const [loading, setLoading]   = React.useState(true)
    const [champ, setChamp]       = React.useState('top14')

    React.useEffect(() => {
        fetch('/predictions.json')
            .then(r => r.ok ? r.json() : Promise.reject())
            .then(d => { setPredData(d); setLoading(false) })
            .catch(() => setLoading(false))
    }, [])

    if (loading) return <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '48px 0' }}>{at.loading}</p>
    if (!predData) return (
        <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <p style={{ color: 'var(--muted)', marginBottom: '16px' }}>{at.empty}</p>
            <Link to="/predictions" style={{ color: 'var(--accent)', textDecoration: 'none', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '14px' }}>
                {at.goTo}
            </Link>
        </div>
    )

    const champData = predData[champ]
    if (!champData) return null
    const { current } = champData
    const champLabel = champ === 'top14' ? 'Top 14' : 'Pro D2'

    return (
        <div>
            {/* Championship selector */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                {[{ id: 'top14', label: 'Top 14' }, { id: 'prod2', label: 'Pro D2' }].map(c => (
                    <button
                        key={c.id}
                        onClick={() => setChamp(c.id)}
                        style={{
                            padding: '6px 16px', borderRadius: '999px', fontSize: '12px',
                            fontWeight: 700, border: '1px solid', cursor: 'pointer',
                            fontFamily: "'Space Grotesk',sans-serif",
                            ...(champ === c.id
                                ? { background: 'var(--accent)', borderColor: 'var(--accent)', color: 'var(--ink)' }
                                : { background: 'transparent', borderColor: 'var(--line)', color: 'var(--muted)' }),
                        }}
                    >
                        {c.label}
                    </button>
                ))}
            </div>

            {/* Round header */}
            <div style={{ marginBottom: '16px' }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '18px', fontWeight: 700, color: 'var(--chalk)', marginBottom: '4px' }}>
                    {champLabel} — Journée {current.day}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: "'Space Mono',monospace", letterSpacing: '.08em', textTransform: 'uppercase' }}>
                    {at.season} {current.season}
                </div>
            </div>

            {/* Match rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
                {current.matches.map((m, i) => {
                    const primary = m.lineup_available ? m.lineup : m.base
                    return (
                        <div key={i} style={{
                            display: 'grid', gridTemplateColumns: '1fr auto auto 1fr',
                            alignItems: 'center', gap: '16px',
                            background: 'var(--ink-2)', border: '1px solid var(--line)',
                            borderRadius: '10px', padding: '12px 20px',
                        }}>
                            <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, color: 'var(--chalk)', fontSize: '14px' }}>
                                {m.home}
                            </span>
                            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '13px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                                {Math.round(primary.pred_home)} – {Math.round(primary.pred_away)}
                            </span>
                            <OutcomeBadge outcome={primary.outcome} labels={at.outcomes} />
                            <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, color: 'var(--chalk)', fontSize: '14px', textAlign: 'right' }}>
                                {m.away}
                            </span>
                        </div>
                    )
                })}
            </div>

            <Link
                to="/predictions"
                style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '14px',
                    color: 'var(--accent)', textDecoration: 'none',
                    borderBottom: '1px solid rgba(198,255,58,.3)', paddingBottom: '2px',
                }}
            >
                {at.viewFull}
            </Link>
        </div>
    )
}

// ── Content tab: About ────────────────────────────────────────────────────────
function AboutSection({ t }) {
    const ab = t.about
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '48px', alignItems: 'start', maxWidth: '820px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                <div style={{ borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--line)', width: '120px', height: '120px' }}>
                    <StaticImage
                        style={{ width: '120px', height: '120px' }}
                        imgStyle={{ transition: 'none', opacity: 1, willChange: 'none' }}
                        alt="Baptiste Monpezat"
                        src="../images/baptiste.jpeg"
                        layout="fixed"
                        width={120}
                        height={120}
                    />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: '15px', color: 'var(--chalk)', marginBottom: '2px' }}>Baptiste Monpezat</div>
                    <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>{ab.founder}</div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <p style={{ fontSize: '18px', color: 'var(--chalk)', margin: 0, lineHeight: 1.55, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600 }}>
                    {ab.headline}
                </p>
                {ab.bio.map((text, i) => (
                    <p key={i} style={{ fontSize: '15px', color: 'var(--muted)', margin: 0, lineHeight: 1.75 }}>{text}</p>
                ))}
                <div style={{ marginTop: '8px' }}>
                    <a
                        href="#contact"
                        style={{
                            fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '13px',
                            borderRadius: '999px', padding: '9px 18px',
                            background: 'var(--accent)', color: 'var(--ink)', textDecoration: 'none',
                        }}
                    >
                        {ab.cta}
                    </a>
                </div>
            </div>
        </div>
    )
}

// ── Page ──────────────────────────────────────────────────────────────────────
const IndexPage = ({ data }) => {
    const [lang, setLang]           = React.useState('fr')
    const [activeTab, setActiveTab] = React.useState('articles')

    // restore saved language after mount (avoids SSR mismatch)
    React.useEffect(() => {
        const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('oa-lang') : null
        if (saved === 'en') setLang('en')
    }, [])

    const changeLang = (l) => {
        setLang(l)
        if (typeof localStorage !== 'undefined') localStorage.setItem('oa-lang', l)
    }

    const t = TRANSLATIONS[lang]

    const CONTENT_TABS = [
        { id: 'articles',  label: t.nav.articles  },
        { id: 'analytics', label: t.nav.analytics },
        { id: 'about',     label: t.nav.about     },
    ]

    const switchTab = (id) => {
        setActiveTab(id)
        if (typeof document !== 'undefined') {
            document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const tabBtnStyle = (id) => ({
        background: 'none', border: 'none', cursor: 'pointer',
        fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '13px',
        letterSpacing: '.08em', textTransform: 'uppercase',
        color: activeTab === id ? 'var(--chalk)' : 'var(--muted)',
        padding: '4px 0',
        borderBottom: `2px solid ${activeTab === id ? 'var(--accent)' : 'transparent'}`,
        transition: 'color .15s',
    })

    const langBtnStyle = (l) => ({
        background: 'none', border: 'none', cursor: 'pointer',
        fontFamily: "'Space Mono',monospace", fontSize: '11px',
        letterSpacing: '.1em', textTransform: 'uppercase',
        color: lang === l ? 'var(--chalk)' : 'var(--muted)',
        fontWeight: lang === l ? 700 : 400,
        padding: '4px 5px',
        transition: 'color .15s',
    })

    return (
        <div className="oa-page">

            {/* ── nav ── */}
            <nav className="oa-nav">
                <div className="oa-wrap">
                    <a className="oa-nav-brand" href="#top">
                        <GlitchLogo variant="chrom sm" size="nav" />
                    </a>
                    <div className="oa-nav-links">
                        {CONTENT_TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => switchTab(tab.id)}
                                style={tabBtnStyle(tab.id)}
                                onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.color = 'var(--chalk)' }}
                                onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.color = 'var(--muted)' }}
                            >
                                {tab.label}
                            </button>
                        ))}

                        {/* Language toggle */}
                        <div style={{ display: 'flex', alignItems: 'center', borderLeft: '1px solid var(--line)', paddingLeft: '12px', gap: '0' }}>
                            <button style={langBtnStyle('fr')} onClick={() => changeLang('fr')}>FR</button>
                            <span style={{ color: 'var(--line)', fontSize: '12px' }}>|</span>
                            <button style={langBtnStyle('en')} onClick={() => changeLang('en')}>EN</button>
                        </div>

                        <a href="#contact" className="oa-btn oa-btn-primary" style={{ color: '#15110E' }}>{t.nav.cta}</a>
                    </div>
                </div>
            </nav>

            {/* ── hero ── */}
            <header className="oa-hero" id="top">
                <div className="oa-hero-streak" />
                <div className="oa-wrap">
                    <div>
                        <div className="oa-eyebrow">{t.hero.eyebrow}</div>
                        <GlitchLogo variant="mosh" size="hero" />
                        <p className="oa-hero-sub">
                            {t.hero.subBefore}<span className="hl">{t.hero.subHl}</span>{t.hero.subAfter}
                        </p>
                        <p className="lead">{t.hero.lead}</p>
                        <div className="oa-cta">
                            <a href="#contact" className="oa-btn oa-btn-primary" style={{ color: '#15110E' }}>{t.hero.ctaPrimary}</a>
                            <button onClick={() => switchTab('articles')}  className="oa-btn oa-btn-ghost">{t.hero.ctaGhost}</button>
                        </div>
                    </div>
                    <div>
                        <InsightCard t={t} />
                    </div>
                </div>
            </header>

            {/* ── content hub ── */}
            <section id="content" style={{ padding: '64px 0', borderTop: '1px solid var(--line)' }}>
                <div className="oa-wrap">
                    <div style={{ display: 'flex', borderBottom: '1px solid var(--line)', marginBottom: '40px', gap: '4px' }}>
                        {CONTENT_TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    padding: '10px 20px', background: 'none', border: 'none',
                                    borderBottom: `2px solid ${activeTab === tab.id ? 'var(--accent)' : 'transparent'}`,
                                    cursor: 'pointer', fontFamily: "'Space Grotesk',sans-serif",
                                    fontWeight: 700, fontSize: '14px',
                                    color: activeTab === tab.id ? 'var(--chalk)' : 'var(--muted)',
                                    transition: 'color .15s', marginBottom: '-1px',
                                }}
                                onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.color = 'var(--chalk)' }}
                                onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.color = 'var(--muted)' }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'articles'  && <ArticlesSection posts={data.allMdx.nodes} lang={lang} t={t} />}
                    {activeTab === 'analytics' && <AnalyticsSection t={t} />}
                    {activeTab === 'about'     && <AboutSection t={t} />}
                </div>
            </section>

            {/* ── services ── */}
            <section className="oa-section oa-services" id="services">
                <div className="oa-wrap">
                    <div className="oa-shead">
                        <div className="oa-eyebrow">{t.services.eyebrow}</div>
                        <h2>{t.services.heading}</h2>
                        <p>{t.services.sub}</p>
                    </div>
                    <div className="oa-cards">
                        {[
                            <svg key="0" viewBox="0 0 24 24"><path d="M3 3v18h18" /><path d="M7 14l4-4 3 3 5-6" /></svg>,
                            <svg key="1" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
                            <svg key="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>,
                        ].map((icon, i) => (
                            <div key={i} className="oa-card">
                                <div className="oa-card-ic">{icon}</div>
                                <h3>{t.services.cards[i].title}</h3>
                                <p>{t.services.cards[i].body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── approach ── */}
            <section className="oa-section oa-approach" id="approach">
                <div className="oa-wrap">
                    <div className="oa-shead">
                        <div className="oa-eyebrow">{t.approach.eyebrow}</div>
                        <h2>{t.approach.heading}</h2>
                        {t.approach.sub && <p style={{ marginTop: '12px', color: 'var(--muted)', fontSize: '16px', maxWidth: '560px' }}>{t.approach.sub}</p>}
                    </div>
                    <div className="oa-steps">
                        {t.approach.steps.map(s => (
                            <div key={s.num} className="oa-step">
                                <span className="oa-step-num">{s.num}</span>
                                <h3>{s.title}</h3>
                                <p>{s.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── band ── */}
            <div className="oa-band">
                <div className="oa-wrap">
                    <p>
                        {t.band.line1}<br />
                        <span className="hl">{t.band.line2}</span>
                    </p>
                </div>
            </div>

            {/* ── contact ── */}
            <section className="oa-section oa-contact" id="contact">
                <div className="oa-wrap">
                    <div className="oa-shead">
                        <div className="oa-eyebrow">{t.contact.eyebrow}</div>
                        <h2>{t.contact.heading}</h2>
                    </div>
                    <div className="oa-contact-grid">
                        <div>
                            <p className="lead">{t.contact.lead}</p>
                            <div className="oa-direct">
                                <a href={`mailto:${CONTACT_EMAIL}`}>
                                    <svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 6 10-6" /></svg>
                                    {CONTACT_EMAIL}
                                </a>
                            </div>
                        </div>
                        <ContactForm t={t} />
                    </div>
                </div>
            </section>

            {/* ── footer ── */}
            <footer className="oa-footer">
                <div className="oa-wrap">
                    <a className="oa-footer-brand" href="#top">
                        <GlitchLogo variant="chrom sm" size="foot" />
                    </a>
                    <span className="oa-fmeta">{t.footer.tagline}</span>
                    <span className="oa-fmeta">{t.footer.copy}</span>
                </div>
            </footer>

        </div>
    )
}

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { datePublished: DESC } }) {
      nodes {
        id
        excerpt
        frontmatter {
          title
          slug
          lang
          datePublished(formatString: "MMMM D, YYYY")
          categories
        }
      }
    }
  }
`

export const Head = () => (
    <Seo
        page="Offload AI — L'IA au service du rugby"
        description="Offload AI transforme vos données de match en décisions claires — analyse adverse, charge joueur, recrutement."
        type="website"
        path=""
    />
)

export default IndexPage
