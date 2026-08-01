import * as React from 'react'
import Layout from "../components/layout"
import Seo from "../components/seo"

// ── i18n ──────────────────────────────────────────────────────────────────────
const LangContext = React.createContext('fr')
const useLang = () => React.useContext(LangContext)

const TR = {
    fr: {
        eyebrow:      'Quiz Rugby',
        pageTitle:    'Teste tes connaissances',
        pageSubtitle: 'Top 14, Coupe d\'Europe, Premiership, URC, Coupe du Monde — 20 questions pour voir si tu connais vraiment le rugby.',
        start:        'Lancer le quiz',
        next:         'Question suivante',
        finish:       'Voir mon score',
        restart:      'Rejouer',
        correct:      'Bonne réponse !',
        wrong:        'Raté !',
        timeUp:       'Temps écoulé !',
        score:        'Score final',
        outOf:        'sur',
        seconds:      's',
        categories: {
            rules:         'Règles',
            history:       'Histoire',
            top14:         'Top 14',
            prod2:         'Pro D2',
            players:       'Joueurs',
            champions_cup: 'Coupe d\'Europe',
            premiership:   'Premiership',
            urc:           'URC / Pro14',
        },
        results: [
            { min: 0,  max: 5,  label: 'Débutant 🏉',         msg: 'Tu débutes dans le monde du rugby. Pas de panique, il y a une prochaine fois !' },
            { min: 6,  max: 10, label: 'Amateur 📺',           msg: 'Tu regardes les matchs mais les règles restent floues. Continue !' },
            { min: 11, max: 14, label: 'Fan confirmé 👏',      msg: 'Tu maîtrises bien les bases. Les prochains quarts de finale sont pour toi.' },
            { min: 15, max: 18, label: 'Passionné 🔥',         msg: 'Impressionnant ! Tu connais vraiment bien ce sport.' },
            { min: 19, max: 20, label: 'Expert rugby 🏆',      msg: 'Score parfait ! Tu pourrais être consultant à Canal+.' },
        ],
        langBtn: 'English',
    },
    en: {
        eyebrow:      'Rugby Quiz',
        pageTitle:    'Test your knowledge',
        pageSubtitle: 'Top 14, Champions Cup, Premiership, URC, World Cup — 20 questions to see how well you really know rugby.',
        start:        'Start quiz',
        next:         'Next question',
        finish:       'See my score',
        restart:      'Play again',
        correct:      'Correct!',
        wrong:        'Wrong!',
        timeUp:       'Time\'s up!',
        score:        'Final score',
        outOf:        'out of',
        seconds:      's',
        categories: {
            rules:         'Rules',
            history:       'History',
            top14:         'Top 14',
            prod2:         'Pro D2',
            players:       'Players',
            champions_cup: 'Champions Cup',
            premiership:   'Premiership',
            urc:           'URC / Pro14',
        },
        results: [
            { min: 0,  max: 5,  label: 'Beginner 🏉',          msg: 'You\'re just starting out. Don\'t worry, there\'s always next time!' },
            { min: 6,  max: 10, label: 'Casual fan 📺',         msg: 'You watch the games but the rules are still a bit fuzzy. Keep going!' },
            { min: 11, max: 14, label: 'Confirmed fan 👏',      msg: 'You know the basics well. You\'re ready for the knockout rounds.' },
            { min: 15, max: 18, label: 'Passionate 🔥',         msg: 'Impressive! You really know this sport.' },
            { min: 19, max: 20, label: 'Rugby expert 🏆',       msg: 'Perfect score! You could be a pundit on TV.' },
        ],
        langBtn: 'Français',
    },
}

// ── Colours (match site palette) ─────────────────────────────────────────────
const C = {
    bg:      '#0D0D0D',
    card:    '#141414',
    line:    '#222',
    chalk:   '#F0EDE6',
    muted:   '#8A8A8A',
    accent:  '#FFD03A',
    green:   '#22C55E',
    red:     '#EF4444',
}

const TIMER_SECONDS = 20
const CATEGORY_ORDER = ['rules', 'history', 'top14', 'prod2', 'players', 'champions_cup', 'premiership', 'urc']
const DIFFICULTIES = ['easy', 'medium', 'hard']
const DIFF_LABELS = { easy: { fr: 'Facile', en: 'Easy' }, medium: { fr: 'Moyen', en: 'Medium' }, hard: { fr: 'Difficile', en: 'Hard' } }
const DIFF_COLORS = { easy: '#22C55E', medium: '#F59E0B', hard: '#EF4444' }

function shuffle(arr) {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

function DifficultyBadge({ difficulty, lang }) {
    const label = DIFF_LABELS[difficulty]?.[lang] || difficulty
    const color = DIFF_COLORS[difficulty] || C.muted
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '2px 10px', borderRadius: '99px',
            fontSize: '10px', fontFamily: "'Space Mono', monospace",
            letterSpacing: '.1em', textTransform: 'uppercase',
            background: color + '22', color, border: `1px solid ${color}44`,
        }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block' }} />
            {label}
        </span>
    )
}

// ── Timer ring ────────────────────────────────────────────────────────────────
function TimerRing({ seconds, total }) {
    const r = 24
    const circ = 2 * Math.PI * r
    const progress = seconds / total
    return (
        <svg width={60} height={60} style={{ transform: 'rotate(-90deg)' }}>
            <circle cx={30} cy={30} r={r} fill="none" stroke={C.line} strokeWidth={4} />
            <circle
                cx={30} cy={30} r={r} fill="none"
                stroke={seconds <= 5 ? C.red : C.accent}
                strokeWidth={4}
                strokeDasharray={circ}
                strokeDashoffset={circ * (1 - progress)}
                style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
            />
            <text
                x={30} y={30}
                textAnchor="middle" dominantBaseline="central"
                style={{
                    transform: 'rotate(90deg)', transformOrigin: '30px 30px',
                    fill: seconds <= 5 ? C.red : C.chalk,
                    fontSize: '14px', fontFamily: "'Space Mono', monospace", fontWeight: 700,
                }}
            >{seconds}</text>
        </svg>
    )
}

// ── Category badge ────────────────────────────────────────────────────────────
function CatBadge({ cat }) {
    const t = useLang()
    const colors = {
        rules: '#3B82F6', history: '#8B5CF6', top14: C.accent, prod2: '#F97316',
        players: '#22C55E', champions_cup: '#EC4899', premiership: '#0EA5E9', urc: '#14B8A6',
    }
    return (
        <span style={{
            display: 'inline-block',
            padding: '2px 10px',
            borderRadius: '99px',
            fontSize: '10px',
            fontFamily: "'Space Mono', monospace",
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            background: colors[cat] + '22',
            color: colors[cat],
            border: `1px solid ${colors[cat]}44`,
        }}>
            {TR[t].categories[cat]}
        </span>
    )
}

// ── Progress bar ──────────────────────────────────────────────────────────────
function ProgressBar({ current, total }) {
    return (
        <div style={{ width: '100%', height: '3px', background: C.line, borderRadius: 2, marginBottom: 24 }}>
            <div style={{
                height: '100%', borderRadius: 2,
                background: C.accent,
                width: `${(current / total) * 100}%`,
                transition: 'width 0.4s ease',
            }} />
        </div>
    )
}

// ── Home screen ───────────────────────────────────────────────────────────────
function HomeScreen({ onStart, lang, setLang }) {
    const t = TR[lang]
    return (
        <div style={{ textAlign: 'center', padding: '48px 24px' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🏉</div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 32, color: C.chalk, margin: '0 0 12px' }}>
                {t.pageTitle}
            </h2>
            <p style={{ color: C.muted, fontSize: 16, margin: '0 0 40px', lineHeight: 1.6, maxWidth: 480, margin: '0 auto 40px' }}>
                {t.pageSubtitle}
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                {CATEGORY_ORDER.map(cat => (
                    <CatBadge key={cat} cat={cat} />
                ))}
            </div>
            <div style={{ marginTop: 48, display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button onClick={onStart} style={{
                    background: C.accent, color: '#000',
                    border: 'none', borderRadius: 8, padding: '14px 40px',
                    fontSize: 16, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif",
                    cursor: 'pointer', letterSpacing: '.02em',
                }}>
                    {t.start}
                </button>
                <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} style={{
                    background: 'transparent', color: C.muted,
                    border: `1px solid ${C.line}`, borderRadius: 8, padding: '14px 24px',
                    fontSize: 14, cursor: 'pointer', fontFamily: "'Space Mono', monospace",
                }}>
                    {t.langBtn}
                </button>
            </div>
        </div>
    )
}

// ── Result screen ─────────────────────────────────────────────────────────────
function ResultScreen({ score, total, breakdown, onRestart, lang, setLang }) {
    const t = TR[lang]
    const tier = t.results.find(r => score >= r.min && score <= r.max) || t.results[0]
    const pct = Math.round((score / total) * 100)

    return (
        <div style={{ textAlign: 'center', padding: '48px 24px' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>{tier.label.split(' ').pop()}</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, color: C.accent, marginBottom: 8 }}>
                {tier.label.replace(/\s*[^\w\s]\s*$/, '').trim()}
            </div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 48, color: C.chalk, marginBottom: 4 }}>
                {score}<span style={{ color: C.muted, fontSize: 24 }}>/{total}</span>
            </div>
            <div style={{ color: C.muted, fontSize: 14, marginBottom: 24 }}>{pct}%</div>
            <p style={{ color: C.muted, fontSize: 15, maxWidth: 400, margin: '0 auto 40px', lineHeight: 1.6 }}>
                {tier.msg}
            </p>

            {/* Breakdown by category */}
            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12,
                maxWidth: 360, margin: '0 auto 40px', textAlign: 'left',
            }}>
                {CATEGORY_ORDER.filter(cat => (breakdown[cat]?.total || 0) > 0).map(cat => {
                    const b = breakdown[cat]
                    return (
                        <div key={cat} style={{
                            background: C.card, border: `1px solid ${C.line}`,
                            borderRadius: 8, padding: '12px 16px',
                        }}>
                            <CatBadge cat={cat} />
                            <div style={{ marginTop: 8, fontFamily: "'Space Mono', monospace", fontSize: 18, color: C.chalk }}>
                                {b.correct}<span style={{ color: C.muted, fontSize: 12 }}>/{b.total}</span>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button onClick={onRestart} style={{
                    background: C.accent, color: '#000',
                    border: 'none', borderRadius: 8, padding: '14px 40px',
                    fontSize: 16, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif",
                    cursor: 'pointer',
                }}>
                    {t.restart}
                </button>
                <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} style={{
                    background: 'transparent', color: C.muted,
                    border: `1px solid ${C.line}`, borderRadius: 8, padding: '14px 24px',
                    fontSize: 14, cursor: 'pointer', fontFamily: "'Space Mono', monospace",
                }}>
                    {t.langBtn}
                </button>
            </div>
        </div>
    )
}

// ── Question card ─────────────────────────────────────────────────────────────
function QuestionCard({ question, qIndex, total, onAnswer, lang, streak }) {
    const t = TR[lang]
    const q = question[lang]
    const [selected, setSelected] = React.useState(null)
    const [timeLeft, setTimeLeft] = React.useState(TIMER_SECONDS)
    const [revealed, setRevealed] = React.useState(false)
    const timerRef = React.useRef(null)

    const reveal = React.useCallback((idx) => {
        if (revealed) return
        clearInterval(timerRef.current)
        setRevealed(true)
        setSelected(idx)
    }, [revealed])

    React.useEffect(() => {
        setSelected(null)
        setRevealed(false)
        setTimeLeft(TIMER_SECONDS)
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current)
                    setRevealed(true)
                    setSelected(-1)
                    return 0
                }
                return prev - 1
            })
        }, 1000)
        return () => clearInterval(timerRef.current)
    }, [question])

    const handleNext = () => {
        const correct = selected === q.answer
        onAnswer(correct, question.category)
    }

    const isLast = qIndex === total - 1

    return (
        <div>
            <ProgressBar current={qIndex + 1} total={total} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                    <CatBadge cat={question.category} />
                    <DifficultyBadge difficulty={question.difficulty} lang={lang} />
                    {streak > 1 && (
                        <span style={{ fontSize: 11, color: C.accent, fontFamily: "'Space Mono', monospace" }}>
                            🔥 ×{streak}
                        </span>
                    )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: C.muted, fontSize: 12, fontFamily: "'Space Mono', monospace" }}>
                        {qIndex + 1}/{total}
                    </span>
                    <TimerRing seconds={timeLeft} total={TIMER_SECONDS} />
                </div>
            </div>

            <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 20, color: C.chalk, marginBottom: 28,
                lineHeight: 1.45, fontWeight: 600,
            }}>
                {q.question}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {q.options.map((opt, i) => {
                    let bg = C.card, border = C.line, color = C.chalk
                    if (revealed) {
                        if (i === q.answer) { bg = '#16301A'; border = C.green; color = C.green }
                        else if (i === selected && i !== q.answer) { bg = '#2D1414'; border = C.red; color = C.red }
                        else { color = C.muted }
                    } else if (selected === i) {
                        border = C.accent
                    }
                    return (
                        <button key={i} onClick={() => !revealed && reveal(i)} style={{
                            background: bg, border: `1px solid ${border}`,
                            borderRadius: 8, padding: '14px 18px', textAlign: 'left',
                            fontSize: 15, color, cursor: revealed ? 'default' : 'pointer',
                            fontFamily: "'Space Grotesk', sans-serif",
                            transition: 'all 0.2s',
                            display: 'flex', gap: 12, alignItems: 'center',
                        }}>
                            <span style={{
                                width: 24, height: 24, borderRadius: 4,
                                border: `1px solid ${revealed && i === q.answer ? C.green : revealed && i === selected ? C.red : C.line}`,
                                background: revealed && i === q.answer ? C.green + '33' : revealed && i === selected && i !== q.answer ? C.red + '33' : 'transparent',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0, fontSize: 11, fontWeight: 700,
                                fontFamily: "'Space Mono', monospace",
                                color: revealed && i === q.answer ? C.green : revealed && i === selected ? C.red : C.muted,
                            }}>
                                {['A','B','C','D'][i]}
                            </span>
                            {opt}
                        </button>
                    )
                })}
            </div>

            {revealed && (
                <div style={{
                    background: selected === q.answer ? '#16301A' : '#2D1414',
                    border: `1px solid ${selected === q.answer ? C.green : C.red}`,
                    borderRadius: 8, padding: '12px 16px', marginBottom: 20,
                }}>
                    <div style={{
                        fontFamily: "'Space Mono', monospace", fontSize: 12,
                        color: selected === q.answer ? C.green : C.red,
                        fontWeight: 700, marginBottom: 6, letterSpacing: '.05em',
                    }}>
                        {timeLeft === 0 && selected === -1 ? t.timeUp : selected === q.answer ? t.correct : t.wrong}
                    </div>
                    <p style={{ color: C.muted, fontSize: 13, margin: 0, lineHeight: 1.6 }}>
                        {q.explanation}
                    </p>
                </div>
            )}

            {revealed && (
                <button onClick={handleNext} style={{
                    width: '100%', background: C.accent, color: '#000',
                    border: 'none', borderRadius: 8, padding: '14px',
                    fontSize: 16, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif",
                    cursor: 'pointer',
                }}>
                    {isLast ? t.finish : t.next}
                </button>
            )}
        </div>
    )
}

// ── Main quiz component ───────────────────────────────────────────────────────
const TOTAL_QUESTIONS = 20

function Quiz() {
    const [lang, setLang] = React.useState('fr')
    const [phase, setPhase] = React.useState('home')
    const [pool, setPool] = React.useState({})         // { easy: [...], medium: [...], hard: [...] }
    const [sequence, setSequence] = React.useState([]) // ordered list of picked questions
    const [qIndex, setQIndex] = React.useState(0)
    const [difficulty, setDifficulty] = React.useState('medium')
    const [score, setScore] = React.useState(0)
    const [streak, setStreak] = React.useState(0)
    const [breakdown, setBreakdown] = React.useState({})

    const pickNext = React.useCallback((currentPool, currentDiff) => {
        // Try current difficulty, fall back to adjacent levels if empty
        const order = currentDiff === 'easy'   ? ['easy', 'medium', 'hard']
                    : currentDiff === 'hard'   ? ['hard', 'medium', 'easy']
                    :                            ['medium', 'easy', 'hard']
        for (const d of order) {
            if (currentPool[d]?.length > 0) return d
        }
        return null
    }, [])

    const start = React.useCallback(async () => {
        try {
            const res = await fetch('/quiz-questions.json')
            const data = await res.json()
            const newPool = {}
            for (const d of DIFFICULTIES) {
                newPool[d] = shuffle(data.filter(q => q.difficulty === d))
            }
            // Pick first question (medium)
            const firstDiff = newPool.medium.length > 0 ? 'medium' : 'easy'
            const first = newPool[firstDiff].shift()
            setPool(newPool)
            setSequence([first])
            setDifficulty(firstDiff)
        } catch {
            setPool({})
            setSequence([])
        }
        setQIndex(0)
        setScore(0)
        setStreak(0)
        setBreakdown({})
        setPhase('playing')
    }, [])

    const handleAnswer = React.useCallback((correct, category) => {
        if (correct) setScore(s => s + 1)
        const newStreak = correct ? streak + 1 : 0
        setStreak(newStreak)
        setBreakdown(prev => ({
            ...prev,
            [category]: {
                correct: (prev[category]?.correct || 0) + (correct ? 1 : 0),
                total:   (prev[category]?.total   || 0) + 1,
            },
        }))

        if (qIndex + 1 >= TOTAL_QUESTIONS) {
            setPhase('result')
            return
        }

        // Shift difficulty
        const diffIdx = DIFFICULTIES.indexOf(difficulty)
        let nextDiffIdx = correct ? Math.min(diffIdx + 1, 2) : Math.max(diffIdx - 1, 0)
        let nextDiff = DIFFICULTIES[nextDiffIdx]

        setPool(prev => {
            const updated = { ...prev, [nextDiff]: [...(prev[nextDiff] || [])] }
            const available = pickNext(updated, nextDiff)
            if (!available) return prev
            const next = updated[available].shift()
            setDifficulty(available)
            setSequence(s => [...s, next])
            return updated
        })
        setQIndex(i => i + 1)
    }, [qIndex, difficulty, streak, pickNext])

    const currentQ = sequence[qIndex]

    return (
        <LangContext.Provider value={lang}>
            <div style={{
                maxWidth: 640, margin: '0 auto',
                background: C.card, border: `1px solid ${C.line}`,
                borderRadius: 12, padding: 'clamp(16px, 4vw, 32px)',
                minHeight: 400,
            }}>
                {phase === 'home' && (
                    <HomeScreen onStart={start} lang={lang} setLang={setLang} />
                )}
                {phase === 'playing' && currentQ && (
                    <QuestionCard
                        key={currentQ.id}
                        question={currentQ}
                        qIndex={qIndex}
                        total={TOTAL_QUESTIONS}
                        onAnswer={handleAnswer}
                        lang={lang}
                        streak={streak}
                    />
                )}
                {phase === 'result' && (
                    <ResultScreen
                        score={score}
                        total={TOTAL_QUESTIONS}
                        breakdown={breakdown}
                        onRestart={start}
                        lang={lang}
                        setLang={setLang}
                    />
                )}
            </div>
        </LangContext.Provider>
    )
}

// ── Page ──────────────────────────────────────────────────────────────────────
const wrap = { maxWidth: '1000px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }

const QuizPage = () => (
    <Layout>
        <Seo page="Quiz Rugby" description="Teste tes connaissances sur le rugby : Top 14, Coupe d'Europe, règles, histoire — 20 questions." type="website" path="/quiz/" />
        <div className="oa-page-header">
            <div style={wrap}>
                <div className="oa-eyebrow">Quiz Rugby</div>
                <h1>Teste tes connaissances</h1>
                <p>Règles, histoire, Top 14, joueurs</p>
            </div>
        </div>
        <div style={{ ...wrap, paddingTop: 48, paddingBottom: 96 }}>
            <Quiz />
        </div>
    </Layout>
)

export default QuizPage
