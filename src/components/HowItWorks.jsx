import { motion } from 'framer-motion'

const steps = [
  { n: '01', icon: '📝', title: 'Create Your Profile', desc: 'Tell us about your dog — breed, age, temperament, vaccination status, and what you\'re looking for.' },
  { n: '02', icon: '🔍', title: 'Get Matched', desc: 'Our algorithm finds compatible dogs nearby based on breed, health, temperament, and location.' },
  { n: '03', icon: '💬', title: 'Connect & Meet', desc: 'Chat with other dog owners, arrange a meet & greet, and let the dogs decide if it\'s a match!' },
]

export default function HowItWorks() {
  return (
    <section className="py-20 px-[5%] bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-orange-50 border-2 border-orange-200 text-coral font-extrabold text-xs px-4 py-1.5 rounded-full mb-4">How It Works</span>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-dark">Three Simple Steps</h2>
          <p className="text-grey mt-3 text-base max-w-lg mx-auto">Finding the right mate for your dog has never been this easy.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }} viewport={{ once: true }}
              className="relative p-7 rounded-3xl border-2 border-orange-100 bg-cream"
            >
              <div className="absolute -top-3 -left-3 w-9 h-9 bg-coral text-white text-xs font-black rounded-full flex items-center justify-center">{s.n}</div>
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-lg font-black text-dark mb-2">{s.title}</h3>
              <p className="text-grey text-sm leading-relaxed font-semibold">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
