import * as React from 'react'
import Layout from "../components/layout"
import Seo from "../components/seo"

// ── Outcome helpers ────────────────────────────────────────────────────────────

const OUTCOME_LABEL = { H: "Home", D: "Draw", A: "Away" }
const OUTCOME_STYLE = {
    H: { background: 'rgba(198,255,58,.15)', color: '#C6FF3A', borderColor: 'rgba(198,255,58,.3)' },
    D: { background: 'rgba(255,200,58,.12)', color: '#FFD03A', borderColor: 'rgba(255,200,58,.3)' },
    A: { background: 'rgba(255,46,126,.12)', color: '#FF2E7E', borderColor: 'rgba(255,46,126,.3)' },
}

function OutcomeBadge({ outcome }) {
    return (
        <span style={{
            display: 'inline-block', padding: '2px 8px', borderRadius: '999px',
            fontSize: '11px', fontWeight: 700, border: '1px solid',
            fontFamily: "'Space Mono',monospace", letterSpacing: '.08em',
            ...OUTCOME_STYLE[outcome]
        }}>
            {OUTCOME_LABEL[outcome]}
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
    // ── Global ──────────────────────────────────────────────────────────────
    ["ELO rating",               "elo_home",                    "elo_away",                   int,  true,  'raw'],
    ["Season PPG",               "home_ppg",                    "away_ppg",                   f2,   true,  'raw'],
    ["Games played",             "home_n_games",                "away_n_games",               int,  false, 'raw'],
    // ── Last 5 ──────────────────────────────────────────────────────────────
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
    // ── Venue ───────────────────────────────────────────────────────────────
    ["Venue win ratio (last 5)", "home_venue_win_ratio",        "away_venue_win_ratio",        pct,  true,  'raw'],
    ["Venue avg margin (last 5)","home_venue_avg_margin",       "away_venue_avg_margin",       sign, true,  'raw'],
]

// Derived features (lineup model only) — single diff value, positive = home advantage
const DERIVED_FEATS = [
    ["ELO adj. by lineup quality",  "lineup_adj_elo_diff"],
    ["ELO × lineup interaction",    "elo_lineup_interaction"],
    ["Disruption diff",             "disruption_diff"],
    ["Charnière vs lineup diff",    "charniere_vs_total_diff"],
    ["Fwd dominance diff",          "fwd_dominance_diff"],
]

// Experience features (lineup model only)
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

// ── Shared feature table ───────────────────────────────────────────────────────

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
    const v = (match.derived || {})[key]
    if (v == null) return null
    const isPos = v > 0.005
    const isNeg = v < -0.005
    return (
        <tr key={fi} className="pred-table-row">
            <td style={{ padding: '6px 16px', fontSize: '12px', color: 'var(--muted)' }}>{label}</td>
            <td colSpan={2} style={{ padding: '6px 16px', textAlign: 'center', fontFamily: "'Space Mono',monospace", fontSize: '12px', fontWeight: 700, color: isPos ? '#C6FF3A' : isNeg ? '#FF2E7E' : 'var(--muted)' }}>
                {v > 0 ? '+' : ''}{v.toFixed(2)}
                <span style={{ marginLeft: '4px', fontWeight: 400, color: 'var(--muted)' }}>{isPos ? '← home' : isNeg ? 'away →' : 'even'}</span>
            </td>
        </tr>
    )
}

function FeatureTable({ match }) {
    const hasExp     = match.lineup_available && match.exp_raw && Object.keys(match.exp_raw).length > 0
    const hasDerived = match.lineup_available && match.derived && Object.keys(match.derived).length > 0
    const wx = match.weather || {}
    const hasWeather = (wx.rain_mm ?? 0) > 0 || (wx.wind_speed_kmh ?? 0) > 0 || (wx.temperature_c !== null && wx.temperature_c !== undefined)
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr className="pred-th">
                    <th style={{ padding: '8px 16px', textAlign: 'left',   fontSize: '11px', color: 'var(--muted)', fontWeight: 400, fontFamily: "'Space Mono',monospace" }}>Metric</th>
                    <th style={{ padding: '8px 16px', textAlign: 'center', fontSize: '11px', color: 'var(--muted)', fontWeight: 400 }}>{match.home}</th>
                    <th style={{ padding: '8px 16px', textAlign: 'center', fontSize: '11px', color: 'var(--muted)', fontWeight: 400 }}>{match.away}</th>
                </tr>
            </thead>
            <tbody>
                {FEATS.map((feat, fi) => FeatureRow(feat, feat[5], match, fi))}
                {hasExp && <>
                    <tr className="pred-section-head">
                        <td colSpan={3} style={{ padding: '6px 16px', fontSize: '11px', fontWeight: 700, color: 'var(--accent)', fontFamily: "'Space Mono',monospace", letterSpacing: '.06em' }}>★ LINEUP EXPERIENCE FEATURES</td>
                    </tr>
                    {EXP_FEATS.map((feat, fi) => FeatureRow(feat, 'exp_raw', match, fi))}
                </>}
                {hasDerived && <>
                    <tr className="pred-section-head">
                        <td colSpan={3} style={{ padding: '6px 16px', fontSize: '11px', fontWeight: 700, color: '#FFD03A', fontFamily: "'Space Mono',monospace", letterSpacing: '.06em' }}>⚡ DERIVED MODEL FEATURES</td>
                    </tr>
                    {DERIVED_FEATS.map((feat, fi) => DerivedRow(feat, match, fi))}
                </>}
                {hasWeather && <>
                    <tr className="pred-section-head">
                        <td colSpan={3} style={{ padding: '6px 16px', fontSize: '11px', fontWeight: 700, color: '#38BDF8', fontFamily: "'Space Mono',monospace", letterSpacing: '.06em' }}>🌦 MATCH-DAY WEATHER (KICKOFF)</td>
                    </tr>
                    <tr className="pred-table-row">
                        <td style={{ padding: '6px 16px', fontSize: '12px', color: 'var(--muted)' }}>Rain</td>
                        <td colSpan={2} style={{ padding: '6px 16px', textAlign: 'center', fontFamily: "'Space Mono',monospace", fontSize: '12px', color: 'var(--chalk)' }}>{wx.rain_mm ?? 0} mm</td>
                    </tr>
                    <tr className="pred-table-row">
                        <td style={{ padding: '6px 16px', fontSize: '12px', color: 'var(--muted)' }}>Wind</td>
                        <td colSpan={2} style={{ padding: '6px 16px', textAlign: 'center', fontFamily: "'Space Mono',monospace", fontSize: '12px', color: 'var(--chalk)' }}>{wx.wind_speed_kmh ?? 0} km/h</td>
                    </tr>
                    {wx.temperature_c !== null && wx.temperature_c !== undefined && (
                        <tr className="pred-table-row">
                            <td style={{ padding: '6px 16px', fontSize: '12px', color: 'var(--muted)' }}>Temperature</td>
                            <td colSpan={2} style={{ padding: '6px 16px', textAlign: 'center', fontFamily: "'Space Mono',monospace", fontSize: '12px', color: 'var(--chalk)' }}>{wx.temperature_c}°C</td>
                        </tr>
                    )}
                </>}
            </tbody>
        </table>
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

function MatchCard({ match }) {
    const primary = match.lineup_available ? match.lineup : match.base
    const [open, setOpen] = React.useState(false)
    return (
        <div style={{ background: 'var(--ink-2)', border: '1px solid var(--line)', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }}>
            <div style={{ padding: '20px' }}>
                {/* Teams */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '15px', fontWeight: 700, color: 'var(--chalk)', flex: 1 }}>{match.home}</div>
                    <div style={{ color: 'var(--muted)', padding: '0 12px', fontWeight: 300, fontSize: '14px' }}>vs</div>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '15px', fontWeight: 700, color: 'var(--chalk)', flex: 1, textAlign: 'right' }}>{match.away}</div>
                </div>

                <WeatherStrip weather={match.weather} />

                {/* Primary prediction */}
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <OutcomeBadge outcome={primary.outcome} />
                    <span style={{ marginLeft: '8px', fontSize: '20px', fontFamily: "'Space Mono',monospace", fontWeight: 700, color: 'var(--chalk)' }}>
                        {Math.round(primary.pred_home)} – {Math.round(primary.pred_away)}
                    </span>
                </div>

                {/* Prob bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                    <ProbBar label="Home" pct={primary.prob_h} color="bg-green-500" />
                    <ProbBar label="Draw" pct={primary.prob_d} color="bg-amber-400" />
                    <ProbBar label="Away" pct={primary.prob_a} color="bg-red-500" />
                </div>

                {/* Base vs lineup comparison */}
                {match.lineup_available && (
                    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '12px', marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '4px', fontFamily: "'Space Mono',monospace", letterSpacing: '.06em', textTransform: 'uppercase' }}>Base model</div>
                            <div style={{ fontFamily: "'Space Mono',monospace", fontWeight: 700, color: 'var(--chalk)', fontSize: '13px' }}>
                                {Math.round(match.base.pred_home)}–{Math.round(match.base.pred_away)}
                            </div>
                            <div style={{ marginTop: '4px' }}><OutcomeBadge outcome={match.base.outcome} /></div>
                            <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px', fontFamily: "'Space Mono',monospace" }}>
                                {match.base.prob_h}%H · {match.base.prob_d}%D · {match.base.prob_a}%A
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '11px', color: 'var(--accent)', marginBottom: '4px', fontFamily: "'Space Mono',monospace", letterSpacing: '.06em', textTransform: 'uppercase' }}>★ With lineups</div>
                            <div style={{ fontFamily: "'Space Mono',monospace", fontWeight: 700, color: 'var(--chalk)', fontSize: '13px' }}>
                                {Math.round(match.lineup.pred_home)}–{Math.round(match.lineup.pred_away)}
                            </div>
                            <div style={{ marginTop: '4px' }}><OutcomeBadge outcome={match.lineup.outcome} /></div>
                            <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px', fontFamily: "'Space Mono',monospace" }}>
                                {match.lineup.prob_h}%H · {match.lineup.prob_d}%D · {match.lineup.prob_a}%A
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {match.lineup_available
                        ? <span style={{ fontSize: '11px', color: 'var(--accent)', fontFamily: "'Space Mono',monospace", letterSpacing: '.06em' }}>★ LINEUPS AVAILABLE</span>
                        : <span style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: "'Space Mono',monospace" }}>No lineup data yet</span>
                    }
                    <button
                        onClick={() => setOpen(o => !o)}
                        style={{ fontSize: '11px', color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Space Mono',monospace", letterSpacing: '.06em', display: 'flex', alignItems: 'center', gap: '4px' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--chalk)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                    >
                        FEATURES {open ? '▾' : '▸'}
                    </button>
                </div>
            </div>

            {open && (
                <div style={{ borderTop: '1px solid var(--line)' }}>
                    <FeatureTable match={match} />
                </div>
            )}
        </div>
    )
}

// ── Tabs ───────────────────────────────────────────────────────────────────────

function PredictionsTab({ current }) {
    const champ = current.champ === 'top14' ? 'Top 14' : 'Pro D2'
    const d = new Date(current.gen_at)
    const fmt = isNaN(d) ? '' : d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '20px', fontWeight: 700, color: 'var(--chalk)', margin: '0 0 4px' }}>
                    {champ} — Journée {current.day}
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>
                    Season {current.season}{fmt ? ` · ${fmt}` : ''}
                </p>
            </div>
            {current.matches.map((m, i) => <MatchCard key={i} match={m} />)}
        </div>
    )
}

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

function HistoryTab({ history, stats }) {
    const [openMatch, setOpenMatch] = React.useState(null)

    if (!history.length) {
        return (
            <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '48px 0' }}>
                Results will appear here after the first matchday.
            </p>
        )
    }

    return (
        <div>
            {/* Overall accuracy */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <StatCard value={acc(stats.base_ok, stats.n)}   label="Base model"    sub={`${stats.base_ok} / ${stats.n} matches`} />
                <StatCard value={acc(stats.lineup_ok, stats.n)} label="With lineups ★" sub={`${stats.lineup_ok} / ${stats.n} matches`} bold />
            </div>

            {/* H / D / A breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                <StatCard value={acc(stats.home.base_ok, stats.home.total)} label="Home wins" sub={`${stats.home.base_ok} / ${stats.home.total}`} />
                <StatCard value={acc(stats.draw.base_ok, stats.draw.total)} label="Draws"     sub={`${stats.draw.base_ok} / ${stats.draw.total}`} />
                <StatCard value={acc(stats.away.base_ok, stats.away.total)} label="Away wins" sub={`${stats.away.base_ok} / ${stats.away.total}`} />
            </div>

            {/* Per-round tables */}
            {[...history].reverse().map((round, ri) => {
                const champ    = round.champ === 'top14' ? 'Top 14' : 'Pro D2'
                const roundAcc = acc(round.base_correct, round.total)
                return (
                    <div key={ri} style={{ background: 'var(--ink-2)', border: '1px solid var(--line)', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }}>
                        <div style={{ background: 'rgba(242,237,228,.06)', padding: '8px 16px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <span style={{ fontWeight: 600, color: 'var(--chalk)', fontFamily: "'Space Grotesk',sans-serif" }}>{champ} — Journée {round.day}</span>
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
                                        {['Home','Away','Pred.','Outcome','Result','✓'].map((h, i) => (
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
                                                        <FeatureTable match={m} />
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
    const [email,  setEmail]  = React.useState("")
    const [status, setStatus] = React.useState(null) // null | 'loading' | 'ok' | 'error'

    const submit = async (e) => {
        e.preventDefault()
        if (!BREVO_FORM_ID) { setStatus("error"); return }
        setStatus("loading")
        try {
            await fetch(BREVO_FORM_ID, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ EMAIL: email, email_address_check: "", locale: "fr" }).toString(),
            })
            setStatus("ok")
        } catch {
            setStatus("error")
        }
    }

    return (
        <div style={{ background: 'rgba(198,255,58,.06)', border: '1px solid rgba(198,255,58,.2)', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
            <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, color: 'var(--chalk)', margin: '0 0 4px', fontSize: '14px' }}>Get predictions by email</p>
            <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 12px' }}>Subscribe to receive an update each time new predictions are published.</p>
            {status === "ok" ? (
                <p style={{ fontSize: '13px', color: '#C6FF3A', fontWeight: 500, margin: 0 }}>You're subscribed! You'll receive an email when new predictions are published.</p>
            ) : (
                <form onSubmit={submit} style={{ display: 'flex', gap: '8px' }}>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        style={{
                            flex: 1, fontSize: '13px', borderRadius: '8px',
                            border: '1px solid var(--line)', background: 'rgba(242,237,228,.05)',
                            color: 'var(--chalk)', padding: '8px 12px', outline: 'none',
                            fontFamily: "'Space Grotesk',sans-serif",
                        }}
                    />
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        style={{
                            padding: '8px 20px', fontSize: '13px', fontWeight: 700,
                            borderRadius: '8px', border: 'none', cursor: 'pointer',
                            background: 'var(--accent)', color: 'var(--ink)',
                            fontFamily: "'Space Grotesk',sans-serif",
                            opacity: status === "loading" ? 0.5 : 1,
                        }}
                    >
                        {status === "loading" ? "…" : "Subscribe"}
                    </button>
                </form>
            )}
            {status === "error" && <p style={{ fontSize: '11px', color: '#FF2E7E', marginTop: '6px', margin: '6px 0 0' }}>Something went wrong, please try again.</p>}
        </div>
    )
}

// ── Page ───────────────────────────────────────────────────────────────────────

const CHAMPS = [
    { id: 'top14', label: 'Top 14' },
    { id: 'prod2', label: 'Pro D2' },
]

const TABS = [
    { id: 'predictions', label: 'Predictions' },
    { id: 'history',     label: 'History'     },
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

const wrap = { maxWidth: '860px', margin: '0 auto', padding: '0 32px' }

const PredictionsPage = () => {
    const [data,      setData]      = React.useState(null)
    const [loading,   setLoading]   = React.useState(true)
    const [error,     setError]     = React.useState(false)
    const [champ,     setChamp]     = React.useState('top14')
    const [activeTab, setActiveTab] = React.useState('predictions')

    React.useEffect(() => {
        fetch('/predictions.json')
            .then(r => { if (!r.ok) throw new Error(); return r.json() })
            .then(d => { setData(d); setLoading(false) })
            .catch(() => { setError(true); setLoading(false) })
    }, [])

    const champData = data?.[champ]

    return (
        <Layout>
            {/* Page header */}
            <div className="oa-page-header">
                <div style={wrap}>
                    <div className="oa-eyebrow">Machine Learning</div>
                    <h1>Analytics</h1>
                    <p>Match outcome predictions based on ELO ratings, recent form, and lineup experience. Updated each round.</p>
                </div>
            </div>

            <div style={{ ...wrap, paddingTop: '40px', paddingBottom: '80px' }}>
                <NewsletterSignup />

                {/* Championship selector */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
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

                {/* Content tabs */}
                <div style={{ borderBottom: '1px solid var(--line)', marginBottom: '24px' }}>
                    <TabBar tabs={TABS} active={activeTab} onChange={setActiveTab} />
                </div>

                {/* Content */}
                {loading && <p style={{ textAlign: 'center', padding: '48px 0', color: 'var(--muted)' }}>Loading…</p>}
                {error   && <p style={{ textAlign: 'center', padding: '48px 0', color: 'var(--muted)' }}>No predictions available yet.</p>}
                {champData && (
                    <>
                        {activeTab === 'predictions' && <PredictionsTab current={champData.current} />}
                        {activeTab === 'history'     && <HistoryTab history={champData.history} stats={champData.stats} />}
                        <p style={{ fontSize: '11px', color: 'var(--muted)', textAlign: 'center', marginTop: '32px', fontFamily: "'Space Mono',monospace" }}>
                            Generated on {data.generated_at}
                        </p>
                    </>
                )}
            </div>
        </Layout>
    )
}

export const Head = () => (
    <Seo
        page="Analytics — Offload AI"
        description="Top 14 and Pro D2 match outcome predictions based on a statistical model. Outcome derived from score predictions."
        type="website"
        path="/predictions"
    />
)

export default PredictionsPage
