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
            articles: 'Articles', analytics: 'Analytics', about: 'À propos', quiz: 'Quiz', players: 'Joueurs', cta: 'Me contacter',
        },
        hero: {
            eyebrow: "Rugby & data science",
            subBefore: 'Rugby. ', subHl: 'Data', subAfter: '. Décisions.',
            lead: "Je m'appelle Baptiste. J'explore les statistiques rugby et je partage mes analyses ici — par passion pour le jeu et pour la data.",
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
            viewFull: "Pronostics complets & historique →",
            tabResult: 'Résultat', tabScorers: 'Marqueurs',
            outcomes: { H: 'Dom.', D: 'Nul', A: 'Ext.' },
            scorers: {
                title: 'Marqueurs probables',
                sub: 'Probabilité de marquer un essai — modèle entraîné sur l\'historique, les compos et les ELOs',
                tryProba: 'Proba.',
                noData: 'Aucune prédiction de marqueurs disponible.',
                seeAll: 'Voir tout',
                clickHint: 'Cliquer un joueur pour les détails',
                feats: {
                    tryRate: 'Tx. essai (saison glissante)',  tryRateNote: '% matchs avec essai',
                    teamAttack: 'Attaque équipe',             attackNote: 'essais/match moy.',
                    oppDefense: 'Défense adverse',            defenseNote: 'essais concédés/match',
                    expTries:   'Essais attendus (match)',    expNote:     'attaque + défense',
                    elo:        'ELO équipe',
                    eloDiff:    'Avantage ELO',               eloDiffNote: 'vs adversaire',
                    rankScored: 'Pts marqués / match',        rankScoredNote: 'classement',
                    rankConc:   'Pts concédés adv. / match',  rankConcNote:   'classement',
                    games:      'Matchs joués (saison)',
                    home: 'Dom.', away: 'Ext.',
                },
            },
        },
        about: {
            founder: 'Sport Data Analyst',
            headline: "Senior Data Analyst chez Betclic, passionné de rugby — j'explore les statistiques du jeu par le code.",
            bio: [
                "Data Ruck est un blog personnel où je publie mes analyses rugby : prédiction de matchs, évaluation des joueurs, modèles statistiques. Un terrain de jeu personnel autant qu'un outil pour mieux comprendre le rugby.",
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
                emailSubject: 'Message depuis Data Ruck',
            },
        },
        footer: { tagline: "Rugby & data science", copy: '© 2026 Baptiste Monpezat' },
    },
    en: {
        nav: {
            articles: 'Articles', analytics: 'Analytics', about: 'About', quiz: 'Quiz', players: 'Players', cta: 'Get in touch',
        },
        hero: {
            eyebrow: 'Rugby & data science',
            subBefore: 'Rugby. ', subHl: 'Data', subAfter: '. Decisions.',
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
            viewFull: 'Full predictions & history →',
            tabResult: 'Result', tabScorers: 'Scorers',
            outcomes: { H: 'Home', D: 'Draw', A: 'Away' },
            scorers: {
                title: 'Probable try scorers',
                sub: 'Try-scoring probability — model trained on history, lineups and ELOs',
                tryProba: 'Proba.',
                noData: 'No scorer predictions available.',
                seeAll: 'See all',
                clickHint: 'Click a player for details',
                feats: {
                    tryRate: 'Try rate (rolling season)',     tryRateNote: '% games with try',
                    teamAttack: 'Team attack',                attackNote: 'tries/game avg.',
                    oppDefense: 'Opp. defense',               defenseNote: 'tries conceded/game',
                    expTries:   'Expected tries (match)',     expNote:     'attack + defense',
                    elo:        'Team ELO',
                    eloDiff:    'ELO advantage',              eloDiffNote: 'vs opponent',
                    rankScored: 'Pts scored / game',          rankScoredNote: 'standings',
                    rankConc:   'Opp. pts conceded / game',   rankConcNote:   'standings',
                    games:      'Games played (season)',
                    home: 'Home', away: 'Away',
                },
            },
        },
        about: {
            founder: 'Sport Data Analyst',
            headline: "Senior Data Analyst at Betclic and rugby fan — I explore the game through code and statistics.",
            bio: [
                "Data Ruck is a personal blog where I publish my rugby analyses: match predictions, player ratings, statistical models. A personal playground as much as a tool for understanding the game better.",
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
                emailSubject: 'Message from Data Ruck',
            },
        },
        footer: { tagline: 'Rugby & data science', copy: '© 2026 Baptiste Monpezat' },
    },
}

// ── Glitch logo ──────────────────────────────────────────────────────────────
const GlitchLogo = ({ variant = 'chrom sm', size = 'nav' }) => (
    <span
        className={`glogo ${variant}`}
        data-text="DATA RUCK"
        style={{ fontSize: size === 'hero' ? 'clamp(50px,8vw,104px)' : size === 'foot' ? '20px' : '21px' }}
    >
        DATA <span className="ai-lime">RUCK</span>
    </span>
)

// ── ELO ticker ────────────────────────────────────────────────────────────────
const EloBanner = () => {
    const [matches, setMatches] = React.useState([])

    React.useEffect(() => {
        Promise.all([
            fetch('/predictions.json').then(r => r.json()),
            fetch('/player_predictions.json').then(r => r.ok ? r.json() : null).catch(() => null),
        ]).then(([data, scorer]) => {
            const result = []
            for (const [champKey, champLabel] of [['top14', 'TOP 14'], ['prod2', 'PRO D2']]) {
                const champData = data[champKey]
                const hist = champData?.history
                if (!hist || hist.length < 1) continue

                const roundAfter = champData.current
                const isPlayoff  = isNaN(parseInt(roundAfter?.day))

                // Build ELO lookup from last regular-season history round
                const histElo = {}
                for (const m of hist[hist.length - 1].matches) {
                    if (m.raw?.elo_home != null) histElo[m.home] = m.raw.elo_home
                    if (m.raw?.elo_away != null) histElo[m.away] = m.raw.elo_away
                }

                result.push({ separator: true, label: champLabel })

                if (isPlayoff) {
                    // Show current playoff round with ELO deltas vs the previous completed round.
                    // delta = current round ELO (post-previous-match) minus hist[-1] ELO (pre-previous-match).
                    for (const m of (roundAfter?.matches ?? [])) {
                        const eloH = m.raw?.elo_home ?? histElo[m.home]
                        const eloA = m.raw?.elo_away ?? histElo[m.away]
                        if (eloH == null || eloA == null) continue
                        const prevH = histElo[m.home], prevA = histElo[m.away]
                        const dH = (m.raw?.elo_home != null && prevH != null) ? m.raw.elo_home - prevH : null
                        const dA = (m.raw?.elo_away != null && prevA != null) ? m.raw.elo_away - prevA : null
                        result.push({ home: m.home, away: m.away, day: roundAfter.day, eloH, eloA, deltaH: dH, deltaA: dA })
                    }
                } else {
                    // Regular season: hist[-1] stores ELO before the last completed round;
                    // current stores ELO before the upcoming round (= after last completed round).
                    // Delta = current.elo - hist[-1].elo = impact of the last completed round.
                    if (hist.length < 1) continue
                    const roundN  = hist[hist.length - 1]  // last completed round (pre-round ELO)
                    const afterElo = {}
                    for (const m of roundAfter.matches) {  // current: post-last-round ELO
                        if (m.raw?.elo_home != null) afterElo[m.home] = m.raw.elo_home
                        if (m.raw?.elo_away != null) afterElo[m.away] = m.raw.elo_away
                    }
                    for (const m of roundN.matches) {
                        const prevH = m.raw?.elo_home, prevA = m.raw?.elo_away
                        if (prevH == null || prevA == null) continue
                        const afterH = afterElo[m.home], afterA = afterElo[m.away]
                        result.push({
                            home: m.home, away: m.away,
                            day: roundN.day,
                            eloH: afterH ?? prevH, eloA: afterA ?? prevA,
                            deltaH: afterH != null ? afterH - prevH : null,
                            deltaA: afterA != null ? afterA - prevA : null,
                        })
                    }
                }
            }
            setMatches(result)
        }).catch(() => {})
    }, [])

    if (!matches.length) return null

    const TeamElo = ({ name, elo, delta }) => {
        const up    = delta != null && delta > 0.3
        const down  = delta != null && delta < -0.3
        const color = up ? 'var(--accent)' : down ? '#FF6B7A' : 'var(--muted)'
        return (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '11px', color: 'var(--chalk)', whiteSpace: 'nowrap' }}>{name}</span>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: 'var(--muted)' }}>{Math.round(elo)}</span>
                {(up || down) && (
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color, fontWeight: 700 }}>
                        {up ? '▲' : '▼'}{delta > 0 ? '+' : ''}{delta.toFixed(1)}
                    </span>
                )}
            </span>
        )
    }

    const renderItem = (item, key) => {
        if (item.separator) {
            return (
                <span key={key} style={{ display: 'inline-flex', alignItems: 'center', padding: '0 20px' }}>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700 }}>
                        {item.label}
                    </span>
                </span>
            )
        }
        return (
            <span key={key} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '0 20px', borderLeft: '1px solid var(--line)' }}>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', borderRight: '1px solid var(--line)', paddingRight: '10px' }}>
                    {isNaN(parseInt(item.day)) ? item.day.replace('-', ' ') : `J${item.day}`}
                </span>
                <TeamElo name={item.home} elo={item.eloH} delta={item.deltaH} />
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: 'var(--muted)', letterSpacing: '.1em' }}>VS</span>
                <TeamElo name={item.away} elo={item.eloA} delta={item.deltaA} />
            </span>
        )
    }

    return (
        <div style={{ background: 'var(--ink-2)', borderBottom: '1px solid var(--line)', height: '38px', display: 'flex', alignItems: 'center', overflow: 'hidden', position: 'relative' }}>
            {/* Static ELO label */}
            <div style={{ flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', padding: '0 16px', borderRight: '1px solid var(--line)', background: 'var(--ink-2)', zIndex: 3, gap: '6px' }}>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 700 }}>ELO</span>
            </div>
            {/* Fade right edge */}
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '60px', background: 'linear-gradient(to left, var(--ink-2), transparent)', zIndex: 2, pointerEvents: 'none' }} />
            {/* Scrolling track */}
            <div style={{ overflow: 'hidden', flex: 1 }}>
                <div className="oa-ticker-track">
                    {matches.map((item, i) => renderItem(item, i))}
                    {matches.map((item, i) => renderItem(item, `d${i}`))}
                </div>
            </div>
        </div>
    )
}

// ── Insight card ──────────────────────────────────────────────────────────────
const BREVO_FORM_ID_INSIGHT = process.env.GATSBY_BREVO_FORM_ID || ""

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

    const submitEmail = async () => {
        if (!email.trim()) return
        if (!BREVO_FORM_ID_INSIGHT) { setStatus("error"); return }
        setStatus("loading")
        try {
            await fetch(BREVO_FORM_ID_INSIGHT, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ EMAIL: email, email_address_check: "", locale: "fr" }).toString(),
            })
        } catch { /* CORS expected on opaque response */ }
        setStatus("ok")
    }

    return (
        <div className="oa-insight">
            <div className="oa-insight-top">
                <div className="oa-insight-top-l">
                    <span className="cardmono">DR</span>
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

            <div style={{ paddingTop: '18px' }}>
                {/* Brand header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                    <span className="glogo" data-text="DATA RUCK" style={{ fontSize: '15px' }}>
                        DATA <span className="ai-lime">RUCK</span>
                    </span>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--muted)', borderLeft: '1px solid var(--line)', paddingLeft: '10px' }}>
                        Newsletter
                    </span>
                </div>

                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: '13px', color: 'var(--chalk)', marginBottom: '12px', lineHeight: 1.4 }}>
                    {t.insight.newsletter}
                </div>

                {status === 'ok' ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(198,255,58,.08)', border: '1px solid rgba(198,255,58,.18)', borderRadius: '10px', padding: '10px 14px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <span style={{ fontSize: '12px', color: 'var(--accent)', fontFamily: "'Space Grotesk',sans-serif" }}>{t.insight.subscribed}</span>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <input
                            type="email" value={email} onChange={e => setEmail(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && submitEmail()}
                            placeholder={t.insight.emailPh}
                            style={{ width: '100%', fontSize: '13px', borderRadius: '8px', border: '1px solid var(--line)', background: 'var(--ink)', color: 'var(--chalk)', padding: '10px 12px', outline: 'none', fontFamily: "'Space Grotesk',sans-serif", transition: 'border-color .15s' }}
                            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                            onBlur={e => e.target.style.borderColor = 'rgba(242,237,228,.13)'}
                        />
                        <button type="button" onClick={submitEmail} disabled={status === 'loading'}
                            style={{ width: '100%', padding: '10px', fontSize: '13px', fontWeight: 700, borderRadius: '999px', border: 'none', cursor: 'pointer', background: 'var(--accent)', color: 'var(--ink)', fontFamily: "'Space Grotesk',sans-serif", letterSpacing: '.04em', transition: 'transform .12s', opacity: status === 'loading' ? 0.5 : 1 }}
                        >{status === 'loading' ? '…' : t.insight.subscribe}</button>
                        {status === 'error' && <p style={{ fontSize: '11px', color: '#FF2E7E', margin: '4px 0 0', fontFamily: "'Space Grotesk',sans-serif" }}>{t.insight.subscribed ? 'Une erreur est survenue.' : 'Something went wrong.'}</p>}
                    </div>
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

// ── Player scorer predictions ─────────────────────────────────────────────────

function ScorerFeatureTable({ player, home, away, sc }) {
    const f = player.feats || {}
    const isHome = f.is_home === 1
    const teamColor = isHome ? 'var(--accent)' : 'var(--cyan)'
    const rows = [
        { label: sc.feats.tryRate,      val: `${f.player_try_rate ?? '—'}%`,     note: sc.feats.tryRateNote },
        { label: sc.feats.teamAttack,   val: f.team_attack ?? '—',               note: sc.feats.attackNote },
        { label: sc.feats.oppDefense,   val: f.opp_defense ?? '—',               note: sc.feats.defenseNote },
        { label: sc.feats.expTries,     val: f.exp_tries ?? '—',                 note: sc.feats.expNote, highlight: true },
        { label: sc.feats.elo,          val: f.elo_team ?? '—',                  note: '' },
        { label: sc.feats.eloDiff,      val: f.elo_diff >= 0 ? `+${f.elo_diff}` : f.elo_diff, note: sc.feats.eloDiffNote, positive: f.elo_diff > 0 },
        { label: sc.feats.rankScored,   val: f.rank_scored_pg ?? '—',            note: sc.feats.rankScoredNote },
        { label: sc.feats.rankConc,     val: f.rank_opp_conceded ?? '—',         note: sc.feats.rankConcNote },
        { label: sc.feats.games,        val: f.games_played ?? '—',              note: '' },
    ]
    return (
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '10px', marginTop: '10px' }}>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '9px', letterSpacing: '.18em', textTransform: 'uppercase', color: teamColor, marginBottom: '8px' }}>
                {player.team} · {isHome ? (sc.feats.home || 'Dom.') : (sc.feats.away || 'Ext.')}
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                <tbody>
                    {rows.map((r, i) => (
                        <tr key={i} style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(242,237,228,.06)' }}>
                            <td style={{ padding: '4px 0', color: 'var(--muted)', fontFamily: "'Space Grotesk',sans-serif", paddingRight: '12px' }}>{r.label}</td>
                            <td style={{ padding: '4px 0', fontFamily: "'Space Mono',monospace", fontWeight: 700, textAlign: 'right',
                                color: r.highlight ? 'var(--chalk)' : r.positive === true ? 'var(--accent)' : r.positive === false ? '#FF6B7A' : 'var(--chalk)' }}>
                                {r.val}
                            </td>
                            {r.note ? <td style={{ padding: '4px 0 4px 8px', color: 'rgba(242,237,228,.35)', fontSize: '9px', fontFamily: "'Space Mono',monospace" }}>{r.note}</td> : <td />}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function ScorerMatchCard({ match, sc }) {
    const [open, setOpen] = React.useState(false)
    const [openPlayer, setOpenPlayer] = React.useState(null)
    const maxP = match.players[0]?.try_proba || 1
    const POS_LABEL = {
        wing: 'Ail.', fullback: 'Arr.', center: 'Ctr.', halfback: '1/2',
        flanker: 'Flk.', back_row: '3ème L.', lock: '2ème L.', front_row: '1ère L.',
    }
    return (
        <div style={{ background: 'var(--ink-2)', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 18px' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: '13px', color: 'var(--chalk)' }}>
                        <span style={{ color: 'var(--accent)' }}>{match.home}</span>
                        <span style={{ color: 'var(--muted)', fontWeight: 400, margin: '0 6px' }}>vs</span>
                        <span style={{ color: 'var(--cyan)' }}>{match.away}</span>
                    </div>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>{match.round}</span>
                </div>

                {/* Player rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {match.players.map((p, pi) => {
                        const isExpanded = openPlayer === pi
                        const color = p.team === match.home ? 'var(--accent)' : 'var(--cyan)'
                        return (
                            <div key={pi}>
                                <button onClick={() => setOpenPlayer(isExpanded ? null : pi)}
                                    style={{ width: '100%', background: isExpanded ? 'rgba(242,237,228,.04)' : 'none', border: 'none', cursor: 'pointer',
                                        borderRadius: '6px', padding: '6px 8px', display: 'grid',
                                        gridTemplateColumns: '22px 1fr 70px 44px', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: 'var(--muted)', textAlign: 'right' }}>{p.number}</span>
                                    <div style={{ textAlign: 'left', minWidth: 0 }}>
                                        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '12px', color: 'var(--chalk)',
                                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{p.name}</span>
                                        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '9px', color, letterSpacing: '.04em' }}>{POS_LABEL[p.position] || p.position}</span>
                                    </div>
                                    <div style={{ height: '4px', background: 'rgba(242,237,228,.08)', borderRadius: '2px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${(p.try_proba / maxP) * 100}%`, background: color, borderRadius: '2px' }} />
                                    </div>
                                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '11px', fontWeight: 700, color, textAlign: 'right' }}>{p.try_proba}%</span>
                                </button>
                                {isExpanded && (
                                    <div style={{ padding: '0 8px 8px' }}>
                                        <ScorerFeatureTable player={p} home={match.home} away={match.away} sc={sc} />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

function PlayerPredictionsSection({ champ, t }) {
    const sc = t.analytics.scorers
    const [data, setData]       = React.useState(null)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        fetch('/player_predictions.json')
            .then(r => r.ok ? r.json() : Promise.reject())
            .then(d => { setData(d); setLoading(false) })
            .catch(() => setLoading(false))
    }, [])

    const eyebrowStyle = { fontFamily: "'Space Mono',monospace", fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent)' }

    if (loading) return (
        <div style={{ marginBottom: '28px' }}>
            <div style={{ ...eyebrowStyle, marginBottom: '10px' }}>{sc.title}</div>
            <div style={{ display: 'flex', gap: '10px', overflow: 'hidden' }}>
                {[1,2,3].map(i => <div key={i} style={{ minWidth: '160px', height: '88px', background: 'var(--ink-2)', border: '1px solid var(--line)', borderRadius: '10px', opacity: 0.4, flexShrink: 0 }} />)}
            </div>
        </div>
    )

    if (!data?.matches?.length) return null

    const champLabel = champ === 'top14' ? 'TOP 14' : 'PRO D2'
    const matches = data.matches.filter(m => m.competition?.toUpperCase().replace(' ', '') === champLabel.replace(' ', ''))
    if (!matches.length) return null

    const POS_LABEL = {
        wing: 'Ail.', fullback: 'Arr.', center: 'Ctr.', halfback: '1/2',
        flanker: 'Flk.', back_row: '3L', lock: '2L', front_row: '1L',
    }

    return (
        <div style={{ marginBottom: '28px' }}>
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={eyebrowStyle}>{sc.title}</div>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '9px', letterSpacing: '.1em', color: 'rgba(242,237,228,.3)', textTransform: 'uppercase' }}>
                    {sc.clickHint}
                </span>
            </div>

            {/* Swipe strip */}
            <div style={{ overflowX: 'auto', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', display: 'flex', gap: '10px', paddingBottom: '4px', scrollbarWidth: 'none' }}
                className="oa-scorer-scroll">
                {matches.map((m, mi) => {
                    const top3 = m.players.slice(0, 3)
                    const maxP = top3[0]?.try_proba || 1
                    const matchId = `${m.home}-vs-${m.away}`.toLowerCase().replace(/[\s']/g, '-').replace(/[^a-z0-9-]/g, '')
                    return (
                        <Link key={mi} to={`/predictions#${matchId}`} style={{ textDecoration: 'none', minWidth: '200px', maxWidth: '200px', flexShrink: 0, scrollSnapAlign: 'start', display: 'block' }}>
                            <div style={{ background: 'var(--ink-2)', border: '1px solid var(--line)', borderRadius: '10px', padding: '12px 14px', transition: 'border-color .15s' }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(198,255,58,.4)'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}>
                                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: '11px', color: 'var(--muted)', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {m.home} <span style={{ fontWeight: 400 }}>vs</span> {m.away}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                    {top3.map((p, pi) => (
                                        <div key={pi} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <div style={{ flex: 1, height: '3px', background: 'rgba(242,237,228,.08)', borderRadius: '2px', overflow: 'hidden' }}>
                                                <div style={{ height: '100%', width: `${(p.try_proba / maxP) * 100}%`, background: p.team === m.home ? 'var(--accent)' : 'var(--cyan)', borderRadius: '2px' }} />
                                            </div>
                                            <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '11px', fontWeight: 600, color: 'var(--chalk)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '90px' }}>
                                                {p.name.split(' ').pop()}
                                            </span>
                                            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '9px', color: p.team === m.home ? 'var(--accent)' : 'var(--cyan)', flexShrink: 0 }}>
                                                {POS_LABEL[p.position] || p.position}
                                            </span>
                                            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', fontWeight: 700, color: p.team === m.home ? 'var(--accent)' : 'var(--cyan)', flexShrink: 0, minWidth: '32px', textAlign: 'right' }}>
                                                {p.try_proba}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>

            {/* Full expandable cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                {matches.map((m, mi) => (
                    <ScorerMatchCard key={mi} match={m} sc={sc} />
                ))}
            </div>
        </div>
    )
}

function MergedMatchCard({ match, scorerMatch, at }) {
    const sc = at.scorers
    const [tab, setTab] = React.useState('result')
    const [openPlayer, setOpenPlayer] = React.useState(null)
    const primary = match.lineup_available ? match.lineup : match.base
    const matchId = `${match.home}-vs-${match.away}`.toLowerCase().replace(/[\s']/g, '-').replace(/[^a-z0-9-]/g, '')

    const POS_LABEL = {
        wing: 'Ail.', fullback: 'Arr.', center: 'Ctr.', halfback: '1/2',
        flanker: 'Flk.', back_row: '3ème L.', lock: '2ème L.', front_row: '1ère L.',
    }
    const tabBtn = (id, label) => (
        <button onClick={() => { setTab(id); setOpenPlayer(null) }} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '4px 10px',
            fontFamily: "'Space Mono',monospace", fontSize: '10px', letterSpacing: '.12em',
            textTransform: 'uppercase', fontWeight: 700,
            color: tab === id ? 'var(--chalk)' : 'var(--muted)',
            borderBottom: `2px solid ${tab === id ? 'var(--accent)' : 'transparent'}`,
            transition: 'color .15s',
        }}>{label}</button>
    )

    return (
        <div style={{ background: 'var(--ink-2)', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden' }}>
            {/* Match header — always visible */}
            <div style={{ padding: '14px 18px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: '13px' }}>
                        <span style={{ color: 'var(--accent)' }}>{match.home}</span>
                        <span style={{ color: 'var(--muted)', fontWeight: 400, margin: '0 6px' }}>vs</span>
                        <span style={{ color: 'var(--cyan)' }}>{match.away}</span>
                    </div>
                    {match.lineup_available && (
                        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '9px', letterSpacing: '.08em', color: 'var(--accent)' }}>★ COMPO</span>
                    )}
                </div>
                {/* Tabs */}
                <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid var(--line)', marginLeft: '-18px', marginRight: '-18px', paddingLeft: '18px' }}>
                    {tabBtn('result', at.tabResult)}
                    {scorerMatch && tabBtn('scorers', at.tabScorers)}
                </div>
            </div>

            {/* Result tab */}
            {tab === 'result' && (
                <div style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '20px', fontWeight: 700, color: 'var(--chalk)' }}>
                            {Math.round(primary.pred_home)} – {Math.round(primary.pred_away)}
                        </span>
                        <OutcomeBadge outcome={primary.outcome} labels={at.outcomes} />
                    </div>
                    {/* Probability bars */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
                        {[['Dom.', primary.prob_h, 'var(--accent)'], ['Nul', primary.prob_d, 'rgba(242,237,228,.4)'], ['Ext.', primary.prob_a, '#FF6B7A']].map(([lbl, pct, col]) => (
                            <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: 'var(--muted)', width: '28px', flexShrink: 0 }}>{lbl}</span>
                                <div style={{ flex: 1, height: '6px', background: 'rgba(242,237,228,.08)', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${pct}%`, background: col, borderRadius: '3px', transition: 'width .4s' }} />
                                </div>
                                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '11px', fontWeight: 700, color: col, width: '34px', textAlign: 'right', flexShrink: 0 }}>{pct}%</span>
                            </div>
                        ))}
                    </div>
                    <Link to={`/predictions#${matchId}`} style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none' }}>
                        {at.viewFull} →
                    </Link>
                </div>
            )}

            {/* Scorers tab */}
            {tab === 'scorers' && scorerMatch && (
                <div style={{ padding: '10px 18px 14px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {scorerMatch.players.slice(0, 5).map((p, pi) => {
                            const isExpanded = openPlayer === pi
                            const color = p.team === match.home ? 'var(--accent)' : 'var(--cyan)'
                            const maxP = scorerMatch.players[0]?.try_proba || 1
                            return (
                                <div key={pi}>
                                    <button onClick={() => setOpenPlayer(isExpanded ? null : pi)} style={{
                                        width: '100%', background: isExpanded ? 'rgba(242,237,228,.04)' : 'none',
                                        border: 'none', cursor: 'pointer', borderRadius: '6px', padding: '6px 8px',
                                        display: 'grid', gridTemplateColumns: '22px 1fr 60px 44px', alignItems: 'center', gap: '8px',
                                    }}>
                                        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: 'var(--muted)', textAlign: 'right' }}>{p.number}</span>
                                        <div style={{ textAlign: 'left', minWidth: 0 }}>
                                            <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '12px', color: 'var(--chalk)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{p.name}</span>
                                            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '9px', color, letterSpacing: '.04em' }}>{POS_LABEL[p.position] || p.position}</span>
                                        </div>
                                        <div style={{ height: '3px', background: 'rgba(242,237,228,.08)', borderRadius: '2px', overflow: 'hidden' }}>
                                            <div style={{ height: '100%', width: `${(p.try_proba / maxP) * 100}%`, background: color, borderRadius: '2px' }} />
                                        </div>
                                        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '11px', fontWeight: 700, color, textAlign: 'right' }}>{p.try_proba}%</span>
                                    </button>
                                    {isExpanded && (
                                        <div style={{ padding: '0 8px 8px' }}>
                                            <ScorerFeatureTable player={p} home={match.home} away={match.away} sc={sc} />
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    <Link to={`/predictions#${matchId}`} style={{ display: 'block', marginTop: '10px', fontFamily: "'Space Mono',monospace", fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none' }}>
                        {at.viewFull} →
                    </Link>
                </div>
            )}
        </div>
    )
}

function AnalyticsSection({ t }) {
    const at = t.analytics
    const [predData, setPredData]     = React.useState(null)
    const [scorerData, setScorerData] = React.useState(null)
    const [loading, setLoading]       = React.useState(true)
    const [champ, setChamp]           = React.useState('top14')

    React.useEffect(() => {
        Promise.all([
            fetch('/predictions.json').then(r => r.ok ? r.json() : null).catch(() => null),
            fetch('/player_predictions.json').then(r => r.ok ? r.json() : null).catch(() => null),
        ]).then(([pred, scorer]) => {
            setPredData(pred)
            setScorerData(scorer)
            setLoading(false)
        })
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
    const champLabelUpper = champ === 'top14' ? 'TOP 14' : 'PRO D2'

    const scorerMatches = scorerData?.matches?.filter(
        m => m.competition?.toUpperCase().replace(' ', '') === champLabelUpper.replace(' ', '')
    ) || []

    return (
        <div>
            {/* Championship selector */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                {[{ id: 'top14', label: 'Top 14' }, { id: 'prod2', label: 'Pro D2' }].map(c => (
                    <button key={c.id} onClick={() => setChamp(c.id)} style={{
                        padding: '6px 16px', borderRadius: '999px', fontSize: '12px',
                        fontWeight: 700, border: '1px solid', cursor: 'pointer',
                        fontFamily: "'Space Grotesk',sans-serif",
                        ...(champ === c.id
                            ? { background: 'var(--accent)', borderColor: 'var(--accent)', color: 'var(--ink)' }
                            : { background: 'transparent', borderColor: 'var(--line)', color: 'var(--muted)' }),
                    }}>{c.label}</button>
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

            {/* Merged match cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                {current.matches.map((m, i) => {
                    const sm = scorerMatches.find(s => s.home === m.home && s.away === m.away) || null
                    return <MergedMatchCard key={i} match={m} scorerMatch={sm} at={at} />
                })}
            </div>

            <Link to="/predictions" style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '14px',
                color: 'var(--accent)', textDecoration: 'none',
                borderBottom: '1px solid rgba(198,255,58,.3)', paddingBottom: '2px',
            }}>
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
                        <GlitchLogo variant="" size="nav" />
                    </a>
                    <div className="oa-nav-links">
                        {CONTENT_TABS.map(tab => (
                            <button
                                key={tab.id}
                                className="oa-nav-tab"
                                onClick={() => switchTab(tab.id)}
                                style={tabBtnStyle(tab.id)}
                                onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.color = 'var(--chalk)' }}
                                onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.color = 'var(--muted)' }}
                            >
                                {tab.label}
                            </button>
                        ))}

                        {/* Quiz + Players links */}
                        <Link to="/quiz" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '13px', letterSpacing: '.08em', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--muted)', transition: 'color .15s' }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--chalk)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                        >{t.nav.quiz}</Link>
                        <Link to="/player-quiz" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '13px', letterSpacing: '.08em', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--muted)', transition: 'color .15s' }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--chalk)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                        >{t.nav.players}</Link>

                        {/* Language toggle */}
                        <div className="oa-nav-lang" style={{ display: 'flex', alignItems: 'center', borderLeft: '1px solid var(--line)', paddingLeft: '12px', gap: '0' }}>
                            <button style={langBtnStyle('fr')} onClick={() => changeLang('fr')}>FR</button>
                            <span style={{ color: 'var(--line)', fontSize: '12px' }}>|</span>
                            <button style={langBtnStyle('en')} onClick={() => changeLang('en')}>EN</button>
                        </div>

                        <a href="#contact" className="oa-btn oa-btn-primary" style={{ color: '#15110E' }}>{t.nav.cta}</a>
                    </div>
                </div>

                {/* Mobile-only second row: tabs + lang toggle */}
                <div className="oa-nav-mobile-row">
                    <div className="oa-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '42px' }}>
                        <div style={{ display: 'flex', gap: '0' }}>
                            {CONTENT_TABS.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => switchTab(tab.id)}
                                    style={{
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '12px',
                                        letterSpacing: '.06em', textTransform: 'uppercase',
                                        color: activeTab === tab.id ? 'var(--chalk)' : 'var(--muted)',
                                        padding: '4px 12px',
                                        borderBottom: `2px solid ${activeTab === tab.id ? 'var(--accent)' : 'transparent'}`,
                                        transition: 'color .15s',
                                    }}
                                >
                                    {tab.label}
                                </button>
                            ))}
                            <Link to="/quiz" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '12px', letterSpacing: '.06em', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--muted)', padding: '4px 12px' }}>{t.nav.quiz}</Link>
                            <Link to="/player-quiz" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '12px', letterSpacing: '.06em', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--muted)', padding: '4px 12px' }}>{t.nav.players}</Link>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                            <button style={langBtnStyle('fr')} onClick={() => changeLang('fr')}>FR</button>
                            <span style={{ color: 'var(--line)', fontSize: '12px' }}>|</span>
                            <button style={langBtnStyle('en')} onClick={() => changeLang('en')}>EN</button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* ── ELO ticker ── */}
            <EloBanner />

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
                        <GlitchLogo variant="" size="foot" />
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
        page="Data Ruck — La data au service du rugby"
        description="Data Ruck transforme vos données de match en décisions claires — analyse adverse, charge joueur, recrutement."
        type="website"
        path=""
    />
)

export default IndexPage
