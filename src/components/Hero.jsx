import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const LAUNCH_DATE = new Date('2026-05-30T00:00:00Z').getTime()
const START = 48
const INTERVAL_MS = 20 * 60 * 1000 // 20 minutes

// Deterministic pseudo-random using interval index as seed
function seededRand(seed) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

function getCount() {
  const intervals = Math.floor((Date.now() - LAUNCH_DATE) / INTERVAL_MS)
  let count = START
  for (let i = 0; i < intervals; i++) {
    count += Math.floor(seededRand(i) * 9) + 8 // 8–16
  }
  return count
}

function DogCard({ className = '', style = {}, children }) {
  return (
    <div
      className={`absolute rounded-[24px] bg-white shadow-card overflow-hidden ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

export default function Hero({ onJoin }) {
  const [email, setEmail] = useState('')
  const [count, setCount] = useState(START)

  useEffect(() => {
    setCount(getCount())
  }, [])

  return (
    <section className="min-h-[calc(100vh-70px)] flex items-center px-[5%] py-16 relative overflow-hidden">
      {/* BG blobs */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-coral/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-80px] w-[400px] h-[400px] bg-mint/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="flex-1 max-w-[560px] z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5 bg-orange-50 border-2 border-orange-200 text-coral font-extrabold text-xs px-4 py-1.5 rounded-full mb-6">
            🚀 India's First Dog Mating App
          </span>
          <h1 className="text-[clamp(2.4rem,5vw,3.8rem)] font-black leading-[1.15] text-dark mb-5">
            Find Your Dog's<br />
            <span className="text-coral relative inline-block">
              Perfect Match
              <span className="absolute bottom-0.5 left-0 right-0 h-[6px] bg-yellow rounded opacity-70 -z-10" />
            </span>
          </h1>
          <p className="text-lg text-grey leading-relaxed mb-8">
            Connect with verified dog owners nearby. Smart breed compatibility, health checks, and location matching — all in one place.
          </p>

          {/* Email input row */}
          <div className="flex gap-3 mb-4 flex-col sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email…"
              className="mi flex-1 text-base"
            />
            <button onClick={() => onJoin(email)} className="btn-primary px-7 py-3.5 text-base whitespace-nowrap">
              Join Waitlist 🐾
            </button>
          </div>
          <p className="text-sm text-grey font-bold">
            🔒 No spam, ever. Be among the <span className="text-coral">first dog parents</span> in your city!
          </p>

          {/* Live counter */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="mt-5 inline-flex items-center gap-3 bg-white border-2 border-orange-100 rounded-2xl px-4 py-2.5 shadow-sm"
          >
            <div className="flex -space-x-2">
              {['🐶','🐕','🦮'].map((e, i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-sm border-2 border-white">{e}</div>
              ))}
            </div>
            <p className="text-sm font-extrabold text-dark">
              <span className="text-coral">{count.toLocaleString()} dog parents</span> already on the list — don't miss out! 🐾
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Dog card stack */}
      <motion.div
        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 flex justify-center items-center mt-10 lg:mt-0 min-h-[420px] relative"
      >
        <div className="relative w-[280px] h-[420px]">
          {/* Back card */}
          <DogCard className="w-[260px]" style={{ top: 20, left: 20, transform: 'rotate(6deg)', opacity: 0.6 }}>
            <div className="h-[140px] bg-gradient-to-br from-pink-100 to-orange-100" />
          </DogCard>
          {/* Mid card */}
          <DogCard className="w-[260px]" style={{ top: 10, left: 10, transform: 'rotate(-3deg)', opacity: 0.75 }}>
            <div className="h-[140px] bg-gradient-to-br from-teal-50 to-mint/30" />
          </DogCard>
          {/* Front card — Bella */}
          <DogCard className="w-[260px]" style={{ top: 0, left: 0 }}>
            <div className="h-[180px] overflow-hidden">
              <img src="/golden-retriever.jpg" alt="Bella" className="w-full h-full object-cover object-[center_30%]" />
            </div>
            <div className="p-4">
              <div className="text-xl font-black text-dark">Bella ✨</div>
              <div className="text-sm text-grey font-semibold mt-1">🐩 Golden Retriever · 2 yrs · Female</div>
              <div className="text-sm font-bold mt-1" style={{ color: 'var(--coral)' }}>📍 1.2 km away</div>
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {['Vaccinated ✓', 'Gentle', 'Playful'].map((t, i) => (
                  <span key={t} className="px-3 py-0.5 rounded-full text-xs font-extrabold"
                    style={{
                      background: i === 0 ? '#FFE8E8' : i === 1 ? '#E0F7F6' : '#FFF8DC',
                      color: i === 0 ? '#FF4444' : i === 1 ? '#2BA89F' : '#B8860B'
                    }}>{t}</span>
                ))}
              </div>
              <div className="mt-3 rounded-xl text-center py-2 text-sm font-extrabold"
                style={{ background: 'linear-gradient(135deg,#E8FAF9,#F0FBF0)', color: '#2BA89F' }}>
                🧬 94% Compatible
              </div>
            </div>
            <div className="flex justify-center gap-4 px-4 pb-4">
              {[['❌','Nope','#FFE8E8'], ['🐾','Woof!','#FFD4A8'], ['💚','Like','#E8F8F0']].map(([icon, label, bg]) => (
                <button key={label} className="flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer p-0">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-md" style={{ background: bg }}>{icon}</div>
                  <span className="text-xs font-bold text-grey">{label}</span>
                </button>
              ))}
            </div>
          </DogCard>
        </div>
      </motion.div>
    </section>
  )
}
