import * as React from 'react'
import Layout from "../components/layout"
import Seo from "../components/seo"

// ── i18n ──────────────────────────────────────────────────────────────────────

const LangContext = React.createContext('fr')
const useLang = () => React.useContext(LangContext)

const TR = {
    fr: {
        // Page header
        eyebrow:        'Machine Learning',
        pageTitle:      'Analytics',
        pageSubtitle:   'Prédictions des résultats basées sur les ratings ELO, la forme récente et les compositions. Mises à jour chaque journée.',
        // Tabs
        predictions:    'Prédictions',
        history:        'Historique',
        // Outcome labels
        home:   'Dom.',
        draw:   'Nul',
        away:   'Ext.',
        // Prob bar full labels
        homeBar: 'Dom.',
        drawBar: 'Nul',
        awayBar: 'Ext.',
        // Match card tabs
        result:     'Résultat',
        scorers:    'Marqueurs',
        // Match result
        baseModel:          'Modèle de base',
        withLineups:        '★ Avec compos',
        lineupsAvailable:   '★ COMPOS DISPONIBLES',
        noLineup:           'Compos non disponibles',
        features:           'DONNÉES',
        // FeatureTable
        metric:             'Statistique',
        lineupExpSection:   '★ EXPÉRIENCE COMPOSITION',
        derivedSection:     '⚡ VARIABLES MODÈLE',
        weatherSection:     "🌦 MÉTÉO (COUP D'ENVOI)",
        rain:               'Pluie',
        wind:               'Vent',
        temperature:        'Température',
        homeAdv:            '← dom.',
        awayAdv:            'ext. →',
        even:               'égal',
        // History
        noHistory:          'Les résultats apparaîtront ici après la première journée.',
        baseModelStat:      'Modèle de base',
        withLineupsStat:    'Avec compos ★',
        homeWins:           'Victoires dom.',
        draws:              'Nuls',
        awayWins:           'Victoires ext.',
        round:              'Journée',
        season:             'Saison',
        tableHome:          'Dom.',
        tableAway:          'Ext.',
        tablePred:          'Préd.',
        tableOutcome:       'Issue',
        tableResult:        'Score',
        // Scorer
        scorerModel:        'Modèle marqueurs',
        hitRate:            'hit rate · saison en cours',
        seasonOngoing:      'saison en cours',
        predicted:          'Prédits',
        actual:             'Réels',
        homeVenue:          'Domicile',
        awayVenue:          'Extérieur',
        // Scorer feats
        scorerFeats: [
            "Tx. essai (saison glissante)",
            "Attaque équipe (essais/match)",
            "Défense adverse (essais/match)",
            "Essais attendus (match)",
            "ELO équipe",
            "Avantage ELO",
            "Pts marqués / match (class.)",
            "Pts concédés adv. / match",
            "Matchs joués (saison)",
        ],
        // Positions
        positions: {
            wing: 'Ailier', fullback: 'Arrière', center: 'Centre', halfback: 'Demi',
            flanker: 'Flanker', back_row: '3ème ligne', lock: '2ème ligne', front_row: '1ère ligne',
        },
        // Newsletter
        newsletterTitle:    'Recevoir les prédictions par email',
        newsletterSub:      'Inscrivez-vous pour recevoir une notification à chaque nouvelle prédiction.',
        newsletterOk:       "C'est noté ! Vous recevrez un email à chaque nouvelle prédiction.",
        newsletterErr:      'Une erreur est survenue, veuillez réessayer.',
        subscribe:          "S'inscrire",
        // Decomposed score
        decomp:             'Décomposition du score',
        decomp_tries:       'Essais',
        decomp_pen:         'Pénalités',
        decomp_conv:        'Tx. transf.',
        decomp_kicker:      'Buteur',
        // Loading / footer
        loading:            'Chargement…',
        noData:             'Aucune prédiction disponible.',
        generatedOn:        'Généré le',
        dateLocale:         'fr-FR',
    },
    en: {
        eyebrow:        'Machine Learning',
        pageTitle:      'Analytics',
        pageSubtitle:   'Match outcome predictions based on ELO ratings, recent form, and lineup experience. Updated each round.',
        predictions:    'Predictions',
        history:        'History',
        home:   'Home',
        draw:   'Draw',
        away:   'Away',
        homeBar: 'Home',
        drawBar: 'Draw',
        awayBar: 'Away',
        result:     'Result',
        scorers:    'Scorers',
        baseModel:          'Base model',
        withLineups:        '★ With lineups',
        lineupsAvailable:   '★ LINEUPS AVAILABLE',
        noLineup:           'No lineup data yet',
        features:           'FEATURES',
        metric:             'Metric',
        lineupExpSection:   '★ LINEUP EXPERIENCE FEATURES',
        derivedSection:     '⚡ DERIVED MODEL FEATURES',
        weatherSection:     '🌦 MATCH-DAY WEATHER (KICKOFF)',
        rain:               'Rain',
        wind:               'Wind',
        temperature:        'Temperature',
        homeAdv:            '← home',
        awayAdv:            'away →',
        even:               'even',
        noHistory:          'Results will appear here after the first matchday.',
        baseModelStat:      'Base model',
        withLineupsStat:    'With lineups ★',
        homeWins:           'Home wins',
        draws:              'Draws',
        awayWins:           'Away wins',
        round:              'Round',
        season:             'Season',
        tableHome:          'Home',
        tableAway:          'Away',
        tablePred:          'Pred.',
        tableOutcome:       'Outcome',
        tableResult:        'Score',
        scorerModel:        'Try scorer model',
        hitRate:            'hit rate · current season',
        seasonOngoing:      'current season',
        predicted:          'Predicted',
        actual:             'Actual',
        homeVenue:          'Home',
        awayVenue:          'Away',
        scorerFeats: [
            "Season try rate (rolling)",
            "Team attack (tries/game)",
            "Opp. defense (tries/game)",
            "Expected tries (match)",
            "Team ELO",
            "ELO advantage",
            "Pts scored / game (rank)",
            "Opp. pts conceded / game",
            "Games played (season)",
        ],
        positions: {
            wing: 'Wing', fullback: 'Fullback', center: 'Centre', halfback: 'Halfback',
            flanker: 'Flanker', back_row: 'Back Row', lock: 'Lock', front_row: 'Front Row',
        },
        newsletterTitle:    'Get predictions by email',
        newsletterSub:      'Subscribe to receive an update each time new predictions are published.',
        newsletterOk:       "You're subscribed! You'll receive an email when new predictions are published.",
        newsletterErr:      'Something went wrong, please try again.',
        subscribe:          'Subscribe',
        // Decomposed score
        decomp:             'Score breakdown',
        decomp_tries:       'Tries',
        decomp_pen:         'Penalties',
        decomp_conv:        'Conv. rate',
        decomp_kicker:      'Kicker',
        loading:            'Loading…',
        noData:             'No predictions available yet.',
        generatedOn:        'Generated on',
        dateLocale:         'en-GB',
    },
}

// ── Outcome helpers ────────────────────────────────────────────────────────────

const OUTCOME_STYLE = {
    H: { background: 'rgba(198,255,58,.15)', color: '#C6FF3A', borderColor: 'rgba(198,255,58,.3)' },
    D: { background: 'rgba(255,200,58,.12)', color: '#FFD03A', borderColor: 'rgba(255,200,58,.3)' },
    A: { background: 'rgba(255,46,126,.12)', color: '#FF2E7E', borderColor: 'rgba(255,46,126,.3)' },
}

function OutcomeBadge({ outcome }) {
    const lang = useLang()
    const t = TR[lang]
    const label = outcome === 'H' ? t.home : outcome === 'D' ? t.draw : t.away
    return (
        <span style={{
            display: 'inline-block', padding: '2px 8px', borderRadius: '999px',
            fontSize: '11px', fontWeight: 700, border: '1px solid',
            fontFamily: "'Space Mono',monospace", letterSpacing: '.08em',
            ...OUTCOME_STYLE[outcome]
        }}>
            {label}
        </span>
    )
}

const PROB_COLOR = { 'bg-green-500': '#C6FF3A', 'bg-amber-400': '#FFD03A', 'bg-red-500': '#FF2E7E' }
function ProbBar({ label, pct, color }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted)', width: '40px' }}>{label}</span>
            <div style={{ flex: 1, background: 'rgba(242,237,228,.08)', borderRadius: '999px', height: '5px' }}>
                <div style={{ height: '5px', borderRadius: '999px', width: `${Math.min(pct, 100)}%`, background: PROB_COLOR[color] || '#C6FF3A' }} />
            </div>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '11px', color: 'var(--muted)', width: '36px', textAlign: 'right' }}>{pct}%</span>
        </div>
    )
}

// ── Features table ─────────────────────────────────────────────────────────────

const sign = v => `${v > 0 ? '+' : ''}${v.toFixed(1)}`
const pct  = v => `${(v * 100).toFixed(0)}%`
const f1   = v => v.toFixed(1)
const f2   = v => v.toFixed(2)
const int  = v => Math.round(v)

// [label, home_key, away_key, formatter, higherIsBetter, source ('raw'|'exp_raw')]
const FEATS = [
    ["ELO rating",               "elo_home",                    "elo_away",                   int,  true,  'raw'],
    ["Season PPG",               "home_ppg",                    "away_ppg",                   f2,   true,  'raw'],
    ["Games played",             "home_n_games",                "away_n_games",               int,  false, 'raw'],
    ["Win ratio (last 5)",       "home_win_ratio",              "away_win_ratio",              pct,  true,  'raw'],
    ["Avg score (last 5)",       "home_avg_score",              "away_avg_score",              f1,   true,  'raw'],
    ["Avg conceded (last 5)",    "home_avg_conc",               "away_avg_conc",               f1,   false, 'raw'],
    ["Avg margin (last 5)",      "home_avg_margin",             "away_avg_margin",             sign, true,  'raw'],
    ["Try rate (last 5)",        "home_try_rate",               "away_try_rate",               pct,  true,  'raw'],
    ["Avg possession (last 5)",  "home_avg_poss",               "away_avg_poss",               pct,  true,  'raw'],
    ["Avg kicks (last 5)",       "home_avg_kicks",              "away_avg_kicks",              f1,   false, 'raw'],
    ["Avg penalties (last 5)",   "home_avg_pen",                "away_avg_pen",                f1,   false, 'raw'],
    ["Avg yellow cards (last 5)","home_avg_yellow",             "away_avg_yellow",             f1,   false, 'raw'],
    ["Avg red cards (last 5)",   "home_avg_red",                "away_avg_red",                f1,   false, 'raw'],
    ["Venue win ratio (last 5)", "home_venue_win_ratio",        "away_venue_win_ratio",        pct,  true,  'raw'],
    ["Venue avg margin (last 5)","home_venue_avg_margin",       "away_venue_avg_margin",       sign, true,  'raw'],
]

const DERIVED_FEATS = [
    ["ELO adj. by lineup quality",  "lineup_adj_elo_diff"],
    ["ELO × lineup interaction",    "elo_lineup_interaction"],
    ["Disruption diff",             "disruption_diff"],
    ["Charnière vs lineup diff",    "charniere_vs_total_diff"],
    ["Fwd dominance diff",          "fwd_dominance_diff"],
]

const EXP_FEATS = [
    ["Lineup avg games played",    "lineup_h_avg_games_played",    "lineup_a_avg_games_played",    f1, true],
    ["Lineup avg starts",          "lineup_h_avg_starts",          "lineup_a_avg_starts",          f1, true],
    ["Subs avg games played",      "subs_h_avg_games_played",      "subs_a_avg_games_played",      f1, true],
    ["Charnière (9&10) avg games", "charniere_h_avg_games_played", "charniere_a_avg_games_played", f1, true],
    ["Charnière (9&10) avg starts","charniere_h_avg_starts",       "charniere_a_avg_starts",       f1, true],
    ["Forwards (1-8) avg games",   "forwards_h_avg_games_played",  "forwards_a_avg_games_played",  f1, true],
    ["Forwards (1-8) avg starts",  "forwards_h_avg_starts",        "forwards_a_avg_starts",        f1, true],
    ["Backs (11-15) avg games",    "backs_h_avg_games_played",     "backs_a_avg_games_played",     f1, true],
    ["Backs (11-15) avg starts",   "backs_h_avg_starts",           "backs_a_avg_starts",           f1, true],
    ["Total squad avg games",      "total_h_avg_games_played",     "total_a_avg_games_played",     f1, true],
]

function FeatureRow([label, hk, ak, fmt, higherBetter], src, match, fi) {
    const bag = src === 'exp_raw' ? (match.exp_raw || {}) : match.raw
    const hv = bag[hk], av = bag[ak]
    const both = hv != null && av != null
    const hBetter = both && (higherBetter ? hv > av : hv < av)
    const aBetter = both && (higherBetter ? av > hv : av < hv)
    return (
        <tr key={fi} className="pred-table-row">
            <td style={{ padding: '6px 16px', fontSize: '12px', color: 'var(--muted)' }}>{label}</td>
            <td style={{ padding: '6px 16px', textAlign: 'center', fontFamily: "'Space Mono',monospace", fontSize: '12px', fontWeight: hBetter ? 700 : 400, color: hBetter ? '#C6FF3A' : 'var(--chalk)' }}>
                {hv != null ? fmt(hv) : '—'}
            </td>
            <td style={{ padding: '6px 16px', textAlign: 'center', fontFamily: "'Space Mono',monospace", fontSize: '12px', fontWeight: aBetter ? 700 : 400, color: aBetter ? '#C6FF3A' : 'var(--chalk)' }}>
                {av != null ? fmt(av) : '—'}
            </td>
        </tr>
    )
}

function DerivedRow([label, key], match, fi) {
    const lang = useLang()
    const t = TR[lang]
    const v = (match.derived || {})[key]
    if (v == null) return null
    const isPos = v > 0.005
    const isNeg = v < -0.005
    return (
        <tr key={fi} className="pred-table-row">
            <td style={{ padding: '6px 16px', fontSize: '12px', color: 'var(--muted)' }}>{label}</td>
            <td colSpan={2} style={{ padding: '6px 16px', textAlign: 'center', fontFamily: "'Space Mono',monospace", fontSize: '12px', fontWeight: 700, color: isPos ? '#C6FF3A' : isNeg ? '#FF2E7E' : 'var(--muted)' }}>
                {v > 0 ? '+' : ''}{v.toFixed(2)}
                <span style={{ marginLeft: '4px', fontWeight: 400, color: 'var(--muted)' }}>
                    {isPos ? t.homeAdv : isNeg ? t.awayAdv : t.even}
                </span>
            </td>
        </tr>
    )
}

function FeatureTable({ match }) {
    const lang = useLang()
    const t = TR[lang]
    const hasExp     = match.lineup_available && match.exp_raw && Object.keys(match.exp_raw).length > 0
    const hasDerived = match.lineup_available && match.derived && Object.keys(match.derived).length > 0
    const wx = match.weather || {}
    const hasWeather = (wx.rain_mm ?? 0) > 0 || (wx.wind_speed_kmh ?? 0) > 0 || (wx.temperature_c !== null && wx.temperature_c !== undefined)
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr className="pred-th">
                    <th style={{ padding: '8px 16px', textAlign: 'left',   fontSize: '11px', color: 'var(--muted)', fontWeight: 400, fontFamily: "'Space Mono',monospace" }}>{t.metric}</th>
                    <th style={{ padding: '8px 16px', textAlign: 'center', fontSize: '11px', color: 'var(--muted)', fontWeight: 400 }}>{match.home}</th>
                    <th style={{ padding: '8px 16px', textAlign: 'center', fontSize: '11px', color: 'var(--muted)', fontWeight: 400 }}>{match.away}</th>
                </tr>
            </thead>
            <tbody>
                {FEATS.map((feat, fi) => FeatureRow(feat, feat[5], match, fi))}
                {hasExp && <>
                    <tr className="pred-section-head">
                        <td colSpan={3} style={{ padding: '6px 16px', fontSize: '11px', fontWeight: 700, color: 'var(--accent)', fontFamily: "'Space Mono',monospace", letterSpacing: '.06em' }}>{t.lineupExpSection}</td>
                    </tr>
                    {EXP_FEATS.map((feat, fi) => FeatureRow(feat, 'exp_raw', match, fi))}
                </>}
                {hasDerived && <>
                    <tr className="pred-section-head">
                        <td colSpan={3} style={{ padding: '6px 16px', fontSize: '11px', fontWeight: 700, color: '#FFD03A', fontFamily: "'Space Mono',monospace", letterSpacing: '.06em' }}>{t.derivedSection}</td>
                    </tr>
                    {DERIVED_FEATS.map((feat, fi) => DerivedRow(feat, match, fi))}
                </>}
                {hasWeather && <>
                    <tr className="pred-section-head">
                        <td colSpan={3} style={{ padding: '6px 16px', fontSize: '11px', fontWeight: 700, color: '#38BDF8', fontFamily: "'Space Mono',monospace", letterSpacing: '.06em' }}>{t.weatherSection}</td>
                    </tr>
                    <tr className="pred-table-row">
                        <td style={{ padding: '6px 16px', fontSize: '12px', color: 'var(--muted)' }}>{t.rain}</td>
                        <td colSpan={2} style={{ padding: '6px 16px', textAlign: 'center', fontFamily: "'Space Mono',monospace", fontSize: '12px', color: 'var(--chalk)' }}>{wx.rain_mm ?? 0} mm</td>
                    </tr>
                    <tr className="pred-table-row">
                        <td style={{ padding: '6px 16px', fontSize: '12px', color: 'var(--muted)' }}>{t.wind}</td>
                        <td colSpan={2} style={{ padding: '6px 16px', textAlign: 'center', fontFamily: "'Space Mono',monospace", fontSize: '12px', color: 'var(--chalk)' }}>{wx.wind_speed_kmh ?? 0} km/h</td>
                    </tr>
                    {wx.temperature_c !== null && wx.temperature_c !== undefined && (
                        <tr className="pred-table-row">
                            <td style={{ padding: '6px 16px', fontSize: '12px', color: 'var(--muted)' }}>{t.temperature}</td>
                            <td colSpan={2} style={{ padding: '6px 16px', textAlign: 'center', fontFamily: "'Space Mono',monospace", fontSize: '12px', color: 'var(--chalk)' }}>{wx.temperature_c}°C</td>
                        </tr>
                    )}
                </>}
            </tbody>
        </table>
    )
}

// ── Decomposed score breakdown ─────────────────────────────────────────────────

function DecompBreakdown({ match }) {
    const lang = useLang()
    const t = TR[lang]
    const d = match.decomp
    if (!d || d.pred_tries_h == null) return null
    const f1   = v => (v ?? 0).toFixed(1)
    const fpct = v => v != null ? `${(v * 100).toFixed(0)}%` : '—'
    // kicker_h/a can be a string name or an object {name} depending on the prediction file version
    const kickerName = k => !k ? null : (typeof k === 'string' ? k : k.name) || null
    const khName = kickerName(d.kicker_h)
    const kaName = kickerName(d.kicker_a)
    const shortName = full => full ? full.split(' ').slice(-1)[0] : null
    return (
        <div style={{ borderTop: '1px solid var(--line)', marginTop: '12px', paddingTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '10px', fontFamily: "'Space Mono',monospace", letterSpacing: '.1em', textTransform: 'uppercase', color: '#FFD03A' }}>{t.decomp}</span>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '12px', color: 'var(--muted)' }}>
                    {Math.round(d.pred_score_h ?? 0)} – {Math.round(d.pred_score_a ?? 0)}
                </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '4px 8px', fontSize: '11px', alignItems: 'center' }}>
                <div style={{ fontFamily: "'Space Mono',monospace", color: 'var(--chalk)', textAlign: 'right' }}>{f1(d.pred_tries_h)} T + {f1(d.pred_pen_h)} P</div>
                <div style={{ color: 'var(--muted)', fontSize: '10px', textAlign: 'center', whiteSpace: 'nowrap' }}>{t.decomp_tries}/{t.decomp_pen}</div>
                <div style={{ fontFamily: "'Space Mono',monospace", color: 'var(--chalk)' }}>{f1(d.pred_tries_a)} T + {f1(d.pred_pen_a)} P</div>
                <div style={{ color: 'var(--muted)', fontSize: '10px', textAlign: 'right' }}>
                    {khName ? `${shortName(khName)} · ` : ''}{fpct(d.conv_rate_h)}
                </div>
                <div style={{ color: 'var(--muted)', fontSize: '10px', textAlign: 'center', whiteSpace: 'nowrap' }}>{khName || kaName ? t.decomp_kicker : t.decomp_conv}</div>
                <div style={{ color: 'var(--muted)', fontSize: '10px' }}>
                    {fpct(d.conv_rate_a)}{kaName ? ` · ${shortName(kaName)}` : ''}
                </div>
            </div>
        </div>
    )
}

// ── Match card ─────────────────────────────────────────────────────────────────

function weatherEmoji(rain, wind, temp) {
    if (rain >= 5) return "⛈"
    if (rain >= 1) return "🌧"
    if (wind >= 50) return "🌬"
    if (temp !== null && temp <= 5) return "🥶"
    if (temp !== null && temp >= 30) return "🥵"
    return "☀️"
}

function WeatherStrip({ weather }) {
    if (!weather) return null
    const rain = weather.rain_mm ?? 0
    const wind = weather.wind_speed_kmh ?? 0
    const temp = weather.temperature_c ?? null
    if (rain === 0 && wind === 0 && temp === null) return null
    const emoji = weatherEmoji(rain, wind, temp)
    const parts = []
    if (rain > 0)   parts.push(`🌧 ${rain} mm`)
    if (wind >= 20) parts.push(`💨 ${Math.round(wind)} km/h`)
    if (temp !== null) parts.push(`🌡️ ${temp}°C`)
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '12px', color: '#38BDF8', background: 'rgba(56,189,248,.08)', borderRadius: '8px', padding: '6px 12px', marginBottom: '12px' }}>
            <span style={{ fontSize: '16px' }}>{emoji}</span>
            {parts.map((p, i) => <span key={i} style={{ fontFamily: "'Space Mono',monospace" }}>{p}</span>)}
        </div>
    )
}

function MatchCard({ match, scorerMatch }) {
    const lang = useLang()
    const t = TR[lang]
    const primary = match.lineup_available ? match.lineup : match.base
    const [tab, setTab]   = React.useState('result')
    const [openFeat, setOpenFeat] = React.useState(false)
    const [openPlayer, setOpenPlayer] = React.useState(null)
    const matchId = `${match.home}-vs-${match.away}`.toLowerCase().replace(/[\s']/g, '-').replace(/[^a-z0-9-]/g, '')

    const tabBtn = (id, label) => (
        <button key={id} onClick={() => { setTab(id); setOpenFeat(false); setOpenPlayer(null) }} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '8px 14px',
            fontFamily: "'Space Mono',monospace", fontSize: '11px', letterSpacing: '.1em',
            textTransform: 'uppercase', fontWeight: 700,
            color: tab === id ? 'var(--chalk)' : 'var(--muted)',
            borderBottom: `2px solid ${tab === id ? 'var(--accent)' : 'transparent'}`,
            transition: 'color .15s', marginBottom: '-1px',
        }}>{label}</button>
    )

    return (
        <div id={matchId} style={{ background: 'var(--ink-2)', border: '1px solid var(--line)', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }}>
            <div style={{ padding: '20px 20px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '15px', fontWeight: 700, color: 'var(--chalk)', flex: 1 }}>{match.home}</div>
                    <div style={{ color: 'var(--muted)', padding: '0 12px', fontWeight: 300, fontSize: '14px' }}>vs</div>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '15px', fontWeight: 700, color: 'var(--chalk)', flex: 1, textAlign: 'right' }}>{match.away}</div>
                </div>
                <div style={{ display: 'flex', borderBottom: '1px solid var(--line)', marginLeft: '-20px', marginRight: '-20px', paddingLeft: '20px' }}>
                    {tabBtn('result', t.result)}
                    {scorerMatch && tabBtn('scorers', t.scorers)}
                </div>
            </div>

            {tab === 'result' && (
                <div style={{ padding: '16px 20px' }}>
                    <WeatherStrip weather={match.weather} />
                    <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                        <OutcomeBadge outcome={primary.outcome} />
                        <span style={{ marginLeft: '8px', fontSize: '20px', fontFamily: "'Space Mono',monospace", fontWeight: 700, color: 'var(--chalk)' }}>
                            {Math.round(primary.pred_home)} – {Math.round(primary.pred_away)}
                        </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                        <ProbBar label={t.homeBar} pct={primary.prob_h} color="bg-green-500" />
                        <ProbBar label={t.drawBar} pct={primary.prob_d} color="bg-amber-400" />
                        <ProbBar label={t.awayBar} pct={primary.prob_a} color="bg-red-500" />
                    </div>
                    <DecompBreakdown match={match} />
                    {match.lineup_available && (
                        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '12px', marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '4px', fontFamily: "'Space Mono',monospace", letterSpacing: '.06em', textTransform: 'uppercase' }}>{t.baseModel}</div>
                                <div style={{ fontFamily: "'Space Mono',monospace", fontWeight: 700, color: 'var(--chalk)', fontSize: '13px' }}>{Math.round(match.base.pred_home)}–{Math.round(match.base.pred_away)}</div>
                                <div style={{ marginTop: '4px' }}><OutcomeBadge outcome={match.base.outcome} /></div>
                                <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px', fontFamily: "'Space Mono',monospace" }}>{match.base.prob_h}%H · {match.base.prob_d}%D · {match.base.prob_a}%A</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '11px', color: 'var(--accent)', marginBottom: '4px', fontFamily: "'Space Mono',monospace", letterSpacing: '.06em', textTransform: 'uppercase' }}>{t.withLineups}</div>
                                <div style={{ fontFamily: "'Space Mono',monospace", fontWeight: 700, color: 'var(--chalk)', fontSize: '13px' }}>{Math.round(match.lineup.pred_home)}–{Math.round(match.lineup.pred_away)}</div>
                                <div style={{ marginTop: '4px' }}><OutcomeBadge outcome={match.lineup.outcome} /></div>
                                <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px', fontFamily: "'Space Mono',monospace" }}>{match.lineup.prob_h}%H · {match.lineup.prob_d}%D · {match.lineup.prob_a}%A</div>
                            </div>
                        </div>
                    )}
                    <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {match.lineup_available
                            ? <span style={{ fontSize: '11px', color: 'var(--accent)', fontFamily: "'Space Mono',monospace", letterSpacing: '.06em' }}>{t.lineupsAvailable}</span>
                            : <span style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: "'Space Mono',monospace" }}>{t.noLineup}</span>
                        }
                        <button onClick={() => setOpenFeat(o => !o)}
                            style={{ fontSize: '11px', color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Space Mono',monospace", letterSpacing: '.06em', display: 'flex', alignItems: 'center', gap: '4px' }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--chalk)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                        >
                            {t.features} {openFeat ? '▾' : '▸'}
                        </button>
                    </div>
                    {openFeat && <div style={{ borderTop: '1px solid var(--line)', marginTop: '12px' }}><FeatureTable match={match} /></div>}
                </div>
            )}

            {tab === 'scorers' && scorerMatch && (
                <div>
                    {scorerMatch.perf && (
                        <div style={{ display: 'flex', gap: '8px', padding: '10px 16px 4px', borderBottom: '1px solid var(--line)' }}>
                            {[['Top 1', scorerMatch.perf.top1_hit_pct], ['Top 3', scorerMatch.perf.top3_hit_pct], ['Top 5', scorerMatch.perf.top5_hit_pct]].map(([label, p]) => (
                                <span key={label} style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', letterSpacing: '.1em', color: 'var(--muted)' }}>
                                    <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{p}%</span> {label}
                                </span>
                            ))}
                            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '9px', color: 'var(--dim,#4D4539)', marginLeft: 'auto' }}>{t.seasonOngoing}</span>
                        </div>
                    )}
                    {(() => {
                        const top5 = scorerMatch.players.slice(0, 5)
                        const maxP = top5[0]?.try_proba || 1
                        const actualScorers = match.actual_scorers
                        const scoredSet = actualScorers ? new Set(actualScorers.map(s => s.name.toUpperCase())) : null
                        return top5.map((p, pi) => (
                            <ScorerPlayerRow key={pi} p={p} home={match.home} maxP={maxP} scoredSet={scoredSet} />
                        ))
                    })()}
                </div>
            )}
        </div>
    )
}

// ── Scorer performance banner ──────────────────────────────────────────────────

function ScorerPerfBanner({ perf }) {
    const lang = useLang()
    const t = TR[lang]
    if (!perf) return null
    const items = [
        { label: 'Top 1', value: perf.top1_hit_pct },
        { label: 'Top 3', value: perf.top3_hit_pct },
        { label: 'Top 5', value: perf.top5_hit_pct, highlight: true },
    ]
    return (
        <div style={{ background: 'rgba(198,255,58,.05)', border: '1px solid rgba(198,255,58,.15)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '0', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '9px', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--muted)', marginRight: '16px', flexShrink: 0 }}>{t.scorerModel}</span>
            {items.map(({ label, value, highlight }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginRight: '20px' }}>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: highlight ? '18px' : '15px', fontWeight: 700, color: highlight ? '#C6FF3A' : 'var(--chalk)' }}>{value}%</span>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: 'var(--muted)', letterSpacing: '.06em' }}>{label}</span>
                </div>
            ))}
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '9px', color: 'var(--dim,#4D4539)', marginLeft: 'auto' }}>{t.hitRate}</span>
        </div>
    )
}

// ── Predictions tab ────────────────────────────────────────────────────────────

function PredictionsTab({ current, scorerMatches }) {
    const lang = useLang()
    const t = TR[lang]
    const champ = current.champ === 'top14' ? 'Top 14' : 'Pro D2'
    const d = new Date(current.gen_at)
    const fmt = isNaN(d) ? '' : d.toLocaleDateString(t.dateLocale, { day: 'numeric', month: 'long' })
    const dayLabel = isNaN(parseInt(current.day)) ? current.day.replace('-', ' ') : `${t.round} ${current.day}`
    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '20px', fontWeight: 700, color: 'var(--chalk)', margin: '0 0 4px' }}>
                    {champ} — {dayLabel}
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>
                    {t.season} {current.season}{fmt ? ` · ${fmt}` : ''}
                </p>
            </div>
            {current.matches.map((m, i) => {
                const sm = scorerMatches?.find(s => s.home === m.home && s.away === m.away) || null
                return <MatchCard key={i} match={m} scorerMatch={sm} />
            })}
        </div>
    )
}

// ── History tab ────────────────────────────────────────────────────────────────

function acc(ok, n) {
    return n ? `${Math.round(100 * ok / n)}%` : '—'
}

function StatCard({ value, label, sub, bold = false }) {
    return (
        <div style={{ background: 'var(--ink-2)', border: '1px solid var(--line)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: bold ? 'var(--accent)' : 'var(--chalk)', fontFamily: "'Space Grotesk',sans-serif" }}>{value}</div>
            <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>{label}</div>
            {sub && <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px', fontFamily: "'Space Mono',monospace" }}>{sub}</div>}
        </div>
    )
}

function HistoryMatchExpansion({ match, round, champ, scorerData }) {
    const lang = useLang()
    const t = TR[lang]
    const [showFeats, setShowFeats] = React.useState(false)

    const daySlug = isNaN(parseInt(round.day)) ? String(round.day) : `j${round.day}`
    const roundKey = `${champ}_${daySlug}_${round.season}`
    const predicted = (scorerData?.history?.[roundKey] || []).find(s => s.home === match.home && s.away === match.away)?.players || []
    const actual    = match.actual_scorers || []
    const hasPred   = predicted.length > 0
    const hasAct    = actual.length > 0
    const scoredSet = new Set(actual.map(s => s.name.toUpperCase()))

    return (
        <div style={{ padding: '12px 16px 0' }}>
            {(hasPred || hasAct) && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '4px', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
                    <div>
                        <div style={{ fontSize: '9px', fontFamily: "'Space Mono',monospace", letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px' }}>{t.predicted}</div>
                        {hasPred ? predicted.slice(0, 5).map((p, i) => {
                            const color = p.team === match.home ? '#C6FF3A' : '#3AF0FF'
                            const scored = hasAct && scoredSet.has(p.name.toUpperCase())
                            return (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color, width: '32px', textAlign: 'right', flexShrink: 0 }}>{p.try_proba}%</span>
                                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '12px', color: scored ? '#C6FF3A' : 'var(--chalk)', fontWeight: scored ? 700 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</span>
                                    {scored && <span style={{ fontSize: '11px', color: '#C6FF3A', flexShrink: 0 }}>✓</span>}
                                </div>
                            )
                        }) : <span style={{ fontSize: '11px', color: 'var(--muted)' }}>—</span>}
                    </div>
                    <div>
                        <div style={{ fontSize: '9px', fontFamily: "'Space Mono',monospace", letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>{t.actual}</div>
                        {hasAct ? actual.map((s, i) => {
                            const color = s.club === 'home' ? '#C6FF3A' : '#3AF0FF'
                            return (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: '#4D4539', width: '24px', textAlign: 'right', flexShrink: 0 }}>{s.minute}'</span>
                                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '12px', color }}>{s.name}</span>
                                </div>
                            )
                        }) : <span style={{ fontSize: '11px', color: 'var(--muted)' }}>—</span>}
                    </div>
                </div>
            )}
            <DecompBreakdown match={match} />
            <button onClick={() => setShowFeats(o => !o)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: "'Space Mono',monospace", fontSize: '10px',
                letterSpacing: '.1em', textTransform: 'uppercase',
                color: 'var(--muted)', padding: '8px 0', display: 'flex', alignItems: 'center', gap: '4px',
            }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--chalk)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >
                {t.features} {showFeats ? '▾' : '▸'}
            </button>
            {showFeats && <FeatureTable match={match} />}
        </div>
    )
}

function HistoryTab({ history, stats, scorerData, champ }) {
    const lang = useLang()
    const t = TR[lang]
    const [openMatch, setOpenMatch] = React.useState(null)

    if (!history.length) {
        return <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '48px 0' }}>{t.noHistory}</p>
    }

    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <StatCard value={acc(stats.base_ok, stats.n)}   label={t.baseModelStat}   sub={`${stats.base_ok} / ${stats.n}`} />
                <StatCard value={acc(stats.lineup_ok, stats.n)} label={t.withLineupsStat} sub={`${stats.lineup_ok} / ${stats.n}`} bold />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                <StatCard value={acc(stats.home.base_ok, stats.home.total)} label={t.homeWins} sub={`${stats.home.base_ok} / ${stats.home.total}`} />
                <StatCard value={acc(stats.draw.base_ok, stats.draw.total)} label={t.draws}    sub={`${stats.draw.base_ok} / ${stats.draw.total}`} />
                <StatCard value={acc(stats.away.base_ok, stats.away.total)} label={t.awayWins} sub={`${stats.away.base_ok} / ${stats.away.total}`} />
            </div>

            <ScorerPerfBanner perf={scorerData?.performance?.[champ]} />

            {[...history].reverse().map((round, ri) => {
                const champLabel = round.champ === 'top14' ? 'Top 14' : 'Pro D2'
                const roundAcc   = acc(round.base_correct, round.total)
                const dayLabel   = isNaN(parseInt(round.day)) ? round.day.replace('-', ' ') : `${t.round} ${round.day}`
                return (
                    <div key={ri} style={{ background: 'var(--ink-2)', border: '1px solid var(--line)', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }}>
                        <div style={{ background: 'rgba(242,237,228,.06)', padding: '8px 16px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <span style={{ fontWeight: 600, color: 'var(--chalk)', fontFamily: "'Space Grotesk',sans-serif" }}>{champLabel} — {dayLabel}</span>
                                <span style={{ color: 'var(--muted)', fontSize: '13px', marginLeft: '8px' }}>· {round.season}</span>
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--muted)', fontFamily: "'Space Mono',monospace" }}>
                                {round.base_correct}/{round.total} ({roundAcc})
                            </span>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: 'rgba(242,237,228,.04)', borderBottom: '1px solid var(--line)' }}>
                                        {[t.tableHome, t.tableAway, t.tablePred, t.tableOutcome, t.tableResult, '✓'].map((h, i) => (
                                            <th key={i} style={{ padding: '8px 12px', textAlign: i >= 2 ? 'center' : 'left', fontSize: '11px', color: 'var(--muted)', fontWeight: 400, fontFamily: "'Space Mono',monospace" }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {round.matches.map((m, mi) => {
                                        const primary = m.lineup_available ? m.lineup : m.base
                                        const act     = m.actual
                                        const correct = m.base_correct
                                        const key     = `${ri}-${mi}`
                                        const isOpen  = openMatch === key
                                        return (
                                            <React.Fragment key={mi}>
                                            <tr className="pred-table-row" style={{ cursor: 'pointer' }} onClick={() => setOpenMatch(isOpen ? null : key)}>
                                                <td style={{ padding: '8px 12px', fontWeight: 500, color: 'var(--chalk)' }}>
                                                    <span style={{ color: 'var(--muted)', marginRight: '4px', fontSize: '11px' }}>{isOpen ? '▾' : '▸'}</span>
                                                    {m.home}
                                                </td>
                                                <td style={{ padding: '8px 12px', fontWeight: 500, color: 'var(--chalk)' }}>{m.away}</td>
                                                <td style={{ padding: '8px 12px', textAlign: 'center', fontFamily: "'Space Mono',monospace", color: 'var(--muted)' }}>
                                                    {Math.round(primary.pred_home)}–{Math.round(primary.pred_away)}
                                                </td>
                                                <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                                                    <OutcomeBadge outcome={primary.outcome} />
                                                </td>
                                                <td style={{ padding: '8px 12px', textAlign: 'center', fontFamily: "'Space Mono',monospace", color: 'var(--chalk)' }}>
                                                    {act ? <>{act.home}–{act.away} <OutcomeBadge outcome={m.actual_outcome} /></> : '—'}
                                                </td>
                                                <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                                                    {correct === null
                                                        ? <span style={{ color: 'var(--muted)' }}>—</span>
                                                        : correct
                                                            ? <span style={{ color: '#C6FF3A', fontWeight: 700 }}>✓</span>
                                                            : <span style={{ color: '#FF2E7E', fontWeight: 700 }}>✗</span>}
                                                </td>
                                            </tr>
                                            {isOpen && (
                                                <tr style={{ borderTop: '1px solid var(--line)' }}>
                                                    <td colSpan={6} style={{ padding: 0 }}>
                                                        <HistoryMatchExpansion match={m} round={round} champ={champ} scorerData={scorerData} />
                                                    </td>
                                                </tr>
                                            )}
                                            </React.Fragment>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

// ── Newsletter signup ──────────────────────────────────────────────────────────

const BREVO_FORM_ID = process.env.GATSBY_BREVO_FORM_ID || ""

function NewsletterSignup() {
    const lang = useLang()
    const t = TR[lang]
    const [email,  setEmail]  = React.useState("")
    const [status, setStatus] = React.useState(null)

    const submit = async () => {
        if (!email.trim()) return
        if (!BREVO_FORM_ID) { setStatus("error"); return }
        setStatus("loading")
        try {
            await fetch(BREVO_FORM_ID, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ EMAIL: email, email_address_check: "", locale: "fr" }).toString(),
            })
        } catch { /* CORS expected on opaque response */ }
        setStatus("ok")
    }

    return (
        <div style={{ background: 'rgba(198,255,58,.06)', border: '1px solid rgba(198,255,58,.2)', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
            <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: 'var(--chalk)', margin: '0 0 4px', fontSize: '14px' }}>{t.newsletterTitle}</p>
            <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 12px' }}>{t.newsletterSub}</p>
            {status === "ok" ? (
                <p style={{ fontSize: '13px', color: '#C6FF3A', fontWeight: 500, margin: 0 }}>{t.newsletterOk}</p>
            ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                        type="email" value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        onKeyDown={e => e.key === 'Enter' && submit()}
                        style={{ flex: 1, fontSize: '13px', borderRadius: '8px', border: '1px solid var(--line)', background: 'rgba(242,237,228,.05)', color: 'var(--chalk)', padding: '8px 12px', outline: 'none', fontFamily: "'Space Grotesk',sans-serif" }}
                    />
                    <button type="button" onClick={submit} disabled={status === "loading"}
                        style={{ padding: '8px 20px', fontSize: '13px', fontWeight: 700, borderRadius: '8px', border: 'none', cursor: 'pointer', background: 'var(--accent)', color: 'var(--ink)', fontFamily: "'Space Grotesk',sans-serif", opacity: status === "loading" ? 0.5 : 1 }}
                    >
                        {status === "loading" ? "…" : t.subscribe}
                    </button>
                </div>
            )}
            {status === "error" && <p style={{ fontSize: '11px', color: '#FF2E7E', margin: '6px 0 0' }}>{t.newsletterErr}</p>}
        </div>
    )
}

// ── Try Scorers ────────────────────────────────────────────────────────────────

function ScorerPlayerRow({ p, home, maxP, scoredSet }) {
    const lang = useLang()
    const t = TR[lang]
    const [open, setOpen] = React.useState(false)
    const color = p.team === home ? '#C6FF3A' : '#3AF0FF'
    const f = p.feats || {}
    const resultKnown = scoredSet !== null
    const scored = resultKnown && scoredSet.has(p.name.toUpperCase())
    const posLabel = t.positions[p.position] || p.position
    const venueLabel = f.is_home === 1 ? t.homeVenue : t.awayVenue

    const scorerFeatsConfig = [
        [t.scorerFeats[0], f => `${f.player_try_rate ?? '—'}%`,  f => null],
        [t.scorerFeats[1], f => f.team_attack ?? '—',             f => null],
        [t.scorerFeats[2], f => f.opp_defense ?? '—',             f => null],
        [t.scorerFeats[3], f => f.exp_tries ?? '—',               f => null, true],
        [t.scorerFeats[4], f => f.elo_team ?? '—',                f => null],
        [t.scorerFeats[5], f => f.elo_diff != null ? (f.elo_diff >= 0 ? `+${f.elo_diff}` : f.elo_diff) : '—', f => f.elo_diff],
        [t.scorerFeats[6], f => f.rank_scored_pg ?? '—',          f => null],
        [t.scorerFeats[7], f => f.rank_opp_conceded ?? '—',       f => null],
        [t.scorerFeats[8], f => f.games_played ?? '—',            f => null],
    ]

    return (
        <div style={{ borderTop: '1px solid rgba(242,237,228,.06)', background: scored ? 'rgba(198,255,58,.04)' : 'none' }}>
            <button onClick={() => setOpen(o => !o)} style={{
                width: '100%', background: open ? 'rgba(242,237,228,.03)' : 'none',
                border: 'none', cursor: 'pointer', padding: '8px 16px',
                display: 'grid', gridTemplateColumns: '28px 1fr 90px 52px 20px 24px',
                alignItems: 'center', gap: '10px',
            }}>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '11px', color: 'var(--muted)', textAlign: 'right' }}>{p.number}</span>
                <div style={{ textAlign: 'left', minWidth: 0 }}>
                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: '13px', color: scored ? '#C6FF3A' : 'var(--chalk)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{p.name}</span>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color, letterSpacing: '.04em' }}>{posLabel}</span>
                </div>
                <div style={{ height: '5px', background: 'rgba(242,237,228,.08)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(p.try_proba / maxP) * 100}%`, background: scored ? '#C6FF3A' : color, borderRadius: '3px' }} />
                </div>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '12px', fontWeight: 700, color: scored ? '#C6FF3A' : color, textAlign: 'right' }}>{p.try_proba}%</span>
                <span style={{ fontSize: '13px', textAlign: 'center' }}>
                    {resultKnown ? (scored ? '✓' : '') : ''}
                </span>
                <span style={{ color: 'var(--muted)', fontSize: '10px' }}>{open ? '▾' : '▸'}</span>
            </button>
            {open && (
                <div style={{ padding: '0 16px 12px 54px' }}>
                    <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '9px', letterSpacing: '.18em', textTransform: 'uppercase', color, marginBottom: '8px' }}>
                        {p.team} · {venueLabel}
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                        <tbody>
                            {scorerFeatsConfig.map(([label, valFn, colorFn, highlight], i) => {
                                const val = valFn(f)
                                const colorVal = colorFn(f)
                                const col = highlight ? 'var(--chalk)'
                                    : colorVal > 0 ? '#C6FF3A'
                                    : colorVal < 0 ? '#FF6B7A'
                                    : 'var(--chalk)'
                                return (
                                    <tr key={i} style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(242,237,228,.06)' }}>
                                        <td style={{ padding: '4px 12px 4px 0', color: 'var(--muted)', fontFamily: "'Space Grotesk',sans-serif" }}>{label}</td>
                                        <td style={{ padding: '4px 0', fontFamily: "'Space Mono',monospace", fontWeight: 700, textAlign: 'right', color: col }}>{val}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

// ── Page ───────────────────────────────────────────────────────────────────────

const CHAMPS = [
    { id: 'top14', label: 'Top 14' },
    { id: 'prod2', label: 'Pro D2' },
]

function TabBar({ tabs, active, onChange }) {
    return (
        <div style={{ display: 'flex' }}>
            {tabs.map(t => (
                <button
                    key={t.id}
                    onClick={() => onChange(t.id)}
                    style={{
                        padding: '10px 16px', fontSize: '13px', fontWeight: 700,
                        background: 'none', border: 'none',
                        borderBottom: `2px solid ${active === t.id ? 'var(--accent)' : 'transparent'}`,
                        color: active === t.id ? 'var(--accent)' : 'var(--muted)',
                        cursor: 'pointer', fontFamily: "'Space Grotesk',sans-serif",
                        transition: 'color .15s',
                    }}
                    onMouseEnter={e => { if (active !== t.id) e.currentTarget.style.color = 'var(--chalk)' }}
                    onMouseLeave={e => { if (active !== t.id) e.currentTarget.style.color = 'var(--muted)' }}
                >
                    {t.label}
                </button>
            ))}
        </div>
    )
}

function LangToggle({ lang, setLang }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', background: 'rgba(242,237,228,.06)', border: '1px solid var(--line)', borderRadius: '999px', padding: '3px' }}>
            {['fr', 'en'].map(l => (
                <button
                    key={l}
                    onClick={() => setLang(l)}
                    style={{
                        padding: '4px 11px', borderRadius: '999px', fontSize: '11px',
                        fontWeight: 700, border: 'none', cursor: 'pointer',
                        fontFamily: "'Space Mono',monospace", letterSpacing: '.08em',
                        textTransform: 'uppercase', transition: 'all .15s',
                        background: lang === l ? 'var(--accent)' : 'transparent',
                        color: lang === l ? 'var(--ink)' : 'var(--muted)',
                    }}
                >
                    {l}
                </button>
            ))}
        </div>
    )
}

const wrap = { maxWidth: '860px', margin: '0 auto', padding: '0 32px' }

const PredictionsPage = () => {
    const [data,        setData]        = React.useState(null)
    const [scorerData,  setScorerData]  = React.useState(null)
    const [loading,     setLoading]     = React.useState(true)
    const [error,       setError]       = React.useState(false)
    const [champ,       setChamp]       = React.useState('top14')
    const [activeTab,   setActiveTab]   = React.useState('predictions')
    const [lang,        setLang]        = React.useState('fr')

    React.useEffect(() => {
        Promise.all([
            fetch('/predictions.json').then(r => { if (!r.ok) throw new Error(); return r.json() }),
            fetch('/player_predictions.json').then(r => r.ok ? r.json() : null).catch(() => null),
        ]).then(([pred, scorer]) => {
            setData(pred)
            setScorerData(scorer)
            setLoading(false)
        }).catch(() => { setError(true); setLoading(false) })
    }, [])

    const t = TR[lang]
    const champData = data?.[champ]
    const TABS = [
        { id: 'predictions', label: t.predictions },
        { id: 'history',     label: t.history     },
    ]

    return (
        <LangContext.Provider value={lang}>
            <Layout>
                <div className="oa-page-header">
                    <div style={wrap}>
                        <div className="oa-eyebrow">{t.eyebrow}</div>
                        <h1>{t.pageTitle}</h1>
                        <p>{t.pageSubtitle}</p>
                    </div>
                </div>

                <div style={{ ...wrap, paddingTop: '40px', paddingBottom: '80px' }}>
                    <NewsletterSignup />

                    {/* Championship selector + lang toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
                            {CHAMPS.map(c => (
                                <button
                                    key={c.id}
                                    onClick={() => setChamp(c.id)}
                                    style={{
                                        padding: '8px 20px', borderRadius: '999px', fontSize: '13px',
                                        fontWeight: 700, border: '2px solid', cursor: 'pointer',
                                        fontFamily: "'Space Grotesk',sans-serif", transition: 'all .15s',
                                        ...(champ === c.id
                                            ? { background: 'var(--accent)', borderColor: 'var(--accent)', color: 'var(--ink)' }
                                            : { background: 'transparent', borderColor: 'var(--line)', color: 'var(--muted)' }
                                        ),
                                    }}
                                    onMouseEnter={e => { if (champ !== c.id) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--chalk)' } }}
                                    onMouseLeave={e => { if (champ !== c.id) { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--muted)' } }}
                                >
                                    {c.label}
                                </button>
                            ))}
                        </div>
                        <LangToggle lang={lang} setLang={setLang} />
                    </div>

                    {/* Content tabs */}
                    <div style={{ borderBottom: '1px solid var(--line)', marginBottom: '24px' }}>
                        <TabBar tabs={TABS} active={activeTab} onChange={setActiveTab} />
                    </div>

                    {loading && <p style={{ textAlign: 'center', padding: '48px 0', color: 'var(--muted)' }}>{t.loading}</p>}
                    {error   && <p style={{ textAlign: 'center', padding: '48px 0', color: 'var(--muted)' }}>{t.noData}</p>}
                    {champData && (
                        <>
                            {activeTab === 'predictions' && <PredictionsTab current={champData.current} scorerMatches={scorerData?.matches?.filter(m => m.competition?.toUpperCase().replace(' ','') === (champ === 'top14' ? 'TOP14' : 'PROD2'))?.map(m => ({ ...m, perf: scorerData?.performance?.[champ] }))} />}
                            {activeTab === 'history'     && <HistoryTab history={champData.history} stats={champData.stats} scorerData={scorerData} champ={champ} />}
                            <p style={{ fontSize: '11px', color: 'var(--muted)', textAlign: 'center', marginTop: '32px', fontFamily: "'Space Mono',monospace" }}>
                                {t.generatedOn} {data.generated_at}
                            </p>
                        </>
                    )}
                </div>
            </Layout>
        </LangContext.Provider>
    )
}

export const Head = () => (
    <Seo
        page="Analytics — Data Ruck"
        description="Top 14 and Pro D2 match outcome predictions based on a statistical model. Outcome derived from score predictions."
        type="website"
        path="/predictions"
    />
)

export default PredictionsPage
