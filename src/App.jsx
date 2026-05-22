import { useEffect, useMemo, useRef, useState } from 'react'

const BOARD_SIZE = 16
const INITIAL_SNAKE = [
  { x: 7, y: 8 },
  { x: 6, y: 8 },
  { x: 5, y: 8 },
]
const INITIAL_DIRECTION = { x: 1, y: 0 }
const SPEED = 140
const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

const isSameCell = (a, b) => a.x === b.x && a.y === b.y

const createSoundEngine = () => {
  if (typeof window === 'undefined') return null

  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  if (!AudioContextClass) return null

  const context = new AudioContextClass()

  const playSequence = (notes, type = 'sine', volume = 0.035) => {
    const startAt = context.currentTime + 0.01

    notes.forEach(({ frequency, duration, offset, gain = 1 }) => {
      const oscillator = context.createOscillator()
      const gainNode = context.createGain()
      const noteStart = startAt + offset
      const noteEnd = noteStart + duration

      oscillator.type = type
      oscillator.frequency.setValueAtTime(frequency, noteStart)

      gainNode.gain.setValueAtTime(0.0001, noteStart)
      gainNode.gain.exponentialRampToValueAtTime(volume * gain, noteStart + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.0001, noteEnd)

      oscillator.connect(gainNode)
      gainNode.connect(context.destination)
      oscillator.start(noteStart)
      oscillator.stop(noteEnd + 0.02)
    })
  }

  return {
    resume: () => (context.state === 'suspended' ? context.resume() : Promise.resolve()),
    eat: () =>
      playSequence(
        [
          { frequency: 660, duration: 0.07, offset: 0, gain: 0.9 },
          { frequency: 880, duration: 0.09, offset: 0.06, gain: 1 },
        ],
        'triangle',
      ),
    gameOver: () =>
      playSequence(
        [
          { frequency: 280, duration: 0.14, offset: 0, gain: 1 },
          { frequency: 220, duration: 0.16, offset: 0.11, gain: 0.8 },
          { frequency: 180, duration: 0.22, offset: 0.24, gain: 0.7 },
        ],
        'sawtooth',
        0.045,
      ),
    toggle: () =>
      playSequence(
        [{ frequency: 520, duration: 0.05, offset: 0, gain: 0.75 }],
        'square',
        0.025,
      ),
  }
}

function randomFoodPosition(snake) {
  const occupied = new Set(snake.map((segment) => `${segment.x},${segment.y}`))
  const available = []

  for (let y = 0; y < BOARD_SIZE; y += 1) {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      if (!occupied.has(`${x},${y}`)) {
        available.push({ x, y })
      }
    }
  }

  return available[Math.floor(Math.random() * available.length)]
}

function App() {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [queuedDirection, setQueuedDirection] = useState(INITIAL_DIRECTION)
  const [food, setFood] = useState(() => randomFoodPosition(INITIAL_SNAKE))
  const [isRunning, setIsRunning] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const directionRef = useRef(INITIAL_DIRECTION)
  const soundEngineRef = useRef(null)

  const ensureAudio = () => {
    if (!soundEngineRef.current) {
      soundEngineRef.current = createSoundEngine()
    }

    soundEngineRef.current?.resume()
  }

  const requestDirection = (nextDirection) => {
    if (!nextDirection) {
      return
    }

    ensureAudio()

    const currentDirection = directionRef.current
    const isReverse =
      currentDirection.x + nextDirection.x === 0 &&
      currentDirection.y + nextDirection.y === 0

    if (isReverse) {
      return
    }

    setQueuedDirection(nextDirection)
    if (!isRunning && !isGameOver) {
      setIsRunning(true)
    }
  }

  const handleToggleRunning = () => {
    ensureAudio()

    if (isGameOver) {
      return
    }

    setIsRunning((current) => {
      soundEngineRef.current?.toggle()
      return !current
    })
  }

  useEffect(() => {
    const savedHighScore = window.localStorage.getItem('snake-high-score')
    if (savedHighScore) {
      setHighScore(Number(savedHighScore))
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('snake-high-score', String(highScore))
  }, [highScore])

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase()
      const nextDirection =
        key === 'arrowup' || key === 'w'
          ? DIRECTIONS.up
          : key === 'arrowdown' || key === 's'
            ? DIRECTIONS.down
            : key === 'arrowleft' || key === 'a'
              ? DIRECTIONS.left
              : key === 'arrowright' || key === 'd'
                ? DIRECTIONS.right
                : null

      if (key === ' ') {
        event.preventDefault()
        handleToggleRunning()
        return
      }

      if (!nextDirection) {
        return
      }

      event.preventDefault()
      requestDirection(nextDirection)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isGameOver, isRunning])

  useEffect(() => {
    if (!isRunning || isGameOver) {
      return undefined
    }

    const interval = window.setInterval(() => {
      setSnake((currentSnake) => {
        const nextDirection = queuedDirection
        directionRef.current = nextDirection
        setDirection(nextDirection)

        const head = currentSnake[0]
        const nextHead = {
          x: (head.x + nextDirection.x + BOARD_SIZE) % BOARD_SIZE,
          y: (head.y + nextDirection.y + BOARD_SIZE) % BOARD_SIZE,
        }

        const grows = isSameCell(nextHead, food)
        const bodyToCheck = grows ? currentSnake : currentSnake.slice(0, -1)
        const hitsSelf = bodyToCheck.some((segment) => isSameCell(segment, nextHead))

        if (hitsSelf) {
          setIsRunning(false)
          setIsGameOver(true)
          soundEngineRef.current?.gameOver()
          return currentSnake
        }

        const updatedSnake = [nextHead, ...currentSnake]
        if (!grows) {
          updatedSnake.pop()
        } else {
          soundEngineRef.current?.eat()
          setScore((currentScore) => {
            const nextScore = currentScore + 10
            setHighScore((currentHigh) => Math.max(currentHigh, nextScore))
            return nextScore
          })
          setFood(randomFoodPosition(updatedSnake))
        }

        return updatedSnake
      })
    }, SPEED)

    return () => window.clearInterval(interval)
  }, [food, isGameOver, isRunning, queuedDirection])

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIRECTION)
    setQueuedDirection(INITIAL_DIRECTION)
    directionRef.current = INITIAL_DIRECTION
    setFood(randomFoodPosition(INITIAL_SNAKE))
    setScore(0)
    setIsGameOver(false)
    setIsRunning(false)
  }

  const touchControls = [
    { label: '↑', ariaLabel: 'cima', direction: DIRECTIONS.up, className: 'col-start-2 row-start-1' },
    { label: '←', ariaLabel: 'esquerda', direction: DIRECTIONS.left, className: 'col-start-1 row-start-2' },
    { label: '↓', ariaLabel: 'baixo', direction: DIRECTIONS.down, className: 'col-start-2 row-start-2' },
    { label: '→', ariaLabel: 'direita', direction: DIRECTIONS.right, className: 'col-start-3 row-start-2' },
  ]

  const cells = useMemo(() => {
    const snakeLookup = new Map(snake.map((segment, index) => [`${segment.x},${segment.y}`, index]))

    return Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, index) => {
      const x = index % BOARD_SIZE
      const y = Math.floor(index / BOARD_SIZE)
      const cellKey = `${x},${y}`
      const snakeIndex = snakeLookup.get(cellKey)
      const isHead = snakeIndex === 0
      const isSnake = snakeIndex !== undefined
      const isFoodCell = food.x === x && food.y === y

      let className = 'rounded-[8px] border border-white/5 bg-white/[0.03]'
      if (isSnake) {
        className = isHead
          ? 'cell-head rounded-[10px] border border-cyan-200/40 bg-gradient-to-br from-cyan-300 via-cyan-400 to-teal-300 shadow-[0_0_18px_rgba(34,211,238,0.55)]'
          : 'cell-snake rounded-[9px] border border-emerald-200/10 bg-gradient-to-br from-emerald-300/95 to-cyan-400/80'
      }
      if (isFoodCell) {
        className = 'cell-food rounded-full border border-orange-200/20 bg-gradient-to-br from-orange-300 via-amber-300 to-rose-400 shadow-[0_0_22px_rgba(251,146,60,0.55)]'
      }

      return <div key={cellKey} className={className} />
    })
  }, [food, snake])

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_34%),linear-gradient(160deg,_#020617,_#081127_48%,_#020617)] px-3 py-4 text-slate-100 sm:px-4 sm:py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 lg:flex-row lg:items-start lg:justify-center lg:gap-6">
        <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-glow backdrop-blur-xl sm:rounded-[32px] sm:p-6 lg:w-[370px]">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.05),transparent)]" />
          <div className="relative space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-cyan-200/70">Snake</p>
              <h1 className="text-4xl font-black uppercase tracking-[0.18em] text-white sm:text-5xl">Jogo</h1>
              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">
                Colete os pontos, aumente a cobra e evite colisões com o próprio corpo.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Score</span>
                <p className="mt-2 text-3xl font-bold text-cyan-300">{score}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Recorde</span>
                <p className="mt-2 text-3xl font-bold text-amber-300">{highScore}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  ensureAudio()
                  if (isGameOver) {
                    resetGame()
                  }
                  soundEngineRef.current?.toggle()
                  setIsRunning(true)
                }}
                className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-slate-950 transition hover:scale-[1.02] hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                {isGameOver ? 'Novo jogo' : isRunning ? 'Jogando' : 'Iniciar'}
              </button>
              <button
                type="button"
                onClick={resetGame}
                className="rounded-full border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:border-white/30 hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Reiniciar
              </button>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white">Controles</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                <li>↑ ↓ ← → ou WASD para mover</li>
                <li>Toque nas setas abaixo do tabuleiro no mobile</li>
                <li>Espaço para pausar/retomar</li>
                <li>Sem reversão imediata de direção</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-cyan-400/10 bg-cyan-400/5 p-4 text-sm text-cyan-100/90">
              Estado:{' '}
              <span className="font-semibold text-white">
                {isGameOver ? 'Game over' : isRunning ? 'Em andamento' : 'Pronto para começar'}
              </span>
            </div>
          </div>
        </section>

        <section className="relative rounded-[28px] border border-white/10 bg-slate-950/60 p-3 shadow-glow backdrop-blur-xl sm:rounded-[36px] sm:p-4">
          <div className="absolute inset-0 rounded-[36px] border border-cyan-300/5" />
          <div className="relative space-y-4">
            <div className="relative">
              <div
                className="game-board relative grid gap-1 rounded-[24px] bg-[linear-gradient(180deg,rgba(15,23,42,0.95),rgba(2,6,23,0.95))] p-2.5 sm:rounded-[28px] sm:p-3"
                style={{
                  gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(0, 1fr))`,
                  width: 'min(94vw, 640px)',
                  aspectRatio: '1 / 1',
                  touchAction: 'none',
                }}
              >
                {cells}
              </div>

              {(!isRunning || isGameOver) && (
                <div className="absolute inset-0 flex items-center justify-center rounded-[28px] bg-slate-950/68 backdrop-blur-sm">
                  <div className="mx-4 max-w-sm rounded-[28px] border border-white/10 bg-white/[0.05] px-8 py-7 text-center shadow-2xl">
                    <p className="text-xs uppercase tracking-[0.38em] text-cyan-200/80">
                      {isGameOver ? 'Fim de jogo' : 'Pronto'}
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-[0.14em] text-white">
                      {isGameOver ? 'Tente novamente' : 'Pressione iniciar'}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {isGameOver
                        ? `Você marcou ${score} pontos. Reinicie e tente superar ${highScore}.`
                        : 'Toque em iniciar ou em uma direção para começar.'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 grid-rows-2 gap-3 sm:hidden">
              {touchControls.map(({ label, ariaLabel, direction: nextDirection, className }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={`Mover para ${ariaLabel}`}
                  onTouchStart={(event) => {
                    event.preventDefault()
                    requestDirection(nextDirection)
                  }}
                  onClick={() => requestDirection(nextDirection)}
                  className={`rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-2xl font-bold text-white shadow-[0_12px_30px_rgba(8,15,32,0.45)] transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${className}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
