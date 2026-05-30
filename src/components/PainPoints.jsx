import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    icon: '😩',
    quote: 'I posted in 6 different Facebook groups asking if anyone had a healthy male Rajapalayam nearby. Got zero responses for 3 months. No one even knew the breed existed.',
    avatar: '👩',
    name: 'Dog parent, Chennai',
    breed: 'Rajapalayam owner · Searching 4+ months',
    tag: 'The struggle is real 🐾',
  },
  {
    icon: '😰',
    quote: 'Found a match through a friend of a friend. But when we met, the other dog had no vaccination record. We had to walk away — felt terrible for everyone involved.',
    avatar: '👨',
    name: 'Dog parent, Pune',
    breed: 'Labrador owner · No verified options nearby',
    tag: 'Health info matters 📋',
  },
  {
    icon: '🤯',
    quote: 'The only "platform" I found was a WhatsApp group with 400 people spamming. No filters, no breed info, no location — just chaos. I gave up after two weeks.',
    avatar: '👩',
    name: 'Dog parent, Mumbai',
    breed: 'Golden Retriever owner · Still searching',
    tag: 'There has to be a better way 💡',
  },
  {
    icon: '😤',
    quote: 'I paid ₹5,000 to a "dog matchmaker" on Instagram. He took the money, sent one blurry photo, and disappeared. No refund, no accountability, nothing.',
    avatar: '👨',
    name: 'Dog parent, Delhi',
    breed: 'German Shepherd owner · Got scammed',
    tag: 'Trust & safety is everything 🔒',
  },
  {
    icon: '💔',
    quote: 'My Indie dog is healthy, friendly and fully vaccinated. But every group I join treats Indies as "lesser" — breeders won\'t even reply. My dog deserves a good match too.',
    avatar: '👩',
    name: 'Dog parent, Bengaluru',
    breed: 'Indian Pariah Dog owner · Discriminated against',
    tag: 'Every breed deserves love 🐕',
  },
  {
    icon: '😢',
    quote: 'Finally found a Pomeranian match — but they were 180 km away. We drove 4 hours one way, the dogs didn\'t get along at all. Total waste of a weekend.',
    avatar: '👩',
    name: 'Dog parent, Hyderabad',
    breed: 'Pomeranian owner · Wrong match, long distance',
    tag: 'Location & compatibility matter 📍',
  },
  {
    icon: '🙃',
    quote: 'Spent weeks coordinating calls with an owner. When we finally met, the temperaments clashed badly. Zero compatibility check anywhere — it was pure luck and it failed.',
    avatar: '👨',
    name: 'Dog parent, Kolkata',
    breed: 'Beagle owner · Weeks wasted on wrong match',
    tag: 'Temperament matching is key 🧠',
  },
  {
    icon: '😟',
    quote: 'My vet told me exactly what bloodline to look for in a Rottweiler mate. I searched for 6 months and couldn\'t find a single verified owner nearby. The info just doesn\'t exist.',
    avatar: '👨',
    name: 'Dog parent, Nagpur',
    breed: 'Rottweiler owner · Vet-recommended match unfindable',
    tag: 'Verified info is priceless 📊',
  },
  {
    icon: '😬',
    quote: 'We drove 2 hours, everything looked good — then the owner cancelled 30 minutes before. No way to know if someone is serious or just wasting your time.',
    avatar: '👩',
    name: 'Dog parent, Ahmedabad',
    breed: 'Shih Tzu owner · Last-minute ghosted',
    tag: 'Accountability matters 💛',
  },
  {
    icon: '🥺',
    quote: 'My Mudhol Hound is a beautiful native breed but nobody near me has heard of it. I\'ve had to explain what a Mudhol Hound is before even starting the mating conversation.',
    avatar: '👨',
    name: 'Dog parent, Solapur',
    breed: 'Mudhol Hound owner · No native breed community',
    tag: 'Indian breeds need a home too 🇮🇳',
  },
  {
    icon: '😵',
    quote: 'My dog is in heat right now and I\'m posting everywhere. Nobody responds fast enough. By the time someone replies, the window has already closed. Timing is everything.',
    avatar: '👩',
    name: 'Dog parent, Jaipur',
    breed: 'Indian Spitz owner · Missed the window',
    tag: 'Speed & timing is critical ⏱',
  },
  {
    icon: '😑',
    quote: 'Someone sent me photos of a "pure breed Labrador" that turned out to be a mixed breed puppy. You just can\'t trust what people claim online with zero verification.',
    avatar: '👨',
    name: 'Dog parent, Lucknow',
    breed: 'Labrador owner · Misled by fake profiles',
    tag: 'Verified profiles only ✅',
  },
]

function TestimonialCard({ t }) {
  return (
    <div className="bg-cream border-2 border-orange-100 rounded-2xl p-6 flex flex-col h-full">
      <div className="text-4xl mb-4">{t.icon}</div>
      <p className="text-dark font-semibold leading-relaxed text-sm flex-1 mb-5">"{t.quote}"</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-xl flex-shrink-0">{t.avatar}</div>
        <div>
          <div className="font-black text-dark text-sm">{t.name}</div>
          <div className="text-grey text-xs font-semibold">{t.breed}</div>
          <div className="text-coral text-xs font-extrabold mt-0.5">{t.tag}</div>
        </div>
      </div>
    </div>
  )
}

export default function PainPoints() {
  const PER_PAGE = 3
  const total = testimonials.length
  const maxIdx = total - PER_PAGE
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const [perPage, setPerPage] = useState(PER_PAGE)
  const intervalRef = useRef(null)

  useEffect(() => {
    const update = () => setPerPage(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const maxPage = total - perPage

  const go = (next) => {
    const clamped = Math.max(0, Math.min(next, maxPage))
    setDir(clamped >= idx ? 1 : -1)
    setIdx(clamped)
  }

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIdx(i => {
        const next = i >= total - perPage ? 0 : i + 1
        setDir(1)
        return next
      })
    }, 4000)
    return () => clearInterval(intervalRef.current)
  }, [perPage, total])

  const visible = testimonials.slice(idx, idx + perPage)

  return (
    <section className="py-20 px-[5%] bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-50 border-2 border-orange-200 text-coral font-extrabold text-xs px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            The Problem We're Solving
          </span>
          <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-black text-dark leading-tight">
            Finding a mate for your dog is{' '}
            <span className="text-coral">way harder</span> than it should be 🤯
          </h2>
          <p className="text-grey mt-3 text-base">Every dog parent goes through this. You shouldn't have to.</p>
        </div>

        {/* Cards + arrows */}
        <div className="relative flex items-center gap-2">
          {/* Left arrow */}
          <button
            onClick={() => go(idx - 1)}
            disabled={idx === 0}
            className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-orange-200 bg-white flex items-center justify-center text-coral font-black text-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-orange-50 z-10"
          >←</button>

          {/* Sliding cards */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={idx}
                custom={dir}
                variants={{
                  enter: d => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: d => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
                }}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.3 }}
                className={`grid gap-4 ${perPage === 1 ? 'grid-cols-1' : perPage === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}
              >
                {visible.map((t, i) => (
                  <TestimonialCard key={idx + i} t={t} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right arrow */}
          <button
            onClick={() => go(idx + 1)}
            disabled={idx >= maxPage}
            className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-orange-200 bg-white flex items-center justify-center text-coral font-black text-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-orange-50 z-10"
          >→</button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-7">
          {Array.from({ length: maxPage + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`h-2.5 rounded-full border-none cursor-pointer transition-all duration-200 ${i === idx ? 'bg-coral w-6' : 'bg-orange-200 w-2.5'}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
