import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const cards = [
  { icon: '😤', title: 'Random Facebook Groups', desc: 'Posting in 10 different groups, getting spammy responses, no way to filter by breed or location. Exhausting.' },
  { icon: '😰', title: 'No Health Verification', desc: 'Meeting strangers with unvaccinated dogs. No way to know if the other dog is healthy or safe for yours.' },
  { icon: '😕', title: 'Zero Compatibility Info', desc: 'Matching a Labrador with a Chihuahua because "they\'re both dogs." Proper breed matching matters.' },
  { icon: '😓', title: 'Awkward First Meetings', desc: 'Driving hours only to find the dogs don\'t get along. No tools to pre-screen temperament or behaviour.' },
]

export default function PainPoints() {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)

  const go = (next) => {
    setDir(next > idx ? 1 : -1)
    setIdx(next)
  }

  return (
    <section className="py-20 px-[5%] bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-50 border-2 border-orange-200 text-coral font-extrabold text-xs px-4 py-1.5 rounded-full mb-4">The Problem</span>
          <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] font-black text-dark">Sound Familiar?</h2>
          <p className="text-grey mt-3 text-base">Finding a mate for your dog in India is still a mess. BarkMate fixes this.</p>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={idx}
              custom={dir}
              variants={{ enter: d => ({ x: d > 0 ? 80 : -80, opacity: 0 }), center: { x: 0, opacity: 1 }, exit: d => ({ x: d > 0 ? -80 : 80, opacity: 0 }) }}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.3 }}
              className="bg-cream border-2 border-orange-100 rounded-2xl p-8"
            >
              <div className="text-5xl mb-4">{cards[idx].icon}</div>
              <h3 className="text-xl font-black text-dark mb-3">{cards[idx].title}</h3>
              <p className="text-grey font-semibold leading-relaxed">{cards[idx].desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-6">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`w-2.5 h-2.5 rounded-full border-none cursor-pointer transition-all duration-200 ${i === idx ? 'bg-coral w-6' : 'bg-orange-200'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
