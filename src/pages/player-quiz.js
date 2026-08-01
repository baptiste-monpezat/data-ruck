import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'

// ── Colors ────────────────────────────────────────────────────────────────────
const C = {
  bg:     '#0D0D0D',
  card:   '#141414',
  card2:  '#1A1A1A',
  line:   '#222',
  chalk:  '#F0EDE6',
  muted:  '#8A8A8A',
  accent: '#FFD03A',
  green:  '#22C55E',
  red:    '#EF4444',
}

// ── i18n ──────────────────────────────────────────────────────────────────────
const TR = {
  fr: {
    title:    'Connais-tu tes joueurs ?',
    subtitle: 'Entraîne-toi sur les effectifs du Top 14.',
    modes: {
      'name-mcq':   { label: 'Reconnais',   desc: 'Photo → choix du nom' },
      'pos-mcq':    { label: 'Poste',        desc: 'Photo + nom → choix du poste' },
      'name-write': { label: 'Tape le nom', desc: 'Photo → écris le nom' },
      'team-drill': { label: 'Effectif',    desc: "Récite l'équipe de l'avant vers l'arrière" },
    },
    selectTeams:    'Équipes (quiz aléatoire)',
    selectDrill:    'Équipe à réciter',
    all:   'Tout',
    none:  'Aucun',
    players:    'joueur',
    players_pl: 'joueurs',
    start:      'Lancer',
    next:       'Joueur suivant',
    skip:       'Je ne sais pas',
    finish:     'Voir mon score',
    restart:    'Rejouer',
    retryWrong: 'Rejouer les ratés',
    changeTeam: "Changer d'équipe",
    changeTeams:"Changer d'équipes",
    noPhoto:    'Photo non disponible',
    langBtn:    'English',
    correctAnswer: 'Bonne réponse',
    yourAnswer:    'Ta réponse',
    progressTitle: 'Ma progression',
    knownLabel:    'connus',
    masteredLabel: 'maîtrisés',
    posGroups: {
      '1ère ligne':       'Avants — 1ère ligne',
      '2ème ligne':       'Avants — 2ème ligne',
      '3ème ligne':       'Avants — 3ème ligne',
      'Demi de mêlée':    'Demis de mêlée',
      "Demi d'ouverture": "Demis d'ouverture",
      Centre:             'Centres',
      Ailier:             'Ailiers',
      Arrière:            'Arrières',
    },
    positions: {
      '1ère ligne':       '1ère ligne',
      '2ème ligne':       '2ème ligne',
      '3ème ligne':       '3ème ligne',
      'Demi de mêlée':    'Demi de mêlée',
      "Demi d'ouverture": "Demi d'ouverture",
      Centre:             'Centre',
      Ailier:             'Ailier',
      Arrière:            'Arrière',
    },
    results: [
      { min: 0,  max: 5,  label: 'Débutant',   msg: "Tu découvres le Top 14 — reviens t'entraîner !" },
      { min: 6,  max: 10, label: 'Amateur',     msg: "Tu connais les stars mais les autres t'échappent encore." },
      { min: 11, max: 14, label: 'Connaisseur', msg: 'Bonne base ! Tu suis le championnat sérieusement.' },
      { min: 15, max: 18, label: 'Expert',      msg: 'Tu connais presque tous les effectifs.' },
      { min: 19, max: 20, label: 'Scout pro',   msg: 'Tu pourrais travailler pour un staff technique !' },
    ],
  },
  en: {
    title:    'Know your players?',
    subtitle: 'Train on Top 14 squads.',
    modes: {
      'name-mcq':   { label: 'Recognise',   desc: 'Photo → choose the name' },
      'pos-mcq':    { label: 'Position',    desc: 'Photo + name → choose the position' },
      'name-write': { label: 'Type name',   desc: 'Photo → type the name' },
      'team-drill': { label: 'Full squad',  desc: 'Recall a whole team, forwards to backs' },
    },
    selectTeams:    'Teams (random quiz)',
    selectDrill:    'Team to drill',
    all:   'All',
    none:  'None',
    players:    'player',
    players_pl: 'players',
    start:      'Start',
    next:       'Next player',
    skip:       'Skip',
    finish:     'See my score',
    restart:    'Play again',
    retryWrong: 'Retry wrong ones',
    changeTeam: 'Change team',
    changeTeams:'Change teams',
    noPhoto:    'Photo unavailable',
    langBtn:    'Français',
    correctAnswer: 'Correct answer',
    yourAnswer:    'Your answer',
    progressTitle: 'My progress',
    knownLabel:    'known',
    masteredLabel: 'mastered',
    posGroups: {
      '1ère ligne':       'Forwards — Front row',
      '2ème ligne':       'Forwards — Locks',
      '3ème ligne':       'Forwards — Back row',
      'Demi de mêlée':    'Scrum-halves',
      "Demi d'ouverture": 'Fly-halves',
      Centre:             'Centres',
      Ailier:             'Wings',
      Arrière:            'Fullbacks',
    },
    positions: {
      '1ère ligne':       'Front row',
      '2ème ligne':       'Lock',
      '3ème ligne':       'Back row',
      'Demi de mêlée':    'Scrum-half',
      "Demi d'ouverture": 'Fly-half',
      Centre:             'Centre',
      Ailier:             'Wing',
      Arrière:            'Fullback',
    },
    results: [
      { min: 0,  max: 5,  label: 'Rookie',     msg: "You're just getting started — keep training!" },
      { min: 6,  max: 10, label: 'Casual fan', msg: 'You know the stars but the squad depth escapes you.' },
      { min: 11, max: 14, label: 'Follower',   msg: 'Solid knowledge! You follow the championship closely.' },
      { min: 15, max: 18, label: 'Expert',     msg: 'You know nearly every squad member.' },
      { min: 19, max: 20, label: 'Pro scout',  msg: 'You could work for a coaching staff!' },
    ],
  },
}

// ── Constants ─────────────────────────────────────────────────────────────────
const POSITION_ORDER = [
  '1ère ligne', '2ème ligne', '3ème ligne',
  'Demi de mêlée', "Demi d'ouverture",
  'Centre', 'Ailier', 'Arrière',
]
const SESSION_SIZE  = 20
const PROGRESS_KEY  = 'data-ruck-player-progress'

// ── Progress helpers ──────────────────────────────────────────────────────────
function loadProgress() {
  if (typeof window === 'undefined') return {}
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}') } catch { return {} }
}

function saveProgress(p) {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(p)) } catch {}
}

// Returns updated full progress map (also persists it)
function addAnswer(prog, id, correct) {
  const e = prog[id] || { seen: 0, correct: 0 }
  const next = { ...prog, [id]: { seen: e.seen + 1, correct: e.correct + (correct ? 1 : 0) } }
  saveProgress(next)
  return next
}

// 0 = unseen, 1 = seen at least once correct, 2 = mastered (≥3 correct)
function mastery(entry) {
  if (!entry || entry.correct === 0) return 0
  return entry.correct >= 3 ? 2 : 1
}

function clubStats(clubName, players, prog) {
  const members = players.filter(p => p.club === clubName)
  return {
    total:    members.length,
    known:    members.filter(p => mastery(prog[p.id]) >= 1).length,
    mastered: members.filter(p => mastery(prog[p.id]) >= 2).length,
  }
}

// ── Name matching ─────────────────────────────────────────────────────────────
function norm(s) {
  return s.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')  // strip diacritics
    .replace(/-/g, ' ')                                 // hyphen → space
    .replace(/[^a-z0-9\s]/g, '')                        // drop other specials
    .replace(/\s+/g, ' ').trim()
}

// O(n) space Levenshtein
function lev(a, b) {
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length
  let row = Array.from({length: b.length + 1}, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0]; row[0] = i
    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j]
      row[j] = a[i-1] === b[j-1] ? prev : 1 + Math.min(prev, row[j], row[j-1])
      prev = tmp
    }
  }
  return row[b.length]
}

function isNameMatch(input, player) {
  if (!input.trim()) return false
  const inp   = norm(input)
  const full  = norm(player.name)
  const last  = norm(player.last_name)
  const first = norm(player.first_name)

  if (inp === full) return true
  if (inp === last) return true

  // "[X] [last]" where X matches the first name or its first word
  // Exact prefix: "Ben Tameifuna" for "Benjamin Tameifuna"
  // 1-edit fuzzy:  "Carlue Sadie"  for "Carlu Johann Sadie"
  const spaceIdx = inp.lastIndexOf(' ')
  if (spaceIdx >= 2) {
    const inpFirst = inp.slice(0, spaceIdx)
    const inpLast  = inp.slice(spaceIdx + 1)
    if (inpLast === last && inpFirst.length >= 3) {
      const firstWord = first.split(' ')[0]
      // exact prefix of full first name or first word
      if (first.startsWith(inpFirst) || firstWord.startsWith(inpFirst)) return true
      // 1-edit tolerance on the first word (catches "Carlue" → "Carlu", "Bne" → "Ben")
      if (inpFirst.length >= 4 && lev(inpFirst, firstWord) <= 1) return true
    }
  }

  return false
}

// ── Generic helpers ───────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getClubs(players) {
  const map = {}
  for (const p of players) if (!map[p.club]) map[p.club] = p.club_logo
  return Object.entries(map).sort(([a], [b]) => a.localeCompare(b)).map(([name, logo]) => ({ name, logo }))
}

function nameOptions(player, all) {
  const samePos = all.filter(p => p.id !== player.id && p.position === player.position)
  const diffClub = shuffle(samePos.filter(p => p.club !== player.club))
  const sameClub = shuffle(samePos.filter(p => p.club === player.club))
  const wrongs = [...diffClub, ...sameClub]
  if (wrongs.length < 3) {
    const any = shuffle(all.filter(p => p.id !== player.id && !wrongs.find(w => w.id === p.id)))
    wrongs.push(...any.slice(0, 3 - wrongs.length))
  }
  return shuffle([player, ...wrongs.slice(0, 3)])
}

function posOptions(player) {
  return shuffle([player.position, ...shuffle(POSITION_ORDER.filter(p => p !== player.position)).slice(0, 3)])
}

function sortByPosition(players) {
  return [...players].sort((a, b) => {
    const ai = POSITION_ORDER.indexOf(a.position)
    const bi = POSITION_ORDER.indexOf(b.position)
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
  })
}

// ── ClubCard ──────────────────────────────────────────────────────────────────
function ClubCard({ club, selected, onToggle, prog, radio }) {
  const pct = prog.total > 0 ? Math.round((prog.known / prog.total) * 100) : 0

  return (
    <button onClick={onToggle} title={club.name} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
      padding: '10px 6px',
      background: selected ? C.accent + '18' : C.card,
      border: `2px solid ${selected ? C.accent : C.line}`,
      borderRadius: 12, cursor: 'pointer',
      transition: 'border-color 0.15s, background 0.15s',
      position: 'relative',
    }}>
      {club.logo
        ? <img src={club.logo} alt={club.name} style={{ height: 34, width: 34, objectFit: 'contain' }} />
        : <div style={{ height: 34, width: 34, background: C.line, borderRadius: 8 }} />
      }
      <span style={{
        fontFamily: "'Space Grotesk', sans-serif", fontSize: 9, fontWeight: 600,
        color: selected ? C.accent : C.muted,
        textAlign: 'center', lineHeight: 1.3, wordBreak: 'break-word',
      }}>
        {club.name.replace('Hérault Rugby', 'MHR').replace('Bordeaux-Bègles', 'UBB').replace('Français Paris', 'Paris').replace('Stade Toulousain', 'Toulouse').replace('Stade Rochelais', 'La Rochelle').replace('Aviron Bayonnais', 'Bayonne').replace('Section Paloise', 'Pau').replace('ASM Clermont', 'Clermont').replace('Castres Olympique', 'Castres').replace('LOU Rugby', 'Lyon').replace('RC Toulon', 'Toulon').replace('Racing 92', 'Racing').replace('US Montauban', 'Montauban').replace('USA Perpignan', 'Perpignan')}
      </span>
      {pct > 0 && (
        <div style={{ width: '80%', height: 2, background: C.line, borderRadius: 1 }}>
          <div style={{ height: '100%', width: `${pct}%`, background: C.green, borderRadius: 1 }} />
        </div>
      )}
      {selected && radio && (
        <div style={{
          position: 'absolute', top: 3, right: 3, width: 14, height: 14,
          background: C.accent, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 8, fontWeight: 900, color: '#000',
        }}>✓</div>
      )}
    </button>
  )
}

// ── PlayerPhoto ───────────────────────────────────────────────────────────────
function PlayerPhoto({ player, lang, revealed, size = 300 }) {
  const t = TR[lang]
  const [err, setErr] = React.useState(false)
  React.useEffect(() => { setErr(false) }, [player.id])

  return (
    <div style={{
      position: 'relative', width: '100%', maxWidth: size, margin: '0 auto',
      borderRadius: 16, overflow: 'hidden',
      background: C.card2, border: `1px solid ${C.line}`,
      aspectRatio: '3/4',
    }}>
      {player.image && !err
        ? <img src={player.image} alt="" onError={() => setErr(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
        : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.muted, fontSize: 14 }}>
            {t.noPhoto}
          </div>
      }
      {revealed && player.club_logo && (
        <div style={{
          position: 'absolute', bottom: 10, right: 10,
          background: 'rgba(0,0,0,0.80)', borderRadius: 8, padding: '4px 10px',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <img src={player.club_logo} alt={player.club} style={{ height: 22, width: 'auto' }} />
          <span style={{ color: C.chalk, fontSize: 11, fontFamily: "'Space Grotesk', sans-serif" }}>{player.club}</span>
        </div>
      )}
    </div>
  )
}

// ── RevealCard ────────────────────────────────────────────────────────────────
function RevealCard({ player, lang }) {
  const t = TR[lang]
  return (
    <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: '14px 18px', marginTop: 14 }}>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: C.chalk, marginBottom: 6 }}>
        {player.name}
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{
          background: C.accent + '22', color: C.accent, border: `1px solid ${C.accent}44`,
          borderRadius: 6, padding: '2px 10px', fontSize: 12,
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
        }}>
          {t.positions[player.position] || player.position}
        </span>
        <span style={{ color: C.muted, fontSize: 13, fontFamily: "'Space Grotesk', sans-serif" }}>
          {player.club}
        </span>
        {player.country && (
          <span style={{ color: C.muted, fontSize: 13, fontFamily: "'Space Grotesk', sans-serif" }}>
            · {player.country}
          </span>
        )}
      </div>
    </div>
  )
}

// ── OptionButton ──────────────────────────────────────────────────────────────
function OptionButton({ label, onClick, state, disabled }) {
  const bg     = state === 'correct' ? C.green : state === 'wrong' ? C.red : C.card2
  const border = state === 'correct' ? C.green : state === 'wrong' ? C.red : C.line
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: '100%', background: bg, border: `1px solid ${border}`, borderRadius: 10,
      padding: '12px 16px',
      color: (state === 'correct' || state === 'wrong') ? '#000' : C.chalk,
      fontSize: 14, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
      cursor: disabled ? 'default' : 'pointer', textAlign: 'left',
    }}>
      {label}
    </button>
  )
}

// ── WriteInput ────────────────────────────────────────────────────────────────
function WriteInput({ player, lang, onAnswer }) {
  const t = TR[lang]
  const [val, setVal]       = React.useState('')
  const [status, setStatus] = React.useState(null) // null | 'correct' | 'wrong'
  const inputRef = React.useRef(null)

  React.useEffect(() => { setVal(''); setStatus(null); setTimeout(() => inputRef.current?.focus(), 50) }, [player.id])

  const submit = () => {
    if (status) return
    const ok = isNameMatch(val, player)
    setStatus(ok ? 'correct' : 'wrong')
    onAnswer(ok, val)
  }

  const skip = () => {
    if (status) return
    setStatus('wrong')
    onAnswer(false, null)
  }

  const inputBg = status === 'correct' ? C.green + '22' : status === 'wrong' ? C.red + '22' : C.card2
  const inputBorder = status === 'correct' ? C.green : status === 'wrong' ? C.red : C.line

  return (
    <div style={{ marginTop: 16 }}>
      <form onSubmit={e => { e.preventDefault(); if (!status) submit() }} style={{ display: 'flex', gap: 8 }}>
        <input
          ref={inputRef}
          value={val}
          onChange={e => setVal(e.target.value)}
          disabled={!!status}
          placeholder="Nom du joueur…"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          style={{
            flex: 1, background: inputBg, border: `1px solid ${inputBorder}`,
            borderRadius: 10, padding: '12px 14px', color: C.chalk,
            fontSize: 16, fontFamily: "'Space Grotesk', sans-serif", outline: 'none',
            WebkitAppearance: 'none',
          }}
        />
        {!status && (
          <button type="submit" style={{
            background: C.accent, color: '#000', border: 'none',
            borderRadius: 10, padding: '0 18px',
            fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14, cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
          }}>OK</button>
        )}
      </form>

      {!status && (
        <button onClick={skip} style={{
          background: 'none', border: 'none', color: C.muted, cursor: 'pointer',
          fontSize: 14, marginTop: 8, fontFamily: "'Space Grotesk', sans-serif",
          padding: '8px 4px', minHeight: 44, WebkitTapHighlightColor: 'transparent',
        }}>
          {t.skip} →
        </button>
      )}

      {status === 'wrong' && (
        <div style={{ marginTop: 10, padding: '10px 14px', background: C.red + '15', border: `1px solid ${C.red}33`, borderRadius: 10 }}>
          {val && <div style={{ fontSize: 12, color: C.muted, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 3 }}>
            {t.yourAnswer} : {val}
          </div>}
          <div style={{ fontSize: 14, color: C.chalk, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
            {t.correctAnswer} : {player.name}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Progress section (home screen) ────────────────────────────────────────────
function ProgressSection({ lang, clubs, allPlayers, prog }) {
  const t = TR[lang]
  const [open, setOpen] = React.useState(false)

  const totalKnown    = allPlayers.filter(p => mastery(prog[p.id]) >= 1).length
  const totalMastered = allPlayers.filter(p => mastery(prog[p.id]) >= 2).length

  if (totalKnown === 0) return null

  return (
    <div style={{ marginBottom: 20 }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', background: 'none', border: `1px solid ${C.line}`, borderRadius: 10,
        padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        cursor: 'pointer',
      }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: C.chalk }}>
          {t.progressTitle}
        </span>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: C.muted }}>
          {totalKnown} {t.knownLabel} · {totalMastered} {t.masteredLabel} {open ? '▲' : '▼'}
        </span>
      </button>

      {open && (
        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {clubs.map(club => {
            const s = clubStats(club.name, allPlayers, prog)
            if (s.known === 0) return null
            const pctK = Math.round((s.known    / s.total) * 100)
            const pctM = Math.round((s.mastered / s.total) * 100)
            return (
              <div key={club.name} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '8px 12px', background: C.card, borderRadius: 8,
              }}>
                {club.logo && <img src={club.logo} alt={club.name} style={{ height: 24, width: 24, objectFit: 'contain', flexShrink: 0 }} />}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: C.chalk, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {club.name}
                    </span>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: C.muted, flexShrink: 0, marginLeft: 8 }}>
                      {s.known}/{s.total}
                    </span>
                  </div>
                  <div style={{ height: 4, background: C.line, borderRadius: 2, position: 'relative' }}>
                    <div style={{ height: '100%', width: `${pctK}%`, background: C.green + '66', borderRadius: 2, position: 'absolute' }} />
                    <div style={{ height: '100%', width: `${pctM}%`, background: C.green, borderRadius: 2, position: 'absolute' }} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Home screen ───────────────────────────────────────────────────────────────
function HomeScreen({ lang, setLang, mode, setMode, clubs, allPlayers, selectedClubs, setSelectedClubs, drillTeam, setDrillTeam, prog, onStart }) {
  const t = TR[lang]
  const isDrill = mode === 'team-drill'

  const filteredCount = isDrill
    ? allPlayers.filter(p => p.club === drillTeam).length
    : allPlayers.filter(p => selectedClubs.has(p.club)).length

  const canStart = isDrill
    ? !!drillTeam
    : selectedClubs.size > 0 && filteredCount >= 4

  const toggleMulti = (name) => setSelectedClubs(prev => {
    const s = new Set(prev)
    s.has(name) ? s.delete(name) : s.add(name)
    return s
  })

  return (
    <div style={{ padding: '28px 16px 60px', maxWidth: 520, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: C.accent, letterSpacing: 2, marginBottom: 8, textTransform: 'uppercase' }}>
          Top 14
        </div>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, color: C.chalk, margin: '0 0 6px' }}>
          {t.title}
        </h2>
        <p style={{ color: C.muted, fontSize: 13, margin: 0, lineHeight: 1.6 }}>{t.subtitle}</p>
      </div>

      {/* Mode picker */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 }}>
        {Object.entries(t.modes).map(([key, m]) => (
          <button key={key} onClick={() => setMode(key)} style={{
            padding: '12px 10px', textAlign: 'left',
            background: mode === key ? C.accent + '18' : C.card,
            border: `2px solid ${mode === key ? C.accent : C.line}`,
            borderRadius: 12, cursor: 'pointer',
          }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: mode === key ? C.accent : C.chalk, marginBottom: 3 }}>
              {m.label}
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: C.muted }}>
              {m.desc}
            </div>
          </button>
        ))}
      </div>

      {/* Team picker */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, color: C.chalk }}>
            {isDrill ? t.selectDrill : t.selectTeams}
          </span>
          {!isDrill && (
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setSelectedClubs(new Set(clubs.map(c => c.name)))} style={{ background: 'none', border: 'none', color: C.muted, cursor: 'pointer', fontSize: 11, fontFamily: "'Space Grotesk', sans-serif" }}>{t.all}</button>
              <button onClick={() => setSelectedClubs(new Set())} style={{ background: 'none', border: 'none', color: C.muted, cursor: 'pointer', fontSize: 11, fontFamily: "'Space Grotesk', sans-serif" }}>{t.none}</button>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(62px, 1fr))', gap: 6 }}>
          {clubs.map(club => {
            const s = clubStats(club.name, allPlayers, prog)
            const selected = isDrill ? drillTeam === club.name : selectedClubs.has(club.name)
            return (
              <ClubCard
                key={club.name}
                club={club}
                selected={selected}
                prog={s}
                radio={isDrill}
                onToggle={() => isDrill ? setDrillTeam(club.name) : toggleMulti(club.name)}
              />
            )
          })}
        </div>

        {!isDrill && (
          <div style={{ textAlign: 'center', marginTop: 8, fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: C.muted }}>
            {filteredCount} {filteredCount === 1 ? t.players : t.players_pl} · {selectedClubs.size} équipe{selectedClubs.size !== 1 ? 's' : ''}
          </div>
        )}
        {isDrill && drillTeam && (
          <div style={{ textAlign: 'center', marginTop: 8, fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: C.muted }}>
            {filteredCount} {filteredCount === 1 ? t.players : t.players_pl}
          </div>
        )}
      </div>

      {/* Progress */}
      <ProgressSection lang={lang} clubs={clubs} allPlayers={allPlayers} prog={prog} />

      {/* Start */}
      <button onClick={onStart} disabled={!canStart} style={{
        width: '100%', background: canStart ? C.accent : C.line,
        color: canStart ? '#000' : C.muted,
        border: 'none', borderRadius: 10, padding: '14px',
        fontSize: 15, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif",
        cursor: canStart ? 'pointer' : 'default', marginBottom: 14,
      }}>
        {t.start}
      </button>

      <div style={{ textAlign: 'center' }}>
        <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} style={{
          background: 'none', border: 'none', color: C.accent, cursor: 'pointer', fontSize: 13,
        }}>
          {t.langBtn}
        </button>
      </div>
    </div>
  )
}

// ── Quiz screen (name-mcq / pos-mcq / name-write) ─────────────────────────────
function QuizScreen({ lang, setLang, mode, session, qIdx, options, selected, score, onAnswer, onNext, onMCQPick, prog }) {
  const t       = TR[lang]
  const player  = session[qIdx]
  const total   = session.length
  const answered = selected !== null || (mode === 'name-write' && false) // write mode uses its own state

  const isWriteMode = mode === 'name-write'
  const [writeAnswered, setWriteAnswered] = React.useState(false)

  React.useEffect(() => { setWriteAnswered(false) }, [qIdx])

  const handleWriteAnswer = (correct, typed) => {
    setWriteAnswered(true)
    onAnswer(correct, typed)
  }

  const showReveal = isWriteMode ? writeAnswered : selected !== null

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '20px 16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: C.muted }}>{qIdx + 1} / {total}</div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: C.accent, background: C.accent + '18', border: `1px solid ${C.accent}44`, borderRadius: 6, padding: '3px 10px' }}>
          {score} pts
        </div>
        <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} style={{ background: 'none', border: 'none', color: C.muted, cursor: 'pointer', fontSize: 12 }}>
          {t.langBtn}
        </button>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: C.line, borderRadius: 2, marginBottom: 18 }}>
        <div style={{ height: '100%', background: C.accent, borderRadius: 2, width: `${((qIdx + 1) / total) * 100}%`, transition: 'width 0.3s' }} />
      </div>

      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, textAlign: 'center' }}>
        {mode === 'name-mcq' ? t.modes['name-mcq'].label : mode === 'pos-mcq' ? t.modes['pos-mcq'].label : t.modes['name-write'].label}
      </div>

      <PlayerPhoto player={player} lang={lang} revealed={showReveal} />

      {mode === 'pos-mcq' && (
        <div style={{ textAlign: 'center', marginTop: 14, fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: C.chalk }}>
          {player.name}
        </div>
      )}

      {/* MCQ options */}
      {!isWriteMode && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
          {options.map((opt, i) => {
            const label     = mode === 'name-mcq' ? opt.name : (t.positions[opt] || opt)
            const isCorrect = mode === 'name-mcq' ? opt.id === player.id : opt === player.position
            const isSelected = selected === i
            let state = 'neutral'
            if (selected !== null) state = isCorrect ? 'correct' : isSelected ? 'wrong' : 'neutral'
            return <OptionButton key={i} label={label} onClick={() => onMCQPick(i)} state={state} disabled={selected !== null} />
          })}
        </div>
      )}

      {/* Write input */}
      {isWriteMode && <WriteInput player={player} lang={lang} onAnswer={handleWriteAnswer} />}

      {/* Reveal card */}
      {showReveal && <RevealCard player={player} lang={lang} />}

      {/* Next button */}
      {showReveal && (
        <button onClick={onNext} style={{
          width: '100%', marginTop: 12,
          background: C.accent, color: '#000', border: 'none', borderRadius: 10, padding: '14px',
          fontSize: 15, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", cursor: 'pointer',
        }}>
          {qIdx + 1 >= total ? t.finish : t.next}
        </button>
      )}
    </div>
  )
}

// ── Team drill screen ─────────────────────────────────────────────────────────
function DrillScreen({ lang, setLang, session, qIdx, onAnswer, onNext, score }) {
  const t      = TR[lang]
  const player = session[qIdx]
  const total  = session.length
  const [answered, setAnswered] = React.useState(false)

  React.useEffect(() => { setAnswered(false) }, [qIdx])

  const handleAnswer = (correct, typed) => {
    setAnswered(true)
    onAnswer(correct, typed)
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '20px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: C.muted }}>{qIdx + 1} / {total}</div>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: C.accent,
          background: C.accent + '18', border: `1px solid ${C.accent}44`, borderRadius: 6, padding: '3px 10px',
        }}>
          {t.positions[player.position] || player.position}
        </div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: C.accent, background: C.accent + '18', border: `1px solid ${C.accent}44`, borderRadius: 6, padding: '3px 10px' }}>
          {score} pts
        </div>
      </div>

      <div style={{ height: 3, background: C.line, borderRadius: 2, marginBottom: 18 }}>
        <div style={{ height: '100%', background: C.accent, borderRadius: 2, width: `${((qIdx + 1) / total) * 100}%`, transition: 'width 0.3s' }} />
      </div>

      <PlayerPhoto player={player} lang={lang} revealed={answered} />

      <WriteInput player={player} lang={lang} onAnswer={handleAnswer} />

      {answered && <RevealCard player={player} lang={lang} />}

      {answered && (
        <button onClick={onNext} style={{
          width: '100%', marginTop: 12,
          background: C.accent, color: '#000', border: 'none', borderRadius: 10, padding: '14px',
          fontSize: 15, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", cursor: 'pointer',
        }}>
          {qIdx + 1 >= total ? t.finish : t.next}
        </button>
      )}
    </div>
  )
}

// ── Drill result screen ───────────────────────────────────────────────────────
function DrillResultScreen({ lang, session, drillResults, onRetryWrong, onChangeTeam }) {
  const t = TR[lang]
  const score  = drillResults.filter(r => r.correct).length
  const total  = drillResults.length
  const wrongs = drillResults.filter(r => !r.correct)

  // Group by position
  const grouped = POSITION_ORDER.map(pos => ({
    pos,
    players: drillResults.filter(r => r.player.position === pos),
  })).filter(g => g.players.length > 0)

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '28px 16px 60px' }}>
      {/* Score */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 52, color: C.chalk, marginBottom: 4 }}>
          {score}<span style={{ color: C.muted, fontSize: 22 }}>/{total}</span>
        </div>
        {session[0]?.club && (
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: C.muted }}>
            {session[0].club}
          </div>
        )}
      </div>

      {/* Grouped list */}
      {grouped.map(({ pos, players }) => (
        <div key={pos} style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
            {t.posGroups[pos] || pos}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {players.map(r => (
              <div key={r.player.id} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 12px',
                background: r.correct ? C.green + '18' : C.red + '18',
                border: `1px solid ${r.correct ? C.green + '44' : C.red + '44'}`,
                borderRadius: 8,
              }}>
                {r.player.image && (
                  <img src={r.player.image} alt="" style={{ width: 36, height: 48, objectFit: 'cover', objectPosition: 'top', borderRadius: 6, flexShrink: 0 }} />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: C.chalk }}>
                    {r.player.name}
                  </div>
                  {!r.correct && r.typed && (
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: C.muted, marginTop: 2 }}>
                      {r.typed}
                    </div>
                  )}
                </div>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{r.correct ? '✓' : '✗'}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
        {wrongs.length > 0 && (
          <button onClick={() => onRetryWrong(wrongs.map(r => r.player))} style={{
            background: C.accent, color: '#000', border: 'none', borderRadius: 10, padding: '13px',
            fontSize: 15, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", cursor: 'pointer',
          }}>
            {t.retryWrong} ({wrongs.length})
          </button>
        )}
        <button onClick={onChangeTeam} style={{
          background: 'none', color: C.muted, border: `1px solid ${C.line}`, borderRadius: 10, padding: '13px',
          fontSize: 14, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", cursor: 'pointer',
        }}>
          {t.changeTeam}
        </button>
      </div>
    </div>
  )
}

// ── Quiz result screen ────────────────────────────────────────────────────────
function ResultScreen({ score, total, lang, onRestart, onChangeTeams }) {
  const t = TR[lang]
  const pct = Math.round((score / total) * 100)
  const tier = [...t.results].sort((a, b) => b.min - a.min).find(r => score >= r.min) || t.results[0]
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px', maxWidth: 400, margin: '0 auto' }}>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 52, color: C.chalk, marginBottom: 4 }}>
        {score}<span style={{ color: C.muted, fontSize: 22 }}>/{total}</span>
      </div>
      <div style={{ color: C.muted, fontSize: 13, marginBottom: 16 }}>{pct}%</div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, color: C.accent, marginBottom: 10 }}>{tier.label}</div>
      <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.6, marginBottom: 32 }}>{tier.msg}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button onClick={onRestart} style={{
          background: C.accent, color: '#000', border: 'none', borderRadius: 10, padding: '13px',
          fontSize: 15, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", cursor: 'pointer',
        }}>{t.restart}</button>
        <button onClick={onChangeTeams} style={{
          background: 'none', color: C.muted, border: `1px solid ${C.line}`, borderRadius: 10, padding: '13px',
          fontSize: 14, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", cursor: 'pointer',
        }}>{t.changeTeams}</button>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function PlayerQuiz() {
  const [lang, setLang]     = React.useState('fr')
  const [mode, setMode]     = React.useState('name-mcq')
  // phase: 'loading' | 'home' | 'playing' | 'drilling' | 'result' | 'drill-result'
  const [phase, setPhase]   = React.useState('loading')

  const [allPlayers, setAll]  = React.useState([])
  const [clubs, setClubs]     = React.useState([])
  const [prog, setProg]       = React.useState({})

  // quiz modes selection
  const [selectedClubs, setSelectedClubs] = React.useState(new Set())
  // drill mode selection
  const [drillTeam, setDrillTeam] = React.useState(null)

  // shared session state
  const [session, setSession]   = React.useState([])
  const [qIdx, setQIdx]         = React.useState(0)
  const [options, setOptions]   = React.useState([])
  const [selected, setSelected] = React.useState(null)  // MCQ only
  const [score, setScore]       = React.useState(0)
  const [drillResults, setDrillResults] = React.useState([])

  // Load players + progress on mount
  React.useEffect(() => {
    fetch('/lnr-players.json')
      .then(r => r.json())
      .then(data => {
        setAll(data)
        const cl = getClubs(data)
        setClubs(cl)
        setSelectedClubs(new Set(cl.map(c => c.name)))
        setProg(loadProgress())
        setPhase('home')
      })
      .catch(() => setPhase('home'))
  }, [])

  // ── Helpers ────────────────────────────────────────────────────────────────
  const record = (id, correct) => {
    setProg(p => addAnswer(p, id, correct))
  }

  // ── Start quiz (name-mcq / pos-mcq / name-write) ───────────────────────────
  const startQuiz = React.useCallback(() => {
    const pool   = allPlayers.filter(p => selectedClubs.has(p.club))
    const picked = shuffle(pool).slice(0, SESSION_SIZE)
    setSession(picked)
    setQIdx(0)
    setScore(0)
    setSelected(null)
    if (mode !== 'name-write') setOptions(mode === 'name-mcq' ? nameOptions(picked[0], allPlayers) : posOptions(picked[0]))
    setPhase('playing')
  }, [allPlayers, selectedClubs, mode])

  // ── Start drill ────────────────────────────────────────────────────────────
  const startDrill = React.useCallback((overridePlayers) => {
    const teamPlayers = overridePlayers || sortByPosition(allPlayers.filter(p => p.club === drillTeam))
    setSession(teamPlayers)
    setQIdx(0)
    setScore(0)
    setDrillResults([])
    setPhase('drilling')
  }, [allPlayers, drillTeam])

  const handleStart = () => {
    if (mode === 'team-drill') startDrill()
    else startQuiz()
  }

  // ── MCQ pick ───────────────────────────────────────────────────────────────
  const handleMCQPick = React.useCallback((idx) => {
    if (selected !== null) return
    setSelected(idx)
    const opt = options[idx]
    const player = session[qIdx]
    const correct = mode === 'name-mcq' ? opt.id === player.id : opt === player.position
    if (correct) setScore(s => s + 1)
    record(player.id, correct)
  }, [selected, options, mode, session, qIdx])

  // ── Write / drill answer callback ──────────────────────────────────────────
  const handleWriteAnswer = React.useCallback((correct, typed) => {
    const player = session[qIdx]
    if (correct) setScore(s => s + 1)
    record(player.id, correct)
    if (phase === 'drilling') {
      setDrillResults(r => [...r, { player, correct, typed }])
    }
  }, [session, qIdx, phase])

  // ── Next (quiz modes) ──────────────────────────────────────────────────────
  const handleNext = React.useCallback(() => {
    const nextIdx = qIdx + 1
    if (nextIdx >= session.length) { setPhase('result'); return }
    const nextPlayer = session[nextIdx]
    setQIdx(nextIdx)
    setSelected(null)
    if (mode !== 'name-write') setOptions(mode === 'name-mcq' ? nameOptions(nextPlayer, allPlayers) : posOptions(nextPlayer))
  }, [qIdx, session, mode, allPlayers])

  // ── Next (drill) ───────────────────────────────────────────────────────────
  const handleDrillNext = React.useCallback(() => {
    const nextIdx = qIdx + 1
    if (nextIdx >= session.length) { setPhase('drill-result'); return }
    setQIdx(nextIdx)
  }, [qIdx, session])

  // ── Loading ────────────────────────────────────────────────────────────────
  if (phase === 'loading') {
    return (
      <Layout>
        <div style={{ background: C.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: C.muted, fontFamily: "'Space Grotesk', sans-serif" }}>Chargement…</span>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div style={{ background: C.bg, minHeight: '100vh', paddingBottom: 80 }}>

        {phase === 'home' && (
          <HomeScreen
            lang={lang} setLang={setLang}
            mode={mode} setMode={setMode}
            clubs={clubs} allPlayers={allPlayers}
            selectedClubs={selectedClubs} setSelectedClubs={setSelectedClubs}
            drillTeam={drillTeam} setDrillTeam={setDrillTeam}
            prog={prog}
            onStart={handleStart}
          />
        )}

        {phase === 'playing' && session[qIdx] && (
          <QuizScreen
            lang={lang} setLang={setLang}
            mode={mode}
            session={session} qIdx={qIdx}
            options={options} selected={selected} score={score}
            onMCQPick={handleMCQPick}
            onAnswer={handleWriteAnswer}
            onNext={handleNext}
            prog={prog}
          />
        )}

        {phase === 'drilling' && session[qIdx] && (
          <DrillScreen
            lang={lang} setLang={setLang}
            session={session} qIdx={qIdx} score={score}
            onAnswer={handleWriteAnswer}
            onNext={handleDrillNext}
          />
        )}

        {phase === 'result' && (
          <ResultScreen
            score={score} total={session.length} lang={lang}
            onRestart={startQuiz}
            onChangeTeams={() => setPhase('home')}
          />
        )}

        {phase === 'drill-result' && (
          <DrillResultScreen
            lang={lang}
            session={session}
            drillResults={drillResults}
            onRetryWrong={(wrongPlayers) => startDrill(sortByPosition(wrongPlayers))}
            onChangeTeam={() => setPhase('home')}
          />
        )}

      </div>
    </Layout>
  )
}

export const Head = () => <Seo page="Quiz Joueurs Top 14" description="Reconnais les joueurs du Top 14 à partir de leur photo. Teste ta connaissance des effectifs club par club." type="website" path="/player-quiz/" />
