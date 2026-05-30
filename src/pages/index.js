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
            articles: 'Articles', analytics: 'Analytics', about: 'À propos', cta: 'Me contacter',
        },
        hero: {
            eyebrow: "Rugby & data science",
            subBefore: 'Chaque ', subHl: 'phase', subAfter: ' compte.',
            lead: "Je m'appelle Baptiste. Je construis des modèles de prédiction, j'explore les statistiques rugby et je partage mes analyses ici — par passion pour le jeu et pour la data.",
            ctaPrimary: 'Me contacter →', ctaGhost: 'Lire les articles',
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
            founder: 'Sport Data Analyst',
            headline: "Senior Data Analyst chez Betclic, passionné de rugby — j'explore les statistiques du jeu par le code.",
            bio: [
                "Offload AI est né de Data Ruck, un blog personnel où je publie mes analyses rugby : prédiction de matchs, évaluation des joueurs, modèles statistiques. Un terrain de jeu personnel autant qu'un outil pour mieux comprendre le rugby.",
                "Je construis ces modèles le soir et le week-end, par curiosité et par amour du sport. Si une analyse t'a plu ou si tu veux en discuter, n'hésite pas à me contacter.",
            ],
            cta: 'Me contacter →',
        },
        services: {
            eyebrow: 'Ce que j\'explore',
            heading: 'La data au service du rugby.',
            sub: "Des modèles statistiques et des analyses construits pour mieux comprendre le jeu — prédictions de matchs, facteurs de victoire, analyse des coups de pied.",
            cards: [
                { title: 'Prédiction de matchs', body: "Modèles machine learning entraînés sur l'historique des résultats, les scores ELO et les compositions pour estimer les probabilités de victoire avant chaque journée." },
                { title: 'Analyse des performances', body: "Exploration des données GPS, de charge et de statistiques pour identifier ce qui distingue les équipes qui gagnent de celles qui perdent." },
                { title: 'Science des coups de pied', body: "Trigonométrie, régression logistique et données de la Coupe du monde pour modéliser la probabilité de réussite d'une pénalité ou transformation." },
                { title: 'Sources multiples', body: "Opta, Hawkeye, GPS Catapult, vidéo taguée — j'explore comment agréger et valoriser des données hétérogènes pour en tirer des analyses concrètes." },
            ],
        },
        approach: {
            eyebrow: 'Ma démarche',
            heading: 'Du terrain au modèle.',
            sub: "Chaque analyse part d'une question que je me pose en regardant un match. Le code et les données sont là pour y répondre.",
            steps: [
                { num: '01', title: 'Une question de terrain', body: "Tout commence par une observation : une tendance tactique, une stat qui surprend, un résultat difficile à expliquer." },
                { num: '02', title: 'Collecter & nettoyer les données', body: "Résultats historiques, stats de match, compositions, données GPS — je consolide ce qui existe pour construire une base solide." },
                { num: '03', title: 'Modéliser', body: "Régression, random forest, ELO, SHAP… je m'appuie sur des méthodes éprouvées en les adaptant aux spécificités du rugby." },
                { num: '04', title: 'Partager', body: "Articles, visualisations et pronostics publiés ici avant chaque journée — pour que les résultats soient lisibles par tous, pas seulement par des data scientists." },
            ],
        },
        band: { line1: 'La prochaine journée approche.', line2: 'Les pronostics sont déjà prêts.' },
        contact: {
            eyebrow: 'Me contacter', heading: 'Une question, une idée ?',
            lead: "Tu as une question sur une analyse, une idée de sujet, ou tu veux simplement échanger sur le rugby et la data ? Envoie-moi un message.",
            form: {
                nameLbl: 'Ton prénom', namePh: 'Jean-Baptiste',
                clubLbl: 'Club / contexte', clubPh: 'ex. supporter toulonnais, analyste...',
                roleLbl: 'Ton rôle', rolePh: 'Joueur, coach, passionné...',
                emailLbl: 'E-mail', emailPh: 'toi@email.fr',
                msgLbl: 'Ton message',
                msgPh: 'Une question sur une analyse, une idée de sujet…',
                submit: 'Envoyer →',
                note: 'Tu préfères un e-mail direct ? Écris à',
                errName: 'Merci d\'indiquer ton prénom.',
                errEmail: 'Merci d\'indiquer un e-mail valide.',
                successTitle: 'E-mail prêt !',
                successBody: "Ton application e-mail s'est ouverte avec le message pré-rempli — il ne reste plus qu'à envoyer.",
                emailSubject: 'Message depuis Offload AI',
            },
        },
        footer: { tagline: "Rugby & data science", copy: '© 2026 Baptiste Monpezat' },
    },
    en: {
        nav: {
            articles: 'Articles', analytics: 'Analytics', about: 'About', cta: 'Get in touch',
        },
        hero: {
            eyebrow: 'Rugby & data science',
            subBefore: 'Make every ', subHl: 'phase', subAfter: ' count.',
            lead: "I'm Baptiste. I build prediction models, explore rugby statistics and share my analyses here — out of passion for the game and for data.",
            ctaPrimary: 'Get in touch →', ctaGhost: 'Read articles',
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
            founder: 'Sport Data Analyst',
            headline: "Senior Data Analyst at Betclic and rugby fan — I explore the game through code and statistics.",
            bio: [
                "Offload AI grew out of Data Ruck, a personal blog where I publish my rugby analyses: match predictions, player ratings, statistical models. A personal playground as much as a tool for understanding the game better.",
                "I build these models in evenings and weekends, out of curiosity and love for the sport. If an analysis caught your eye or you want to chat about rugby and data, feel free to reach out.",
            ],
            cta: 'Get in touch →',
        },
        services: {
            eyebrow: 'What I explore',
            heading: 'Data in the service of rugby.',
            sub: "Statistical models and analyses built to better understand the game — match predictions, winning factors, kick analysis.",
            cards: [
                { title: 'Match prediction', body: "Machine learning models trained on historical results, ELO scores and lineups to estimate win probabilities before each round." },
                { title: 'Performance analysis', body: "Exploring GPS, workload and match stats to identify what separates winning teams from losing ones." },
                { title: 'Kick science', body: "Trigonometry, logistic regression and World Cup data to model the probability of a successful penalty or conversion." },
                { title: 'Multi-source data', body: "Opta, Hawkeye, GPS Catapult, tagged footage — exploring how to aggregate heterogeneous data sources into meaningful rugby insights." },
            ],
        },
        approach: {
            eyebrow: 'My approach',
            heading: 'From the pitch to the model.',
            sub: "Every analysis starts with a question I ask myself watching a match. Code and data are there to answer it.",
            steps: [
                { num: '01', title: 'A pitch-side question', body: "It starts with an observation: a tactical pattern, a surprising stat, a result that's hard to explain." },
                { num: '02', title: 'Collect & clean the data', body: "Historical results, match stats, lineups, GPS data — I consolidate what exists to build a solid foundation." },
                { num: '03', title: 'Model it', body: "Regression, random forest, ELO, SHAP… I use proven methods adapted to the specifics of rugby." },
                { num: '04', title: 'Share it', body: "Articles, visualisations and predictions published here before each round — readable by everyone, not just data scientists." },
            ],
        },
        band: { line1: 'The next round is coming.', line2: 'Predictions are already in.' },
        contact: {
            eyebrow: 'Get in touch', heading: 'A question or an idea?',
            lead: "Got a question about an analysis, an idea for a topic, or just want to talk rugby and data? Send me a message.",
            form: {
                nameLbl: 'Your name', namePh: 'Jane Coombes',
                clubLbl: 'Club / context', clubPh: 'e.g. rugby fan, analyst...',
                roleLbl: 'Your role', rolePh: 'Player, coach, fan...',
                emailLbl: 'Email', emailPh: 'you@email.com',
                msgLbl: 'Your message',
                msgPh: 'A question about an analysis, a topic idea…',
                submit: 'Send →',
                note: 'Prefer email? Write to',
                errName: 'Please add your name.',
                errEmail: 'Please add a valid email.',
                successTitle: 'Email ready!',
                successBody: "Your email app opened with the message pre-filled — just hit send.",
                emailSubject: 'Message from Offload AI',
            },
        },
        footer: { tagline: 'Rugby & data science', copy: '© 2026 Baptiste Monpezat' },
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
